import { useCallback, useEffect, useState } from "react";

import AOS from "aos";
import Link from "next/link";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-wallets";

import "aos/dist/aos.css";
import styles from "./styles.module.scss";

// type Event = "connect" | "disconnect";

// interface Phantom {
//   on: (event: Event, callback: () => void) => void;
//   connect: () => Promise<void>;
//   disconnect: () => Promise<void>;
// }

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  // const [isConnected, setConnectedStatus] = useState(false);
  // const [status, setStatus] = useState("");
  // const [walletAddress, setWallet] = useState("");

  // const connectWalletPressed = async () => {
  //     if(isConnected) return alert(
  //       "Conta já conectada! " +
  //       String(walletAddress).substring(0, 5) +
  //       "..." +
  //       String(walletAddress).substring(38)
  //     )

  //     const walletResponse = await connectWallet()
  //     setConnectedStatus(walletResponse.connectedStatus)
  //     setStatus(walletResponse.status)
  //     setWallet(walletResponse.address)

  // }

  // const connectWallet = async () => {
  //   if (window.ethereum) {
  //       try {
  //           const address = await window.ethereum.enable()
  //           const obj = {
  //               connectedStatus:true,
  //               status:"Conectado",
  //               address: address
  //           }
  //           return obj;
  //       } catch (error) {
  //           return {
  //               connectedStatus: false,
  //               status: "Erro durante a conexão com a conta"
  //           }
  //       }
  //   } else {
  //       return {
  //           connectedStatus: false,
  //           status: "Instale a Metamask no seu browser: https://metamask.io/download.html"
  //       }
  //   }
  // };

  // const [phantom, setPhantom] = useState<Phantom | null>(null);

  // useEffect(() => {
  //   if ("solana" in window) {
  //     setPhantom(window["solana"]);
  //   }
  // }, []);

  // const [connected, setConnected] = useState(false);

  // useEffect(() => {
  //   phantom?.on("connect", () => {
  //     setConnected(true);
  //   });

  //   phantom?.on("disconnect", () => {
  //     setConnected(false);
  //   });
  // }, [phantom]);

  // const connectHandler = () => {
  //   phantom?.connect();
  // };

  // const disconnectHandler = () => {
  //   phantom?.disconnect();
  // };

  const wallet = useWallet();

  const handleConnect = useCallback(async () => {
    try {
      if (wallet.connected) {
        await wallet.disconnect();
      } else {
        await wallet.connect();
      }
    } catch (error) {
      //
    }
  }, [wallet]);

  useEffect(() => {
    const phantom = "Phantom" as WalletName;
    wallet.select(phantom);
  }, [wallet]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header} data-aos="fade-in" data-aos-delay="50" data-aos-duration="2500">
        <a className={styles.logo} href="/" data-aos="fade-right" data-aos-delay="50" data-aos-duration="2500">
          <h1 className={styles.logo}>CryptoCanvas</h1>
        </a>

        {/* <input className={styles.menuBtn} type="checkbox" id="menu-btn" />
        <label className={styles.menuIcon} htmlFor="menu-btn">
          <span className={styles.navicon} />
        </label> */}

        <button className={styles.btn_hamburguer} type="button" onClick={() => setOpenMenu(!openMenu)}>
          <img src="/menu_hamburguer.svg" alt="icone menu" />
        </button>

        {openMenu && (
          <div className={styles.menuMobile}>
            <button type="button" className={styles.btn_close} onClick={() => setOpenMenu(!openMenu)}>
              <img src="/button_close.svg" alt="botão fechar" />
            </button>
            <div className={styles.container_images}>
              <img className={styles.token} src="/token_mobile.svg" alt="logo" />
              <img className={styles.hand} src="/hand_mobile.svg" alt="logo" />
              <h1 className={styles.logo}>CryptoCanvas</h1>
            </div>
            <ul className={styles.menu_overlay}>
              <li>
                <Link href="/explore">Explore Collections</Link>
              </li>
              <li>
                <Link href="/roadmap">Roadmap</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/benefits">Benefits</Link>
              </li>
            </ul>
          </div>
        )}

        <ul className={styles.menu}>
          <li>
            <Link href="/explore">Explore Collections</Link>
          </li>
          <li>
            <Link href="/roadmap">Roadmap</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/benefits">Benefits</Link>
          </li>

          {/* onClick={connectWalletPressed} */}
          <li className={styles.btnWallet} data-aos="fade-down" data-aos-delay="50" data-aos-duration="20">
            <div className={styles.btn}>
              {/* <button type="button" onClick={connected ? disconnectHandler : connectHandler}>
              {connected ? "Disconnect" : "Connect Wallet"}
            </button> */}
              <button type="button" onClick={handleConnect}>
                {wallet.connected ? "Disconnect" : "Connect Wallet"}
              </button>
            </div>
          </li>
        </ul>
      </header>
    </div>
  );
}
