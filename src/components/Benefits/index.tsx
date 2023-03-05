import styles from "./styles.module.scss";

function Benefits() {
  return (
    <div className={styles.container}>
      <img className={styles.img_polys} src="/bg_polys_page_explorer.svg" alt="Polygonos" />
      <img className={styles.img_polys2} src="/bg_polys_page_explorer2.svg" alt="Polygonos" />
      <div className={styles.content}>
        <h1 className={styles.title}>Discover our exclusive benefits</h1>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
          words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
          source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero,
          written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem
          ipsum dolor sit amet.., comes from a line in section 1.10.32. <br /> <br /> <br /> The standard chunk of Lorem Ipsum used since the 1500s is
          reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in
          their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. <br /> <br /> <br /> The standard chunk
          of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et
          Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
        </p>
      </div>
    </div>
  );
}

export default Benefits;
