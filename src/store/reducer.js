import { combineReducers } from "redux";
import userReducer from "./userReducer";
import staffReducer from "./staffReducer";
import invoiceReducer from "./invoiceReducer";
import menuReducer from "./menuReducer";
import revenueReducer from "./revenueReducer";
import saleReducer from "./saleReducer";
import inventoryReducer from "./inventoryReducer";
import couponReducer from "./couponReducer";
import customersReducer from "./customersReducer"
import {smsReducer} from "./smsReducer"

const reducer = combineReducers({
  user: userReducer,
  staff: staffReducer,
  invoice: invoiceReducer,
  menu: menuReducer,
  revenue: revenueReducer,
  sale: saleReducer,
  inventory: inventoryReducer,
  coupon: couponReducer,
  customer: customersReducer,
  sms: smsReducer
});

export default reducer;
