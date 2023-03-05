import Link from "next/link";

import styles from "./main.module.scss";

export default function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.container_input}>
        <input type="text" placeholder="Search" />
        <button type="button">
          <img src="/search.svg" alt="" />
        </button>
      </div>
      <div className={styles.row} data-aos="fade-in" data-aos-delay="50" data-aos-duration="3000">
        <h1>
          Discover collections, <br />
          bring your art and get <br />
          recognized
        </h1>
        <div className={styles.content}>
          <p>The largest NFT sales platform.</p>
          <div className={styles.btnMain}>
            <Link href="/about">
              <button type="button">More</button>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.mainImg}>
          <img className={styles.token} src="/token.svg" alt="" data-aos="fade-in" data-aos-delay="80" data-aos-duration="3000" />
          <img className={styles.hand} src="/hand.svg" alt="" data-aos="fade-left" data-aos-delay="80" data-aos-duration="3000" />
        </div>
      </div>
    </div>
  );
}
