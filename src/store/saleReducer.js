const initialState = {
  sales: [],
  sale: {},
  trending: {},
};

const saleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SALES":
      return {
        ...state,
        sales: action.payload,
      };
    case "GET_TRENDING":
      return {
        ...state,
        trending: action.payload,
      };
    default:
      return state;
  }
};

export default saleReducer;
