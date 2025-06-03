type ColorHSL = {
  hue: number;
  saturation: number;
  lightness: number;
};

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

export function generateColorShades(baseHex: string, levels: number) {
  const hsl = hexToHsl(baseHex);
  const lightRange = [95, 10]; // Lightest to darkest L%
  const shades = [];

  for (let idx = 0; idx < levels; idx++) {
    const lightness = Math.round(
      lightRange[0] - (idx * (lightRange[0] - lightRange[1])) / (levels - 1)
    );
    shades.push(hslToHex({ ...hsl, lightness }));
  }

  return shades;
}
