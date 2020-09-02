import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import Payment from "../Payment/Payment";
import { CreateForm, GetForm } from "../../reducers/formManagement";
import { checkout } from "../../reducers/payment.js";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import axios from "../../config/axiosConfig";
import { Table, Button, Modal } from "reactstrap";
import "./Form.css";

function Form({ showForm, officeTitle }) {
	const dispatch = useDispatch();
	const userAddress = useSelector((state) => state.address.userAddress);
	const userId = useSelector((state) => state.authentication.user.id);
	const submittedForm = useSelector((state) => state.formManagement.form);
	console.log("nnn", submittedForm);

	const [form, setForm] = useState({
		userId,
		candidatename: "",
		officeTitle: officeTitle,
		disctrict: "statewide",
		address: userAddress,
		occupation: "",
	});
	const [showPaypal, setShowPaypal] = useState(false);
	const showPaypalButtons = () => {
		setShowPaypal(true);
	};

	const onChangeFormInput = (e) => {
		e.persist();
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const onCreateForm = (e) => {
		e.preventDefault();
		dispatch(CreateForm(form));
	};

	const onViewForm = (e) => {
		e.preventDefault();
		dispatch(GetForm({ formId: submittedForm.id }));
	};

	const paymentHandler = () => {};

	return (
		<Modal isOpen={showForm}>
			{showPaypal && (
				<Payment amount={200} currency={"USD"} onSuccess={paymentHandler} />
			)}

			<div>
				<button onClick={showPaypalButtons}>Pay to get the form</button>

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
					<button onClick={onViewForm}> View</button>
				</form>
			</div>
		</Modal>
	);
}

export default Form;
