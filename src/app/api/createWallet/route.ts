import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function POST(req: Request) {
  const body = await req.json();
  const { mnemonic } = body;

  if (!mnemonic) {
    return NextResponse.json({ error: 'Mnemonic is required.' }, { status: 400 });
  }

  try {
    // Create a wallet from the mnemonic
    const wallet = ethers.Wallet.fromPhrase(mnemonic);

    return NextResponse.json(
      {
        address: wallet.address,
        privateKey: wallet.privateKey,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Error creating wallet.' }, { status: 500 });
  }
}
