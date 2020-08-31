import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../reducers/authentication";
import { Button } from "reactstrap";

function Logout() {
	let history = useHistory();
	const dispatch = useDispatch();
	const onLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		history.push("/login");
	};
	return (
		<div>
			<Button onClick={onLogout} /> Logout
		</div>
	);
}

export default Logout;
