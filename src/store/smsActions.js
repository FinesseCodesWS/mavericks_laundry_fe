import * as actionTypes from './actions';

export const getTemplatesRequest = () => ({
  type: actionTypes.GET_TEMPLATES_REQUEST,
});

export const getTemplatesSuccess = (templates) => ({
  type: actionTypes.GET_TEMPLATES_SUCCESS,
  payload: templates,
});

export const getTemplatesFailure = (error) => ({
  type: actionTypes.GET_TEMPLATES_FAILURE,
  payload: error,
});

export const createTemplateRequest = () => ({
  type: actionTypes.CREATE_TEMPLATE_REQUEST,
});

export const createTemplateSuccess = (template) => ({
  type: actionTypes.CREATE_TEMPLATE_SUCCESS,
  payload: template,
});

export const createTemplateFailure = (error) => ({
  type: actionTypes.CREATE_TEMPLATE_FAILURE,
  payload: error,
});

export const deleteTemplateRequest = () => ({
    type: actionTypes.DELETE_TEMPLATE_REQUEST,
  });
  
  export const deleteTemplateSuccess = (id) => ({
    type: actionTypes.DELETE_TEMPLATE_SUCCESS,
    payload: id,
  });
  
  export const deleteTemplateFailure = (error) => ({
    type: actionTypes.DELETE_TEMPLATE_FAILURE,
    payload: error,
  });

  export const sendSmsRequest = () => ({
    type: actionTypes.SEND_SMS_REQUEST,
  });
  
  export const sendSmsSuccess = (data) => ({
    type: actionTypes.SEND_SMS_SUCCESS,
    payload: data,
  });
  
  export const sendSmsFailure = (error) => ({
    type: actionTypes.SEND_SMS_FAILURE,
    payload: error,
  });

  export const smsHistoryRequest = () => ({
    type: actionTypes.GET_SMS_HISTORY_REQUEST,
  });
  
  export const smsHistorySuccess = (data) => ({
    type: actionTypes.GET_SMS_HISTORY_SUCCESS,
    payload: data,
  });
  
  export const smsHistoryFailure = (error) => ({
    type: actionTypes.GET_SMS_HISTORY_FAILURE,
    payload: error,
  });
