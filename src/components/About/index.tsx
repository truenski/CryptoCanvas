import Team from "../Team";
import styles from "./styles.module.scss";

function About() {
  return (
    <div className={styles.container}>
      <img className={styles.img_polys} src="/bg_polys_page_explorer.svg" alt="Polygonos" />
      <img className={styles.img_polys2} src="/bg_polys_page_explorer2.svg" alt="Polygonos" />
      <div className={styles.content}>
        <h1 className={styles.title}>Learn more about CryptoCanvas</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil porro vero, quidem laboriosam neque praesentium rem corrupti, veniam fuga
          quisquam iusto perferendis repellat iure. Cumque, quidem? Aliquam impedit veritatis soluta! Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Magni asperiores earum, quam cum nemo repudiandae officiis non eveniet atque facilis dolore nobis blanditiis quisquam esse
          necessitatibus saepe! Consequatur, quisquam sequi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur cupiditate quasi
          quas aliquam doloribus reprehenderit eum, tempora iste. Est nobis suscipit pariatur libero reiciendis necessitatibus eaque et laboriosam
          possimus esse!
        </p>
      </div>
    </div>
  );
}

export default About;
