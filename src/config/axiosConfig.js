import { create } from "axios";
import { store } from "../index";
// const KEY = "AIzaSyAuevnfFWR-Lune1uQnOPgcjQXoy0SvgR4";

const api = create({
	// baseURL: "https://www.googleapis.com/civicinfo/v2/representatives",
	baseURL: "http://localhost:8080",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	timeout: 60000,
});

api.interceptors.request.use((config) => {
	const state = store.getState();
	const token = state.authentication.user.token;
	console.log("TOKEN", token);

	return {
		...config,
		headers: { ...config.headers, Authorization: `Bearer ${token}` },
	};
});

// Add a response interceptor
// api.axiosInstance.interceptors.response.use((response) => response, (error) => {
//   // Do something with response error
//   if (error.response.status === 401) {
//     window.alert('Something went wrong!. Please login again');  //eslint-disable-line
//     // window.location.reload();
//     store.dispatch(removeToken());
//     window.location.href = '/#/login';
//   }
//   return Promise.reject(error.response);
// });

export default api;
