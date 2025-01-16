export interface NetworkConfig {
    name: string;
    rpcUrl: string;
    chainId: number;
  }
  
  const defaultNetworks: Record<string, NetworkConfig> = {
    mainnet: {
      name: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      chainId: 1,
    },
    polygon: {
      name: 'Polygon Mainnet',
      rpcUrl: 'https://polygon-rpc.com',
      chainId: 137,
    },
    bsc: {
      name: 'Binance Smart Chain',
      rpcUrl: 'https://bsc-dataseed.binance.org',
      chainId: 56,
    },
  };
  
  export const networks = { ...defaultNetworks };
  
  export function addCustomNetwork(name: string, rpcUrl: string, chainId: number) {
    networks[name] = { name, rpcUrl, chainId };
  }
  
  export function getNetwork(name: string): NetworkConfig | undefined {
    return networks[name];
  }
  