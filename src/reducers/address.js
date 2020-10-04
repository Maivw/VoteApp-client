const GET_ADDRESS = "GET_ADDRESS";
const SET_OFFICES = "SET_OFFICES";

export const getAddress = (userAddress) => (dispatch) => {
	dispatch({
		type: GET_ADDRESS,
		userAddress,
	});
};

export const getOffices = (offices) => (dispatch) => {
	dispatch({
		type: SET_OFFICES,
		offices,
	});
};

export const findOffices = (params) => async (dispatch) => {
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
		case SET_OFFICES: {
			return {
				...state,
				offices: action.offices,
			};
		}

		default:
			return state;
	}
}
