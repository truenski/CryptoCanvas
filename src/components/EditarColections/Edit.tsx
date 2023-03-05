/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import api from "@/services/api";
import { DashboardHeader } from "../DashboardHeader/DashboardHeader";
import { Data } from "./Data";
import styles from "./edit.module.scss";

interface INFTImage {
  id: string;
  data: File;
  preview: string;
  images_collections_url?: string;
}
interface ICollection {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  coverURL: string;
  coverUrl: string;
  stepCollection: { id: string; text: string }[];
  imagesCollection: INFTImage[];
}

export function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [collection, setCollection] = useState<ICollection | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [steps, setSteps] = useState(4);
  const [texts, setTexts] = useState<string[]>(["Step 1", "Step 2", "Step 3", "Step 4"]);
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState<INFTImage[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    async function loadCollection() {
      try {
        const response = await api.get(`/collections/${id}`);
        if (response.data) {
          setCollection(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadCollection();
  }, []);

  const updateSteps = (id: number, text: string) => {
    let t = texts.map((t, index) => {
      if(id === index) {
        return text;
      }
      return t;
    });

    if(!t[id]) {
      t[id] = text;
    }

    setTexts(t)
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

  const handleDeleteImage = async (id: string) => {
    if (collection.imagesCollection.length > 0 || images.length > 0) {
      if (confirm("Deseja remover?")) {
        setImages(images.filter((i) => i.id !== id));

        await api.delete(`/collections/images/${id}`);
      }
    }
  };

  const handleRemoveCover = useCallback(async () => {
    if (collection.coverURL) {
      if (confirm("Deseja remover?")) {
        setPreview(undefined);
        if(collection.coverUrl)
          await api.delete(`/collections/cover`, {data:{ cover: collection.coverUrl }});
      }
    }
  }, [collection]);

  const handleDeleteCollection = useCallback(async () => {
    if (confirm("Deseja remover ?")) {
      await api.delete(`/collections/${id}`);

      alert("Removido com sucesso!");

      await router.push("/dashboard");
    }
  }, [id]);

  useEffect(() => {
    if (collection) {
      setName(collection.name);
      setDescription(collection.description);
      setPrice(collection.price);
      setQuantity(collection.quantity);
      setSteps(collection.stepCollection.filter((sc) => sc.text.length > 0).length);

      setTexts(collection.stepCollection.map((sc) => {
        if(sc.text) {
          return sc.text
        }
        return;
      }));
      setImages(collection.imagesCollection);
      if(collection.coverUrl)
        setPreview(collection.coverURL);
    }
  }, [collection]);

  const handleUpdate = useCallback(async () => {
    try {
      const formData = new FormData();

      if (cover) {
        if (cover instanceof File) formData.append("images", cover, cover.name);
      }

      if (images.length > 0)
        images.map((img) => {
          if (img.data instanceof File) formData.append("image_list", img.data, img.data.name);
        });

        let t =[];

        for(let i = 0; i <steps; i++) {
          t[i] = texts[i]
        }

      const response = await api.put(`/collections`, formData, {
        params: {
          id,
          name,
          description,
          price,
          quantity,
          quantityRoadmap: steps,
          text: t,
        },
      });

      if (response.status === 201) {
        alert("Coleção atualizada com sucesso!");

        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }, [name, description, price, quantity, cover, images, steps, texts]);

  return (
    <div className={styles.container_edit}>
      <DashboardHeader />
      <h3 className={styles.text}>Editar coleção</h3>
      <div className={styles.line}>
        <a className={styles.deleteButton} onClick={handleDeleteCollection}>
          {" "}
          Remover coleção x
        </a>
      </div>

      <h5 className={styles.imgcapa}> Imagem da capa</h5>
      <div className={styles.rectangle}>
        {(collection?.coverUrl || preview) && <button type="button" onClick={handleRemoveCover}>
          X
        </button>}
        <label className={styles.label} htmlFor="cover">
          <img src={preview ?? "/frame.svg"} alt="" />
          <input type="file" id="cover" onChange={onChangePicture} />
          Carregue a imagem do NFT
        </label>
      </div>
      <h5 className={styles.nome}> Nome da coleção</h5>
      <input type="text" className={styles.rectanglenome} onChange={(e) => setName(e.target.value)} value={name} />
      <h5 className={styles.description}>Descrição da coleção</h5>
      <input type="text" className={styles.descriçaõ} onChange={(e) => setDescription(e.target.value)} value={description} />
      <Link href="/dashboard">
        <img src="/frame1.svg" alt="" className={styles.cancel} />
      </Link>
      <a onClick={handleUpdate}>
        <img src="/editbtn.svg" alt="" className={styles.save} />
      </a>

      <div className={styles.price}>Preço (SOL)</div>
      <input className={styles.priceBox} onChange={(e) => setPrice(e.target.value)} value={price} />
      <div className={styles.quantity}>Quantidade da coleção</div>
      <input className={styles.quantityBox} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} value={quantity} />

      <div className={styles.label_roadmaps}>
        <p className={styles.title}> Quantidade de roadmap </p>
        <select id="roadmaps" onChange={(e) => setSteps(parseInt(e.target.value, 10))} value={steps}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      {/* <div className={styles.container_step}>
        {Array.from({ length: steps }, (v, k) => k).map((v) => (
          <div className={styles.label_text_step1} key={v}>
            <div className={styles.step}>Texto do Step {v + 1}</div>
            <input
              className={styles.stepBox}
              type="textarea"
              value={texts[v]}
              onChange={(e) => {
                updateSteps(v, e.target.value);
              }}
            />
          </div>
        ))}
      </div> */}

      <div className={styles.container_step}>
        {Array.from({ length: steps }, (v, k) => k).map((v) => (
          <div key={v}>
            <div className={styles.step}>Texto do Step {v + 1}</div>
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

      <h5 className={styles.slide}>upload dos slides</h5>
      <div className={styles.container_images}>
        <label htmlFor="file">
          <img src="/frame.svg" alt="" />
          <input type="file" id="file" onChange={handleAddImage} />
          Carregue a imagem do NFT
        </label>
        {images.map((item) => (
          <div className={styles.image} key={item.id} style={{ backgroundImage: `url(${item.preview || item.images_collections_url})` }}>
            <button type="button" onClick={() => handleDeleteImage(item.id)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
