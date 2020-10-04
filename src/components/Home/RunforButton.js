import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { checkout } from "../../reducers/payment";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormGroup, Label, Input } from "reactstrap";
import Payment from "../Payment/Payment";
import PdfPreview from "../Form/PdfPreview";
import { parties, PartiesConst } from "../../utils";
import "./RunforButton.css";

const stateForm = [
	{ id: PartiesConst.LIBERTARIAN, name: PartiesConst.LIBERTARIAN },
	{ id: PartiesConst.DEMOCRATIC, name: PartiesConst.DEMOCRATIC },
	{ id: PartiesConst.REPUBLICAN, name: PartiesConst.REPUBLICAN },
	{ id: PartiesConst.OTHERS, name: PartiesConst.OTHERS },
];

export default function RunforModal(props) {
	const history = useHistory();
	const dispatch = useDispatch();

	const { loginWithRedirect, isAuthenticated } = useAuth0();

	const userEmail = useSelector((state) => state.authentication.user.email);
	const user = useSelector((state) => state.authentication.user);

	const [showPaypal, setShowPaypal] = useState(false);
	const [isParty, setIsParty] = useState(null);
	const [isError, setIsError] = useState(false);
	const { isOpen, toggle } = props;

	const showPaypalButtons = () => {
		if (!isAuthenticated) {
			loginWithRedirect();
		}
		if (!isParty) {
			setIsError(true);
			return;
		}
		setShowPaypal(true);
	};
	const paymentHandler = (details) => {
		if (details.status !== "COMPLETED") {
			return;
		}
		dispatch(
			checkout({
				payerId: details.payer.payer_id,
				userId: user?.id,
				paymentEmail: details.payer.email_address,
				amount: details.purchase_units[0].amount.value,
				currentcyCode: details.purchase_units[0].amount.currency_code,
				payerName:
					details.payer.name.given_name + " " + details.payer.name.surname,
				userEmail,
				alreadyPaid: true,
			})
		);
		toggle();
		history.push("/form");
	};

	const onChangeSelect = (e) => {
		setIsParty(e.target.name);
		setIsError(false);
	};

	return (
		<div className="preview__box">
			<Modal
				style={{
					maxWidth: "700px",
					width: "70%",
					maxHeight: "calc(100vh - 200px)",
					alignSelf: "center",
				}}
				isOpen={isOpen}
				toggle={toggle}
			>
				<ModalHeader toggle={toggle}>For example</ModalHeader>
				<ModalBody>
					<PdfPreview />
					<div style={{ marginTop: 20 }}>
						{showPaypal && (
							<Payment
								amount={parties[isParty]}
								currency={"USD"}
								onSuccess={paymentHandler}
							/>
						)}
					</div>
					<FormGroup tag="fieldset" style={{ color: "#666464", marginTop: 10 }}>
						<legend>Which party will you run for office under?</legend>
						{stateForm.map((e, i) => {
							return (
								<FormGroup check key={i}>
									<Label check>
										<Input
											type="radio"
											name={e.name}
											id={e.id}
											value={e.name}
											checked={isParty === e.name}
											onChange={onChangeSelect}
										/>
										{e.name}
									</Label>
								</FormGroup>
							);
						})}
						{isError && (
							<div className="text-danger">You have to select an option.</div>
						)}
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<Button color="warning" onClick={showPaypalButtons}>
						Pay to get the form
					</Button>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
