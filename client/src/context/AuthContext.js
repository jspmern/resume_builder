import { createContext, useReducer } from "react";
import reducer from "../Reducer/authReducer";
import axios from "../config/axios";
import { ERROR, FETCH_DATA, LOADING } from "../Action/ActionConstant";
export let authContext = createContext();
function AuthContext({ children }) {
  let intialState = {
    loading: false,
    error: "",
    data: {},
  };
  //this is a handler for login
  async function loginHandler(arg) {
    try {
      dispatch({ type: LOADING });
      let response = await axios.post("/auth/v1/signin", arg );
      let data = await response.data;
      dispatch({ type: FETCH_DATA, payload: data });
    } catch (err) {
      dispatch({ type: ERROR, payload: err.message });
    }
  }
  let [state, dispatch] = useReducer(reducer, intialState);
  return (
    <authContext.Provider value={{ ...state,loginHandler }}>{children}</authContext.Provider>
  );
}

export default AuthContext;
