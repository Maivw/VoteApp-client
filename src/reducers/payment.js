import axios from "../config/axiosConfig";
const PAYMENT = "PAYMENT";

export const makePayment = (payment) => (dispatch) => {
	dispatch({
		type: PAYMENT,
		payment,
	});
};

export const checkout = (params) => async (dispatch) => {
	const result = await axios.post("/payment", { ...params });
	dispatch(makePayment(result.data.payment));
};

const initialState = { payment: {}, alredyPaid: false };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case PAYMENT: {
			return {
				...state,
				payment: action.payment,
				alredyPaid: true,
			};
		}

		default:
			return state;
	}
}
