import { NextResponse } from 'next/server';
import { addCustomNetwork } from '../../../utils/network';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, rpcUrl, chainId } = body;

  if (!name || !rpcUrl || !chainId) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  try {
    addCustomNetwork(name, rpcUrl, chainId);
    return NextResponse.json({ message: 'Network added successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add network.' }, { status: 500 });
  }
}
