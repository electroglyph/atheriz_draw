// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { measureCellMetrics } from '../src/utils/fontMetrics';
import { fontNameToCSS } from '../src/utils/googleFontLoader';

const BACKGROUND_CSS =
  'Most monospace fonts have a ~0.6 width to height ratio';

function mockCanvasCtx() {
  const fonts: string[] = [];
  const ctx: any = {
    font: '',
    measureText: () => ({ width: 10 }),
  };

  // Capture every ctx.font assignment so we can inspect what was requested.
  Object.defineProperty(ctx, 'font', {
    get: () => fonts.join('\n'),
    set: (v: string) => fonts.push(v),
  });

  const createElement = document.createElement.bind(document);
  vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
    const el = createElement(tag);
    if (tag === 'canvas') {
      Object.defineProperty(el, 'getContext', {
        value: () => ctx,
      });
    }
    return el;
  });

  return { ctx, fonts };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('measureCellMetrics builds a valid ctx.font string', () => {
  it('does not double-quote or mangle a multi-family value', () => {
    const { fonts } = mockCanvasCtx();

    // appState.fontFamily can already be a CSS list: `'Fira Code', 'FiraCode'`
    const metrics = measureCellMetrics("'Fira Code', 'FiraCode'", 18);

    // The requested font must remain a valid CSS font-family list. The buggy
    // code wraps the whole value again -> "18px "'Fira Code', 'FiraCode'"",
    // which is invalid CSS and silently ignored by the canvas.
    expect(metrics.font).toBe("18px 'Fira Code', 'FiraCode'");

    const requested = fonts[fonts.length - 1];
    expect(requested).not.toMatch(/""/);
    expect(requested).not.toContain('""');
  });

  it('does not double-quote an already-quoted family name', () => {
    const { fonts } = mockCanvasCtx();
    measureCellMetrics('"Arial"', 18);
    const requested = fonts[fonts.length - 1] ?? '';
    expect(requested).not.toMatch(/""/);
    expect(requested).toBe('18px "Arial"');
  });

  it('returns metrics whose font uses the exact fontSize requested', () => {
    mockCanvasCtx();
    const metrics = measureCellMetrics('monospace', 22);
    expect(metrics.font).toMatch(/^22px /);
  });
});

describe('fontNameToCSS', () => {
  it('does not double-quote a family list', () => {
    // A pre-quoted family list must flow through exactly as-is so that
    // document.fonts.load receives a valid value.
    expect(fontNameToCSS("'Fira Code', 'FiraCode'")).toBe("'Fira Code', 'FiraCode'");
  });

  it('quotes a single bare family name that contains a space', () => {
    expect(fontNameToCSS('Fira Code')).toBe('"Fira Code"');
  });
});

// keep the lint comment reference used by metrics.height logic
void BACKGROUND_CSS;