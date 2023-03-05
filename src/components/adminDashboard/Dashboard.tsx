import api from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardHeader } from "../DashboardHeader/DashboardHeader";

import styles from "./dashboard.module.scss";
interface ICollection {
  id: string;
  name: string;
  coverURL: string;
  price: number;
  quantity: number;
}

export function Dashboard() {
  const [collections, setCollections] = useState<ICollection[]>([]);

  useEffect(() => {
    // async function loadCollection() {
    //   try {
    //     const response = await api.get('/collections');
    //     if(response.data) {
    //       setCollections(response.data);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // loadCollection();

    const mock: ICollection = {
      id: "LOREM",
      name: "LOREM",
      coverURL: "https://assets.entrepreneur.com/content/3x2/2000/1647397792-nft-art2.jpg",
      price: 3000,
      quantity: 2,
    };
    const mockCollection = Array(4).fill(mock);

    setCollections(mockCollection);
  }, []);

  return (
    <>
      <DashboardHeader />

      <div className={styles.container}>
        <h3 className={styles.text}>Todas as coleções</h3>
        <div className={styles.line}></div>
        <div className={styles.colections}>
          {collections.map((data) => (
            <Link href={`/colections/edit/${data.id}`} key={data.id}>
              <div className={styles.card} key={data.id} style={{ backgroundImage: `url("${data.coverURL}")` }}>
                <div className={styles.container_image_hover}>
                  <img src={data.coverURL} alt="" />
                </div>
                <div className={styles.info}>
                  <span>Volume {data.quantity ?? "-"}</span>
                  <h1>{data.name}</h1>
                  <div className={styles.buttons}>
                    <button type="button">Mint</button>
                    <div className={styles.price}>
                      <h3>{data.price}</h3>
                      <img
                        src="./v6.png"
                        style={{
                          filter: "grayscale(1) brightness(2)",
                          height: "80px",
                        }}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
