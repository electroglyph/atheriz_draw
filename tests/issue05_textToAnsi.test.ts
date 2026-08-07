// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderTextToAnsiLayer } from '../src/utils/TextToANSI';
import { CanvasState } from '../src/state/CanvasState';
import { CellMetrics } from '../src/utils/fontMetrics';

function makeSourceCanvas(fontLog: string[]) {
  const ctx: any = {
    font: '',
    measureText: () => ({ width: 50, actualBoundingBoxAscent: 40, actualBoundingBoxDescent: 12 }),
    // All-zero pixels => scan finds no content and returns early (before chafa).
    getImageData: () => ({ data: new Uint8ClampedArray(100 * 100 * 4) }),
    fillStyle: '',
    fillRect: () => {},
  };
  Object.defineProperty(ctx, 'font', {
    get: () => fontLog[0] ?? '',
    set: (v: string) => {
      fontLog.splice(0, 1, v);
    },
  });
  return {
    width: 100,
    height: 100,
    getContext: () => ctx,
  };
}

describe('TextToANSI font string (issue 5)', () => {
  it('sets a valid ctx.font that is not the mangled "96px 18px ..." form', async () => {
    const fontLog: string[] = [];
    const sourceCanvas: any = makeSourceCanvas(fontLog);
    const state = new CanvasState(20, 20);

    const cellMetrics: CellMetrics = {
      width: 9,
      height: 18,
      baselineY: 14,
      font: '18px "Unifont"',
    };

    await renderTextToAnsiLayer(
      'hi',
      10,
      state,
      {} as any,
      sourceCanvas,
      cellMetrics,
    );

    const requested = fontLog[0] ?? '';
    // The proper font is a generic size + the family name (not "96px 18px Unifont").
    expect(requested).not.toMatch(/^96px "18px /);
    expect(requested).toMatch(/Unifont/);
  });
});