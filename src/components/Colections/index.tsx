/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import Link from "next/link";

import "react-multi-carousel/lib/styles.css";
import { Data } from "./Data";
import styles from "./styles.module.scss";
import api from "@/services/api";

interface ICollection {
  id: string;
  name: string;
  coverURL: string;
  price: number;
}

function Colections() {
  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 4,
  //     slidesToSlide: 4,
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 4,
  //     slidesToSlide: 4,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //   },
  // };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1281 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1025 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 501 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

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
    };
    const mockCollection = Array(4).fill(mock);

    setCollections(mockCollection);
  }, []);

  return (
    <div className={styles.container} data-aos="zoom-in-up" data-aos-delay="80" data-aos-duration="3000">
      <div>
        <h1>Colections</h1>
        <Link href="/explore">
          <a>See all</a>
        </Link>
      </div>

      <Carousel responsive={responsive} infinite itemClass={styles.itens}>
        {collections.map((data) => (
          <Link href={`/colection-details/${data.id}`} key={data.id}>
            <div className={styles.cards} style={{ backgroundImage: `url("${data.coverURL}")` }}>
              <div></div>
              <div className={styles.name}>
                <p>{data.name}</p>
              </div>

              <div className={styles.container_image_hover}>
                <img src={data.coverURL} alt="" />
              </div>

              <div className={styles.buttons}>
                <button type="button">Value</button>
                <div className={styles.price}>
                  <h3>{data.price}</h3>
                  {/* <img src="./v6.png" style={{
                    filter: "grayscale(1) brightness(2)",
                    height: "80px",
                  }} alt="" /> */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}

export default Colections;
