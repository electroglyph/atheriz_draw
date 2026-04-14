import { Tool, ToolContext } from './Tool';
import { Point, Cell } from '../types';
import { getLinePoints } from '../utils/geometry';

export class EraserTool implements Tool {
    private erasedCells: Set<string> = new Set();
    
    private getEraserCell(): Cell {
        return {
            char: '',
            fg: [204, 204, 204], // default fg
            bg: [0, 0, 0]        // black bg
        };
    }

    onMouseDown(ctx: ToolContext, cell: Point): void {
        this.erasedCells.clear();
        ctx.undoStack.push(ctx.state);
        
        ctx.state.setCell(cell.x, cell.y, this.getEraserCell());
        this.erasedCells.add(`${cell.x},${cell.y}`);
    }

    onDrag(ctx: ToolContext, from: Point, to: Point): void {
        const points = getLinePoints(from, to);
        const cellData = this.getEraserCell();
        const updates: {col: number, row: number, cell: Cell}[] = [];
        
        for (const p of points) {
            const key = `${p.x},${p.y}`;
            if (!this.erasedCells.has(key)) {
                this.erasedCells.add(key);
                updates.push({ col: p.x, row: p.y, cell: cellData });
            }
        }
        
        if (updates.length > 0) {
            ctx.state.applyBatch(updates);
        }
    }

    onMouseUp(_ctx: ToolContext, _cell: Point): void {
        this.erasedCells.clear();
    }

    onHover(ctx: ToolContext, cell: Point): void {
        // Preview cell will be drawn black
        ctx.renderer.setPreview([{
            col: cell.x,
            row: cell.y,
            cell: this.getEraserCell()
        }]);
    }

    onMouseLeave(ctx: ToolContext): void {
        ctx.renderer.clearPreview();
    }
}
