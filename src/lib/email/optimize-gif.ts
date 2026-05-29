import sharp from "sharp";

export async function optimizeGif(input: Buffer): Promise<Buffer> {
  try {
    const result = await sharp(input, { animated: true })
      .resize({ width: 600, withoutEnlargement: true })
      .gif({ colours: 128, effort: 7 })
      .toBuffer();
    return result;
  } catch {
    return input;
  }
}
