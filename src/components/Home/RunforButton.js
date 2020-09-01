import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, FindOffices } from "../../reducers/address";
import { Link } from "react-router-dom";
import { Table, Button } from "reactstrap";
import Form from "../Form/Form";
export default function RunforButton({ officeTitle }) {
	const [showForm, setShowForm] = useState(false);
	const onRunfor = () => {
		setShowForm(true);
	};
	return (
		<>
			<Button onClick={onRunfor}>Run </Button>
			<Form officeTitle={officeTitle} showForm={showForm} />
		</>
	);
}
