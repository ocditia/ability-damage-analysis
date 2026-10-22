import type {PreviewAction, PreviewRow} from './rotationPreview';

export type ImageOptions = {
    showNames?: boolean; showSpecials?: boolean; showPhaseDamage?: boolean;
    phases?: {label: string; start: number; end: number; damage: number}[];
};
type DrawItem = {kind: 'text' | 'icon'; x: number; y: number; width: number; text?: string; font?: string; color?: string; key?: string; alpha?: number};
const font = '14px Arial';
const headingFont = 'bold 15px Arial';
export const imageKey = (item: PreviewAction) => item.icon || item.fallbackIcon;

/** Measure first, then render, so the PNG includes every wrapped line and phase. */
export function layoutRotationImage(rows: PreviewRow[], options: ImageOptions,
    measure: (text: string, font: string) => number, availableImages: Set<string>) {
    const width = 1100, padding = 20, lineHeight = 36, iconSize = 28;
    let x = padding, y = 66, hasPrevious = false;
    const items: DrawItem[] = [
        {kind: 'text', x: padding, y: 16, width: 0, text: 'Rotation', font: 'bold 20px Arial', color: '#e4e9ec'},
        {kind: 'text', x: padding, y: 42, width: 0, text: 's = stall   r = release   + = same tick', font: '12px Arial', color: '#a9bac5'},
    ];
    const newLine = () => {x = padding; y += lineHeight;};
    function textItem(text: string, itemFont = font, color = '#e4e9ec') {
        return {kind: 'text' as const, x: 0, y: 0, width: measure(text, itemFont), text, font: itemFont, color};
    }
    function heading(label: string, damage?: number) {
        if (x !== padding) newLine();
        const text = label + (options.showPhaseDamage && damage != null ? ` — ${Math.round(damage).toLocaleString('en-US')} damage` : '');
        // Wrap long user-supplied phase names instead of clipping them.
        let line = '';
        for (const word of text.split(/\s+/)) {
            const next = line ? line + ' ' + word : word;
            if (line && measure(next, headingFont) > width - padding * 2) {
                items.push({...textItem(line, headingFont, '#d9c88d'), x: padding, y});
                y += 22; line = word;
            } else line = next;
        }
        items.push({...textItem(line, headingFont, '#d9c88d'), x: padding, y});
        y += 25; hasPrevious = false;
    }
    let phaseIndex = 0;
    const phases = options.phases ?? [];
    for (const row of rows) {
        let headed = false;
        while (phaseIndex < phases.length && phases[phaseIndex].start <= row.tick) {
            const phase = phases[phaseIndex++];
            heading(phase.label, phase.damage); headed = true;
        }
        if (row.phase && !headed) heading(row.phase);
        row.actions.forEach((action, index) => {
            const tokens: DrawItem[] = [];
            if (index > 0) tokens.push(textItem('+', font, '#aebac1'));
            else if (hasPrevious) tokens.push(textItem('→', font, '#aebac1'));
            if (action.prefix) tokens.push(textItem(action.prefix, font, '#dfcd98'));
            for (const item of [...(action.ammo ? [action.ammo] : []), action, ...(options.showSpecials !== false && action.specialMarker ? [action.specialMarker] : [])]) {
                const key = imageKey(item);
                const hasImage = availableImages.has(key);
                if (hasImage) tokens.push({kind: 'icon', key, x: 0, y: 0, width: iconSize});
                if (options.showNames || !hasImage) {
                    // Words can wrap even when a label exceeds the image width.
                    for (const word of item.title.split(/\s+/)) tokens.push(textItem(word));
                }
            }
            if (options.showSpecials !== false && action.special && !action.specialMarker) tokens.push(textItem(action.special, '12px Arial', '#d6c79f'));
            if (row.nulled && index === row.actions.length - 1) tokens.push(textItem('(null)', '12px Arial'));
            const groupWidth = tokens.reduce((sum, token) => sum + token.width + 5, 0);
            if (x > padding && x + groupWidth > width - padding) newLine();
            for (const token of tokens) {
                if (x > padding && x + token.width > width - padding) newLine();
                items.push({...token, x, y: y + (token.kind === 'icon' ? 0 : 7), alpha: row.nulled ? .6 : 1});
                x += token.width + 5;
            }
            x += 3;
        });
        if (row.actions.length) hasPrevious = true;
    }
    while (phaseIndex < phases.length) {
        const phase = phases[phaseIndex++]; heading(phase.label, phase.damage);
    }
    return {width, height: Math.ceil(y + lineHeight + padding), items};
}

export function paintRotationImage(ctx: any, layout: ReturnType<typeof layoutRotationImage>, images: Map<string, any>) {
    ctx.fillStyle = '#10171b';
    ctx.fillRect(0, 0, layout.width, layout.height);
    ctx.textBaseline = 'top';
    for (const item of layout.items) {
        ctx.globalAlpha = item.alpha ?? 1;
        if (item.kind === 'icon') {
            const image = images.get(item.key!);
            const ratio = Math.min(28 / (image.naturalWidth || image.width), 28 / (image.naturalHeight || image.height));
            const w = (image.naturalWidth || image.width) * ratio, h = (image.naturalHeight || image.height) * ratio;
            ctx.drawImage(image, item.x + (28-w)/2, item.y + (28-h)/2, w, h);
        } else {
            ctx.font = item.font; ctx.fillStyle = item.color;
            ctx.fillText(item.text, item.x, item.y);
        }
    }
    ctx.globalAlpha = 1;
}

function loadIcon(url: string): Promise<HTMLImageElement | null> {
    return new Promise(resolve => {
        if (!url) {resolve(null); return;}
        const image = new Image();
        image.crossOrigin = 'anonymous';
        const timer = setTimeout(() => {image.src = ''; resolve(null);}, 8000);
        image.onload = () => {clearTimeout(timer); resolve(image);};
        image.onerror = () => {clearTimeout(timer); resolve(null);};
        image.src = url;
    });
}

export async function exportRotationImage(rows: PreviewRow[], options: ImageOptions): Promise<Blob> {
    const unique = new Map<string, PreviewAction>();
    for (const row of rows) for (const action of row.actions) {
        for (const item of [...(action.ammo ? [action.ammo] : []), action, ...(options.showSpecials !== false && action.specialMarker ? [action.specialMarker] : [])]) unique.set(imageKey(item), item);
    }
    const images = new Map<string, HTMLImageElement>();
    const pending = [...unique.entries()];
    await Promise.all(Array.from({length: Math.min(8, pending.length)}, async () => {
        while (pending.length) {
            const [key, item] = pending.pop()!;
            const image = await loadIcon(item.icon) ?? (item.fallbackIcon !== item.icon ? await loadIcon(item.fallbackIcon) : null);
            if (image) images.set(key, image);
        }
    }));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Image export is not supported by this browser.');
    const layout = layoutRotationImage(rows, options, (text, font) => {
        ctx.font = font; return ctx.measureText(text).width;
    }, new Set(images.keys()));
    // Keep long rotations within browser canvas limits while retaining every row.
    const scale = Math.min(2, 16000/layout.height, Math.sqrt(32000000/(layout.width*layout.height)));
    canvas.width = Math.ceil(layout.width*scale); canvas.height = Math.ceil(layout.height*scale);
    ctx.scale(scale, scale);
    paintRotationImage(ctx, layout, images);
    return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Could not create the PNG.')), 'image/png'));
}
