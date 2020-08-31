import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";

export default function Payment({ amount, onSuccess, currency }) {
	return (
		<PayPalButton
			amount={amount}
			currency={currency}
			onSuccess={(details, data) => onSuccess(details, data)}
			options={{
				clientId:
					"ARXVgrBFuxV3XDZBCkwgNLTGJfFbxZfP_h_aDTi3TFcCFSi6HpcxgVlDb_nNsOYe_bBSHWjfKs0vE8Os",
			}}
		/>
	);
}
