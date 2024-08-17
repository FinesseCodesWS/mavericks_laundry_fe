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
  smsHistorySuccess
} from "../../store/smsActions";

export const fetchTemplates = async (dispatch) => {
  dispatch(getTemplatesRequest());
  const response = await api.get("/sms/template");
  dispatch(getTemplatesSuccess(response?.data?.data));
};

export const createTemplate = async (dispatch, template) => {
  dispatch(createTemplateRequest());
  const response = await api.post("/sms/template", template);
  dispatch(createTemplateSuccess(response.data.data));
};

export const deleteTemplate = async (dispatch, id) => {
    dispatch(deleteTemplateRequest());
    await api.delete(`/sms/template?id=${id}`);
    dispatch(deleteTemplateSuccess(id));
  };

  export const sendSms = async (dispatch, data) => {
    dispatch(sendSmsRequest());
    const response = await api.post("/sms", data);
    dispatch(sendSmsSuccess(response.data.data));
  };

  export const fetchSmsHistory = async (dispatch) => {
    dispatch(smsHistoryRequest());
    const response = await api.get("/sms");
    dispatch(smsHistorySuccess(response?.data?.data));
  };