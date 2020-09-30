import axios from "../config/axiosConfig";
const CREATE_FORM = "CREATE_FORM";
const GET_FORM = "GET_FORM";
const GET_EXAMPLE_FORM = "GET_EXAMPLE_FORM";

export const getExampleForm = (exampleForm) => (dispatch) => {
	dispatch({
		type: GET_EXAMPLE_FORM,
		exampleForm,
	});
};

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

export const fetchExampleForm = (params) => async (dispatch) => {
	const result = await axios.get(
		"/uploads/StateNominationPaperPoliticalBodyDSBE-PB2020.pdf",
		{ ...params }
	);

	dispatch(getExampleForm(result.data));
};
export const addForm = (params) => async (dispatch) => {
	const result = await axios.post("/form", { ...params });

	dispatch(createForm(result.data.form));
};

export const GetForm = (params) => async (dispatch) => {
	const result = await axios.get(`/form/${params.formId}`, { ...params });

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

		case GET_EXAMPLE_FORM: {
			return {
				...state,
				exampleForm: action.exampleForm,
			};
		}

		default:
			return state;
	}
}
