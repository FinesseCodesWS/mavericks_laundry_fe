const initialState = {
  menus: [],
  menu: {},
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MENUS":
      return {
        ...state,
        menus: action.payload,
      };
    case "GET_MENU":
      return {
        ...state,
        menu: state.menus.find((item, i) => item._id === action.payload),
      };
      case "EDIT_MENU":
      const updatedMenus = state.menus.map((menu) => {
        if (menu._id === action.payload._id) {
          return {
            ...menu,
            ...action.payload,
          };
        }
        return menu;
      });
      return {
        ...state,
        menus: updatedMenus,
      };
    case "DELETE_MENU":
      const updatedList = state.menus.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        menus: updatedList,
      };
    default:
      return state;
  }
};

export default menuReducer;
