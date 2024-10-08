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
        invoice: state.invoices.find((item) => item._id === action.payload),
      };
    case "EDIT_INVOICE":
      return {
        ...state,
        invoices: state.invoices.map((invoice) =>
          invoice._id === action.payload._id ? action.payload : invoice
        ),
      };
    default:
      return state;
  }
};

export default invoiceReducer;
