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
    export let dreadnipDamage = 0;
    export let conjureDamage = 0;
    export let poisonPerTick = [];
    export let familiarPerTick = [];
    export let dreadnipPerTick = [];
    export let conjurePerTick = [];
    
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
    let timeSeriesCanvas;
    let timeSeriesChart;

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
    
    /**
     * Build cumulative mean/variance time series from per-hit distribution stats.
     * Returns one data point per tick where damage lands.
     */
    function buildTimeSeries(stats) {
        if (!stats || stats.length === 0) return [];

        // Group hits by tick
        const tickMap = new Map();
        stats.forEach(stat => {
            if (!tickMap.has(stat.tick)) tickMap.set(stat.tick, []);
            tickMap.get(stat.tick).push(stat);
        });

        // Sort ticks and compute cumulative stats
        const ticks = [...tickMap.keys()].sort((a, b) => a - b);
        let cumMean = 0;
        let cumVariance = 0;
        const series = [];

        for (const tick of ticks) {
            for (const stat of tickMap.get(tick)) {
                if (stat.distributionType === 'combined') {
                    const p1 = stat.critProbability;
                    const mu1 = stat.critMean;
                    const s1sq = stat.critVariance;
                    const p2 = stat.nonCritProbability;
                    const mu2 = stat.nonCritMean;
                    const s2sq = stat.nonCritVariance;
                    const mixMean = p1 * mu1 + p2 * mu2;
                    const mixVar = p1 * s1sq + p2 * s2sq + p1 * p2 * Math.pow(mu1 - mu2, 2);
                    cumMean += mixMean * stat.likelihood;
                    cumVariance += mixVar * stat.likelihood;
                } else {
                    const mean = (stat.minDamage + stat.maxDamage) / 2;
                    const variance = Math.pow((stat.maxDamage - stat.minDamage) / 2, 2) / 3;
                    cumMean += mean * stat.likelihood;
                    cumVariance += variance * stat.likelihood;
                }
            }
            const stdDev = Math.sqrt(cumVariance);
            series.push({
                tick,
                mean: cumMean,
                sigma1Upper: cumMean + stdDev,
                sigma1Lower: cumMean - stdDev,
                sigma2Upper: cumMean + 2 * stdDev,
                sigma2Lower: Math.max(0, cumMean - 2 * stdDev)
            });
        }
        return series;
    }

    function updateTimeSeriesChart() {
        if (!timeSeriesCanvas) return;
        if (timeSeriesChart) timeSeriesChart.destroy();

        const series = buildTimeSeries(distributionStats);
        if (series.length === 0) return;

        const ctx = timeSeriesCanvas.getContext('2d');
        const labels = series.map(s => s.tick);

        const formatDmg = (num) => {
            if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
            if (num >= 100000) return (num / 1000).toFixed(0) + 'K';
            return num.toLocaleString();
        };

        // Build cumulative data aligned to the ticks in the series
        const hasPoisonData = poisonDamage > 0 && poisonPerTick.length > 0;
        const poisonData = hasPoisonData
            ? series.map(s => (s.tick < poisonPerTick.length ? poisonPerTick[s.tick] : poisonPerTick[poisonPerTick.length - 1]) || 0)
            : [];

        const hasFamiliarData = familiarDamage > 0 && familiarPerTick.length > 0;
        const familiarData = hasFamiliarData
            ? series.map(s => (s.tick < familiarPerTick.length ? familiarPerTick[s.tick] : familiarPerTick[familiarPerTick.length - 1]) || 0)
            : [];

        const hasDreadnipData = dreadnipDamage > 0 && dreadnipPerTick.length > 0;
        const dreadnipData = hasDreadnipData
            ? series.map(s => (s.tick < dreadnipPerTick.length ? dreadnipPerTick[s.tick] : dreadnipPerTick[dreadnipPerTick.length - 1]) || 0)
            : [];

        const hasConjureData = conjureDamage > 0 && conjurePerTick.length > 0;
        const conjureData = hasConjureData
            ? series.map(s => (s.tick < conjurePerTick.length ? conjurePerTick[s.tick] : conjurePerTick[conjurePerTick.length - 1]) || 0)
            : [];

        const datasets = [
            // 2σ upper bound (fill down to 2σ lower)
            {
                label: '95% CI Upper',
                data: series.map(s => s.sigma2Upper),
                borderColor: 'transparent',
                backgroundColor: 'rgba(54, 162, 235, 0.08)',
                fill: '+4', // fill to 2σ lower dataset
                pointRadius: 0,
                tension: 0.3
            },
            // 1σ upper bound (fill down to 1σ lower)
            {
                label: '68% CI Upper',
                data: series.map(s => s.sigma1Upper),
                borderColor: 'transparent',
                backgroundColor: 'rgba(54, 162, 235, 0.15)',
                fill: '+2', // fill to 1σ lower dataset
                pointRadius: 0,
                tension: 0.3
            },
            // Mean line
            {
                label: 'Expected Damage',
                data: series.map(s => s.mean),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'transparent',
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                hitRadius: 10,
                tension: 0.3
            },
            // 1σ lower bound
            {
                label: '68% CI Lower',
                data: series.map(s => s.sigma1Lower),
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                fill: false,
                pointRadius: 0,
                tension: 0.3
            },
            // 2σ lower bound
            {
                label: '95% CI Lower',
                data: series.map(s => s.sigma2Lower),
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                fill: false,
                pointRadius: 0,
                tension: 0.3
            }
        ];

        // Add poison line if there is poison damage
        if (hasPoisonData) {
            datasets.push({
                label: 'Poison Damage',
                data: poisonData,
                borderColor: '#4CAF50',
                backgroundColor: 'transparent',
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                hitRadius: 10,
                tension: 0.3
            });
        }

        // Add familiar line if there is familiar damage
        if (hasFamiliarData) {
            datasets.push({
                label: 'Familiar Damage',
                data: familiarData,
                borderColor: '#00eeee',
                backgroundColor: 'transparent',
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                hitRadius: 10,
                tension: 0.3
            });
        }

        // Add dreadnip line if there is dreadnip damage
        if (hasDreadnipData) {
            datasets.push({
                label: 'Dreadnip Damage',
                data: dreadnipData,
                borderColor: '#ff8c00',
                backgroundColor: 'transparent',
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                hitRadius: 10,
                tension: 0.3
            });
        }

        // Add conjure line if there is conjure damage
        if (hasConjureData) {
            datasets.push({
                label: 'Conjure Damage',
                data: conjureData,
                borderColor: '#d694ff',
                backgroundColor: 'transparent',
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                hitRadius: 10,
                tension: 0.3
            });
        }

        // Build legend filter list dynamically
        const visibleLabels = ['Expected Damage', '68% CI Upper', '95% CI Upper'];
        if (hasPoisonData) visibleLabels.push('Poison Damage');
        if (hasFamiliarData) visibleLabels.push('Familiar Damage');
        if (hasDreadnipData) visibleLabels.push('Dreadnip Damage');
        if (hasConjureData) visibleLabels.push('Conjure Damage');

        timeSeriesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Cumulative Damage Over Time',
                        color: '#fff',
                        font: { size: 14 }
                    },
                    legend: {
                        labels: {
                            color: '#fff',
                            filter: (item) => visibleLabels.includes(item.text)
                        }
                    },
                    tooltip: {
                        callbacks: {
                            title: (ctx) => `Tick ${ctx[0].label}`,
                            label: (ctx) => {
                                if (ctx.dataset.label === 'Expected Damage') {
                                    return `Expected: ${formatDmg(ctx.parsed.y)}`;
                                }
                                if (ctx.dataset.label === 'Poison Damage') {
                                    return `Poison: ${formatDmg(ctx.parsed.y)}`;
                                }
                                if (ctx.dataset.label === 'Familiar Damage') {
                                    return `Familiar: ${formatDmg(ctx.parsed.y)}`;
                                }
                                if (ctx.dataset.label === 'Dreadnip Damage') {
                                    return `Dreadnip: ${formatDmg(ctx.parsed.y)}`;
                                }
                                if (ctx.dataset.label === 'Conjure Damage') {
                                    return `Conjure: ${formatDmg(ctx.parsed.y)}`;
                                }
                                // For CI bounds, show the range
                                const tick = ctx.dataIndex;
                                const s = series[tick];
                                if (ctx.dataset.label === '68% CI Upper') {
                                    return `68% CI: ${formatDmg(s.sigma1Lower)} – ${formatDmg(s.sigma1Upper)}`;
                                }
                                if (ctx.dataset.label === '95% CI Upper') {
                                    return `95% CI: ${formatDmg(s.sigma2Lower)} – ${formatDmg(s.sigma2Upper)}`;
                                }
                                return null;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Tick', color: '#fff' },
                        ticks: { color: '#fff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                        title: { display: true, text: 'Cumulative Damage', color: '#fff' },
                        ticks: {
                            color: '#fff',
                            callback: (value) => formatDmg(value)
                        },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }

    // Update charts when props change
    $: if (distributionStats && chartCanvas) {
        logger.log(LogCategory.ROTATION, 'DamageDistributionChart received distributionStats', distributionStats);
        updateChart();
    }
    $: if (distributionStats && timeSeriesCanvas) {
        // Depend on all per-tick arrays to re-render when they change
        poisonPerTick;
        familiarPerTick;
        dreadnipPerTick;
        conjurePerTick;
        updateTimeSeriesChart();
    }

    onMount(() => {
        updateChart();
        updateTimeSeriesChart();
    });

    onDestroy(() => {
        if (chart) chart.destroy();
        if (timeSeriesChart) timeSeriesChart.destroy();
    });
</script>

<div class="damage-chart-container">
    <button class="chart-header-btn" on:click={toggleCollapse}>
        <span class="chart-title">Damage Distribution</span>
        <svg
            class="collapse-icon-chart"
            class:rotated={!isCollapsed}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
        >
            <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
    </button>
    
    {#if !isCollapsed}
        <div class="chart-wrapper">
            <canvas bind:this={timeSeriesCanvas}></canvas>
        </div>
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
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid #444;
        border-radius: 6px;
        overflow: hidden;
        margin: 0.5rem 0;
    }

    .chart-header-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0.4rem 0.75rem;
        background: none;
        border: none;
        cursor: pointer;
        color: #fff;
    }

    .chart-header-btn:hover {
        background: rgba(255, 255, 255, 0.03);
    }

    .chart-title {
        font-size: 0.95rem;
        font-weight: 600;
    }

    .collapse-icon-chart {
        color: #888;
        transition: transform 0.2s ease;
    }

    .collapse-icon-chart.rotated {
        transform: rotate(180deg);
    }

    .chart-wrapper {
        position: relative;
        height: 400px;
        padding: 0 0.75rem;
        margin: 0 0 0.5rem;
    }
    
    .distribution-info {
        margin-top: 0.5rem;
        padding: 0.5rem 0.75rem;
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
        .chart-wrapper {
            height: 300px;
        }

        .info-grid {
            grid-template-columns: 1fr;
        }
    }
</style> 