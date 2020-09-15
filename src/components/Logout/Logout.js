import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../reducers/authentication";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const { logout } = useAuth0();

	const onLogout = () => {
		dispatch(removeUser());
		logout({ returnTo: window.location.origin });
	};
	return <button onClick={onLogout}>Log Out</button>;
};

export default LogoutButton;
