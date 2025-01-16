import { generateMnemonic, validateMnemonic } from 'bip39';

export function createMnemonic(): string {
  const mnemonic = generateMnemonic(128); // 12 words
  if (!validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic generated.');
  }
  return mnemonic;
}
