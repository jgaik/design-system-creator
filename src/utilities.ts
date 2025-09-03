import type { ColorHSL, DeepObject } from "./types";

function hexToHsl(hex: string): ColorHSL {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h: number, s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return {
    hue: Math.round(h),
    saturation: Math.round(s * 100),
    lightness: Math.round(l * 100),
  };
}

function hslToHex({ hue, saturation, lightness }: ColorHSL) {
  saturation /= 100;
  lightness /= 100;

  const getHueSegment = (num: number) => (num + hue / 30) % 12;
  const chroma = saturation * Math.min(lightness, 1 - lightness);
  const getColorComponent = (num: number) => {
    const segment = getHueSegment(num);
    const formula =
      lightness -
      chroma * Math.max(-1, Math.min(segment - 3, Math.min(9 - segment, 1)));
    return Math.round(255 * formula);
  };

  return (
    "#" +
    [0, 8, 4]
      .map((color) => getColorComponent(color).toString(16).padStart(2, "0"))
      .join("")
  );
}

export function generateBaseColor(baseHex: string, color: string): string {
  const { hue, saturation } = hexToHsl(baseHex);

  return hslToHex({
    hue,
    saturation: color === "neutral" ? Math.min(saturation, 10) : saturation,
    lightness: 50,
  });
}

export function generateColorShades(
  baseHex: string,
  stepSize: number,
  color: string
): Record<number, string> {
  const hsl = hexToHsl(baseHex);
  let steps = Math.floor(50 / stepSize);
  if (50 % stepSize === 0) steps -= 1;
  const levels = steps * 2 + 1;

  let lightnessList = Array.from(
    { length: levels },
    (_, index) => 50 + (index - steps) * stepSize
  );

  if (color === "neutral") {
    lightnessList = [0, ...lightnessList, 100];
  }

  return Object.fromEntries(
    lightnessList.map(
      (lightness) => [100 - lightness, hslToHex({ ...hsl, lightness })] as const
    )
  );
}

export function flattenObject(obj: DeepObject, parentKey = "") {
  const result: Array<[string, Exclude<DeepObject[string], DeepObject>]> = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = parentKey ? `${parentKey}-${key}` : key;

    if (typeof value === "object") {
      result.push(...flattenObject(value, fullKey));
    } else {
      result.push([fullKey, value]);
    }
  }

  return result;
}
