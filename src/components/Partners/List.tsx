import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import api from "@/services/api";

import DashboardHeader from "@/pages/dashboardHeader";
import styles from "./list.module.scss";
import Link from "next/link";

interface IPartner {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
}

const List = () => {
  const router = useRouter();

  const [partners, setPartners] = useState<IPartner[]>([]);
  const [loading, setLoading] = useState(true);

  const handleView = (url: string) => {
    window.open(url);
  };

  const handleEdit = (id: string) => {
    router.push(`/partners/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deseja remove?")) {
      await api.delete(`/partner/${id}`);
      setPartners(partners.filter((p) => p.id !== id));
    }
  };

  useEffect(() => {
    async function loadPartners() {
      try {
        const response = await api.get("/partner");

        if (response.data) {
          setPartners(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadPartners();
  }, []);

  return (
    <>
      <DashboardHeader />

      <div className={styles.container}>
        <div>
          <div>
            <h3>Parceiros</h3>
            <Link href="/partners/create">
              <a>Criar Novo</a>
            </Link>
          </div>
          <div className={styles.divider} />
        </div>

        <div className={styles.partners}>
          {partners.map((p) => {
            return (
              <div key={p.id}>
                <div>
                  <a onClick={() => handleView(p.url)}>Ver</a>
                  <a onClick={() => handleEdit(p.id)}>Editar</a>
                  <a onClick={() => handleDelete(p.id)}>Remover</a>
                </div>
                <img src={p.logoUrl} alt={p.name} />
                <p>{p.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default List;
