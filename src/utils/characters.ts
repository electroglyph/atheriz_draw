export interface CharGroup {
  name: string;
  chars: string[];
}

export const CHAR_NAMES: Record<string, string> = {
  "░": "Light Shade",
  "▒": "Medium Shade",
  "▓": "Dark Shade",
  "█": "Full Block",
  "─": "Box Drawings Light Horizontal",
  "│": "Box Drawings Light Vertical",
  "┌": "Box Drawings Light Down And Right",
  "┐": "Box Drawings Light Down And Left",
  "└": "Box Drawings Light Up And Right",
  "┘": "Box Drawings Light Up And Left",
  "├": "Box Drawings Light Vertical And Right",
  "┤": "Box Drawings Light Vertical And Left",
  "┬": "Box Drawings Light Down And Horizontal",
  "┴": "Box Drawings Light Up And Horizontal",
  "┼": "Box Drawings Light Vertical And Horizontal",
  "╭": "Box Drawings Light Arc Down And Right",
  "╮": "Box Drawings Light Arc Down And Left",
  "╰": "Box Drawings Light Arc Up And Right",
  "╯": "Box Drawings Light Arc Up And Left",
  "╱":"Box Drawings Light Diagonal Upper Right to Lower Left",
  "╲":"Box Drawings Light Diagonal Upper Left to Lower Right",
  "╳":"Box Drawings Light Diagonal Cross",
  "═": "Box Drawings Double Horizontal",
  "║": "Box Drawings Double Vertical",
  "╔": "Box Drawings Double Down And Right",
  "╗": "Box Drawings Double Down And Left",
  "╚": "Box Drawings Double Up And Right",
  "╝": "Box Drawings Double Up And Left",
  "╠": "Box Drawings Double Vertical And Right",
  "╣": "Box Drawings Double Vertical And Left",
  "╦": "Box Drawings Double Down And Horizontal",
  "╩": "Box Drawings Double Up And Horizontal",
  "╬": "Box Drawings Double Vertical And Horizontal",
  "━": "Box Drawings Heavy Horizontal",
  "┃": "Box Drawings Heavy Vertical",
  "┏": "Box Drawings Heavy Down And Right",
  "┓": "Box Drawings Heavy Down And Left",
  "┗": "Box Drawings Heavy Up And Right",
  "┛": "Box Drawings Heavy Up And Left",
  "┣": "Box Drawings Heavy Vertical And Right",
  "┫": "Box Drawings Heavy Vertical And Left",
  "┳": "Box Drawings Heavy Down And Horizontal",
  "┻": "Box Drawings Heavy Up And Horizontal",
  "╋": "Box Drawings Heavy Vertical And Horizontal",
  "▔": "Upper One Eighth Block",
  "🮂": "Upper One Quarter Block",
  "🮃": "Upper Three Eighths Block",
  "▀": "Upper Half Block",
  "🮄": "Upper Five Eighths Block",
  "🮅": "Upper Three Quarters Block",
  "🮆": "Upper Seven Eighths Block",
  "▁": "Lower One Eighth Block",
  "▂": "Lower One Quarter Block",
  "▃": "Lower Three Eighths Block",
  "▄": "Lower Half Block",
  "▅": "Lower Five Eighths Block",
  "▆": "Lower Three Quarters Block",
  "▇": "Lower Seven Eighths Block",
  "▏": "Left One Eighth Block",
  "▎": "Left One Quarter Block",
  "▍": "Left Three Eighths Block",
  "▌": "Left Half Block",
  "▋": "Left Five Eighths Block",
  "▊": "Left Three Quarters Block",
  "▉": "Left Seven Eighths Block",
  "▕": "Right One Eighth Block",
  "🮇": "Right One Quarter Block",
  "🮈": "Right Three Eighths Block",
  "▐": "Right Half Block",
  "🮉": "Right Five Eighths Block",
  "🮊": "Right Three Quarters Block",
  "🮋": "Right Seven Eighths Block",
  "▖": "Quadrant Lower Left",
  "▗": "Quadrant Lower Right",
  "▘": "Quadrant Upper Left",
  "▙": "Quadrant Upper Left And Lower Left And Lower Right",
  "▚": "Quadrant Upper Left And Lower Right",
  "▛": "Quadrant Upper Left And Upper Right And Lower Left",
  "▜": "Quadrant Upper Left And Upper Right And Lower Right",
  "▝": "Quadrant Upper Right",
  "▞": "Quadrant Upper Right And Lower Left",
  "▟": "Quadrant Upper Right And Lower Left And Lower Right",
  "■": "Black Square",
  "□": "White Square",
  "▲": "Black Up-Pointing Triangle",
  "△": "White Up-Pointing Triangle",
  "▼": "Black Down-Pointing Triangle",
  "▽": "White Down-Pointing Triangle",
  "◆": "Black Diamond",
  "◇": "White Diamond",
  "●": "Black Circle",
  "○": "White Circle",
  "★": "Black Star",
  "☆": "White Star",
  "𜰰": "Upper Left Twelfth Circle",
  "𜰱": "Upper Centre Left Twelfth Circle",
  "𜰲": "Upper Centre Right Twelfth Circle",
  "𜰳": "Upper Right Twelfth Circle",
  "𜰴": "Upper Middle Left Twelfth Circle",
  "𜰵": "Upper Left Quarter Circle",
  "𜰶": "Upper Right Quarter Circle",
  "𜰷": "Upper Middle Right Twelfth Circle",
  "𜰸": "Lower Middle Left Twelfth Circle",
  "𜰹": "Lower Left Quarter Circle",
  "𜰺": "Lower Right Quarter Circle",
  "𜰻": "Lower Middle Right Twelfth Circle",
  "𜰼": "Lower Left Twelfth Circle",
  "𜰽": "Lower Centre Left Twelfth Circle",
  "𜰾": "Lower Centre Right Twelfth Circle",
  "𜰿": "Lower Right Twelfth Circle",
};

