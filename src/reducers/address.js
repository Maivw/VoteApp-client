import axios from "../config/axiosConfig";
const GET_ADDRESS = "GET_ADDRESS";
const FIND_OFFICES = "FIND_OFFICES";

export const getAddress = (userAddress) => (dispatch) => {
	dispatch({
		type: GET_ADDRESS,
		userAddress,
	});
};

export const getOffices = (offices) => (dispatch) => {
	dispatch({
		type: FIND_OFFICES,
		offices,
	});
};

export const FindOffices = (params) => async (dispatch) => {
	// const result = await axios.get(
	// 	` https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyBz6nwfaz00TcGhrBTs69sZdNgd0JPVP3g`
	// );

	const response = await fetch(
		`https://www.googleapis.com/civicinfo/v2/representatives?address=${params.address}&key=AIzaSyBz6nwfaz00TcGhrBTs69sZdNgd0JPVP3g`,
		{
			method: "get",
			headers: { "Content-Type": "application/json" },
		}
	);
	if (response.ok) {
		const res = await response.json();
		dispatch(getOffices(res.offices));
	}
};

const initialState = { userAddress: {}, offices: [] };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ADDRESS: {
			return {
				...state,
				userAddress: action.userAddress,
			};
		}
		case FIND_OFFICES: {
			return {
				...state,
				offices: action.offices,
			};
		}

		default:
			return state;
	}
}
