import axios from "../config/axiosConfig";
import { saveAs } from "file-saver";
const CREATE_FORM = "CREATE_FORM";
const GET_FORM = "GET_FORM";

export const createForm = (form) => (dispatch) => {
	dispatch({
		type: CREATE_FORM,
		form,
	});
};

export const CreateForm = (params) => async (dispatch) => {
	debugger;

	dispatch(createForm());
};

const initialState = { form: {} };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_FORM: {
			return {
				...state,
				form: action.form,
			};
		}

		default:
			return state;
	}
}
