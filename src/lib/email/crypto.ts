import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGO = "aes-256-cbc";

function getKey(): Buffer {
  const k = process.env.EMAIL_ENCRYPTION_KEY ?? "";
  if (k.length < 32) return Buffer.alloc(32, k.padEnd(32, "0"));
  return Buffer.from(k.slice(0, 32));
}

export function encryptPassword(plain: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGO, getKey(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return iv.toString("hex") + ":" + enc.toString("hex");
}

export function decryptPassword(enc: string): string {
  const [ivHex, dataHex] = enc.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const data = Buffer.from(dataHex, "hex");
  const decipher = createDecipheriv(ALGO, getKey(), iv);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}
