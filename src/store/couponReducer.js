const initialState = {
  coupons: [],
  coupon: {},
};

const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COUPONS":
      return {
        ...state,
        coupons: action.payload?.reverse(),
      };
    case "ADD_COUPON":
      return {
        ...state,
        coupons: [action.payload, ...state.coupons],
      };
    case "GET_COUPON":
      return {
        ...state,
        coupon: state.coupons.find((item, i) => item._id === action.payload),
      };
    default:
      return state;
  }
};

export default couponReducer;
