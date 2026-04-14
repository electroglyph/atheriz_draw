import { Point } from '../types';
import { CellMetrics } from '../utils/fontMetrics';
import { ToolManager } from '../tools/ToolManager';

export class CanvasController {
    private canvas: HTMLCanvasElement;
    private metrics: CellMetrics;
    private toolManager: ToolManager;
    private isDragging: boolean = false;
    private lastCell: Point | null = null;

    constructor(canvas: HTMLCanvasElement, metrics: CellMetrics, toolManager: ToolManager) {
        this.canvas = canvas;
        this.metrics = metrics;
        this.toolManager = toolManager;

        // Prevent context menu
        this.canvas.addEventListener('contextmenu', e => e.preventDefault());

        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    public updateMetrics(metrics: CellMetrics) {
        this.metrics = metrics;
    }

    private getCellCoord(e: MouseEvent): Point {
        const rect = this.canvas.getBoundingClientRect();
        // Calculate coordinate ignoring scroll (boundingClient is relative to viewport)
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        return {
            x: Math.floor(x / this.metrics.width),
            y: Math.floor(y / this.metrics.height)
        };
    }

    private onMouseDown(e: MouseEvent) {
        if (e.button !== 0) return; // Only left click for now
        this.isDragging = true;
        const cell = this.getCellCoord(e);
        this.lastCell = cell;
        
        this.toolManager.onMouseDown(cell);
    }

    private onMouseMove(e: MouseEvent) {
        // Need to pass keyboard modifiers during tracking sometimes
        this.toolManager.updateModifiers(e.shiftKey, e.altKey, e.ctrlKey);

        const rect = this.canvas.getBoundingClientRect();
        
        // Check if mouse is hovering canvas at all to conditionally trigger un-hover
        if (e.clientX < rect.left || e.clientX > rect.right || 
            e.clientY < rect.top || e.clientY > rect.bottom) {
            if (!this.isDragging) {
                this.toolManager.onMouseLeave();
                return;
            }
        }

        const cell = this.getCellCoord(e);

        if (this.isDragging) {
            if (this.lastCell && (this.lastCell.x !== cell.x || this.lastCell.y !== cell.y)) {
                this.toolManager.onDrag(this.lastCell, cell);
                this.lastCell = cell;
            }
        } else {
            if (!this.lastCell || this.lastCell.x !== cell.x || this.lastCell.y !== cell.y) {
                this.toolManager.onHover(cell);
                this.lastCell = cell;
            }
        }
    }

    private onMouseUp(e: MouseEvent) {
        if (e.button !== 0 || !this.isDragging) return;
        this.isDragging = false;
        const cell = this.getCellCoord(e);
        this.lastCell = null;
        
        this.toolManager.onMouseUp(cell);
        
        const rect = this.canvas.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && 
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            this.toolManager.onHover(cell);
        }
    }

    private onKeyDown(e: KeyboardEvent) {
        if (e.target instanceof HTMLInputElement || 
            e.target instanceof HTMLSelectElement || 
            e.target instanceof HTMLTextAreaElement) return;

        let keyToPass: string | null = null;
        
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === 'Delete') {
            keyToPass = e.key;
        } else if (e.ctrlKey && !e.shiftKey) {
            const k = e.key.toLowerCase();
            if (k === 'c' || k === 'v') {
                keyToPass = `ctrl+${k}`;
            }
        }

        if (keyToPass && this.toolManager.onKeyDown(keyToPass)) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}
