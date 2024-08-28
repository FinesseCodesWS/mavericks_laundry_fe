import * as actionTypes from "./actions";

const initialState = {
  templates: [],
  loading: false,
  error: null,
  smsHistory: {},
};

export const smsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TEMPLATES_REQUEST:
    case actionTypes.CREATE_TEMPLATE_REQUEST:
    case actionTypes.UPDATE_TEMPLATE_REQUEST:
    case actionTypes.DELETE_TEMPLATE_REQUEST:
    case actionTypes.SEND_SMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_TEMPLATES_SUCCESS:
      return {
        ...state,
        templates: action.payload,
        loading: false,
      };
    case actionTypes.CREATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        templates: [...state.templates, action.payload],
        loading: false,
      };
    case actionTypes.UPDATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        templates: state.templates.map((template) =>
          template.id === action.payload.id ? action.payload : template
        ),
        loading: false,
      };
    case actionTypes.DELETE_TEMPLATE_SUCCESS:
      return {
        ...state,
        templates: state.templates.filter(
          (template) => template._id !== action.payload
        ),
        loading: false,
      };
    case actionTypes.SEND_SMS_SUCCESS:
      return {
        ...state,
        smsHistory: [...state.smsHistory, action.payload],
        loading: false,
      };
    case actionTypes.GET_SMS_HISTORY_SUCCESS:
      return {
        ...state,
        smsHistory: action.payload,
        loading: false,
      };
    case actionTypes.GET_TEMPLATES_FAILURE:
    case actionTypes.CREATE_TEMPLATE_FAILURE:
    case actionTypes.UPDATE_TEMPLATE_FAILURE:
    case actionTypes.DELETE_TEMPLATE_FAILURE:
    case actionTypes.SEND_SMS_FAILURE:
    case actionTypes.GET_SMS_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
