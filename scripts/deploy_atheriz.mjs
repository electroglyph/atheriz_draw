import { cp, mkdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const distRoot = join(projectRoot, 'dist');
const webRoot = process.env.ATHERIZ_WEB_ROOT;

if (!webRoot) {
    throw new Error('Set ATHERIZ_WEB_ROOT to the AtheriZ game web directory');
}

const staticRoot = join(resolve(webRoot), 'static');
await stat(distRoot);
await mkdir(staticRoot, { recursive: true });

await cp(join(distRoot, 'assets'), join(staticRoot, 'assets'), { recursive: true });
await cp(join(distRoot, 'webclient', 'index.html'), join(staticRoot, 'webclient', 'index.html'), { recursive: true });
await cp(join(distRoot, 'index.html'), join(staticRoot, 'atheriz_draw', 'index.html'), { recursive: true });
await cp(join(distRoot, 'chafa.wasm'), join(staticRoot, 'chafa.wasm'), { recursive: true });
await cp(join(distRoot, 'gfonts'), join(staticRoot, 'gfonts'), { recursive: true });
await cp(join(distRoot, 'art.ans'), join(staticRoot, 'atheriz_draw', 'art.ans'), { recursive: true });

console.log(`Deployed AtheriZ webclient and draw editor to ${staticRoot}`);
console.log(`Webclient: ${join(staticRoot, 'webclient', 'index.html')}`);
console.log(`Draw editor: ${join(staticRoot, 'atheriz_draw', 'index.html')}`);
