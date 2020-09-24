import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../reducers/authentication";
import { Input, Button } from "reactstrap";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const { logout } = useAuth0();

	const onLogout = () => {
		dispatch(removeUser());
		logout({ returnTo: window.location.origin });
	};
	return (
		<Button
			style={{
				float: "left",
				marginTop: 10,
				marginBottom: 10,
			}}
			color="warning"
			onClick={onLogout}
		>
			Log Out
		</Button>
	);
};

export default LogoutButton;
