import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function POST(req: Request) {
  const { address } = await req.json();

  if (!address) {
    return NextResponse.json({ error: 'Wallet address is required.' }, { status: 400 });
  }

  try {
    // Connect to the Ethereum blockchain (use a public provider like Infura or Alchemy)
    const provider = new ethers.InfuraProvider('homestead', 'a860f02b149a4615a1e1ad7c2b4708c8');

    // Fetch the balance of the wallet
    const balance = await provider.getBalance(address);
    
    // Convert the balance from wei to ether
    const balanceInEther = ethers.formatEther(balance);

    return NextResponse.json({
      address,
      balance: balanceInEther,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch wallet details.' }, { status: 500 });
  }
}



// import { NextResponse } from 'next/server';
// import Web3 from 'web3';

// export async function POST(req: Request) {
//   const { address } = await req.json();

//   if (!address) {
//     return NextResponse.json({ error: 'Wallet address is required.' }, { status: 400 });
//   }

//   try {
//     // Connect to the Ethereum blockchain (using Infura as the provider)
//     const web3 = new Web3('https://mainnet.infura.io/v3/a860f02b149a4615a1e1ad7c2b4708c8');

//     // Fetch the balance of the wallet
//     const balanceWei = await web3.eth.getBalance(address);

//     // Convert the balance from wei to ether
//     const balanceInEther = web3.utils.fromWei(balanceWei, 'ether');

//     return NextResponse.json({
//       address,
//       balance: balanceInEther,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch wallet details.' }, { status: 500 });
//   }
// }
