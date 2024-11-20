// Define action types
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loading: true, error: null }; // Reset error on start
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, user: null, error: null };
    case CLEAR_ERROR:
      return { ...state, error: null }; // Handle error clearing
    default:
      return state;
  }
};

export default authReducer;
