import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { checkout, chekcout } from "../../reducers/payment";
import { convertPrice } from "../../utils";
import { Link, Redirect } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormGroup, Label, Input, FormText } from "reactstrap";
import Payment from "../Payment/Payment";
import FormExample from "../Form/FormExample";
import Form from "../Form/Form";
import FormEdit from "../Form/FormEdit";

export default function RunforButton({ offices }) {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authentication.user.id);
	const alreadyPaid = useSelector((state) => state.payment.alredyPaid);
	console.log("alreadyPaid", alreadyPaid);
	console.log("offices", offices);
	const [isPaid, setIsPaid] = useState(false);
	const [modal, setModal] = useState(false);
	const [modalForm, setModalForm] = useState(false);
	const [showPaypal, setShowPaypal] = useState(false);
	const [fee, setFee] = useState(0);
	const showPaypalButtons = () => {
		setShowPaypal(true);
	};
	const paymentHandler = (details) => {
		dispatch(
			checkout({
				payerId: details.payer.payer_id,
				userId,
				emailAddress: details.payer.email_address,
				amount: details.purchase_units[0].amount.value,
				currentcyCode: details.purchase_units[0].amount.currency_code,
				payerName:
					details.payer.name.given_name + " " + details.payer.name.surname,
			})
		);
		setIsPaid(true);
		alert("Transaction completed by " + details.payer.name.given_name);
		setModalForm(true);
	};
	const toggle = () => setModal(!modal);

	const onRunfor = () => {
		setModal(true);
	};
	const onGetAmount = () => {
		let amount = convertPrice("Libertarian");
		setFee(amount);
	};
	const onGetAmountDemocratic = () => {
		let amount = convertPrice("Democratic");
		setFee(amount);
	};
	const onGetAmountRepublican = () => {
		let amount = convertPrice("Republican");
		setFee(amount);
	};
	const onGetAmountOthers = () => {
		let amount = convertPrice("Others");
		setFee(amount);
	};

	if (!isAuthenticated) {
		return <Redirect to="/login" />;
	}
	return (
		<div>
			{isPaid || alreadyPaid ? (
				<>
					<Redirect to="/form" />
					<FormEdit />
				</>
			) : (
				<div>
					<Button onClick={onRunfor}>Run</Button>
					<Modal isOpen={modal} toggle={toggle}>
						<ModalHeader toggle={toggle}>For example</ModalHeader>
						<ModalBody>
							<FormExample />
							{showPaypal && (
								<Payment
									amount={fee}
									currency={"USD"}
									onSuccess={paymentHandler}
								/>
							)}
							<FormGroup tag="party">
								<legend>Are you ....</legend>
								<FormGroup check>
									<Label check>
										<Input
											type="radio"
											name="radio1"
											id="Libertarian"
											value="Libertarian"
											onClick={onGetAmount}
										/>
										Libertarian
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label>
										<Input
											type="radio"
											name="radio1"
											value="Democratic"
											onClick={onGetAmountDemocratic}
										/>
										Democratic
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label>
										<Input
											type="radio"
											name="radio1"
											value="Republican"
											onClick={onGetAmountRepublican}
										/>
										Republican
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label>
										<Input
											type="radio"
											name="radio1"
											value="Other"
											onClick={onGetAmountOthers}
										/>
										Others
									</Label>
								</FormGroup>
							</FormGroup>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={showPaypalButtons}>
								Pay to get the form
							</Button>
							<Button color="secondary" onClick={toggle}>
								Cancel
							</Button>
						</ModalFooter>
					</Modal>
				</div>
			)}
		</div>
	);
}
