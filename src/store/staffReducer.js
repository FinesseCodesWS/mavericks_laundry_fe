const initialState = {
  staffs: [],
};

const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STAFFS":
      return {
        ...state,
        staffs: action.payload,
      };
    case "ADD_STAFF":
      return {
        ...state,
        staffs: [action.payload, ...state.staffs],
      };
    case "DELETE_STAFF":
      const updatedList = state.staffs.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        staffs: updatedList,
      };
    default:
      return state;
  }
};

export default staffReducer;
