import { AuthContext } from "@/Auth/AuthContext";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import styles from "./email.module.scss";

function email() {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Preencha o campo corretamente");
      return;
    }

    await forgotPassword({ email });

    setEmail("");

    alert("E-mail enviado com sucesso, verifique sua caixa de entrada.");
  };

  return (
    <div className={styles.container_confirmation}>
      <img className={styles.img_polys2} src="/polys_page_login.svg" alt="Polygonos" />
      <img className={styles.img_polys3} src="/polys_page_login_bottom.svg" alt="Polygonos" />
      <Link href="/">
        <h1 className={styles.logo}>CryptoCanvas</h1>
      </Link>
      <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400&display=swap" rel="stylesheet" />
      <div className={styles.login}>
        <div className={styles.cross}>
          <Link href="/login">
            <img src="/cross.svg" alt="" />
          </Link>
        </div>
        <h2 className={styles.active}> Redefinir senha</h2>
        <div className={styles.rectangle}></div>
        <h4 className={styles.senha}>Insira seu e-mail para redefinir a senha.</h4>

        <form action="">
          <span>Insira seu e-mail</span>
          <input type="text" className={styles.text} name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <Link href="/reset">
            <button type="submit" className={styles.signin1} onClick={handleSubmit}>
              Enviar
            </button>
          </Link>
          <hr />
        </form>
      </div>
    </div>
  );
}

export default email;
