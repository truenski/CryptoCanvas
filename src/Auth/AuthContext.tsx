/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import { createContext, useEffect, useState } from "react";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import api from "@/services/api";

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

interface RecoverPasswordProps {
  email: string;
}

interface NewPasswordProps {
  token: string;
  password: string;
  passwordConfirmation?: string;
}

interface updateProfileProps {
  name?: string;
  avatar?: any;
  password: string;
  oldPassword: string;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signin: ({ email, password }: SignInCredentials) => void;
  signout: () => void;
  forgotPassword: ({ email }: RecoverPasswordProps) => void;
  newPassword: ({ token, password, passwordConfirmation }: NewPasswordProps) => void;
  updateProfile: ({ avatar, password, oldPassword }: updateProfileProps) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@benft:auth.refreshToken": token } = parseCookies();

    try {
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        if (user) {
          Router.push("/dashboard");
          return;
        }

        api.get("/customers/id").then((response) => {
          const { name, avatarUrl, email } = response.data;
          setUser({ name, avatarUrl, email });
        });
      }
    } catch (err) {
      console.log("Erro: ", err);
      destroyCookie(undefined, "@benft:auth.token");
      destroyCookie(undefined, "@benft:auth.refreshToken");
      Router.push("/login");
    }
  }, []);

  // async function getUserDataByToken(token: string): Promise<void> {
  //   const decoded: any = await decode(token);
  //   const sub: User = JSON.parse(decoded.sub) as User;

  //   setUser(sub);

  //   api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // }

  const signin = async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { name, avatarUrl } = response.data.costumer;
      const { token, refreshToken } = response.data;

      setCookie(undefined, "@benft:auth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookie(undefined, "@benft:auth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        name,
        email,
        avatarUrl,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const signout = async () => {
    destroyCookie({}, "@benft:auth.token", {
      path: "/",
    });
    destroyCookie({}, "@benft:auth.refreshToken", {
      path: "/",
    });
    Router.push("/login");
  };

  const forgotPassword = async ({ email }: RecoverPasswordProps) => {
    try {
      const response = await api.post("/password/forgot", {
        email,
      });

      // console.log("aaaaa: ", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const newPassword = async ({ token, password }: NewPasswordProps) => {
    try {
      const response = await api.post(`/password/reset?token=${token}`, {
        password,
      });

      Router.push("/confirmation");
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfile = async ({ avatar, password, oldPassword, name }: updateProfileProps) => {
    if (avatar) {
      const formData = new FormData();
      formData.append("avatar", avatar, avatar.name);

      try {
        const response = await api.put("/customers", formData, {
          params: {
            name,
            oldPassword,
            password,
          },
        });
      } catch (err) {
        console.log("updateError: ", err);
        throw new Error("Erro ao atualizar dados!");
      }
    }
    // else {
    //   try {
    //     const response = await api.put("customers", null, {
    //       params: {
    //         name,
    //         oldPassword,
    //         password,
    //       },
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signin, signout, forgotPassword, newPassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
