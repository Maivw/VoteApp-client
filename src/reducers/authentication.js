const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";
const REMOVE_USER = "REMOVE_USER";
export const setUser = (user) => {
	return { type: SET_USER, user };
};
export const updateUserPayment = (paymentStatus) => {
	return { type: UPDATE_USER, paymentStatus };
};

export const removeUser = (user) => {
	return { type: REMOVE_USER };
};

const initialState = {
	user: {},
};
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER: {
			return {
				...state,
				user: action.user,
			};
		}
		case UPDATE_USER: {
			console.log("action.paymentStatus", action.paymentStatus);
			return {
				...state,
				user: { ...state.user, alreadyPaid: action.paymentStatus },
			};
		}

		case REMOVE_USER: {
			return {
				...state,
				user: {},
			};
		}

		default:
			return state;
	}
}
