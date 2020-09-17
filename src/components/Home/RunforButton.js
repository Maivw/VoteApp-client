import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { checkout, checkAlreadyPaid } from "../../reducers/payment";
import { convertPrice } from "../../utils";
import { Redirect } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormGroup, Label, Input } from "reactstrap";
import Payment from "../Payment/Payment";
import FormExample from "../Form/FormExample";
import Form from "../Form/Form";

export default function RunforModal(props) {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authentication.user.id);
	// const payerId = useSelector((state) => state.payment.payment.payerId);
	const alreadyPaid = useSelector((state) => state.payment.alreadyPaid);
	// const checkPaid =() => {

	// 	dispatch(checkAlreadyPaid({ payerId }));
	// }

	const [showPaypal, setShowPaypal] = useState(false);
	const [fee, setFee] = useState(0);
	const { isOpen, toggle, offices, showFormToFill } = props;

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
		alert("Transaction completed by " + details.payer.name.given_name);
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

	console.log("payyyy", alreadyPaid);
	return (
		<div>
			{alreadyPaid ? (
				<>
					<Form offices={offices} showFormToFill={showFormToFill} />
				</>
			) : (
				<div>
					<Modal isOpen={isOpen} toggle={toggle}>
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
