import Link from "next/link";

import styles from "./styles.module.scss";

export default function Footer() {
  return (
    <div data-aos="fade-in" data-aos-delay="50" data-aos-duration="2500" className={styles.footer}>
      <footer className={styles.container}>
        <div className={styles.row}>
          <div className={styles.content}>
            {" "}
            <div className={styles.logoFooter}>
              <div className={styles.mainImg}>
                <img className={styles.coin} src="/coin.svg" alt="" data-aos="fade-in" data-aos-delay="80" data-aos-duration="3000" />
                <img className={styles.hand2} src="/hand2.svg" alt="" data-aos="fade-left" data-aos-delay="80" data-aos-duration="3000" />
              </div>
              <div className={styles.nameLogoFooter}>
                <h1 className={styles.logo}>CryptoCanvas</h1>

                <img src="/utility.svg" alt="" />
              </div>
            </div>
          </div>

          <div className={styles.container_mobile}>
            <div className={styles.content}>
              <div className={styles.contact}>
                <h1>Contact</h1>
                <p> kesneymendes@gmail.com.br</p>
                <p>+55 71 986391371</p>
                <p>+55 71 986391371</p>
              </div>
            </div>

            <div className={styles.content}>
              <div className={styles.socialFooter}>
                <h1>Social Media</h1>
                <div className={styles.rowSocial}>
                  <img src="/socialfooter1.svg" alt="" />
                  <img src="./socialfooter2.svg" alt="" />
                  <img src="/socialfooter3.svg" alt="" />
                  <img src="/telegram_icon.svg" alt="" />
                  <img src="/discord_icon.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className={styles.productedBy}>
        <div className={styles.kmv}>
          <span>Copyright © 2022 CryptoCanvas</span>

          <div className={styles.container_developerBy}>
            <Link href="https://github.com/truenski">
              <a href="https://github.com/truenski" target="_blank" rel="noreferrer">
                <img
                  src="/v6.png"
                  style={{
                    filter: "grayscale(1) brightness(2)",
                    height: "80px",
                  }}
                  alt="kesney mendes"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
