import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Payment from "../Payment/Payment";
import { CreateForm } from "../../reducers/formManagement";
import { checkout } from "../../reducers/payment.js";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import axios from "../../config/axiosConfig";
import "./Form.css";

function Form() {
	const dispatch = useDispatch();
	const userAddress = useSelector((state) => state.address.userAddress);
	console.log("nnn", userAddress);
	const [form, setForm] = useState({
		name: "",
		officeTitle: "",
		disctric: "",
		address: "",
		occupation: "",
	});
	const [showPaypal, setShowPaypal] = useState(false);
	const showPaypalButtons = () => {
		setShowPaypal(true);
	};

	const parties = {
		Democratic: 15,
		Republican: 15,
		Libertarian: 5,
		Others: 10,
	};

	const onChangeFormInput = (e) => {
		e.persist();
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const createAndDownloadPDF = (e) => {
		e.preventDefault();
		dispatch(CreateForm(form));
	};

	return (
		<>
			{showPaypal ? (
				<Payment party={parties.Libertarian} />
			) : (
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
							value={form.name}
							name="name"
							placeholder="Your Name"
							onChange={onChangeFormInput}
						/>
						<input
							type="text"
							value={form.disctric}
							name="disctric"
							placeholder="Disctric"
							onChange={onChangeFormInput}
						/>
						<input
							type="text"
							value={userAddress}
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
						<button>View</button>
						<button onClick={createAndDownloadPDF}> Download form</button>
					</form>
				</div>
			)}
		</>
	);
}

export default Form;
