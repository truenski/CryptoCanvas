import Link from "next/link";

import styles from "./confirmation.module.scss";

function Confirmation() {
  return (
    <div className={styles.container_confirmation}>
      <img className={styles.img_polys2} src="/polys_page_login.svg" alt="Polygonos" />
      <img className={styles.img_polys3} src="/polys_page_login_bottom.svg" alt="Polygonos" />
      <Link href="/">
        <h1 className={styles.logo}>CryptoCanvas</h1>
      </Link>
      <div className={styles.login}>
        <div className={styles.mainImg}>
          <img className={styles.token} src="/Group2.svg" alt="" data-aos="fade-left" data-aos-delay="80" data-aos-duration="3000" />
          <img className={styles.hand} src="/Group1.svg" alt="" data-aos="fade-in" data-aos-delay="80" data-aos-duration="3000" />
        </div>

        <h2>
          {" "}
          Prontinho,
          <br /> Senha alterada com sucesso!{" "}
        </h2>
        {/* <Link href="/Login">
          <img src="/entrar.png" alt="" className={styles.btn} />
        </Link> */}
        <Link href="/login">
          <button type="submit" className={styles.btn}>
            Entrar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Confirmation;
