import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Input } from "reactstrap";

import { addForm } from "../../reducers/formManagement";
import { useHistory } from "react-router-dom";
import Select from "react-select";

function InputFormScreen(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	const userAddress = useSelector((state) => state.address.userAddress);
	const offices = useSelector((state) => state.address.offices);
	const userId = useSelector((state) => state.authentication.user.id);

	const [officeSelected, setOfficeSelected] = useState();

	const officeTitleOps = useMemo(
		() => offices.map((e, i) => ({ id: i + 1, label: e.name, value: e.name })),
		[]
	);

	const [form, setForm] = useState({
		userId,
		candidateName: "",
		officeTitle: "",
		district: "statewide",
		address: userAddress,
		occupation: "",
	});

	const onCreateForm = (type) => (e) => {
		e.preventDefault();
		dispatch(addForm({ ...form, officeTitle: officeSelected?.value || "" }));
		props.onGetData(
			{ ...form, officeTitle: officeSelected?.value || "" },
			type
		);
	};

	const handleChange = (value) => {
		setOfficeSelected(value);
	};

	const onChangeInput = (e) => {
		e.persist();
		const { name } = e.target;
		setForm((prev) => ({ ...prev, [name]: e.target.value }));
	};

	const backHomePage = () => {
		history.push("/");
	};
	return (
		<div className="container" style={{ color: "#666464" }}>
			<Row className="justify-content-center">
				<Col md="10" lg="11" xl="7">
					<h4 className="text-white mb-4">Please fill out the form</h4>
					<Select
						value={officeSelected}
						onChange={handleChange}
						options={officeTitleOps}
						className="mb-3"
					/>
					<Input
						name="candidateName"
						placeholder="Name"
						className="mb-3"
						onChange={onChangeInput}
						value={form.candidateName}
					/>
					<Input
						name="district"
						placeholder="District"
						className="mb-3"
						onChange={onChangeInput}
						value={form.district}
					/>
					<Input
						name="address"
						placeholder="Address"
						className="mb-3"
						onChange={onChangeInput}
						value={form.address}
					/>
					<Input
						name="occupation"
						placeholder="Occupation"
						className="mb-3"
						onChange={onChangeInput}
						value={form.occupation}
					/>
					<Row className="justify-content-between">
						<Col>
							<Button
								color="warning"
								style={{ height: 40, width: 90 }}
								onClick={onCreateForm("preview")}
							>
								Preview
							</Button>
						</Col>
						<Col className="justify-content-end d-flex">
							<Button color="warning" onClick={onCreateForm("download")}>
								Download
							</Button>
						</Col>
						<Col className="justify-content-end d-flex">
							<Button color="warning" onClick={backHomePage}>
								Back
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
}

export default InputFormScreen;
