/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import styles from "./styles.module.scss";

function RoadmapPage() {
  return (
    <>
      <div className={styles.container}>
        <img className={styles.img_polys} src="/bg_polys_page_explorer.svg" alt="Polygonos" />
        <img className={styles.img_polys2} src="/bg_polys_page_explorer2.svg" alt="Polygonos" />
        <img className={styles.img_polys3} src="/bg_polys_page_explorer3.svg" alt="Polygonos" />
        <div className={styles.content}>
          <h1>
            Lear more about <br /> our processes
          </h1>
          <div className={styles.container}>
            <div className={styles.row}>
              <img src="./roadmap1.svg" alt="" className={styles.roadmap1} />

              <div className={styles.info}>
                <h1>Step 01</h1>
                <p>
                  Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the
                </p>
                <img src="./lineRoadmap.svg" alt="" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.info}>
                <h1>Step 02</h1>
                <p>
                  Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the
                </p>
                <img src="./lineRoadmap.svg" alt="" />
              </div>
              <img src="./roadmap2.svg" alt="" className={styles.roadmap2} />
            </div>

            <div className={styles.row}>
              <img src="./roadmap3.svg" alt="" className={styles.roadmap3} />
              <div className={styles.info}>
                <h1>Step 03</h1>
                <p>
                  Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the
                </p>
                <img src="./lineRoadmap.svg" alt="" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.info}>
                {/* <div className={styles.poly}>
              <img src="/poly.svg" alt="" />
            </div> */}

                <h1>Step 04</h1>
                <p>
                  Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the
                </p>
                <img src="./lineRoadmap.svg" alt="" />
              </div>
              <img src="./roadmap4.svg" alt="" className={styles.roadmap4} />
            </div>
          </div>

          <div className={styles.more}>
            <p>Check out our collections</p>
            <a href="/explore">Explore</a>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <h1 className={styles.title}>Learn more about our processes</h1>
      <div className={styles.ContentMobile} data-aos="fade-in" data-aos-delay="50" data-aos-duration="3000">
        <div className={styles.phases}>
          <img src="./roadmap1.svg" alt="" />
          <p className={styles.pLeft}>
            <span> Step 01 </span> <br />
            Once you’ve set up your <br /> wallet of choice, connect it <br /> to OpenSea by clicking the <br />
            wallet icon in the top right <br /> corner. Learn about the
            <br />
            <img src="./lineRoadmap.svg" alt="" />
          </p>
        </div>
        <img className={styles.line} src="line-right.svg" alt="" />
        <div className={styles.phases}>
          <p className={styles.pRight}>
            <span> Step 02 </span> <br />
            Once you’ve set up your <br /> wallet of choice, connect it <br /> to OpenSea by clicking the <br />
            wallet icon in the top right <br /> corner. Learn about the
            <br />
            <img src="./lineRoadmap.svg" alt="" />
          </p>
          <img src="./roadmap2.svg" alt="" />
        </div>
        <img className={styles.line} src="line-left.svg" alt="" />
        <div className={styles.phases}>
          <img src="./roadmap3.svg" alt="" />
          <p className={styles.pLeft}>
            <span> Step 03 </span> <br />
            Once you’ve set up your <br /> wallet of choice, connect it <br /> to OpenSea by clicking the <br />
            wallet icon in the top right <br /> corner. Learn about the
            <br />
            <img src="./lineRoadmap.svg" alt="" />
          </p>
        </div>
        <img className={styles.line} src="line-right.svg" alt="" />
        <div className={styles.phases}>
          <p className={styles.pRight}>
            <span> Step 04 </span> <br />
            Once you’ve set up your <br /> wallet of choice, connect it <br /> to OpenSea by clicking the <br />
            wallet icon in the top right <br /> corner. Learn about the
            <br />
            <img src="./lineRoadmap.svg" alt="" />
          </p>
          <img src="./roadmap4.svg" alt="" />
        </div>

        <div className={styles.more}>
          <p>Check out our collections</p>
          <Link href="/explore">
            <a>Explore</a>
          </Link>
        </div>
        <div className={styles.space} />
      </div>
    </>
  );
}

export default RoadmapPage;
