import { AUTH } from "../constaints/actionTypes";
import * as api from "../api/index";

export const signin = (formData, history) => async (dispatch) => {
  try {
    //Signin the user

    const { data } = await api.signIn(formData);
    console.log("post received from backend", data);
    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log("error occoured at : actions/auth.js", error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    //Signup the user
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log("error occoured at : actions/auth.js", error);
  }
};
