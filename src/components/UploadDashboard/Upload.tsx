/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

import api from "@/services/api";

import { DashboardHeader } from "../DashboardHeader/DashboardHeader";
import { Data } from "../EditarColections/Data";
import styles from "./upload.module.scss";

interface ISteps {
  id: number;
  text: string;
}

interface INFTImage {
  id: string;
  data: File;
  preview: string;
  close?: () => void;
}

export function DashboardEdit() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [cm, setCM] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [steps, setSteps] = useState(1);
  const [texts, setTexts] = useState<string[]>([]);
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState<INFTImage[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  // useEffect(() => {
  //   if(process.env.NODE_ENV !== 'production') {
  //     setName('Test');
  //     setDescription('Test');
  //     setPrice('0.5');
  //     setQuantity(1)
  //   }
  // }, []);

  const onChangePicture = useCallback((e: any) => {
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setCover(e.target.files[0]);
      });

      reader.readAsDataURL(e.target.files[0]);
    }

    return () => URL.revokeObjectURL(preview);
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      if (cover) formData.append("images", cover, cover.name);

      if (images.length > 0)
        images.map((img) => {
          formData.append("images", img.data, img.data.name);
        });

      const response = await api.post(`/collections`, formData, {
        params: {
          name,
          candyMachineId: cm,
          description,
          price,
          quantity,
          quantityRoadmap: steps,
          text: texts,
        },
      });

      //   if (response.status === 201) {
      //     alert("Coleção cadastrada com sucesso!");
      //     router.push("/dashboard");
      //   }
    } catch (error) {
      console.log("Aqui: ", error);
    }
  };

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImages([...images, { id: uuid(), data: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) }]);
      });

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages(images.filter((i) => i.id !== id));
  };

  const updateSteps = useCallback((id: number, text: string) => {
    let t = texts;
    t[id] = text;

    setTexts(t);
  }, []);

  return (
    <div className={styles.container_upload}>
      <DashboardHeader />

      <div className={styles.grid}>
        <div className={styles.titlePage}>
          <h3 className={styles.text}>Upload de uma nova coleção</h3>
          <div className={styles.line}></div>
        </div>

        <div className={`${styles.fieldsContainer} ${styles.imageUploadArea}`}>
          <h5 className={styles.imgcapa}>Imagem da capa</h5>

          <label htmlFor="file">
            <div className={styles.rectangle}>
              <img src={preview ?? "/frame.svg"} alt="" />
              <h5 className={styles.upload}>Carregue a imagem do NFT</h5>

              <input type="file" id="file" onChange={onChangePicture} />
            </div>
          </label>
        </div>

        <div className={styles.fieldsContainerLeft}>
          <div className={styles.fieldsContainer}>
            <h5 className={styles.nome}> Nome da coleção</h5>
            <input type="text" className={styles.rectanglenome} onChange={(e) => setName(e.target.value)} value={name} />
          </div>

          <div className={styles.fieldsContainer}>
            <h5 className={styles.cm}> CandyMachineID</h5>
            <input type="text" className={styles.cm_field} onChange={(e) => setCM(e.target.value)} value={cm} />
          </div>

          <div className={styles.fieldsContainer}>
            <h5 className={styles.description}>Descrição da coleção</h5>
            <input type="text" className={styles.descriptionField} onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>
        </div>

        {/* <div className={styles.uploadslide}>
          <label htmlFor="file">
            <img src="/frame.svg" alt="" className={styles.uploadimg} />
            <input type="file" id="file" />
          </label>
          <h1 className={styles.upload1}>Carregue a imagem do NFT</h1>
        </div> */}

        <div className={`${styles.fieldsContainer} ${styles.uploadsFiles}`}>
          <div>
            <h5 className={styles.slide}>upload dos slides</h5>
            <div className={styles.container_images}>
              <label htmlFor="nft-images">
                <img src="/frame.svg" alt="" />
                <input type="file" id="nft-images" onChange={handleAddImage} />
                Carregue a imagem do NFT
              </label>
            </div>
          </div>

          <div className={styles.imageUploadSlide}>
            {images.map((item) => (
              <div>
                <div className={styles.image} key={item.id} style={{ backgroundImage: `url(${item.preview})` }}>
                  <button type="button" onClick={() => handleDeleteImage(item.id)}>
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h1 className={styles.info}>*Até 10 imagens</h1>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.fieldsContainer}>
            <h5 className={styles.price}>Preço (SOL)</h5>
            <input className={styles.priceBox} onChange={(e) => setPrice(parseInt(e.target.value || "0", 10))} value={price} />
          </div>

          <div className={styles.fieldsContainer}>
            <h5 className={styles.quantity}>Quantidade da coleção</h5>
            <input className={styles.quantityBox} onChange={(e) => setQuantity(parseInt(e.target.value || "0", 10))} value={quantity} />
          </div>

          <div className={styles.fieldsContainer}>
            <div className={styles.container_step}>
              {Array.from({ length: steps }, (v, k) => k).map((v) => (
                <div key={v}>
                  <h5 className={styles.step}>Texto do Step {v + 1}</h5>
                  <input
                    className={styles.stepBox}
                    value={texts[v]}
                    onChange={(e) => {
                      updateSteps(v, e.target.value);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.fieldsContainer} ${styles.flex}`}>
          <Link href="/dashboard">
            <a className={styles.cancel}>Cancelar</a>
          </Link>

          <a className={styles.save} onClick={handleSubmit}>
            Salvar
          </a>
        </div>
      </div>
    </div>
  );
}
