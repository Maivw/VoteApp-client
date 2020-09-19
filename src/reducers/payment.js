import axios from "../config/axiosConfig";
import { updateUserPayment } from './authentication'
const PAYMENT = "PAYMENT";
const GET_PAYMENT = "GET_PAYMENT";

export const checkPayment = (payment) => (dispatch) => {
	dispatch({
		type: GET_PAYMENT,
		payment,
	});
};

export const checkout = (params) => async (dispatch) => {
	await axios.post("/payment", { ...params });
	dispatch(updateUserPayment(params.alreadyPaid));
};

const initialState = { payment: {}, alreadyPaid: false };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case PAYMENT: {
			return {
				...state,
				// payment: action.payment,
				// alreadyPaid: action.payment.alreadyPaid,
			};
		}

		default:
			return state;
	}
}
