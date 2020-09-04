import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "../Home/Home";

export default function Container() {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

	console.log("user", user);

	useEffect(() => {
		console.log("aaa ", user);
		const pathUserDetail = async () => {
			const domain = "maivw.us.auth0.com";

			try {
				console.log("mmm");
				const token = await getAccessTokenSilently({
					audience: `https://voteApp/api`,
					scope: "read:current_user",
				});
				console.log("bbb", user);

				const res = await fetch(`http://localhost:8080/users`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						nickname: user.nickname,
						email: user.email,
						picture: user.picture,
					}),
				});

				const result = await res.json();
				console.log("ccc", result);
			} catch (e) {
				console.log(e.message);
			}
		};

		user && pathUserDetail();
	}, [user]);

	return <div>hello</div>;
}
