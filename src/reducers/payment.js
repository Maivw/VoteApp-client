import axios from "../config/axiosConfig";
import { saveAs } from "file-saver";
const PAYMENT = "PAYMENT";

export const payFee = (bill) => (dispatch) => {
	dispatch({
		type: PAYMENT,
		bill,
	});
};

export const checkout = (params) => async (dispatch) => {
	const result = await axios.post("/payment/pay", { params });
	console.log("PPPPP", result);
};

const initialState = { bill: {} };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case PAYMENT: {
			return {
				...state,
				bill: action.bill,
			};
		}

		default:
			return state;
	}
}
