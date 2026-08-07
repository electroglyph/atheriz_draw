import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const root = join(__dirname, '..');

function readPackageJson(): any {
  return JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
}

describe('package.json scripts for typecheck and tests', () => {
  it('has a typecheck script that runs tsc --noEmit', () => {
    const pkg = readPackageJson();
    const script: string | undefined = pkg.scripts?.typecheck;
    expect(script, '"typecheck" script missing').toBeDefined();
    expect(script).toContain('tsc --noEmit');
  });

  it('has a test script so CI can run the suite', () => {
    const pkg = readPackageJson();
    expect(pkg.scripts?.test, '"test" script missing').toBeDefined();
  });
});

describe('package consistently uses ESM', () => {
  it('declares "type": "module" for consistent ESM usage', () => {
    const pkg = readPackageJson();
    expect(pkg.type).toBe('module');
  });
});

describe('extract_glyphs.js runs under the package module format', () => {
  it('does not use top-level ESM import under a CommonJS package', () => {
    const src = readFileSync(join(root, 'scripts/extract_glyphs.js'), 'utf8');
    // Package has no "type": "module", so bare `import` statements crash.
    expect(src).not.toMatch(/^\s*import\s+/m);
  });
});