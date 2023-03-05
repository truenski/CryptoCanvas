import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
interface IPartner {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
}

const Partners = () => {
  const [partners, setPartners] = useState<IPartner[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const partnerMock: IPartner = {
      id: "LOREM",
      name: "LOREM",
      url: "/",
      logoUrl: "./perfil.svg",
    };
    const partnersArr = Array(4).fill(partnerMock);
    setPartners(partnersArr);
  }, []);

  return (
    <div className={styles.partnersContainer}>
      <h3 className={styles.about_title}>Partners</h3>
      <div>
        {partners.map((p) => {
          return (
            <a href={p.url} target="_blank" key={p.id} data-aos="fade-in" data-aos-delay="50" data-aos-duration="1500">
              <div>
                <img src={p.logoUrl} alt={p.name} />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Partners;
