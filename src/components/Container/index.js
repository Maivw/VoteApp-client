import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { setUser } from "../../reducers/authentication";
import Home from "../Home/Home";

export default function Container() {
	const dispatch = useDispatch();
	const { user, getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		const pathUserDetail = async () => {
			const domain = "maivw.us.auth0.com";

			try {
				const token = await getAccessTokenSilently({
					audience: `https://voteApp/api`,
					scope: "read:current_user",
				});

				const res = await fetch(`https://voteappbackend.herokuapp.com/users`, {
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
				dispatch(
					setUser({
						...user,
						id: result.user.id,
						token,
						alreadyPaid: result.user.alreadyPaid,
					})
				);
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
