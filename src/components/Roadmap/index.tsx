import styles from "./styles.module.scss";

export default function Roadmap() {
  return (
    <>
      <div className={styles.rocketContent} data-aos="fade-in" data-aos-delay="50" data-aos-duration="3000">
        <h1>Roadmap</h1>
        <div data- className={styles.imageRocket}>
          <div>
            <p className={styles.fase4} data-aos="slide-up" data-aos-delay="50" data-aos-duration="3000">
              <span> Step 01 </span> <br /> Lorem ipsum dolor sit amet <br /> consectetur, adipisicing elit. <br /> aliquid expedita eaque fugit!{" "}
              <br /> Quibusdam atque autem quaerat <br /> nemo enim earum illum?
              <br /> <img src="./lineRoadmap.svg" alt="" />
            </p>
          </div>
          <div>
            <p className={styles.fase2} data-aos="slide-up" data-aos-delay="50" data-aos-duration="3000">
              <span> Step 4 </span> <br /> Lorem ipsum dolor sit amet <br /> consectetur, adipisicing elit. <br /> aliquid expedita eaque fugit!{" "}
              <br /> Quibusdam atque autem quaerat <br /> nemo enim earum illum?
              <br /> <img src="./lineRoadmap.svg" alt="" />
            </p>
          </div>
          <div className={styles.divFase3} data-aos="slide-up" data-aos-delay="50" data-aos-duration="3000">
            <p className={styles.fase3}>
              <span> Step 02 </span> <br /> Lorem ipsum dolor sit <br /> consectetur, adipisicing <br /> aliquid expedita eaque <br /> Quibusdam atque
              autem <br /> nemo enim earum illum?
              <br /> <img src="./lineRoadmap.svg" alt="" />
            </p>
          </div>
          <div>
            <p className={styles.fase1} data-aos="slide-up" data-aos-delay="50" data-aos-duration="3000">
              <span> Step 03 </span> <br /> Lorem ipsum dolor sit <br /> consectetur, adipisicing. <br /> aliquid expedita eaque! <br /> Quibusdam
              atque autem <br /> nemo enim earum illum?
              <br /> <img src="./lineRoadmap.svg" alt="" />
            </p>
          </div>
        </div>

        <div className={styles.more} data-aos="fade-in" data-aos-delay="50" data-aos-duration="2500">
          <p>Learn more about our process</p>
          <a href="/" data-aos="fade-up" data-aos-delay="80" data-aos-duration="2000">
            More
          </a>
        </div>
        <div className={styles.space} />
      </div>
      <h1 className={styles.title}>Roadmap</h1>
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
          <p>Learn more about our process</p>
          <a href="/roadmap">More</a>
        </div>
        <div className={styles.space} />
      </div>
    </>
  );
}
