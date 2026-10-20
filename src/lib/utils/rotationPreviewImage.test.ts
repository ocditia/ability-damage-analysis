import {it, expect} from 'vitest';
import {layoutRotationImage} from './rotationPreviewImage';
import type {PreviewAction, PreviewRow} from './rotationPreview';

const action: PreviewAction = {title: 'Greater Ricochet', icon: '/grico.png', fallbackIcon: '', discord: '', prefix: 'r', label: '', special: 'eofspec',
    ammo: {title: 'Wen arrows', icon: '/wen.png', fallbackIcon: '', discord: '', prefix: '', label: ''}};
const measure = (text: string) => text.length * 8;
const images = new Set(['/grico.png', '/wen.png']);
const rows: PreviewRow[] = [{tick: 0, phase: 'Phase 1', nulled: false, actions: [action]}, {tick: 3, phase: 'Phase 2', nulled: false, actions: [action]}];
const phases = [{label: 'Phase 1', start: 0, end: 2, damage: 123456}, {label: 'Phase 2', start: 3, end: 5, damage: 7890}];
it('exports phase totals only when requested and preserves ammo, release and spec annotations', () => {
    const withDamage = layoutRotationImage(rows, {phases, showPhaseDamage: true}, measure, images);
    expect(withDamage.items.some(item => item.text === 'Phase 1 — 123,456 damage')).toBe(true);
    expect(withDamage.items.filter(item => item.kind === 'icon').map(item => item.key)).toEqual(['/wen.png', '/grico.png', '/wen.png', '/grico.png']);
    expect(withDamage.items.filter(item => item.text === 'r')).toHaveLength(2);
    expect(withDamage.items.filter(item => item.text === 'eofspec')).toHaveLength(2);
    const withoutDamage = layoutRotationImage(rows, {phases, showSpecials: false}, measure, images);
    expect(withoutDamage.items.some(item => item.text?.includes('damage'))).toBe(false);
    expect(withoutDamage.items.some(item => item.text === 'eofspec')).toBe(false);
});
it('wraps a long rotation into a full-height image without dropping actions', () => {
    const long = Array.from({length: 300}, (_, tick) => ({tick, nulled: false, actions: [action, action]}));
    const layout = layoutRotationImage(long, {}, measure, images);
    expect(layout.items.filter(item => item.kind === 'icon')).toHaveLength(1200);
    expect(layout.height).toBeGreaterThan(1000);
    expect(layout.items.every(item => item.y + 28 < layout.height && item.x + item.width <= layout.width - 20)).toBe(true);
});
it('uses readable names if images cannot load', () => {
    const layout = layoutRotationImage(rows, {}, measure, new Set());
    expect(layout.items.filter(item => item.kind === 'icon')).toHaveLength(0);
    expect(layout.items.some(item => item.text === 'Ricochet')).toBe(true);
    expect(layout.items.some(item => item.text === 'Wen')).toBe(true);
});

it('renders special markers as icons and omits them when toggled off', () => {
    const marker = {...action, title: 'Essence of Finality', icon: '/eof.png', ammo: undefined, special: undefined};
    const markedRows = [{...rows[0], actions: [{...action, specialMarker: marker}]}];
    const available = new Set([...images, '/eof.png']);
    const shown = layoutRotationImage(markedRows, {}, measure, available);
    expect(shown.items.filter(item => item.kind === 'icon').map(item => item.key)).toEqual(['/wen.png', '/grico.png', '/eof.png']);
    expect(shown.items.some(item => item.text === 'eofspec')).toBe(false);
    const hidden = layoutRotationImage(markedRows, {showSpecials: false}, measure, available);
    expect(hidden.items.some(item => item.key === '/eof.png')).toBe(false);
});

it('prints the Snipe timing prefix before its image', () => {
    const snipe = {...action, title:'Snipe', prefix:'4t', ammo:undefined, special:undefined};
    const layout = layoutRotationImage([{tick:4,nulled:false,actions:[snipe]}], {}, measure, images);
    const prefix = layout.items.findIndex(item => item.text === '4t');
    expect(prefix).toBeGreaterThan(-1);
    expect(layout.items[prefix + 1].key).toBe(snipe.icon);
});
