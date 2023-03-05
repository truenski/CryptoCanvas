/* eslint-disable jsx-a11y/label-has-associated-control */
import { AuthContext } from "@/Auth/AuthContext";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import styles from "./connect.module.scss";

function Connect() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useContext(AuthContext);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!password || !email) {
      alert("Preencha os campos corretamente");
      return;
    }

    const data = {
      email,
      password,
    };

    await signin(data);
  };

  return (
    <div className={styles.container_login}>
      <img className={styles.img_polys2} src="/polys_page_login.svg" alt="Polygonos" />
      <img className={styles.img_polys3} src="/polys_page_login_bottom.svg" alt="Polygonos" />

      <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400&display=swap" rel="stylesheet" />
      <div className={styles.login}>
        <Link href="/">
          <h1 className={styles.logo}>CryptoCanvas</h1>
        </Link>

        <form method="post" action="/dashboard">
          <span>Login</span>
          <input className={styles.text} name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

          <span>Senha</span>
          <input type="password" className={styles.text} name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Link href="/email">
            <label> Esqueci a senha</label>
          </Link>

          <br />
          <button onClick={handleLogin} type="button" className={styles.signin}>
            Entrar
          </button>
          <hr />
        </form>
      </div>
    </div>
  );
}

export default Connect;
