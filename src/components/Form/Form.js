import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { CreateForm } from "../../reducers/formManagement";
import { Redirect } from "react-router-dom";
import "./Form.css";
import FormPDF from "./FormPDF";

function Form(props) {
	const { officeTitle, isOpen } = props;
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();
	const userAddress = useSelector((state) => state.address.userAddress);
	const userId = useSelector((state) => state.authentication.user.id);
	const submittedForm = useSelector((state) => state.formManagement.form);

	const [form, setForm] = useState({
		userId,
		candidatename: "",
		officeTitle,
		disctrict: "statewide",
		address: userAddress,
		occupation: "",
	});

	const onChangeFormInput = (e) => {
		e.persist();
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const onCreateForm = (e) => {
		e.preventDefault();
		dispatch(CreateForm(form));
		alert("Submit successfully");
	};

	return (
		<>
			<form>
				<input
					type="text"
					value={form.officeTitle}
					name="officeTitle"
					placeholder="Offices"
					onChange={onChangeFormInput}
				/>
				<input
					type="text"
					value={form.candidatename}
					name="candidatename"
					placeholder="Your Name"
					onChange={onChangeFormInput}
				/>
				<input
					type="text"
					value={form.disctrict}
					name="disctrict"
					placeholder="Disctrict"
					onChange={onChangeFormInput}
				/>
				<input
					type="text"
					value={form.address}
					name="address"
					placeholder="place of residence"
					onChange={onChangeFormInput}
				/>
				<input
					type="text"
					value={form.occupation}
					name="occupation"
					placeholder="Occupation"
					onChange={onChangeFormInput}
				/>
				<button onClick={onCreateForm}>submit</button>
				<FormPDF />
			</form>
		</>
	);
}

export default Form;
