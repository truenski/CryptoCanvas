import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import api from "@/services/api";
import DashboardHeader from "@/pages/dashboardHeader";
import styles from "./create.module.scss";

const Create: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("url", site);
      formData.append("logo_file", logo, logo.name);

      const response = await api.post("/partner/create", formData);

      if (response.status === 200) {
        alert("Parceiro salvo com sucesso.");
        router.push("/partners");
      }
    } catch (error) {
      error.response && alert(error.response.data.message);
      alert("Erro no cadastro!");
      console.log(error);
    }
  }, [name, site]);

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

  const onRemovePicture = () => {
    setPreview(null);
    setLogo(null);
  };

  return (
    <>
      <div className={styles.containerEdit}>
        <DashboardHeader />

        <div className={styles.subContainer}>
          <div className={styles.gridAreaText}>
            <h3 className={styles.text}>Adicionar Parceiros</h3>
            <div className={styles.line} />
          </div>

          <div className={styles.imageGridArea}>
            <h5 className={styles.imgcapa}>Logo</h5>

            <div className={styles.rectangle}>
              {preview && (
                <button type="button" onClick={onRemovePicture}>
                  X
                </button>
              )}

              <label className={styles.label} htmlFor="cover">
                <img src={preview ?? "/frame.svg"} alt="" />
                <input type="file" id="cover" onChange={onChangePicture} />
                Carregue a logo do parceiro
              </label>
            </div>
          </div>

          <div className={styles.fieldsArea}>
            <h5 className={styles.nome}>Nome do Paceiro</h5>
            <input type="text" className={styles.rectanglenome} onChange={(e) => setName(e.target.value)} value={name} />

            <h5 className={styles.description}> Url do parceiro</h5>
            <input type="text" className={styles.descriptionField} onChange={(e) => setSite(e.target.value)} value={site} />
          </div>

          <div className={styles.buttonsContainer}>
            <Link href="/partners">
              <div className={styles.buttonCancel}>
                <button className={styles.cancel}>Cancelar</button>
              </div>
            </Link>

            <a className={styles.save} onClick={handleSubmit}>
              Salvar
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
