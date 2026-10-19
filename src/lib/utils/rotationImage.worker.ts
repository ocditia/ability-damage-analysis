// Local-only image matching, off the UI thread. No OCR service or screenshot upload.
function runs(values: number[], minimum: number, gap = 2) {
    const result: number[][] = [];
    let start = -1,
        last = -1;
    values.forEach((v, i) => {
        if (v >= minimum) {
            if (start < 0) start = i;
            last = i;
        } else if (start >= 0 && i - last > gap) {
            result.push([start, last]);
            start = -1;
        }
    });
    if (start >= 0) result.push([start, last]);
    return result;
}
const SIZE = 12;
function cropPixels(
    ctx: OffscreenCanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
) {
    const c = new OffscreenCanvas(SIZE, SIZE),
        out = c.getContext('2d')!;
    out.drawImage(ctx.canvas, x, y, w, h, 0, 0, SIZE, SIZE);
    return out.getImageData(0, 0, SIZE, SIZE).data;
}
function distance(p: Uint8ClampedArray, t: number[]) {
    let error = 0,
        weight = 0;
    for (let i = 0; i < p.length; i += 4) {
        const a = t[i + 3] / 255;
        if (a < 0.25) continue;
        const saturation = Math.max(t[i], t[i + 1], t[i + 2]) - Math.min(t[i], t[i + 1], t[i + 2]);
        const k = a * (saturation > 30 ? 2 : 1);
        weight += k * 3;
        for (let j = 0; j < 3; j++) error += Math.abs(p[i + j] - t[i + j]) * k;
    }
    return weight ? error / (weight * 255) : 1;
}
// A small glyph classifier handles s/r prefixes (including superscripts). Other
// glyphs compete so arrows and plus signs are not silently interpreted as stalls.
function prefix(ctx: OffscreenCanvasRenderingContext2D, x: number, y: number, h: number) {
    const left = Math.max(0, x - 17),
        width = x - left;
    if (width < 3) return '';
    const data = ctx.getImageData(left, y, width, h).data;
    const cols = Array(width).fill(0),
        rows = Array(h).fill(0);
    for (let yy = 0; yy < h; yy++)
        for (let xx = 0; xx < width; xx++) {
            let i = (yy * width + xx) * 4;
            const max = Math.max(data[i], data[i + 1], data[i + 2]),
                min = Math.min(data[i], data[i + 1], data[i + 2]);
            if (min > 120 && max - min < 35) {
                cols[xx]++;
                rows[yy]++;
            }
        }
    const spans = runs(cols, 1, 0);
    if (!spans.length) return '';
    const [a, b] = spans[spans.length - 1],
        ys = runs(rows, 1, 0);
    // Ignore a clipped arrow head or a distant separator, not a complete prefix.
    if (a === 0 || x - (left + b) > 8 || !ys.length || b - a > 13) return '';
    const top = ys[0][0],
        bottom = ys[ys.length - 1][1];
    if (bottom - top > 17) return '';
    const source = cropPixels(ctx, left + a, y + top, b - a + 1, bottom - top + 1);
    let best = '',
        error = Infinity;
    for (const glyph of ['s', 'r', '+', '\u2192', '!', '1'])
        for (const font of ['Arial', 'serif']) {
            const c = new OffscreenCanvas(24, 24),
                g = c.getContext('2d')!;
            g.fillStyle = 'white';
            g.font = `16px ${font}`;
            g.fillText(glyph, 1, 18);
            const pixels = g.getImageData(0, 0, 24, 24).data;
            let x0 = 24,
                y0 = 24,
                x1 = 0,
                y1 = 0;
            for (let yy = 0; yy < 24; yy++)
                for (let xx = 0; xx < 24; xx++)
                    if (pixels[(yy * 24 + xx) * 4 + 3] > 80) {
                        x0 = Math.min(x0, xx);
                        x1 = Math.max(x1, xx);
                        y0 = Math.min(y0, yy);
                        y1 = Math.max(y1, yy);
                    }
            const target = cropPixels(g, x0, y0, x1 - x0 + 1, y1 - y0 + 1);
            let e = 0;
            for (let i = 0; i < source.length; i += 4)
                e += Math.abs((source[i] > 120 ? 1 : 0) - target[i + 3] / 255);
            e /= SIZE * SIZE;
            if (e < error) {
                error = e;
                best = glyph;
            }
        }
    return error < 0.32 ? best : '';
}
self.onmessage = async ({ data: { bitmap, templates } }) => {
    try {
        const c = new OffscreenCanvas(bitmap.width, bitmap.height),
            ctx = c.getContext('2d', { willReadFrequently: true })!;
        ctx.drawImage(bitmap, 0, 0);
        bitmap.close();
        const { width, height } = c,
            rgba = ctx.getImageData(0, 0, width, height).data;
        const colourful = (x: number, y: number) => {
            const i = (y * width + x) * 4;
            return (
                rgba[i + 3] > 100 &&
                Math.max(rgba[i], rgba[i + 1], rgba[i + 2]) -
                    Math.min(rgba[i], rgba[i + 1], rgba[i + 2]) >
                    38
            );
        };
        const rowCounts = Array.from({ length: height }, (_, y) => {
            let n = 0;
            for (let x = 0; x < width; x++) if (colourful(x, y)) n++;
            return n;
        });
        const matches: any[] = [];
        for (const [top, bottom] of runs(rowCounts, 3, 3)) {
            const h = bottom - top + 1;
            if (h < 10 || h > 100) continue;
            const cols = Array.from({ length: width }, (_, x) => {
                let n = 0;
                for (let y = top; y <= bottom; y++) if (colourful(x, y)) n++;
                return n;
            });
            const spans = runs(cols, 1, 2);
            const merged: number[][] = [];
            for (const span of spans) {
                const prev = merged[merged.length - 1];
                if (prev && span[1] - prev[0] < h * 1.1 && span[0] - prev[1] < h * 0.35)
                    prev[1] = span[1];
                else merged.push([...span]);
            }
            for (const [left, right] of merged) {
                const w = right - left + 1;
                if (w < 5 || w > h * 1.9) continue;
                // Try the detected bounds and a full icon square to accommodate transparent weapons.
                let best: any = null;
                for (const box of [
                    [left, top, w, h],
                    [Math.max(0, Math.round((left + right - h) / 2)), top, h, h]
                ]) {
                    const pixels = cropPixels(ctx, box[0], box[1], box[2], box[3]);
                    for (const t of templates) {
                        const score = distance(pixels, t.pixels);
                        if (!best || score < best.score) best = { key: t.key, score, box };
                    }
                }
                const crop = new OffscreenCanvas(Math.max(w, h), h),
                    g = crop.getContext('2d')!;
                g.drawImage(c, left, top, w, h, 0, 0, w, h);
                const blob = await crop.convertToBlob();
                matches.push({
                    key: best?.score < 0.32 ? best.key : '',
                    score: best?.score,
                    x: left,
                    y: top,
                    width: w,
                    height: h,
                    prefix: prefix(ctx, left, top, h),
                    crop: blob
                });
            }
        }
        self.postMessage({ matches });
    } catch (e) {
        self.postMessage({ error: String(e) });
    }
};
