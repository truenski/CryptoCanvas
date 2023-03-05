import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { Data } from "./Data";
import styles from "./styles.module.scss";
import api from "@/services/api";

interface ICollection {
  id: string;
  name: string;
  coverURL: string;
  price: number;
  quantity: number;
}

function ExploreColections() {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = useCallback(async () => {
    if (!searchText) {
      return;
    }

    try {
      setLoading(true);

      const response = await api.get("/collections", {
        params: {
          search: searchText,
        },
      });

      if (response.data) {
        setCollections(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [searchText]);

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
    <div className={styles.content}>
      <img className={styles.img_polys} src="/bg_polys_page_explorer.svg" alt="Polygonos" />
      <img className={styles.img_polys2} src="/bg_polys_page_explorer2.svg" alt="Polygonos" />
      <img className={styles.img_polys3} src="/bg_polys_page_explorer3.svg" alt="Polygonos" />
      <div className={styles.header}>
        <h1>Explore all collections</h1>
        <div className={styles.filter}>
          <div className={styles.inputText}>
            <input type="text" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <img src="./search.svg" alt="" onClick={handleSearch} />
          </div>

          <select name="" id="">
            <option value="">Filter</option>
            <option value="">Filter</option>
          </select>
        </div>
      </div>
      <div className={styles.colections}>
        {collections.map((data) => (
          <Link href={`/colection-details/${data.id}`} key={data.id}>
            <div className={styles.card} style={{ backgroundImage: `url("${data.coverURL}")` }}>
              <div className={styles.container_image_hover}>
                <img src={data.coverURL} alt="" />
              </div>

              <div className={styles.info}>
                <span>{data.quantity ?? " - "} Total volume</span>
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
                    <img className={styles.logo_price_mobile} src="/logoSolMobile.svg" alt="logo mobile" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ExploreColections;
