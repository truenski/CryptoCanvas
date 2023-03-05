import { createContext, useCallback, useContext, useMemo, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, useWallet, WalletProvider } from "@solana/wallet-adapter-react";
import { getPhantomWallet } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";

const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost || anchor.web3.clusterApiUrl("devnet"));

const txTimeoutInMilliseconds = 30000;

interface MintContextData {
  candyMachineId: PublicKey | undefined;
  rpcHost: string;
  connection: anchor.web3.Connection;
  txTimeout: number;
  setCM(cm?: string): void;
}

const MintContext = createContext<MintContextData>({} as MintContextData);

const MintProvider: React.FC = ({ children }) => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(() => [getPhantomWallet()], []);

  const [candyMachineId, setCandyMachineId] = useState(undefined);

  const setCM = useCallback((cm: string) => {
    const cm_id = new anchor.web3.PublicKey(cm);

    setCandyMachineId(cm_id);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <MintContext.Provider value={{candyMachineId, rpcHost, connection, txTimeout: txTimeoutInMilliseconds, setCM}}>
          {children}
        </MintContext.Provider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const useMint = (): MintContextData => {
  return useContext(MintContext);
};

export { MintProvider, useMint };
