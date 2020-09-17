import axios from "../config/axiosConfig";
const PAYMENT = "PAYMENT";
const GET_PAYMENT = "GET_PAYMENT";

export const makePayment = (payment) => (dispatch) => {
	dispatch({
		type: PAYMENT,
		payment,
	});
};
export const checkPayment = (payment) => (dispatch) => {
	dispatch({
		type: GET_PAYMENT,
		payment,
	});
};

export const checkout = (params) => async (dispatch) => {
	const result = await axios.post("/payment", { ...params });
	dispatch(makePayment(result.data.payment));
};

export const checkAlreadyPaid = (params) => async (dispatch) => {
	const result = await axios.get(`/payment/${params.payerId}`, { ...params });
	console.log("yyy", result.data.payment);
	dispatch(checkPayment(result.data.payment));
};

const initialState = { payment: {}, alreadyPaid: false };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case PAYMENT: {
			return {
				...state,
				payment: action.payment,
				alreadyPaid: action.payment.alreadyPaid,
			};
		}

		// case GET_PAYMENT: {
		// 	return {
		// 		...state,
		// 		alreadyPaid: action.payment.alreadyPaid,
		// 	};
		// }

		default:
			return state;
	}
}
