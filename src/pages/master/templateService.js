import api from "../../axios";
import {
  getTemplatesRequest,
  getTemplatesSuccess,
  createTemplateRequest,
  createTemplateSuccess,
  deleteTemplateRequest,
  deleteTemplateSuccess,
  sendSmsRequest,
  sendSmsSuccess,
  smsHistoryRequest,
  smsHistorySuccess,
} from "../../store/smsActions";
import Swal from "sweetalert2";

export const fetchTemplates = async (dispatch) => {
  try {
    dispatch(getTemplatesRequest());
    const response = await api.get("/sms/template");
    dispatch(getTemplatesSuccess(response?.data?.data));
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong!",
    });
  }
};

export const createTemplate = async (dispatch, template) => {
  try {
    dispatch(createTemplateRequest());
    const response = await api.post("/sms/template", template);
    dispatch(createTemplateSuccess(response.data.data));
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong!",
    });
  }
};

export const deleteTemplate = async (dispatch, id) => {
  try {
    dispatch(deleteTemplateRequest());
    await api.delete(`/sms/template?id=${id}`);
    dispatch(deleteTemplateSuccess(id));
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong!",
    });
  }
};

export const sendSms = async (dispatch, data) => {
  try {
    dispatch(sendSmsRequest());
    const response = await api.post("/sms", data);
    dispatch(sendSmsSuccess(response.data.data));
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong!",
    });
  }
};

export const sendSmsCategory = async (dispatch, data) => {
  try {
    dispatch(sendSmsRequest());
    const response = await api.post("/sms/to-category", data);
    dispatch(sendSmsSuccess(response.data.data));
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong!",
    });
  }
};

export const fetchSmsHistory = async (dispatch, count, itemsPerPage) => {
  dispatch(smsHistoryRequest());
  const response = await api.get(`/sms?page=${count}&size=${itemsPerPage}`);
  dispatch(smsHistorySuccess(response?.data));
};
