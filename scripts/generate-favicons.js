const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

let API; // will be set to the imported jimp module (for helper funcs like rgbaToInt, loadFont)

function hexToRgba(hex) {
  const h = hex.replace('#', '');
  const bigint = parseInt(h, 16);
  if (h.length === 6) {
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
      a: 255,
    };
  }
  return { r: 0, g: 0, b: 0, a: 255 };
}

async function createGradient(Jimp, size, colorA, colorB) {
  const img = await Jimp.fromBitmap({ data: Buffer.alloc(size * size * 4), width: size, height: size });
    const a = hexToRgba(colorA);
    const b = hexToRgba(colorB);
  for (let y = 0; y < size; y++) {
    const t = y / (size - 1);
    const r = Math.round(a.r + (b.r - a.r) * t);
    const g = Math.round(a.g + (b.g - a.g) * t);
    const bl = Math.round(a.b + (b.b - a.b) * t);
    const color = API.rgbaToInt(r, g, bl, 255);
    for (let x = 0; x < size; x++) img.setPixelColor(color, x, y);
  }
  return img;
}

async function createIconVariant(Jimp, { size, light = true }) {
  // Colors inspired by the SVG gradient/design
  const gradA = '#06b6d4';
  const gradB = '#8b5cf6';
  const darkBg = '#0b1220';

  const base = light
    ? await createGradient(Jimp, size, gradA, gradB)
    : await Jimp.fromBitmap({ data: Buffer.alloc(size * size * 4), width: size, height: size });
  if (!light) {
    const col = Jimp.rgbaToInt(11, 18, 32, 255);
    for (let yy = 0; yy < size; yy++) for (let xx = 0; xx < size; xx++) base.setPixelColor(col, xx, yy);
  }

  // Create text mask with the big 'K'
  const font = await API.loadFont(size >= 48 ? API.FONT_SANS_64_WHITE : size >= 32 ? API.FONT_SANS_32_WHITE : API.FONT_SANS_16_WHITE);
  const textImg = await Jimp.fromBitmap({ data: Buffer.alloc(size * size * 4), width: size, height: size });
  const text = 'K';
  // measure
  const w = API.measureText(font, text);
  const h = API.measureTextHeight(font, text, size);
  const x = Math.round((size - w) / 2);
  const y = Math.round((size - h) / 2) - Math.round(size * 0.03);
  await textImg.print(font, x, y, text);

  if (light) {
    base.composite(textImg, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER, opacitySource: 1 });
    return base;
  } else {
    const glyphGradient = await createGradient(Jimp, size, gradA, gradB);
    glyphGradient.mask(textImg, 0, 0);
    base.composite(glyphGradient, 0, 0);
    return base;
  }
}

async function run() {
  // dynamic import for Jimp; use the exported Jimp class and helper functions
  const JimpModule = await import('jimp');
  API = JimpModule; // provides rgbaToInt, loadFont, measureText, JimpMime, etc.
  const Jimp = JimpModule.Jimp;

  try {
    const sizes = [16, 32, 48];
    // Generate light and dark 32x32 PNGs
    const light32 = await createIconVariant(Jimp, { size: 32, light: true });
    const dark32 = await createIconVariant(Jimp, { size: 32, light: false });

    await light32.writeAsync(path.join(outDir, 'icon-light-32x32.png'));
    await dark32.writeAsync(path.join(outDir, 'icon-dark-32x32.png'));
    console.log('Wrote icon-light-32x32.png and icon-dark-32x32.png');

    // For favicon.ico generate 16/32/48 from the light variant (classic approach)
    const buffers = [];
    for (const s of sizes) {
      const img = await createIconVariant(Jimp, { size: s, light: true });
      const p = await img.getBufferAsync(API.JimpMime.PNG);
      buffers.push(p);
      await img.writeAsync(path.join(outDir, `favicon-${s}x${s}.png`));
    }

    const ico = await pngToIco(buffers);
    fs.writeFileSync(path.join(outDir, 'favicon.ico'), ico);
    console.log('Wrote public/favicon.ico');

    console.log('Favicon generation complete.');
  } catch (err) {
    console.error('Error generating favicons:', err);
    process.exit(1);
  }
}

run();
