// import axios from "axios";
// import { parseCookies } from "nookies";

// const cookies = parseCookies();

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers: {
//     Authorization: `Bearer ${cookies["@benft:auth.refreshToken"]}`,
//   },
// });

// // api.interceptors.response.use(
// //   (response) => {
// //     return response;
// //   },
// //   (error) => {
// //     if (error?.response?.status) {
// //       return error.response;
// //     }
// //   }
// // );

// // const { "@benft:auth.token": cookies } = parseCookies();

// // if (cookies) {
// //   // const { token } = JSON.parse(cookies);

// //   api.get('sessions').then(response => {
// //     const {token} = response.data

// //     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// //   })

// // const { token } = JSON.parse(cookies);

// // api.defaults.headers["Authorization"] = `Bearer ${token}`;
// // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// // }

// export { api };
import axios from "axios";
import { parseCookies } from "nookies";

// process.env.NEXT_PUBLIC_API_URL
const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/',
    baseURL: 'http://localhost:3333/cash',
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.status) {
            return error.response;
        }
    }
);

const { "@cashplin:auth": cookies } = parseCookies();

if (cookies) {
    const { token } = JSON.parse(cookies);
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export default api;
