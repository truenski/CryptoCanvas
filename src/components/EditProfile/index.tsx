import { AuthContext } from "@/Auth/AuthContext";
import Router from "next/router";
import { FormEvent, useCallback, useContext, useState } from "react";
import { DashboardHeader } from "../DashboardHeader/DashboardHeader";
import styles from "./styles.module.scss";

export function EditProfile() {
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [preview, setPreview] = useState("");
  const [selectFile, setSelectedFile] = useState<any>("");
  const { user, updateProfile } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (name == "" || oldPassword == "" || newPassword == "" || passwordConfirmation == "") {
      alert("Preencha os campos corretamente");
      return;
    } else if (newPassword !== passwordConfirmation) {
      alert("As senhas devem ser iguais.");
      return;
    } else {
      const data = {
        avatar: selectFile,
        password: newPassword,
        oldPassword,
        name,
      };

      try {
        await updateProfile(data);

        alert("Dados alterados com sucesso.");

        setName("");
        setOldPassword("");
        setNewPassword("");
        setPasswordConfirmation("");

        // window.location.href = "/edit-profile";
      } catch (err) {
        alert("Erro ao atualizar dados!");
      }
    }
  };

  const onChangePicture = useCallback((e: any) => {
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSelectedFile(e.target.files[0]);
      });

      reader.readAsDataURL(e.target.files[0]);
    }

    return () => URL.revokeObjectURL(preview);
  }, []);

  const redirectCancel = () => {
    Router.push("/dashboard");
  };

  return (
    <>
      <DashboardHeader />
      <div className={styles.container_edit_profile}>
        <h1>Editar perfil</h1>
        <div className={styles.line}></div>
        <div className={styles.content}>
          <div className={styles.container_image}>
            <p>Sua imagem</p>

            <div className={styles.image}>
              {/* <img src="/img_edit_profile.svg" alt="" /> */}
              <img src={preview.length > 0 ? preview : user?.avatarUrl} alt="" />
              <button type="button">
                Carregue sua imagem <br /> de perfil
                <label htmlFor="file">
                  <input type="file" id="file" onChange={onChangePicture} />
                </label>
              </button>
            </div>
          </div>

          <div className={styles.container_form}>
            <label htmlFor="name">
              Seu nome
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <h1>Alterar Senha</h1>

            <label htmlFor="oldPassword">
              Sua senha atual
              <input id="oldPassword" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value.trim())} />
            </label>

            <label htmlFor="newPassword">
              Nova senha
              <input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value.trim())} />
            </label>

            <label htmlFor="RepitNewPassword">
              Repita a nova senha
              <input
                id="RepitNewPassword"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value.trim())}
              />
            </label>
          </div>

          <div className={styles.mainImg}>
            <img className={styles.token} src="/Group2.svg" alt="" data-aos="fade-left" data-aos-delay="80" data-aos-duration="3000" />
            <img className={styles.hand} src="/Group1.svg" alt="" data-aos="fade-in" data-aos-delay="80" data-aos-duration="3000" />
          </div>
        </div>
        <div className={styles.container_buttons}>
          <button className={styles.btn_cancel} type="button" onClick={redirectCancel}>
            Cancelar
          </button>
          <button className={styles.btn_save} type="button" onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </>
  );
}
