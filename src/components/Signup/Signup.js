import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../reducers/authentication";

function Signup() {
	const token = useSelector((state) => state.authentication.token);
	const [signUpFields, setSignUpFields] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		party: "",
	});
	const dispatch = useDispatch();
	const onChangeSignUpFields = (e) => {
		e.persist();
		const { name, value } = e.target;
		setSignUpFields((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const onSignUp = (e) => {
		e.preventDefault();
		dispatch(signup(signUpFields));
	};

	if (token) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			<form>
				<input
					name="username"
					label="User Name"
					value={signUpFields.username}
					onChange={onChangeSignUpFields}
					placeholder="username"
				/>
				<input
					name="email"
					label="E-mail"
					value={signUpFields.email}
					onChange={onChangeSignUpFields}
					placeholder="email"
				/>

				<input
					type="password"
					name="password"
					label="Password"
					value={signUpFields.password}
					onChange={onChangeSignUpFields}
					placeholder="password"
				/>

				<input
					type="password"
					name="confirmPassword"
					label="Confirm Password"
					value={signUpFields.confirmPassword}
					onChange={onChangeSignUpFields}
					placeholder="Confirm password"
				/>

				<button type="primary" onClick={onSignUp}>
					Register
				</button>
			</form>
		</div>
	);
}

export default Signup;
