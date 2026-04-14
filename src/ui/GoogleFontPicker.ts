import { GOOGLE_FONTS, GOOGLE_FONT_CATEGORIES, GoogleFontCategory } from '../data/googleFonts';
import { loadFontPreview, preloadManifest } from '../utils/googleFontLoader';

const PAGE_SIZE = 40;

const CATEGORY_TABS: { label: string; category: GoogleFontCategory | 'all' }[] = [
    { label: 'All', category: 'all' },
    ...GOOGLE_FONT_CATEGORIES.map(c => ({ label: c, category: c as GoogleFontCategory })),
];

export class GoogleFontPicker {
    private modal: HTMLElement;
    private searchInput: HTMLInputElement;
    private listContainer: HTMLElement;
    private tabContainer: HTMLElement;
    private btnCancel: HTMLButtonElement;
    private onSelect: (family: string) => void;

    private activeCategory: GoogleFontCategory | 'all' = 'all';
    private searchQuery = '';
    private filteredFonts: { family: string; category: string }[] = [];
    private renderedCount = 0;
    private observer: IntersectionObserver;
    private sentinel: HTMLElement;

    constructor(onSelect: (family: string) => void) {
        this.onSelect = onSelect;

        this.modal = document.getElementById('google-font-picker-modal')!;
        this.searchInput = document.getElementById('gfp-search') as HTMLInputElement;
        this.listContainer = document.getElementById('gfp-list')!;
        this.tabContainer = document.getElementById('gfp-tabs')!;
        this.btnCancel = document.getElementById('gfp-cancel') as HTMLButtonElement;
        this.sentinel = document.getElementById('gfp-sentinel')!;

        this.buildTabs();
        this.bindEvents();

        this.observer = new IntersectionObserver((entries) => {
            if (entries.some(e => e.isIntersecting)) {
                this.renderMore();
            }
        }, { root: this.listContainer, rootMargin: '200px' });
    }

    private buildTabs() {
        this.tabContainer.innerHTML = '';
        for (const tab of CATEGORY_TABS) {
            const btn = document.createElement('button');
            btn.textContent = tab.label;
            btn.className = 'gfp-tab' + (tab.category === this.activeCategory ? ' active' : '');
            btn.addEventListener('click', () => {
                this.activeCategory = tab.category;
                this.updateActiveTab();
                this.applyFilter();
            });
            this.tabContainer.appendChild(btn);
        }
    }

    private updateActiveTab() {
        const btns = this.tabContainer.querySelectorAll('.gfp-tab');
        btns.forEach((btn, i) => {
            btn.classList.toggle('active', CATEGORY_TABS[i].category === this.activeCategory);
        });
    }

    private bindEvents() {
        this.btnCancel.addEventListener('click', () => this.close());

        let debounce: ReturnType<typeof setTimeout> | null = null;
        this.searchInput.addEventListener('input', () => {
            if (debounce) clearTimeout(debounce);
            debounce = setTimeout(() => {
                this.searchQuery = this.searchInput.value.toLowerCase().trim();
                this.applyFilter();
            }, 150);
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.close();
            }
        });
    }

    private applyFilter() {
        this.filteredFonts = GOOGLE_FONTS.filter(f => {
            if (this.activeCategory !== 'all' && f.category !== this.activeCategory) return false;
            if (this.searchQuery && !f.family.toLowerCase().includes(this.searchQuery)) return false;
            return true;
        });
        this.renderedList();
    }

    private renderedList() {
        this.listContainer.innerHTML = '';
        this.renderedCount = 0;

        this.sentinel = document.createElement('div');
        this.sentinel.id = 'gfp-sentinel';
        this.listContainer.appendChild(this.sentinel);

        this.observer.disconnect();
        this.observer.observe(this.sentinel);

        this.renderMore();
    }

    private renderMore() {
        const start = this.renderedCount;
        const end = Math.min(start + PAGE_SIZE, this.filteredFonts.length);

        const fragment = document.createDocumentFragment();
        for (let i = start; i < end; i++) {
            const f = this.filteredFonts[i];
            const item = document.createElement('div');
            item.className = 'gfp-item';
            item.textContent = f.family;
            item.style.fontFamily = `"${f.family}", sans-serif`;
            item.addEventListener('click', () => {
                this.onSelect(f.family);
                this.close();
            });
            loadFontPreview(f.family);
            fragment.appendChild(item);
        }

        this.listContainer.insertBefore(fragment, this.sentinel);
        this.renderedCount = end;
    }

    public open() {
        preloadManifest();
        this.searchInput.value = '';
        this.searchQuery = '';
        this.activeCategory = 'all';
        this.updateActiveTab();
        this.applyFilter();
        this.modal.classList.remove('hidden');
        this.searchInput.focus();
    }

    public close() {
        this.modal.classList.add('hidden');
    }
}
