/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import styles from "./styles.module.scss";

export const Member = () => (
  <div className={styles.row}>
    <div className={styles.border}>
      <div className={styles.perfil} data-aos="fade-up" data-aos-delay="80" data-aos-duration="2000">
        <img src="./perfil.svg" alt="" />
      </div>

      <div className={styles.info}>
        <h1>Name 1</h1>
        <span>Position Held</span>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, eius saepe quae sapiente omnis iste nam alias, perspiciatis eos repudiandae
          mollitia iusto atque velit? Ullam dolorem omnis eos sit beatae?
        </p>
        <div className={styles.social}>
          <Link href="#">
            <a>
              <img src="./social1.svg" alt="" />{" "}
            </a>
          </Link>
          <Link href="#">
            <a>
              <img src="./social2.svg" alt="" />
            </a>
          </Link>
          <Link href="#">
            <a>
              <img src="./social3.svg" alt="" />
            </a>
          </Link>
          <Link href="#">
            <a>
              <img src="./social4.svg" alt="" />
            </a>
          </Link>
          <Link href="#">
            <a>
              <img src="./social5.svg" alt="" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default function Team() {
  const teamMembers = Array.from({ length: 2 }).map((_, index) => <Member key={index} />);

  return (
    <section className={styles.section_team}>
      <h1 className={styles.title}>Team</h1>
      <div className={styles.container} data-aos="fade-in" data-aos-delay="50" data-aos-duration="3000">
        {teamMembers}
      </div>
    </section>
  );
}
