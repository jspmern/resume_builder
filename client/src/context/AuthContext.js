import { createContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/authReducer";
import axios from "../config/axios";
import { ERROR, FETCH_DATA, LOADING } from "../Action/ActionConstant";
export let authContext = createContext();
function AuthContext({ children }) {
  function getDataHandler() {
    let x;
    if (localStorage.getItem("resume")) {
      console.log('.................................')
      x = JSON.parse(localStorage.getItem("resume"));
    } else {
      x = {};
    }
    return x;
  }
  let intialState = {
    loading: false,
    error: "",
    data: getDataHandler() ? getDataHandler() : {},
    success: false,
  };
  // useEffect(()=>{
  //     getDataHandler()
  // },[state])

  //this is a handler for login
  async function loginHandler(arg) {
    try {
      dispatch({ type: LOADING });
      let response = await axios.post("/auth/v1/signin", arg);
      let data = await response.data;
      console.log("hello i am data", data);
      dispatch({ type: FETCH_DATA, payload: data });
    } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data });
    }
  }
  let [state, dispatch] = useReducer(reducer, intialState);
  return (
    <authContext.Provider value={{ ...state, loginHandler }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthContext;
