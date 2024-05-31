import axios from "axios";
//instance
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000", //baseurl
  timeout: 1000,
});
//this for refresh token
async function refreshToken() {
  try {
    let token = localStorage.getItem("refresh")
      ? localStorage.getItem("refresh")
      : "";
    const response = await instance.post("/auth/v1/refresh-token", {
      refreshToken: token,
    });
    const { access, refresh } = await response.data;
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("access", access);
    return access;
  } catch (err) {
    console.log(err.message);
    return;
  }
}
//interceptors
//interceptors for before req
//set authorization
//a.i have to read localstorge
//b.i have to set header.authorazation = accesskey
instance.interceptors.request.use(
  (request) => {
    let access = localStorage.getItem("access")
      ? localStorage.getItem("access")
      : "";
    if (access) {
      request.headers.Authorization = access;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//this is for response
//if error 401
//request with refreshtoken
//ageain we are new access token
//set newaccess token into localstroage
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    console.log(error)
    if (error.response.data.status == 500 || error.response.status == 401 ) {
      try {
        let access = refreshToken();
        // //error here
        axios.defaults.headers.common["Authorization"] = access;
      } catch (e) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        return Promise.reject(e);
      }
    }
  }
);
export default instance;
