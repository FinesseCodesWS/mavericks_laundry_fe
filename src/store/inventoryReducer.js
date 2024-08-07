const initialState = {
  inventories: [],
  inventory: {},
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INVENTORIES":
      return {
        ...state,
        inventories: action.payload,
      };
    case "GET_INVENTORY":
      return {
        ...state,
        inventory: state.menus.find((item, i) => item._id === action.payload),
      };
    case "UPDATE_INVENTORY":
      const index = state.inventories.findIndex(
        (item) => item._id === action.id
      );
      const updatedItem = [
        ...state.inventories.slice(0, index),
        action.payload,
        ...state.inventories.slice(index + 1),
      ];
      return {
        ...state,
        inventories: updatedItem,
      };
    default:
      return state;
  }
};

export default inventoryReducer;
