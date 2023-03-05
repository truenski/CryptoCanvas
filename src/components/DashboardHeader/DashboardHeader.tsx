/* eslint-disable no-undef */
import { useCallback, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./dashboardHead.module.scss";
import { AuthContext } from "@/Auth/AuthContext";

export function DashboardHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const { user, signout } = useContext(AuthContext);

  const { asPath } = useRouter();

  const getActiveIcon = useCallback(
    (active_icon, inactive_icon, path) => {
      if (asPath.startsWith(path)) {
        return active_icon;
      }

      return inactive_icon;
    },
    [asPath]
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_content}>
          <Link href="/">
            <img className={styles.logo} src="/CryptoCanvas.svg" alt="" />
          </Link>

          <button className={styles.menu_hamburguer_mobile} type="button" onClick={() => setOpenMenu(!openMenu)}>
            <img src="/menu_hamburguer_mobile.svg" alt="" />
          </button>

          {openMenu && (
            <div className={styles.menuMobile}>
              <button type="button" className={styles.btn_close} onClick={() => setOpenMenu(!openMenu)}>
                <img src="button_close.svg" alt="botão fechar" />
              </button>

              <ul className={styles.menu_options}>
                <li>
                  <div className={styles.container_profile_mobile}>
                    <Link href="/edit-profile">
                      <div>
                        <img src={user?.avatarUrl} alt="" />
                      </div>
                    </Link>
                    <span className={styles.profile_name}>{user?.name}</span>
                  </div>
                </li>
                <li className={styles.option1}>
                  <Link href="/dashboard">Página das Coleções</Link>
                </li>
                <li className={styles.option2}>
                  <Link href="/upload">Adicionar Coleção</Link>
                </li>

                <li className={styles.option3}>
                  {/* <Link href="/login">Sair</Link> */}
                  <button onClick={signout}>Sair</button>
                </li>

                {/* <li className={styles.option4}>
                  <img className={styles.logo} src="/logo_mobile_dashboard.svg" alt="logo" />
                </li> */}
              </ul>

              <div className={styles.image}>
                <h1 className={styles.logo}>CryptoCanvas</h1>
              </div>
            </div>
          )}

          <h1>Welcome, {user?.name}</h1>

          <div className={styles.container_profile}>
            <span className={styles.profile_name}>{user?.name}</span>
            {/* <img src="/profileImg.png" alt="" /> */}
            <div>
              <img src={user?.avatarUrl} alt="" />
            </div>
            <div className={styles.open_edit}>
              <Link href="/edit-profile">Editar perfil </Link>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.side}>
        <div className={styles.sideflex}>
          <div className={styles.icons}>
            <Link href="/dashboard">
              <img className={styles.icon1} src={getActiveIcon("/clipboard-active.svg", "/clipboard.svg", "/dashboard")} alt="" />
            </Link>
          </div>
          <Link href="/upload">
            <img className={styles.icon2} src={getActiveIcon("/upload-active.svg", "/upload.svg", "/upload")} alt="" />
          </Link>
          <Link href="/partners">
            <img className={styles.icon4} src={getActiveIcon("/partners-active.svg", "/partners.svg", "/partners")} alt="" />
          </Link>
        </div>

        {/* <Link href="/Login">
          <img className={styles.icon3} src="/logout.svg" alt="" />
        </Link> */}
        <div>
          <button onClick={signout}>
            <img className={styles.icon3} src="/logout.svg" alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
