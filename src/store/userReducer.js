// action - state management
import { USER } from "./actions";

const userReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER": {
      return {
        ...state,
        user: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
