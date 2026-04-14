export interface CellMetrics {
  width: number;
  height: number;
  font: string;
  baselineY: number;
}

export function measureCellMetrics(
  fontFamily: string,
  fontSize: number,
): CellMetrics {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // Most monospace fonts have a ~0.6 width to height ratio
  // We'll explicitly set line-height or use accurate measurement
  const font = `${fontSize}px "${fontFamily}"`;
  ctx.font = font;

  // Measure a typical wide character
  const metrics = ctx.measureText("M");

  // For ANSI cells, we typically want a specific aspect ratio, e.g., 1:2 or based on the font
  // Let's use the actual text metrics
  const width = Math.ceil(metrics.width);

  // Height is trickier without newer APIs, usually fontSize * line-height
  // For classic terminal look, exact font size or slightly larger is used.
  const height = Math.ceil(fontSize * 1.2);

  // Baseline is roughly where the text should be drawn vertically
  const baselineY = Math.ceil(height * 0.8);

  return { width, height, font, baselineY };
}
