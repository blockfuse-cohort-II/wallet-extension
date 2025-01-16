import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { getNetwork } from '../../../utils/network';

export async function POST(req: Request) {
  const body = await req.json();
  const { networkName } = body;

  if (!networkName) {
    return NextResponse.json({ error: 'Network name is required.' }, { status: 400 });
  }

  const networkConfig = getNetwork(networkName);

  if (!networkConfig) {
    return NextResponse.json({ error: 'Network not found.' }, { status: 404 });
  }

  try {
    const provider = new ethers.JsonRpcProvider(networkConfig.rpcUrl);
    const network = await provider.getNetwork();

    return NextResponse.json({
      network: network.name,
      chainId: network.chainId,
      rpcUrl: networkConfig.rpcUrl,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to switch network.' }, { status: 500 });
  }
}
