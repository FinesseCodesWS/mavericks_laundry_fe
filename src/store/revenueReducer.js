const initialState = {
  revenues: [],
};

const revenueReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_REVENUES":
      return {
        ...state,
        revenues: action.payload,
      };
    default:
      return state;
  }
};

export default revenueReducer;
