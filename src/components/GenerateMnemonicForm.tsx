'use client';

import { useState } from 'react';

export default function GenerateMnemonicForm() {
  const [mnemonic, setMnemonic] = useState<string>('');
  const [wallet, setWallet] = useState<{ address: string; privateKey: string } | null>(null);

  const generateMnemonic = async () => {
    const response = await fetch('/api/generateMnemonic', { method: 'POST' });
    const data = await response.json();
    if (data.mnemonic) setMnemonic(data.mnemonic);
  };

  const createWallet = async () => {
    const response = await fetch('/api/createWallet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mnemonic }),
    });
    const data = await response.json();
    if (data.address) setWallet(data);
  };

  return (
    <div>
      <button onClick={generateMnemonic}>Generate Mnemonic</button>
      {mnemonic && (
        <div>
          <p>Mnemonic: {mnemonic}</p>
          <button onClick={createWallet}>Create Wallet</button>
        </div>
      )}
      {wallet && (
        <div>
          <p>Address: {wallet.address}</p>
          <p>Private Key: {wallet.privateKey}</p>
        </div>
      )}
    </div>
  );
}
