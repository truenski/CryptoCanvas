import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Link from "next/link";

import { useMint } from "@/hooks/mint";
import * as anchor from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-wallets";
import { Transaction } from "@solana/web3.js";

import { useState, useMemo, useCallback, useEffect, Fragment } from "react";
import { awaitTransactionSignatureConfirmation, CandyMachineAccount, getCandyMachineState, mintOneToken } from "../../services/benft/candy-machine";
import { Data } from "./Data";
import styles from "./styles.module.scss";
import api from "@/services/api";

interface ICollection {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  coverURL: string;
  candyMachineId?: string;
  stepCollection: { id: string; text: string }[];
  imagesCollection: { id: string; images_collections_url: string }[];
}

interface ColectionDetailProps {
  id?: string;
}

const ColectionDetail: React.FC<ColectionDetailProps> = ({ id }) => {
  const [isUserMinting, setIsUserMinting] = useState(false);
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
  const [alertState, setAlertState] = useState("");

  const [collection, setCollection] = useState<ICollection | null>(null);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);

  const { candyMachineId, rpcHost, connection, txTimeout, setCM } = useMint();

  const rpcUrl = rpcHost;

  const wallet = useWallet();

  useEffect(() => {
    async function loadCollection() {
      if (id) {
        try {
          const response = await api.get(`/collections/${id}`);
          if (response.data) {
            setCollection(response.data);

            setCM(response.data.candyMachineId || process.env.NEXT_PUBLIC_CANDY_MACHINE_ID);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    loadCollection();
  }, []);

  const anchorWallet = useMemo(() => {
    if (!wallet || !wallet.publicKey || !wallet.signAllTransactions || !wallet.signTransaction) {
      return;
    }
    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  const refreshCandyMachineState = useCallback(async () => {
    if (candyMachineId) {
      try {
        const cndy = await getCandyMachineState(anchorWallet, candyMachineId, connection);

        setCurrent(cndy.state.itemsRemaining);
        setTotal(cndy.state.itemsAvailable);

        setCandyMachine(cndy);
      } catch (e) {
        console.log("There was a problem fetching Candy Machine state");
        console.log(e);
      }
    }
  }, [anchorWallet, candyMachineId, connection]);

  const onMint = async (beforeTransactions: Transaction[] = [], afterTransactions: Transaction[] = []) => {
    try {
      setIsUserMinting(true);
      setAlertState("Please wait...");
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        const mintOne = await mintOneToken(candyMachine, wallet.publicKey, beforeTransactions, afterTransactions);

        const mintTxId = mintOne[0];

        let status: any = { err: true };

        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(mintTxId, txTimeout, connection, true);
        }

        if (status && !status.err) {
          setAlertState("Congratulations! Mint succeeded!");
          setCurrent((oldState) => oldState - 1);
          await api.patch(`/collections/${id}`);
        } else {
          setAlertState("Mint failed! Please try again!");
        }
      }
    } catch (error: any) {
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (!error.message) {
          message = "Transaction Timeout! Please try again.";
        } else if (error.message.indexOf("0x137")) {
          console.log(error);
          message = "SOLD OUT!";
        } else if (error.message.indexOf("0x135")) {
          message = "Insufficient funds to mint. Please fund your wallet.";
        }
      } else if (error.code === 311) {
        console.log(error);
        message = "SOLD OUT!";
        window.location.reload();
      } else if (error.code === 312) {
        message = "Minting period hasn't started yet.";
      }

      setAlertState(message);

      refreshCandyMachineState();
    } finally {
      setIsUserMinting(false);
    }
  };

  useEffect(() => {
    refreshCandyMachineState();
  }, [anchorWallet, candyMachineId, connection, refreshCandyMachineState, collection]);

  useEffect(() => {
    const phantom = "Phantom" as WalletName;
    wallet.select(phantom);
  }, [wallet]);

  const mint = useCallback(async () => {
    try {
      if (!wallet.connected) {
        await wallet.connect();
      } else {
        await onMint();
      }
    } catch (error) {
      console.log("FAILED TO CONNECT");
    }
  }, [wallet, onMint]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
      slidesToSlide: 1,
    },
  };

  // const Image = "./img_animation.svg";

  // const styleImage = {
  //   width: "200px",
  //   height: "200px",
  //   borderRadius: "18px",
  //   position: "relative",

  //   "&:hover": {
  //     backgroundColor: "#000",
  //   },

  //   // "&::before": {
  //   //   content: "",
  //   //   position: "absolute",
  //   //   width: "100%",
  //   //   height: "112px",
  //   //   backgroundColor: "#000",
  //   // },
  // };

  let aux = 0;
  let aux_mob = 0;
  let count = 0;
  let count_mob = 0;

  return (
    <>
      {collection && (
        <>
          <div className={styles.container}>
            <img className={styles.img_polys} src="/bg_polys_page_explorer.svg" alt="Polygonos" />
            <img className={styles.img_polys2} src="/bg_polys_page_explorer2.svg" alt="Polygonos" />
            <img className={styles.img_polys3} src="/bg_polys_page_explorer3.svg" alt="Polygonos" />
            <div className={styles.banner}>
              <div className={styles.perfil}>
                <div className={styles.container_image} style={{ backgroundImage: `url(${collection.coverURL})` }}>
                  {/* <img className={styles.image} src="/img_animation.svg" alt="" /> */}
                </div>
                <div className={styles.container_image_hover}>
                  <img src={collection.coverURL} alt="" />
                </div>

                <div className={styles.info}>
                  <h1>{collection.name}</h1>
                  <p>{collection.description}</p>
                  <button onClick={mint} type="button" disabled={isUserMinting}>
                    {wallet.connected ? " Mint" : "Connect Wallet"}
                  </button>
                  <p>{alertState}</p>
                </div>
              </div>
              <div className={styles.price}>
                <div className={styles.amontMint}>
                  <span>Amount of mint / A lot</span>
                  <div>
                    <img
                      src="/v6.png"
                      style={{
                        filter: "grayscale(1) brightness(2)",
                        height: "80px",
                      }}
                      alt="logo"
                    />
                    <h3>{current} /</h3> <span>&nbsp;{total}</span>
                  </div>
                </div>
                <div className={styles.priceMint}>
                  <span>Price Mint</span>

                  <div>
                    <img
                      src="/v6.png"
                      style={{
                        filter: "grayscale(1) brightness(2)",
                        height: "80px",
                      }}
                      alt="logo"
                    />
                    <h3>{collection.price} SOL</h3>
                  </div>
                </div>
                <div className={styles.price_mobile}>
                  <div className={styles.price_mobile_card}>
                    <span>Volume</span>
                    <p>{collection.quantity}</p>
                  </div>
                  <div className={styles.price_mobile_card}>
                    <span>Owners</span>
                    <p>0</p>
                  </div>
                  <div className={styles.price_mobile_card}>
                    <span>Floor Price</span>
                    <div>
                      <img src="/logoSolMobile.svg" alt="" />
                      <p>{collection.price}</p>
                    </div>
                  </div>
                  <div className={styles.price_mobile_card}>
                    <span>Highst Offer</span>
                    <div>
                      <img src="/logoSolMobile.svg" alt="" />
                      <p>1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.container_carousel}>
              <Carousel responsive={responsive} infinite itemClass={styles.itens} partialVisible={false}>
                {collection.imagesCollection.map((data) => {
                  count += 1;

                  return (
                    <Link href={`/colection-details/${collection.id}`} key={collection.id}>
                      <div className={styles.card} style={{ backgroundImage: `url("${data.images_collections_url}")` }}>
                        <div className={styles.container_image_hover}>
                          <img src={data.images_collections_url} alt="" />
                        </div>
                        <div className={styles.info}>
                          <span>{collection.name}</span>
                          <div>
                            <h1>{collection.name + `${count < 10 ? "0" : ""}${count}`}</h1>
                            <p>{collection.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </Carousel>
            </div>

            <div className={styles.container_carousel_mobile}>
              {collection.imagesCollection.map((data) => {
                count_mob += 1;

                return (
                  <Link href={`/colection-details/${collection.id}`} key={data.id}>
                    <div className={styles.card} style={{ backgroundImage: `url("${data.images_collections_url}")` }}>
                      <div className={styles.info}>
                        <span>{collection.name}</span>
                        <div>
                          <h1>{collection.name + `${count_mob}`}</h1>
                          <p>{collection.description}</p>
                        </div>
                        <div className={styles.info_price}>
                          <img src="/logoSolMobile.svg" alt="" />
                          <p>{collection.price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={styles.content}>
            <h1>Collection roadmap</h1>
            <div className={styles.container}>
              {collection.stepCollection.map((sc) => {
                aux += 1;

                return (
                  <div key={sc.id}>
                    <div className={styles.row}>
                      {aux % 2 !== 0 && <img src={`/roadmap${aux}.svg`} alt="" className={styles[`roadmap${aux}`]} />}

                      <div className={styles.info}>
                        <h1>Step 0{aux}</h1>
                        <p>
                          {sc.text}
                          <img src="/lineRoadmap.svg" alt="" />
                        </p>
                      </div>

                      {aux % 2 === 0 && <img src={`/roadmap${aux}.svg`} alt="" className={styles[`roadmap${aux}`]} />}
                    </div>

                    {collection.stepCollection.length - 1 === aux && (
                      <div className={styles[`container_roadmap_rotate${aux === 1 ? "" : aux}`]}>
                        <img src="/lineRoadmap.svg" alt="" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.mobile}>
            <h1 className={styles.title}> Collection roadmap</h1>
            <div className={styles.ContentMobile} data-aos="fade-in" data-aos-delay="50" data-aos-duration="3000">
              {collection.stepCollection.map((sc) => {
                aux_mob += 1;
                return (
                  <Fragment key={sc.id}>
                    <div className={styles.phases}>
                      {aux_mob % 2 !== 0 && <img src={`/roadmap${aux_mob}.svg`} className={styles[`box${aux_mob}`]} />}

                      <p className={styles[aux_mob % 2 === 0 ? "pRight" : "pLeft"]}>
                        <span> Step 0{aux_mob} </span> <br />
                        {sc.text}
                        <br />
                        <img src="/lineRoadmap.svg" alt="" />
                      </p>

                      {aux_mob % 2 === 0 && <img src={`/roadmap${aux_mob}.svg`} className={styles[`box${aux_mob}`]} />}
                    </div>
                    {collection.stepCollection.length - 1 === aux_mob && (
                      <img
                        className={styles[`line${aux_mob % 2 !== 0 ? "1" : ""}`]}
                        src={`line-${aux_mob % 2 === 0 ? "left" : "right"}.svg`}
                        alt=""
                      />
                    )}
                  </Fragment>
                );
              })}

              <div className={styles.more}>
                <p>Learn more about our process</p>
                <a href="/">More</a>
              </div>
              <div className={styles.space} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ColectionDetail;
