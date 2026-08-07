import { describe, it, expect } from 'vitest';
import { MoveTool } from '../src/tools/MoveTool';
import { CanvasState } from '../src/state/CanvasState';
import { UndoStack } from '../src/state/UndoStack';
import { ToolContext } from '../src/tools/Tool';
import { AppState } from '../src/types';
import { GridRenderer } from '../src/canvas/GridRenderer';

function makeAppState(): AppState {
  return {
    activeToolId: 'move',
    rectMode: 'light',
    ovalMode: 'light',
    lineMode: 'light',
    gradientTarget: 'foreground',
    typeStyle: 'regular',
    selectedChar: 'x',
    fgColor: [255, 255, 255],
    bgColor: [0, 0, 0],
    fontFamily: 'monospace',
    gradientStops: [],
    selectMode: 'single',
    rotateMode: 'cw90',
    fillMode: 'brush',
    lineDiagonal: false,
    eyedropperTarget: 'fg-fg',
  };
}

describe('MoveTool operates on the correct layer', () => {
  it('moves composite-visible content regardless of the active layer', () => {
    const state = new CanvasState(5, 5);
    // Content lives on the background layer (index 0).
    state.setCell(1, 1, { char: 'A', fg: [255, 255, 255], bg: [0, 0, 0] });

    // A different (upper) layer is active; it contains no content.
    state.addLayer('foreground'); // becomes active layer 1

    // Selection built from the composite view points at (1,1).
    let selection = new Set(['1,1']);
    const renderer = {
      getSelectedCells: () => selection,
      setSelection: (s: Set<string>) => { selection = s; },
      clearSelection: () => { selection = new Set(); },
      setPreview: () => {},
      clearPreview: () => {},
    } as unknown as GridRenderer;

    const ctx: ToolContext = {
      state,
      undoStack: new UndoStack(),
      renderer,
      appState: makeAppState(),
      modifiers: { shiftKey: false, altKey: false, ctrlKey: false },
    };

    const tool = new MoveTool();
    tool.onMouseDown(ctx, { x: 1, y: 1 });
    tool.onMouseUp(ctx, { x: 2, y: 1 });

    // Proper behavior: the visible 'A' should now be at (2,1) on the composite.
    const comp = state.getCompositeCell(2, 1)!;
    expect(comp.char).toBe('A');
  });
});