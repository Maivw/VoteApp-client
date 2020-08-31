import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import scriptLoader from "react-async-script-loader";
import { Link } from "react-router-dom";

export default function Payment({ party }) {
	const [paidFor, setPaidFor] = useState(false);
	const [error, setError] = useState(null);
	const paypalRef = useRef();

	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions) => {
					return actions.order.create({
						purchase_units: [
							{
								description: "Nomination form 2021",
								amount: {
									currency_code: "USD",
									value: party,
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();
					setPaidFor(true);
					console.log(order);
				},
				onError: (err) => {
					setError(err);
					console.error(err);
				},
			})
			.render(paypalRef.current);
	}, [party]);

	if (paidFor) {
		return (
			<div>
				<h1>Congrats!</h1>
				<img alt="nomination form" />
				<Link to="/form">
					<button>Back</button>
				</Link>
			</div>
		);
	}

	return (
		<div>
			{error && <div>Uh oh, an error occurred! {error.message}</div>}
			<h1>
				<p>Pay to download</p>
			</h1>
			<div ref={paypalRef} />
		</div>
	);
}
