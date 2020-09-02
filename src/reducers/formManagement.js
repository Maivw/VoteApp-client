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

export const getForm = (formFound) => (dispatch) => {
	dispatch({
		type: GET_FORM,
		formFound,
	});
};

export const CreateForm = (params) => async (dispatch) => {
	const result = await axios.post("/form", { ...params });

	dispatch(createForm(result.data.form));
};

export const GetForm = (params) => async (dispatch) => {
	console.log("pareammm", params);
	const result = await axios.get(`/form/${params.formId}`, { ...params });
	console.log("pppppp", result.data.form);

	dispatch(getForm(result.data.form));
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

		case GET_FORM: {
			return {
				...state,
				formFound: action.formFound,
			};
		}

		default:
			return state;
	}
}
