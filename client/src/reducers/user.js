import { USER_LOGGING_IN, USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions';

const fromLocalStorage = () => {
	try {
		return {
			data: JSON.parse(localStorage.getItem('user')),
			isLoading: false
		};
	} catch (e) {
		return {
			data: null,
			isLoading: false
		};
	}
};
			
const userReducer = (state = fromLocalStorage(), action) => {
	switch (action.type) {
		case USER_LOGGING_IN:
			return { ...state, isLoading: true };
		case USER_LOGGED_IN:
			return { isLoading: false, data: action.user };
		case USER_LOGGED_OUT:
			return { ...state, data: null };
		default:
			return state;
	}
};

export default userReducer;
