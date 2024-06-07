import axios from "axios";
//instance
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000", //baseurl
  timeout: 1000,
}); 
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

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log('hello i am response',response)
      return response
  },
  async (error) => {
    console.log('hello i am error',error)
    const originalRequest = error.config;
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if ((error.response.status === 401 || error.response.data.status == 500) && !originalRequest._retry) {
      originalRequest._retry = true;
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

        // Retry the original request with the new token
        originalRequest.headers.Authorization = localStorage.getItem("access");
        return axios(originalRequest);
      } catch (error) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
