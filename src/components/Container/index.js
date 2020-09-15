import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { setUser } from "../../reducers/authentication";
import Home from "../Home/Home";
import Login from "../Login/Login";

export default function Container() {
	const dispatch = useDispatch();
	//const user = useSelector((state) => state.authentication.user);
	// const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		const pathUserDetail = async () => {
			const domain = "maivw.us.auth0.com";

			try {
				const token = await getAccessTokenSilently({
					audience: `https://voteApp/api`,
					scope: "read:current_user",
				});

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
				console.log("result", result.user);
				// const id = result.user.id;
				// user = { ...user, id };
				dispatch(setUser({ ...user, id: result.user.id }));
			} catch (e) {
				console.log(e.message);
			}
		};

		user && pathUserDetail();
	}, [user]);

	return (
		<>
			{
				<div>
					<Home />
				</div>
			}
		</>
	);
}
