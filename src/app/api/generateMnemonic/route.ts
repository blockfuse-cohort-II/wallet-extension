import { NextResponse } from 'next/server';
import { generateMnemonic, validateMnemonic } from 'bip39';

export async function POST() {
  // Generate a 12-word mnemonic
  const mnemonic = generateMnemonic(128); // 128 bits = 12 words

  // Validate the generated mnemonic
  const isValid = validateMnemonic(mnemonic);
  const money = "money"
  console.log(money)

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid mnemonic generated.' }, { status: 400 });
  }

  return NextResponse.json({ mnemonic }, { status: 200 });
}
