<script>
    import { onMount, onDestroy } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    import '../../css/colors.css';
    import { Logger, LogCategory } from '../../lib/utils/Logger';
    
    const logger = Logger.getInstance();
    
    // Register all Chart.js components
    Chart.register(...registerables);
    
    export let distributionStats = [];
    export let totalDamage = 0;
    export let poisonDamage = 0;
    export let familiarDamage = 0;
    
    // Collapse state
    let isCollapsed = true;
    
    // Calculate confidence intervals
    $: gaussianParams = calculateGaussianParameters(distributionStats);
    $: confidence68 = gaussianParams.stdDev > 0 ? {
        lower: Math.round(gaussianParams.mean - gaussianParams.stdDev),
        upper: Math.round(gaussianParams.mean + gaussianParams.stdDev)
    } : null;
    $: confidence95 = gaussianParams.stdDev > 0 ? {
        lower: Math.round(gaussianParams.mean - 2 * gaussianParams.stdDev),
        upper: Math.round(gaussianParams.mean + 2 * gaussianParams.stdDev)
    } : null;
    
    let chartCanvas;
    let chart;
    
    // Toggle collapse state
    function toggleCollapse() {
        isCollapsed = !isCollapsed;
    }
    
    // Calculate Gaussian parameters for TOTAL damage (sum of all hits)
    function calculateGaussianParameters(stats) {
        logger.log(LogCategory.ROTATION, 'calculateGaussianParameters called with stats', stats);
        if (stats.length === 0) {
            logger.log(LogCategory.ROTATION, 'No stats provided, returning default values');
            return { mean: 0, stdDev: 0 };
        }

        // Calculate total mean and variance (sum of all hits)
        let totalMean = 0;
        let totalVariance = 0;

        stats.forEach(stat => {
            if (stat.distributionType === 'combined') {
                // For combined distributions, calculate the proper mixture mean and variance
                // Mixture mean = p1*mu1 + p2*mu2
                // Mixture variance = p1*sigma1^2 + p2*sigma2^2 + p1*p2*(mu1-mu2)^2
                
                const p1 = stat.critProbability;
                const mu1 = stat.critMean;
                const sigma1Squared = stat.critVariance;
                const p2 = stat.nonCritProbability;
                const mu2 = stat.nonCritMean;
                const sigma2Squared = stat.nonCritVariance;
                
                const mixtureMean = p1 * mu1 + p2 * mu2;
                const mixtureVariance = p1 * sigma1Squared + p2 * sigma2Squared + p1 * p2 * Math.pow(mu1 - mu2, 2);
                
                // Add to total (each ability contributes to the sum)
                totalMean += mixtureMean * stat.likelihood;
                totalVariance += mixtureVariance * stat.likelihood;
            } else if (stat.distributionType === 'crit' || stat.distributionType === 'non_crit') {
                // For individual crit/non-crit distributions, treat as independent
                const meanDamage = (stat.minDamage + stat.maxDamage) / 2;
                const variance = Math.pow((stat.maxDamage - stat.minDamage) / 2, 2) / 3;
                
                // Add to total (each hit contributes to the sum)
                totalMean += meanDamage * stat.likelihood;
                totalVariance += variance * stat.likelihood;
            }
        });

        const stdDev = Math.sqrt(totalVariance);

        return { mean: totalMean, stdDev };
    }
    
    // Create histogram data for TOTAL damage distribution
    function createHistogramData(stats, gaussianParams) {
        logger.log(LogCategory.ROTATION, 'createHistogramData called', { stats, gaussianParams });
        if (stats.length === 0) {
            logger.log(LogCategory.ROTATION, 'No stats provided to createHistogramData');
            return { labels: [], data: [], cumulativeData: [] };
        }
        
        if (gaussianParams.stdDev === 0) {
            logger.log(LogCategory.ROTATION, 'Standard deviation is 0, returning empty data');
            return { labels: [], data: [], cumulativeData: [] };
        }
        
        // Create range around the total damage mean (±4 standard deviations)
        const rangeStart = Math.max(0, gaussianParams.mean - 4 * gaussianParams.stdDev);
        const rangeEnd = gaussianParams.mean + 4 * gaussianParams.stdDev;
        
        // Calculate nice round tick spacing for labels
        const range = rangeEnd - rangeStart;
        let tickSpacing = range / 10; // Aim for ~10 ticks
        
        // Round tick spacing to nice numbers
        const magnitude = Math.pow(10, Math.floor(Math.log10(tickSpacing)));
        const normalized = tickSpacing / magnitude;
        
        if (normalized < 2) tickSpacing = magnitude;
        else if (normalized < 5) tickSpacing = 2 * magnitude;
        else if (normalized < 10) tickSpacing = 5 * magnitude;
        else tickSpacing = 10 * magnitude;
        
        // Adjust range to use nice round numbers
        const adjustedRangeStart = Math.floor(rangeStart / tickSpacing) * tickSpacing;
        const adjustedRangeEnd = Math.ceil(rangeEnd / tickSpacing) * tickSpacing;
        const numTicks = Math.ceil((adjustedRangeEnd - adjustedRangeStart) / tickSpacing) + 1;
        
        // Create many more data points for smooth curves (200 points instead of ~10)
        const numDataPoints = 200;
        const dataPointSpacing = (adjustedRangeEnd - adjustedRangeStart) / (numDataPoints - 1);
        
        // Create data points for the Gaussian curve
        const dataPoints = [];
        const cumulativeData = [];
        const labels = [];
        
        // Create smooth curve data points
        for (let i = 0; i < numDataPoints; i++) {
            const x = adjustedRangeStart + i * dataPointSpacing;
            const gaussianValue = (1 / (gaussianParams.stdDev * Math.sqrt(2 * Math.PI))) * 
                                 Math.exp(-0.5 * Math.pow((x - gaussianParams.mean) / gaussianParams.stdDev, 2));
            dataPoints.push(gaussianValue);
            
            // Create labels for each data point (Chart.js needs labels array to match data array length)
            const formatNumber = (num) => {
                if (num >= 1000000) {
                    return (num / 1000000).toFixed(1) + 'M';
                } else if (num >= 100000) {
                    return (num / 1000).toFixed(0) + 'K';
                } else {
                    return num.toLocaleString();
                }
            };
            
            // Show labels at consistent intervals (every 20th point for ~10 labels across 200 points)
            const labelInterval = Math.floor(numDataPoints / numTicks);
            const isTickPoint = i % labelInterval === 0;
            labels.push(isTickPoint ? formatNumber(x) : '');
        }
        
        // Calculate cumulative probability (probability of achieving at least this damage)
        let cumulativeSum = 0;
        for (let i = dataPoints.length - 1; i >= 0; i--) {
            cumulativeSum += dataPoints[i] * dataPointSpacing; // Multiply by spacing to get area
            cumulativeData.unshift(cumulativeSum);
        }
        
        // Scale probability density to a reasonable range (0-50 instead of 0-100)
        const maxValue = Math.max(...dataPoints);
        const scaledData = dataPoints.map(point => (point / maxValue) * 50);
        
        // Normalize cumulative data to 0-100
        const maxCumulative = Math.max(...cumulativeData);
        const scaledCumulative = cumulativeData.map(point => (point / maxCumulative) * 100);
        
        return { 
            labels, 
            data: scaledData,
            cumulativeData: scaledCumulative
        };
    }
    
    function updateChart() {
        if (!chartCanvas) return;
        
        // Destroy existing chart
        if (chart) {
            chart.destroy();
        }
        
        const ctx = chartCanvas.getContext('2d');
        
        // Calculate Gaussian parameters
        const gaussianParams = calculateGaussianParameters(distributionStats);
        
        // Create histogram data
        const histogramData = createHistogramData(distributionStats, gaussianParams);
        
        // Create vertical lines for mean and standard deviations
        const rangeStart = Math.max(0, gaussianParams.mean - 4 * gaussianParams.stdDev);
        const rangeEnd = gaussianParams.mean + 4 * gaussianParams.stdDev;
        const range = rangeEnd - rangeStart;
        let tickSpacing = range / 10;
        const magnitude = Math.pow(10, Math.floor(Math.log10(tickSpacing)));
        const normalized = tickSpacing / magnitude;
        if (normalized < 2) tickSpacing = magnitude;
        else if (normalized < 5) tickSpacing = 2 * magnitude;
        else if (normalized < 10) tickSpacing = 5 * magnitude;
        else tickSpacing = 10 * magnitude;
        
        const adjustedRangeStart = Math.floor(rangeStart / tickSpacing) * tickSpacing;
        const adjustedRangeEnd = Math.ceil(rangeEnd / tickSpacing) * tickSpacing;
        const dataPointSpacing = (adjustedRangeEnd - adjustedRangeStart) / (Math.max(histogramData.data.length - 1, 1));
        
        // Create vertical confidence bounds using scatter plot approach
        const createVerticalLineData = (xValue, yMax = 100) => {
            const points = [];
            for (let y = 0; y <= yMax; y += 2) { // Step by 2 for smoother line
                points.push({ x: xValue, y: y });
            }
            return points;
        };
        
        const meanLineData = createVerticalLineData(gaussianParams.mean);
        const stdDev1LowerData = createVerticalLineData(gaussianParams.mean - gaussianParams.stdDev);
        const stdDev1UpperData = createVerticalLineData(gaussianParams.mean + gaussianParams.stdDev);
        const stdDev2LowerData = createVerticalLineData(gaussianParams.mean - 2 * gaussianParams.stdDev);
        const stdDev2UpperData = createVerticalLineData(gaussianParams.mean + 2 * gaussianParams.stdDev);
        
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Probability Density',
                        data: (histogramData.data || []).map((value, index) => ({
                            x: adjustedRangeStart + index * dataPointSpacing,
                            y: value
                        })),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 0,
                        hitRadius: 10,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Cumulative Probability',
                        data: (histogramData.cumulativeData || []).map((value, index) => ({
                            x: adjustedRangeStart + index * dataPointSpacing,
                            y: value
                        })),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        hitRadius: 18,
                        pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
                        pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
                        pointHoverBorderWidth: 5,
                        tension: 0.4,
                        yAxisID: 'y1'
                    },
                    {
                        label: 'Mean',
                        data: meanLineData,
                        type: 'scatter',
                        borderColor: 'rgba(0, 255, 0, 0.8)',
                        backgroundColor: 'rgba(0, 255, 0, 0.8)',
                        borderWidth: 1,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        showLine: true,
                        fill: false,
                        tension: 0,
                        yAxisID: 'y'
                    },
                    {
                        label: '68.2% (1σ)',
                        data: stdDev1LowerData,
                        type: 'scatter',
                        borderColor: 'rgba(0, 255, 0, 0.6)',
                        backgroundColor: 'rgba(0, 255, 0, 0.6)',
                        borderWidth: 1,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        showLine: true,
                        fill: false,
                        tension: 0,
                        yAxisID: 'y'
                    },
                    {
                        label: '68.2% (1σ)',
                        data: stdDev1UpperData,
                        type: 'scatter',
                        borderColor: 'rgba(0, 255, 0, 0.6)',
                        backgroundColor: 'rgba(0, 255, 0, 0.6)',
                        borderWidth: 1,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        showLine: true,
                        fill: false,
                        tension: 0,
                        yAxisID: 'y'
                    },
                    {
                        label: '98.7% (2σ)',
                        data: stdDev2LowerData,
                        type: 'scatter',
                        borderColor: 'rgba(0, 255, 0, 0.4)',
                        backgroundColor: 'rgba(0, 255, 0, 0.4)',
                        borderWidth: 1,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        showLine: true,
                        fill: false,
                        tension: 0,
                        yAxisID: 'y'
                    },
                    {
                        label: '98.7% (2σ)',
                        data: stdDev2UpperData,
                        type: 'scatter',
                        borderColor: 'rgba(0, 255, 0, 0.4)',
                        backgroundColor: 'rgba(0, 255, 0, 0.4)',
                        borderWidth: 1,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        showLine: true,
                        fill: false,
                        tension: 0,
                        yAxisID: 'y'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Damage Distribution (Gaussian Approximation)',
                        color: '#fff',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        labels: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                const dataIndex = context[0].dataIndex;
                                const xValue = adjustedRangeStart + dataIndex * dataPointSpacing;
                                const formatNumber = (num) => {
                                    if (num >= 1000000) {
                                        return (num / 1000000).toFixed(1) + 'M';
                                    } else if (num >= 100000) {
                                        return (num / 1000).toFixed(0) + 'K';
                                    } else {
                                        return num.toLocaleString();
                                    }
                                };
                                return `Damage: ${formatNumber(xValue)}`;
                            },
                            label: function(context) {
                                const formatNumber = (num) => {
                                    if (num >= 1000000) {
                                        return (num / 1000000).toFixed(1) + 'M';
                                    } else if (num >= 100000) {
                                        return (num / 1000).toFixed(0) + 'K';
                                    } else {
                                        return num.toLocaleString();
                                    }
                                };
                                
                                if (context.dataset.type === 'scatter') {
                                    // For scatter plots (vertical lines), use the x value directly
                                    return `${context.dataset.label}: ${formatNumber(context.parsed.x)}`;
                                } else {
                                    // For line charts, use the parsed x value directly
                                    if (context.dataset.label === 'Probability Density') {
                                        return `Probability Density: ${context.parsed.y.toFixed(1)}%`;
                                    } else if (context.dataset.label === 'Cumulative Probability') {
                                        return `P(Damage ≥ ${formatNumber(context.parsed.x)}): ${context.parsed.y.toFixed(1)}%`;
                                    }
                                    return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 'Damage',
                            color: '#fff'
                        },
                        ticks: {
                            color: '#fff',
                            callback: function(value) {
                                const formatNumber = (num) => {
                                    if (num >= 1000000) {
                                        return (num / 1000000).toFixed(1) + 'M';
                                    } else if (num >= 100000) {
                                        return (num / 1000).toFixed(0) + 'K';
                                    } else {
                                        return num.toLocaleString();
                                    }
                                };
                                return formatNumber(value);
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Probability Density',
                            color: '#fff'
                        },
                        ticks: {
                            color: '#fff',
                            callback: function(value) {
                                return value.toFixed(0) + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Cumulative Probability',
                            color: '#fff'
                        },
                        ticks: {
                            color: '#fff',
                            callback: function(value) {
                                return value.toFixed(0) + '%';
                            }
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }
    
    // Update chart when props change
    $: if (distributionStats && chartCanvas) {
        logger.log(LogCategory.ROTATION, 'DamageDistributionChart received distributionStats', distributionStats);
        updateChart();
    }
    
    onMount(() => {
        updateChart();
    });
    
    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });
</script>

<div class="damage-chart-container">
    <div class="chart-header">
        
        <div class="header-left">
            <h3>Results</h3>
            
        </div>
        <div class="stats-summary">
            <div class="stat-item">
                <span class="stat-label">Ability:</span>
                <span class="stat-value">{totalDamage.toLocaleString()}</span>
            </div>
            {#if poisonDamage > 0}
                <div class="stat-item">
                    <span class="stat-label">Poison:</span>
                    <span class="stat-value poison">{poisonDamage.toLocaleString()}</span>
                </div>
            {/if}
            {#if familiarDamage > 0}
                <div class="stat-item">
                    <span class="stat-label">Familiar:</span>
                    <span class="stat-value familiar">{familiarDamage.toLocaleString()}</span>
                </div>
            {/if}
        </div>
    </div>
    
    <button 
        class="collapse-button-chart" 
        on:click={toggleCollapse} 
        title={isCollapsed ? 'Show Detailed Results' : 'Show Summary'}
        aria-label={isCollapsed ? 'Expand damage distribution chart' : 'Collapse damage distribution chart'}
    >
        <svg 
            class="collapse-icon-chart" 
            class:rotated={!isCollapsed} 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            style="display: block;"
            aria-hidden="true"
        >
            <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
    </button>
    
    {#if !isCollapsed}
        <div class="chart-wrapper">
            <canvas bind:this={chartCanvas}></canvas>
        </div>
        
        {#if distributionStats.length > 0}
            <div class="distribution-info">
                <h4>Distribution Statistics</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Total Hits:</span>
                        <span class="info-value">{distributionStats.length}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Abilities Used:</span>
                        <span class="info-value">{new Set(distributionStats.map(s => s.ability)).size}</span>
                    </div>
                </div>
                
                {#if gaussianParams.stdDev > 0}
                    <div class="confidence-intervals">
                        <h4>Confidence Intervals</h4>
                        <div class="confidence-grid">
                            <div class="confidence-item">
                                <span class="confidence-label">68% Confidence:</span>
                                <span class="confidence-value">{confidence68.lower.toLocaleString()} - {confidence68.upper.toLocaleString()}</span>
                            </div>
                            <div class="confidence-item">
                                <span class="confidence-label">95% Confidence:</span>
                                <span class="confidence-value">{confidence95.lower.toLocaleString()} - {confidence95.upper.toLocaleString()}</span>
                            </div>
                            <div class="confidence-item">
                                <span class="confidence-label">Mean:</span>
                                <span class="confidence-value">{Math.round(gaussianParams.mean).toLocaleString()}</span>
                            </div>
                            <div class="confidence-item">
                                <span class="confidence-label">Standard Deviation:</span>
                                <span class="confidence-value">{Math.round(gaussianParams.stdDev).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        {/if}
    {/if}
</div>

<style>
    .damage-chart-container {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid #444;
        border-radius: 8px;
        padding-top: 1.3rem;
        padding-bottom: 0.5rem;
        padding-left: 1.3rem;
        padding-right: 1.3rem;
        margin: 1rem 0;
        position: relative;
    }
    
    .chart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .header-left {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
    }
    
    .header-right {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: flex-end;
    }
    
    .chart-header h3 {
        margin: 0;
        color: #fff;
        font-size: 1.5rem;
        white-space: nowrap;
    }
    
    .collapse-button-chart {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #ccc;
        color: #ccc;
        cursor: pointer;
        padding: 0;
        border-radius: 0 8px 0 4px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
    }
    
    .collapse-button-chart:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }
    
    
    .stats-summary {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        flex-shrink: 0;
    }
    
    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
    }
    
    .stat-label {
        font-size: 0.8rem;
        color: #ccc;
    }
    
    .stat-value {
        font-size: 1.1rem;
        font-weight: bold;
        color: #fff;
    }
    
    .stat-value.poison {
        color: var(--color-poison);
    }

    .stat-value.familiar {
        color: var(--color-familiar);
    }
    
    .chart-wrapper {
        position: relative;
        height: 400px;
        margin: 1rem 0;
    }
    
    .distribution-info {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #444;
    }
    
    .distribution-info h4 {
        margin: 0 0 0.5rem 0;
        color: #fff;
        font-size: 1rem;
    }
    
    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.5rem;
    }
    
    .info-item {
        display: flex;
        justify-content: space-between;
        padding: 0.25rem 0;
    }
    
    .info-label {
        color: #ccc;
        font-size: 0.9rem;
    }
    
    .info-value {
        color: #fff;
        font-weight: bold;
        font-size: 0.9rem;
    }
    
    .confidence-intervals {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #444;
    }
    
    .confidence-intervals h4 {
        margin: 0 0 0.5rem 0;
        color: #fff;
        font-size: 1rem;
    }
    
    .confidence-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 0.5rem;
    }
    
    .confidence-item {
        display: flex;
        justify-content: space-between;
        padding: 0.25rem 0;
    }
    
    .confidence-label {
        color: #ccc;
        font-size: 0.9rem;
    }
    
    .confidence-value {
        color: #4ade80;
        font-weight: bold;
        font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
        .chart-header {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .header-left {
            width: 100%;
        }
        
        .stats-summary {
            width: 100%;
            justify-content: space-between;
        }
        
        .chart-wrapper {
            height: 300px;
        }
        
        .info-grid {
            grid-template-columns: 1fr;
        }
    }
</style> 