export class SidebarResizer {
    private sidebar: HTMLElement;
    private resizer: HTMLElement;
    private isResizing: boolean = false;
    private startX: number = 0;
    private startWidth: number = 0;
    private inverted: boolean;

    constructor(sidebarId: string, resizerId: string, inverted: boolean = false) {
        this.sidebar = document.getElementById(sidebarId)!;
        this.resizer = document.getElementById(resizerId)!;
        this.inverted = inverted;

        this.init();
    }

    private init() {
        this.resizer.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    private onMouseDown(e: MouseEvent) {
        this.isResizing = true;
        this.startX = e.clientX;
        this.startWidth = this.sidebar.getBoundingClientRect().width;
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none'; // Prevent text selection during resize
    }

    private onMouseMove(e: MouseEvent) {
        if (!this.isResizing) return;
        // Inverted: dragging left makes right panel wider
        const dx = this.inverted ? this.startX - e.clientX : e.clientX - this.startX;
        const newWidth = Math.max(150, Math.min(800, this.startWidth + dx));
        this.sidebar.style.width = `${newWidth}px`;
    }

    private onMouseUp() {
        if (this.isResizing) {
            this.isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    }
}