export const CHAR_GROUPS: CharGroup[] = [
  {
    name: "Drawing",
    chars: [
      "░",
      "▒",
      "▓",
      "█",
      "─",
      "│",
      "┌",
      "┐",
      "└",
      "┘",
      "├",
      "┤",
      "┬",
      "┴",
      "┼",
      "╭",
      "╮",
      "╰",
      "╯",
      "╱",
      "╲",
      "╳",
      "═",
      "║",
      "╔",
      "╗",
      "╚",
      "╝",
      "╠",
      "╣",
      "╦",
      "╩",
      "╬",
      "━",
      "┃",
      "┏",
      "┓",
      "┗",
      "┛",
      "┣",
      "┫",
      "┳",
      "┻",
      "╋",
      "▔",
      "🮂",
      "🮃",
      "▀",
      "🮄",
      "🮅",
      "🮆",
      "▁",
      "▂",
      "▃",
      "▄",
      "▅",
      "▆",
      "▇",
      "▏",
      "▎",
      "▍",
      "▌",
      "▋",
      "▊",
      "▉",
      "▕",
      "🮇",
      "🮈",
      "▐",
      "🮉",
      "🮊",
      "🮋",
      "▖",
      "▗",
      "▘",
      "▙",
      "▚",
      "▛",
      "▜",
      "▝",
      "▞",
      "▟",
      "𜰰",
      "𜰱",
      "𜰲",
      "𜰳",
      "𜰴",
      "𜰵",
      "𜰶",
      "𜰷",
      "𜰸",
      "𜰹",
      "𜰺",
      "𜰻",
      "𜰼",
      "𜰽",
      "𜰾",
      "𜰿",
    ],
  },
  {
    name: "Custom",
    chars: ["■", "□", "▲", "△", "▼", "▽", "◆", "◇", "●", "○", "★", "☆"],
  },
];

export const LIGHT_BOX = {
  h: "─",
  v: "│",
  tl: "┌",
  tr: "┐",
  bl: "└",
  br: "┘",
  t: "┬",
  b: "┴",
  l: "├",
  r: "┤",
  c: "┼",
};

export const ROUNDED_BOX = {
  h: "─",
  v: "│",
  tl: "╭",
  tr: "╮",
  bl: "╰",
  br: "╯",
  t: "┬",
  b: "┴",
  l: "├",
  r: "┤",
  c: "┼",
};

export const DOUBLE_BOX = {
  h: "═",
  v: "║",
  tl: "╔",
  tr: "╗",
  bl: "╚",
  br: "╝",
  t: "╦",
  b: "╩",
  l: "╠",
  r: "╣",
  c: "╬",
};

export const HEAVY_BOX = {
  h: "━",
  v: "┃",
  tl: "┏",
  tr: "┓",
  bl: "┗",
  br: "┛",
  t: "┳",
  b: "┻",
  l: "┣",
  r: "┫",
  c: "╋",
};

export const LIGHT_CHARS = new Set(Object.values(LIGHT_BOX));
export const ROUNDED_CHARS = new Set(Object.values(ROUNDED_BOX));
export const DOUBLE_CHARS = new Set(Object.values(DOUBLE_BOX));
export const HEAVY_CHARS = new Set(Object.values(HEAVY_BOX));

export type ConnectionMap = { [key: string]: string };

const ROUNDED_LOGIC: ConnectionMap = {
  // Binary key based on connections: [North, East, South, West] where 1 is connected
  "1111": "┼",
  "1110": "├",
  "1011": "┤",
  "1101": "┴",
  "0111": "┬",
  "1100": "╰",
  "1001": "╯",
  "0110": "╭",
  "0011": "╮",
  "1010": "│",
  "0101": "─",
  "1000": "│",
  "0010": "│",
  "0100": "─",
  "0001": "─",
  "0000": "─", // Fallback
};

export function getSmartChar(
  n: boolean,
  e: boolean,
  s: boolean,
  w: boolean,
  charMap: ConnectionMap = ROUNDED_LOGIC,
): string {
  const key = `${n ? 1 : 0}${e ? 1 : 0}${s ? 1 : 0}${w ? 1 : 0}`;
  return charMap[key] || "─";
}

export function getCircleChar(px: number, py: number, cx: number, cy: number, a: number, b: number): string {
    if (a === 0 && b === 0) return "𜰵";

    const rx = a === 0 ? 0 : (px - cx) / a;
    const ry = b === 0 ? 0 : (py - cy) / b;
    let deg = Math.atan2(ry, rx) * 180 / Math.PI;
    
    deg = (deg % 360 + 360) % 360;

    if (a < 1.0 && b < 1.0) {
        if (deg >= 180 && deg < 270) return "𜰵";
        if (deg >= 270 && deg < 360) return "𜰶";
        if (deg >= 0 && deg < 90) return "𜰺";
        return "𜰹"; 
    }

    if (deg >= 270 && deg < 300) return "𜰲";
    if (deg >= 300 && deg < 330) return "𜰳";
    if (deg >= 330 && deg < 360) return "𜰷";
    if (deg >= 0 && deg < 30) return "𜰻";
    if (deg >= 30 && deg < 60) return "𜰿";
    if (deg >= 60 && deg < 90) return "𜰾";
    if (deg >= 90 && deg < 120) return "𜰽";
    if (deg >= 120 && deg < 150) return "𜰼";
    if (deg >= 150 && deg < 180) return "𜰸";
    if (deg >= 180 && deg < 210) return "𜰴";
    if (deg >= 210 && deg < 240) return "𜰰";
    return "𜰱";
}
