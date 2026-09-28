export type XorStep = { input: number; key: number; output: number };
export type ValidationResult = { valid: boolean; message?: string };

/* ---------- Konversi ---------- */
export const stringToBytes = (str: string): number[] =>
  str.split("").map((ch) => ch.charCodeAt(0));

export const bytesToString = (bytes: number[]): string =>
  bytes.map((b) => String.fromCharCode(b)).join("");

export const toBinary = (byte: number): string =>
  byte.toString(2).padStart(8, "0");

export const toHexByte = (byte: number): string =>
  byte.toString(16).padStart(2, "0");

export const bytesToHex = (bytes: number[]): string =>
  bytes.map(toHexByte).join("");

export const stripSpaces = (s: string): string => s.replace(/\s+/g, "");

export const isValidHex = (hex: string): boolean =>
  /^([0-9a-fA-F]{2})+$/.test(stripSpaces(hex));

export const isLatin1 = (str: string): boolean =>
  str.split("").every((ch) => ch.charCodeAt(0) <= 255);

export function hexToBytes(hex: string): number[] {
  const clean = stripSpaces(hex);
  if (!isValidHex(clean)) throw new Error("Format hex tidak valid.");
  const out: number[] = [];
  for (let i = 0; i < clean.length; i += 2) {
    out.push(parseInt(clean.slice(i, i + 2), 16));
  }
  return out;
}

export const stringToHex = (s: string): string => bytesToHex(stringToBytes(s));
export const hexToString = (h: string): string => bytesToString(hexToBytes(h));

export const displayChar = (byte: number): string =>
  byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : "·";

/* ---------- Operasi XOR ---------- */
export const xorBytes = (a: number[], b: number[]): number[] =>
  Array.from({ length: Math.min(a.length, b.length) }, (_, i) => a[i] ^ b[i]);

export const buildSteps = (data: number[], key: number[]): XorStep[] =>
  data.map((b, i) => ({ input: b, key: key[i], output: b ^ key[i] }));

export const encrypt = (plaintext: string, key: string): string =>
  bytesToHex(xorBytes(stringToBytes(plaintext), stringToBytes(key)));

export const decrypt = (cipherHex: string, key: string): string =>
  bytesToString(xorBytes(hexToBytes(cipherHex), stringToBytes(key)));

/* ---------- Validasi ---------- */
const fail = (message: string): ValidationResult => ({ valid: false, message });
const ok: ValidationResult = { valid: true };

export function validateEncrypt(plaintext: string, key: string): ValidationResult {
  if (!plaintext) return fail("Plaintext tidak boleh kosong.");
  if (!key) return fail("Kunci tidak boleh kosong.");
  if (!isLatin1(plaintext) || !isLatin1(key))
    return fail("Hanya karakter ASCII/Latin-1 yang didukung.");
  if (key.length < plaintext.length)
    return fail(
      `Panjang kunci (${key.length}) lebih pendek dari pesan (${plaintext.length}). Pada OTP, kunci harus minimal sepanjang pesan.`
    );
  return ok;
}

export function validateDecrypt(cipherHex: string, key: string): ValidationResult {
  if (!cipherHex.trim()) return fail("Ciphertext (Hex) tidak boleh kosong.");
  if (!key) return fail("Kunci tidak boleh kosong.");
  if (!isValidHex(cipherHex))
    return fail("Ciphertext harus berupa hex valid (pasangan 2 digit: 0-9, a-f).");
  if (!isLatin1(key)) return fail("Hanya karakter ASCII/Latin-1 yang didukung pada kunci.");
  const byteLen = stripSpaces(cipherHex).length / 2;
  if (key.length < byteLen)
    return fail(
      `Panjang kunci (${key.length}) lebih pendek dari ciphertext (${byteLen} byte).`
    );
  return ok;
}

export function validateAttack(m1: string, m2: string, key: string): ValidationResult {
  if (!m1 || !m2) return fail("Message 1 dan Message 2 tidak boleh kosong.");
  if (!key) return fail("Kunci tidak boleh kosong.");
  if (!isLatin1(m1) || !isLatin1(m2) || !isLatin1(key))
    return fail("Hanya karakter ASCII/Latin-1 yang didukung.");
  const longest = Math.max(m1.length, m2.length);
  if (key.length < longest)
    return fail(
      `Panjang kunci (${key.length}) lebih pendek dari pesan terpanjang (${longest}).`
    );
  return ok;
}