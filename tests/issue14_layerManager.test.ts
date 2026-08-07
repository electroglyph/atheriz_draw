// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { LayerManager } from '../src/ui/LayerManager';
import { CanvasState } from '../src/state/CanvasState';
import { UndoStack } from '../src/state/UndoStack';

describe('LayerManager.updateState listener hygiene (issue 14)', () => {
  it('does not stack onChange listeners across updateState calls', () => {
    const container = document.createElement('div');
    container.id = 'layers';
    document.body.appendChild(container);

    const state = new CanvasState(3, 3);
    const manager = new LayerManager('layers', state, new UndoStack());

    // Spy on the underlying state to count how many listeners are attached.
    const onChangeSpy = vi.spyOn(state, 'onChange');

    manager.updateState(state);
    manager.updateState(state);

    // Proper behavior: re-pointing to the same state must not add another
    // listener (or must detach the previous one).
    const attached = onChangeSpy.mock.calls.length;
    expect(attached).toBeLessThanOrEqual(1);
  });

  it('renders exactly once when a re-pointed state notifies', () => {
    const container = document.createElement('div');
    container.id = 'layers';
    document.body.appendChild(container);

    const state = new CanvasState(3, 3);
    const manager = new LayerManager('layers', state, new UndoStack());

    let renderCalls = 0;
    const originalRender = (manager as any).render.bind(manager);
    (manager as any).render = () => {
      renderCalls++;
      originalRender();
    };

    manager.updateState(state);

    renderCalls = 0; // ignore renders from setup
    state.addLayer(); // triggers notify()

    // With stacked listeners, a single notify fires render() multiple times.
    expect(renderCalls).toBe(1);
  });
});