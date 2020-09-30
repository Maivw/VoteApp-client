import { create } from "axios";
import { store } from "../index";

const api = create({
	baseURL: "https://voteappbackend.herokuapp.com",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	timeout: 60000,
});

api.interceptors.request.use((config) => {
	const state = store.getState();
	const token = state.authentication.user.token;
	return {
		...config,
		headers: { ...config.headers, Authorization: `Bearer ${token}` },
	};
});

export default api;
