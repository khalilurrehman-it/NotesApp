import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERROR,
} from "../reducers/authReducer"; // Adjust the import path as necessary
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig"; // Ensure this is the correct path

// Sign Up with Email and Password
export const signUpWithEmail = (userData, navigate) => async (dispatch) => {
  const { name, email, password } = userData;
  try {
    dispatch({ type: LOGIN_START });
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // You can add user information like name after signing up
    await userCredential.user.updateProfile({ displayName: name });
    dispatch({ type: LOGIN_SUCCESS, payload: userCredential.user });
    navigate("/"); // Redirect to home or a different page after successful signup
  } catch (error) {
    const errorMessage = error.message || "Sign up failed. Please try again.";
    console.error("SignUp Error: ", error); // Log the error for debugging
    dispatch({ type: LOGIN_FAIL, payload: errorMessage });
  }
};

// Sign Up with Google
export const signUpWithGoogle = (navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_START });
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    const result = await signInWithPopup(auth, provider);
    dispatch({ type: LOGIN_SUCCESS, payload: result.user });
    navigate("/"); // Redirect after Google sign-up
  } catch (error) {
    const errorMessage =
      error.code === "auth/popup-closed-by-user"
        ? "Sign-in popup was closed. Please try again."
        : "Google sign-up failed. Please try again.";
    console.error("Google SignUp Error: ", error); // Log the error for debugging
    dispatch({ type: LOGIN_FAIL, payload: errorMessage });
  }
};

// Logout
export const logout = () => (dispatch) => {
  auth
    .signOut()
    .then(() => {
      dispatch({ type: LOGOUT });
    })
    .catch((error) => {
      console.error("Logout Error: ", error); // Log the error if logout fails
    });
};

// Clear error action
export const clearError = () => ({ type: CLEAR_ERROR });

export const loginWithEmail = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_START });
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch({ type: LOGIN_SUCCESS, payload: userCredential.user });
  } catch (error) {
    const errorMessage = error.message || "Login failed. Please try again.";
    console.error("Login Error: ", error);
    dispatch({ type: LOGIN_FAIL, payload: errorMessage });
  }
};

export const loginWithGoogle = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_START });
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    const result = await signInWithPopup(auth, provider);
    dispatch({ type: LOGIN_SUCCESS, payload: result.user });
  } catch (error) {
    const errorMessage =
      error.code === "auth/popup-closed-by-user"
        ? "Sign-in popup was closed. Please try again."
        : "Google login failed. Please try again.";
    console.error("Google Login Error: ", error);
    dispatch({ type: LOGIN_FAIL, payload: errorMessage });
  }
};
