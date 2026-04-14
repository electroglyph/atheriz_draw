export class GlyphScanner {
    private static cache: Map<string, number[]> = new Map();

    static async scanFont(fontFamily: string, onProgress: (pct: number) => void): Promise<number[]> {
        if (this.cache.has(fontFamily)) {
            return this.cache.get(fontFamily)!;
        }

        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        if (!ctx) return [];

        ctx.font = `16px ${fontFamily}`;
        ctx.textBaseline = 'middle';

        // Find reference "missing glyph" metrics
        const refChar = String.fromCodePoint(0xFFFF); 
        const refM = ctx.measureText(refChar);

        const validGlyphs: number[] = [];
        const MAX_UNICODE = 0x10FFFF;
        const CHUNK_SIZE = 25000; 

        let cp = 0x20;

        return new Promise((resolve) => {
            const processChunk = () => {
                const end = Math.min(cp + CHUNK_SIZE, MAX_UNICODE);
                for (; cp < end; cp++) {
                    if (cp >= 0xD800 && cp <= 0xDFFF) continue; // Skip surrogates

                    const char = String.fromCodePoint(cp);
                    const m = ctx.measureText(char);

                    // A completely blank/zero-width character might be a space, or might be missing.
                    // Usually we keep spaces (0x20, etc).
                    if (m.width === 0 && cp !== 0x20 && cp !== 0xA0) {
                        continue;
                    }

                    const isSameAsMissing = 
                        m.width === refM.width &&
                        m.actualBoundingBoxAscent === refM.actualBoundingBoxAscent &&
                        m.actualBoundingBoxDescent === refM.actualBoundingBoxDescent &&
                        m.actualBoundingBoxLeft === refM.actualBoundingBoxLeft &&
                        m.actualBoundingBoxRight === refM.actualBoundingBoxRight;

                    if (!isSameAsMissing) {
                        validGlyphs.push(cp);
                    }
                }

                if (cp >= MAX_UNICODE) {
                    this.cache.set(fontFamily, validGlyphs);
                    resolve(validGlyphs);
                } else {
                    onProgress(Math.floor((cp / MAX_UNICODE) * 100));
                    // Yield to browser UI
                    requestAnimationFrame(processChunk);
                }
            };
            
            // Start processing
            requestAnimationFrame(processChunk);
        });
    }
}
