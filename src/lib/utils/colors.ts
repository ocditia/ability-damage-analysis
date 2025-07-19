/**
 * Color constants for different styles in the application
 */
export const STYLE_COLORS = {
    // Combat styles
    ranged: '#00bf63',
    necro: '#d694ff',
    magic: '#94a3ff',
    melee: '#fe5c5c',
    
    // UI elements
    abilities: '#FF4DB8',
    gear: '#949494',
    
    // Default
    default: '#ffffff'
};

/**
 * Get the color for a specific style
 * @param style - The style name to get the color for
 * @returns The color hex code
 */
export function getStyleColor(style: string): string {
    return STYLE_COLORS[style] || STYLE_COLORS.default;
}

/**
 * Get the border color for a specific style
 * @param style - The style name to get the border color for
 * @returns The border color hex code
 */
export function getBorderColor(style: string): string {
    return getStyleColor(style);
}

/**
 * Get the background color for a specific style (with opacity)
 * @param style - The style name to get the background color for
 * @param opacity - Optional opacity value between 0 and 1 (default: 0.2)
 * @returns The background color with opacity
 */
export function getBackgroundColor(style: string, opacity: number = 0.2): string {
    const hex = getStyleColor(style);
    
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Get the text color for a specific style
 * @param style - The style name to get the text color for
 * @returns The text color hex code
 */
export function getTextColor(style: string): string {
    return getStyleColor(style);
}

/**
 * Get a CSS variable name for a specific style and property
 * @param style - The style name
 * @param property - The CSS property (e.g., 'border', 'background', 'text')
 * @returns The CSS variable name
 */
export function getCssVariable(style: string, property: string): string {
    return `var(--color-${style}-${property})`;
} 