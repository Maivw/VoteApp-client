import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { convertPrice } from "../../utils";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export default function Payment({ amount, onSuccess, currency }) {
	return (
		<>
			{/* <FormGroup tag="fieldset">
				<legend>Are you ....</legend>
				<FormGroup check>
					<Label check>
						<Input type="radio" name="radio1" />
						Libertarian
					</Label>
				</FormGroup>
				<FormGroup check>
					<Label check>
						<Input type="radio" name="radio1" /> Democratic
					</Label>
				</FormGroup>
				<FormGroup check>
					<Label check>
						<Input type="radio" name="radio1" />
						Republican
					</Label>
				</FormGroup>
				<FormGroup check>
					<Label check>
						<Input type="radio" name="radio1" />
						Others
					</Label>
				</FormGroup>
			</FormGroup> */}
			<PayPalButton
				amount={amount}
				currency={currency}
				onSuccess={(details, data) => onSuccess(details, data)}
				options={{
					clientId:
						"ARXVgrBFuxV3XDZBCkwgNLTGJfFbxZfP_h_aDTi3TFcCFSi6HpcxgVlDb_nNsOYe_bBSHWjfKs0vE8Os",
				}}
			/>
		</>
	);
}
