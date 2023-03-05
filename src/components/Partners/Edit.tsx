import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

import api from "@/services/api";

import DashboardHeader from "@/pages/dashboardHeader";
import styles from "./edit.module.scss";

const Edit: React.FC = () => {

  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('');
  const [site, setSite] = useState('');
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('url', site);

      if(logo) {
        formData.append('logo_file', logo, logo.name);
      }

      const response = await api.put(`/partner/edit/${id}`, formData);

      if(response.status === 200) {
        alert('Parceiro atualizado com sucesso.');
        router.push('/partners');
      }
    } catch (error) {
      console.log(error);
    }
  }, [name, site, logo, id]);

  const onChangePicture = useCallback((e: any) => {
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setLogo(e.target.files[0]);
      });

      reader.readAsDataURL(e.target.files[0]);
    }

    return () => URL.revokeObjectURL(preview);
  }, []);

  const handleDelete = () => {
    setPreview(null);
  }

  useEffect(() => {
    async function loadPartner() {
      try {
        const response = await api.get(`/partner/${id}`);

        if(response.data) {
          setName(response.data.name);
          setSite(response.data.url);
          setPreview(response.data.logoUrl)
        }

      } catch (error) {
        console.log(error);
      }
    }
    loadPartner();
  } ,[id]);

  return (
    <>
      <div className={styles.container_edit}>
      <DashboardHeader />
      <h3 className={styles.text}>Editar Parceiro</h3>
      <div className={styles.line} />

      <h5 className={styles.imgcapa}>Logo</h5>
      <div className={styles.rectangle}>
        {preview && <button type="button" onClick={handleDelete}>X</button>}
        <label className={styles.label} htmlFor="cover">
          <img src={preview ?? '/frame.svg'} alt="" />
          <input type="file" id="cover" onChange={onChangePicture} />
          Carregue a logo do parceiro
        </label>
      </div>
      <h5 className={styles.nome}> Nome do Paceiro</h5>
      <input
        type="text"
        className={styles.rectanglenome}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <h5 className={styles.description}> Url do parceiro</h5>
      <input
        type="text"
        className={styles.descriçaõ}
        onChange={(e) => setSite(e.target.value)}
        value={site}
      />

      <Link href="/partners">
        <img src="/frame1.svg" alt="" className={styles.cancel} />
      </Link>

      <a
        className={styles.save}
        onClick={handleSubmit}
      >
        Salvar
      </a>
      </div>
    </>
  );
}

export default Edit;
