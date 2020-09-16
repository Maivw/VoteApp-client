import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { checkout, chekcout } from "../../reducers/payment";
import { convertPrice } from "../../utils";
import { Link, Redirect } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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
									amount={200}
									currency={"USD"}
									onSuccess={paymentHandler}
								/>
							)}
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={showPaypalButtons}>
								Pay to get the for
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
