import axiosReal from "axios";

const baseURL = "https://maverick-laundry.onrender.com/api";
const axiosInstance = axiosReal.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

const onRequest = (request) => {
  const access = JSON.parse(localStorage.getItem("pos-token"));
  request.headers.Authorization = `Bearer ${access}`;
  return request;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response;
};

const onResponseError = (error) => {
  const statusCode = error?.response?.status;
  const expiredMessage = error?.response?.data?.message;
  if (
    statusCode === 400 &&
    expiredMessage === "Expired or invalid token, please login again"
  ) {
    localStorage.removeItem("pos-token");
    if (localStorage.getItem("pos-token") !== null) {
      return setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } else {
      return;
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
