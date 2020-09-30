import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default function Payment({ amount, onSuccess, currency }) {
	return (
		<>
			<PayPalButton
				amount={amount}
				currency={currency}
				onSuccess={(details, data) => onSuccess(details, data)}
				options={{
					clientId: process.env.REACT_APP_CLIENT_ID,
				}}
			/>
		</>
	);
}
