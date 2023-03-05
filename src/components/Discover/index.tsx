import Link from "next/link";

import styles from "./styles.module.scss";

export default function Discover() {
  return (
    <div className={styles.container} data-aos="fade-in" data-aos-delay="50" data-aos-duration="2500">
      <div className={styles.row}>
        <h1>Discover our collectios</h1>
        <Link href="/explore">
          <button type="button" data-aos="zoom-in-up" data-aos-delay="50" data-aos-duration="2500">
            Discover
          </button>
        </Link>
      </div>
      <div className={styles.row}>
        <img src="./discover.svg" alt="" data-aos="zoom-in-left" data-aos-delay="50" data-aos-duration="2500" />
      </div>
    </div>
  );
}
