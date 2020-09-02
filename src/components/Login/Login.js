import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import { login } from "../../reducers/authentication";
import "./Login.css";

export default function Login() {
	const token = useSelector((state) => state.authentication.token);
	const dispatch = useDispatch();
	const [loginFields, setLoginFields] = useState({
		email: "demo@gmail.com",
		password: "password",
	});

	const onChangeInputFiels = (e) => {
		e.persist();
		const { value, name } = e.target;
		setLoginFields((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const onLogin = (e) => {
		e.preventDefault();
		dispatch(login(loginFields));
	};

	if (token) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			<form>
				<h1>Sign in</h1>
				<input
					label="Email"
					name="email"
					value={loginFields.email}
					onChange={onChangeInputFiels}
				/>

				<input
					type="password"
					label="Password"
					name="password"
					value={loginFields.password}
					onChange={onChangeInputFiels}
				/>

				<button type="primary" onClick={onLogin}>
					Login
				</button>
			</form>
		</div>
	);
}
