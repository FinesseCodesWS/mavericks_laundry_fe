const initialState = {
  invoices: [],
  invoice: {},
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INVOICES":
      return {
        ...state,
        invoices: action.payload,
      };
    case "GET_INVOICE":
      return {
        ...state,
        invoice: state.invoices.find((item, i) => item._id === action.payload),
      };
    default:
      return state;
  }
};

export default invoiceReducer;
