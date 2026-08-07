import { describe, it, expect } from 'vitest';
import { RotateTool } from '../src/tools/RotateTool';
import { CanvasState } from '../src/state/CanvasState';
import { UndoStack } from '../src/state/UndoStack';
import { ToolContext } from '../src/tools/Tool';
import { AppState } from '../src/types';

function makeState() {
  const state = new CanvasState(6, 6);
  // 2-cell-wide selection on the background layer
  state.setCell(0, 0, { char: 'x', fg: [255, 255, 255], bg: [0, 0, 0] });
  state.setCell(1, 0, { char: 'x', fg: [255, 255, 255], bg: [0, 0, 0] });
  return state;
}

function makeCtx(state: CanvasState) {
  let selection = new Set(['0,0', '1,0']);
  const renderer = {
    getSelectedCells: () => selection,
    setSelection: (s: Set<string>) => {
      selection = s;
    },
    clearSelection: () => {
      selection = new Set();
    },
    setPreview: () => {},
    clearPreview: () => {},
  };
  const appState: AppState = {
    activeToolId: 'rotate',
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
  const ctx: ToolContext = {
    state,
    undoStack: new UndoStack(),
    renderer,
    appState,
    modifiers: { shiftKey: false, altKey: false, ctrlKey: false },
  };
  return ctx;
}

function nonEmptyCells(state: CanvasState): string[] {
  const keys: string[] = [];
  const layer = state.getActiveLayer();
  for (let r = 0; r < state.height; r++) {
    for (let c = 0; c < state.width; c++) {
      const cell = layer.cells[r][c];
      if (cell.char && cell.char.trim() !== '') {
        keys.push(`${c},${r}`);
      }
    }
  }
  return keys.sort();
}

describe('RotateTool even-size selection (issue 20)', () => {
  it('returns cells to their original positions after four 90° rotations', () => {
    const state = makeState();
    const ctx = makeCtx(state);
    const tool = new RotateTool();

    const original = nonEmptyCells(state);

    for (let i = 0; i < 4; i++) {
      tool.applyTransform(ctx, 'cw90');
    }

    // Proper behavior: 4x90° == 360°; the even-width selection must land back
    // exactly where it started. Rounding around a half-cell center causes drift.
    expect(nonEmptyCells(state)).toEqual(original);
  });
});