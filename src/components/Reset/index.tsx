import { AuthContext } from "@/Auth/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import { FormEvent, useContext, useState } from "react";

import styles from "./reset.module.scss";

function Resetpwd() {
  const router = useRouter();
  const { token }: any = router.query;

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { newPassword } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!password || !passwordConfirmation) {
      alert("Preencha os campos corretamente");
      return;
    }

    if (password != passwordConfirmation) {
      alert("As senhas devem ser iguais");
      return;
    }

    if (!token) {
      Router.push("/email");
      return;
    }

    const data = {
      token,
      password,
    };

    await newPassword(data);
  };

  return (
    <div className={styles.container_login}>
      <img className={styles.img_polys2} src="/polys_page_login.svg" alt="Polygonos" />
      <img className={styles.img_polys3} src="/polys_page_login_bottom.svg" alt="Polygonos" />
      <Link href="/">
        <h1 className={styles.logo}>CryptoCanvas</h1>
      </Link>

      <div className={styles.login}>
        <div className={styles.cross}>
          <img src="/cross.svg" alt="" />
        </div>
        <h2 className={styles.active}> Redefinir senha</h2>
        <div className={styles.rectangle}></div>

        <form action="">
          <h1>Nova senha</h1>
          <input type="password" className={styles.text} name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <h1>Confirma nova senha</h1>

          <input
            type="password"
            className={styles.text}
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />

          <Link href="/confirmation">
            <button type="button" className={styles.signin} onClick={handleSubmit}>
              Salvar nova senha
            </button>
          </Link>
          <hr />
        </form>
      </div>
    </div>
  );
}

export default Resetpwd;
