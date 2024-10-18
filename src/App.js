import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Overview, Documentation, ChangeLog, Error } from "./pages/supports";
import {
  Avatars,
  Alerts,
  Buttons,
  Charts,
  Tables,
  Fields,
  Headings,
  Colors,
} from "./pages/blocks";
import {
  Ecommerce,
  Analytics,
  CRM,
  ForgotPassword,
  Register,
  Login,
  LoginForgot,
  UserList,
  UserProfile,
  MyAccount,
  ProductList,
  InventoryList,
  ProductView,
  ProductViewItem,
  ProductUpload,
  ProductUploadItem,
  InvoiceList,
  InvoiceDetails,
  OrderList,
  Message,
  Notification,
  BlankPage,
  Settings,
  Customers,
  InventoryLog,
  Logs,
  VATRevenue,
  Reward,
  Sale,
  SmsSender,
  Messaging
} from "./pages/master";
import axios from "./axios";
import axiosMain from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Coupon from "./pages/master/Coupon";

export default function App() {
  const isLoggedIn = localStorage.getItem("pos-token");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const access = JSON.parse(localStorage.getItem("pos-token"));
  let location = useLocation();
  const [filter, setFilter] = useState("month");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const staffs = useSelector((state) => state.staff.staffs);
  const invoices = useSelector((state) => state.invoice.invoices);
  const inventories = useSelector((state) => state.inventory.inventories);
  const menus = useSelector((state) => state.menu.menus);
  const revenues = useSelector((state) => state.revenue.revenues);
  const customers = useSelector((state) => state.customer.customers);
  const coupons = useSelector((state) => state.coupon.coupons);
  const sales = useSelector((state) => state.sale.sales);
  const trendingSales = useSelector((state) => state.sale.trending.sales);
  const today = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = months[today.getMonth()];
  const currentYear = today.getFullYear();
  const date = `${currentMonth} ${currentYear}`;
  const [rowInvoice, setRowInvoice] = useState(10);
  const [menuId, setMenuId] = useState("");
  const [logs, setLogs] = useState([]);
  const [vats, setVats] = useState([]);
  const [logDate, setLogDate] = useState("");
  const [currentPageCoupon, setCurrentPageCoupon] = useState(1);
  const [pageCountCoupon, setPageCountCoupon] = useState(0);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [pageCountStaff, setPageCountStaff] = useState(0);
  const [currentPageInvoice, setCurrentPageInvoice] = useState(1);
  const [pageCountInvoice, setPageCountInvoice] = useState(0);
  const [currentPageLog, setCurrentPageLog] = useState(1);
  const [pageCountLog, setPageCountLog] = useState(0);
  const [currentPageCustomer, setCurrentPageCustomer] = useState(1);
  const [pageCountCustomer, setPageCountCustomer] = useState(0);
  const [currentPageVat, setCurrentPageVat] = useState(1);
  const [pageCountVat, setPageCountVat] = useState(0);
  const [currentPageMenu, setCurrentPageMenu] = useState(1);
  const [pageCountMenu, setPageCountMenu] = useState(0);
  const [currentPageInventory, setCurrentPageInventory] = useState(1);
  const [pageCountInventory, setPageCountInventory] = useState(0);
  const [currentPageTrending, setCurrentPageTrending] = useState(1);
  const [pageCountTrending, setPageCountTrending] = useState(0);
  const [filterCategory, setFilterCategory] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("");
  const [isFilteredCategory, setIsFilteredCategory] = useState(false);

  const [filterYear, setFilterYear] = useState(2023);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterMonthDate, setFilterMonthDate] = useState("");

  const [filterCustomerDate, setFilterCustomerDate] = useState("");

  const [mode, setMode] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [laundry, setLaundry] = useState("");

  const [weeks, setWeeks] = useState(
    Array.from({ length: 52 }, (_, i) => i + 1)
  );
  const [week, setWeek] = useState("");
  const [salesDate, setSalesDate] = useState("");
  const [salesMonth, setSalesMonth] = useState("");

  // LOGOUT A STAFF
  useEffect(() => {
    if (isLoggedIn && location.pathname.split("/")[1] === "/?logout") {
      const signOut = async () => {
        try {
          const response = await axios.delete("/auth/logout");
          localStorage.removeItem("pos-token");
          return navigate("/");
        } catch (error) {}
      };
      signOut();
    }
  }, [location, isLoggedIn]);

  // GET ALL STAFFS
  useEffect(() => {
    if (isLoggedIn) {
      const getAllStaffs = async () => {
        try {
          const response = await axios.get(
            `/staff/all?page=${currentPageStaff}&size=50`
          );
          setPageCountStaff(response.data.count);
          dispatch({
            type: "GET_STAFFS",
            payload: response.data.data,
          });
        } catch (error) {}
      };
      getAllStaffs();
    }
  }, [dispatch, currentPageStaff, isLoggedIn]);

  useEffect(() => {
    if (filterMonth && isLoggedIn) {
      switch (filterMonth?.split("-")[1]) {
        case "01":
          setFilterMonthDate("Jan");
          break;
        case "02":
          setFilterMonthDate("Feb");
          break;

        case "03":
          setFilterMonthDate("Mar");
          break;

        case "04":
          setFilterMonthDate("Apr");
          break;

        case "05":
          setFilterMonthDate("May");
          break;

        case "06":
          setFilterMonthDate("Jun");
          break;

        case "07":
          setFilterMonthDate("Jul");
          break;

        case "08":
          setFilterMonthDate("Aug");
          break;

        case "09":
          setFilterMonthDate("Sep");
          break;

        case "10":
          setFilterMonthDate("Oct");
          break;

        case "11":
          setFilterMonthDate("Nov");
          break;

        case "12":
          setFilterMonthDate("Dec");
          break;

        default:
          return filterMonthDate;
      }
    }
  }, [filterMonth, filterMonthDate]);

  // GET ALL INVOICES
  useEffect(() => {
    if (isLoggedIn) {
      const getAllInvoices = async () => {
        try {
          setIsFilteredCategory(true);
          let url = `/sales/invoices`;
  
          if (mode || filterMonthDate || filterMonth || laundry || status) {
            const year = filterMonth ? filterMonth.split("-")[0] : null;
            const month = filterMonth ? `${filterMonthDate} ${year}` : null;
            url += `?laundryOption=${laundry || ""}&orderStatus=${status || ""}&modeOfPayment=${mode || ""}&filter=month&month=${month || ""}&year=${year || ""}`;
          }
  
          const response = await axios.get(url);
          setPageCountInvoice(response.data.count);
          dispatch({
            type: "GET_INVOICES",
            payload: response.data.data,
          });
          setIsFilteredCategory(false);
        } catch (error) {
          setIsFilteredCategory(false);
          console.error("Error fetching invoices:", error);
        }
      };
  
      getAllInvoices();
    }
  }, [isLoggedIn, mode, filterMonthDate, filterMonth, status, laundry, dispatch]);
  

  // GET ALL INVENTORIES
  useEffect(() => {
    if (isLoggedIn) {
      const getAllInventories = async () => {
        try {
          setIsFilteredCategory(true);
          const response = await axios.get(
            `/inventory?page=${currentPageInventory}&size=20`
          );
          setPageCountInventory(response.data.count);
          dispatch({
            type: "GET_INVENTORIES",
            payload: response.data.data,
          });
          setIsFilteredCategory(false);
        } catch (error) {}
      };
      getAllInventories();
    }
  }, [dispatch, isLoggedIn, currentPageInventory]);

  // GET ALL MENU LISTS
  useEffect(() => {
    if (isLoggedIn) {
      const getLists = async () => {
        try {
          const response = await axios.get(`/menu/list`);
          setPageCountMenu(response.data.count);
          return dispatch({
            type: "GET_MENUS",
            payload: response.data.data,
          });
        } catch (error) {}
      };
      getLists();
    }
  }, [dispatch, isLoggedIn]);

  // FILTER MENU LISTS BY STATUS
  useEffect(() => {
    if (isLoggedIn && filterCategory !== "ALL") {
      const getLists = async () => {
        try {
          setIsFilteredCategory(true);
          const response = await axios.get(
            `menu/filter-by-category?status=${filterCategory}`
          );
          setPageCountMenu(response.data?.count);
          dispatch({
            type: "GET_MENUS",
            payload: response.data?.data?.data,
          });
          setIsFilteredCategory(false);
        } catch (error) {}
      };
      getLists();
    } else {
      const getListsNow = async () => {
        try {
          setIsFilteredCategory(true);
          const response = await axios.get(`/menu/list`);
          setPageCountMenu(response.data.count);
          dispatch({
            type: "GET_MENUS",
            payload: response?.data?.data,
          });
          setIsFilteredCategory(false);
        } catch (error) {}
      };
      getListsNow();
    }
  }, [dispatch, filterCategory, isLoggedIn]);

  // FILTER MENU LISTS BY STATUS
  useEffect(() => {
    if (filteredCategory && isLoggedIn) {
      const getLists = async () => {
        try {
          setIsFilteredCategory(true);
          const response = await axios.get(
            `/menu/filter-by-category?category=${filteredCategory}`
          );
          setPageCountMenu(response.data.count);
          dispatch({
            type: "GET_MENUS",
            payload: response.data?.data?.data,
          });
          setIsFilteredCategory(false);
        } catch (error) {}
      };
      getLists();
    }
  }, [dispatch, filteredCategory, isLoggedIn]);

  // GET ALL REVENUES
  useEffect(() => {
    if (isLoggedIn) {
      const getLists = async () => {
        try {
          const response = await axios.get("/analytics/revenue");
          dispatch({
            type: "GET_REVENUES",
            payload: response.data.data.sales,
          });
        } catch (error) {}
      };
      getLists();
    }
  }, [dispatch, isLoggedIn]);

  // GET ALL SALES
  useEffect(() => {
    if (isLoggedIn) {
      const getLists = async () => {
        try {
          const response = await axios.get("/sales");
          dispatch({
            type: "GET_SALES",
            payload: response.data.data.salesList,
          });
        } catch (error) {}
      };
      getLists();
    }
  }, [dispatch, isLoggedIn]);

  // GET TRENDING PRODUCT
  useEffect(() => {
    if (isLoggedIn) {
      const getLists = async () => {
        try {
          setIsFilteredCategory(true);
          const response = await axios.get(
            `/analytics/trending/products?filter=${
              salesDate ? `date` : week ? `week` : salesMonth ? `month` : ``
            }&${
              salesDate ? `date` : week ? `week` : salesMonth ? `month` : ``
            }=${
              salesDate
                ? new Date(salesDate).toDateString().split("T")[0]
                : week
                ? week
                : salesMonth
                ? new Date(salesMonth).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })
                : ``
            }`
          );
          dispatch({
            type: "GET_TRENDING",
            payload: response.data?.data,
          });
          setIsFilteredCategory(false);
        } catch (error) {}
      };
      getLists();
    }
  }, [dispatch, isLoggedIn, week, salesDate, week, salesMonth]);

  const totalCost = sales?.reduce((acc, obj) => acc + obj?.total_price, 0);

  // GET COUPONS
  useEffect(() => {
    if (isLoggedIn) {
      const getCoupons = async () => {
        try {
          const response = await axios.get(`/coupon`);
          setPageCountCoupon(response.data.count);
          dispatch({
            type: "GET_COUPONS",
            payload: response.data.data.coupon,
          });
        } catch (error) {}
      };
      getCoupons();
    }
  }, [dispatch, isLoggedIn]);

  // GET INVENTORIES LOG
  useEffect(() => {
    if (menuId === "all" && isLoggedIn) {
      const allLogs = async () => {
        try {
          const response = await axios.get(
            `/inventory/log?year=${
              logDate?.split("-")[0] ? logDate?.split("-")[0] : ""
            }&month=${
              logDate?.split("-")[1] === "02"
                ? 1
                : logDate?.split("-")[1]
                ? logDate?.split("-")[1]
                : ""
            }&day=${logDate?.split("-")[2] ? logDate?.split("-")[2] : ""}`
          );
          setPageCountLog(response.data.count);
          setLogs(response.data.data);
        } catch (error) {}
      };
      allLogs();
    } else {
      const getLogs = async () => {
        try {
          const response = await axios.get(
            `/inventory/log/${menuId}?year=${
              logDate?.split("-")[0] ? logDate?.split("-")[0] : ""
            }&month=${
              logDate?.split("-")[1] === "02"
                ? 1
                : logDate?.split("-")[1]
                ? logDate?.split("-")[1]
                : ""
            }&day=${logDate?.split("-")[2] ? logDate?.split("-")[2] : ""}`
          );
          setPageCountLog(response.data.count);
          setLogs(response.data.data);
        } catch (error) {}
      };
      getLogs();
    }
  }, [menuId, logDate, currentPageLog, isLoggedIn]);

  // GET USER
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosMain.get(
          `${process.env.REACT_APP_URL}/staff`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        dispatch({
          type: "GET_USER",
          payload: response.data.data,
        });
        // navigate("/dashboard");
      } catch (error) {
        if (
          localStorage.getItem("pos-token") === null &&
          location.pathname.split("/")[1] === ""
        ) {
          return;
        } else {
          const statusCode = error?.response?.status;
          const expiredMessage = error?.response?.data?.message;
          if (
            statusCode === 400 &&
            expiredMessage === "Expired or invalid token, please login again"
          ) {
            localStorage.removeItem("pos-token");
            navigate("/");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Your session has expired. Login again!`,
            });
          }
        }
      }
    };
    getUser();
  }, [dispatch, access]);

  // GET STAFF MANAGEMENT
  useEffect(() => {
    if (isLoggedIn) {
      if (filterCustomerDate) {
        const getCustomers = async () => {
          try {
            setIsFilteredCategory(true);
            const response = await axios.get(
              `/user?filter=date&date=${
                new Date(filterCustomerDate).toDateString().split("T")[0]
              }`
            );
            setPageCountCustomer(response.data.count);
            dispatch({
              type: "GET_CUSTOMERS",
              payload: response.data.data,
            });
            setIsFilteredCategory(false);
          } catch (error) {}
        };
        getCustomers();
      } else {
        const getCustomers = async () => {
          try {
            setIsFilteredCategory(true);
            const response = await axios.get(
              `/user
              `
            );
            setPageCountCustomer(response.data.count);
            dispatch({
              type: "GET_CUSTOMERS",
              payload: response.data.data,
            });
            setIsFilteredCategory(false);
          } catch (error) {}
        };
        getCustomers();
      }
    }
  }, [dispatch, isLoggedIn, filterCustomerDate]);

  useEffect(() => {
    if (isLoggedIn) {
      const getData = async () => {
        try {
          const response = await axios(`analytics/vat`);
          setVats(response.data.data.vat);
        } catch (error) {}
      };
      getData();
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <Ecommerce
            staffs={staffs}
            pageCountStaff={pageCountStaff}
            filter={filter}
            setFilter={setFilter}
            invoices={invoices}
            pageCountInvoice={pageCountInvoice}
            menus={menus}
            revenues={revenues}
            sales={totalCost}
            trendingSales={trendingSales}
            logs={logs}
            pageCountLog={pageCountLog}
          />
        }
      />
      <Route path="/" element={<Login />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/crm" element={<CRM />} />
      <Route path="/login-forgot" element={LoginForgot} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route
        path="/staff-list"
        element={
          <UserList
            staffs={staffs}
            user={user}
            setCurrentPageStaff={setCurrentPageStaff}
            currentPageStaff={currentPageStaff}
            setPageCountStaff={setPageCountStaff}
            pageCountStaff={pageCountStaff}
          />
        }
      />
      <Route path="/sms" element={<Messaging />} />
      <Route path="/staff-profile/:id" element={<UserProfile />} />
      <Route path="/my-account" element={<MyAccount />} />
      <Route
        path="/product-list"
        element={
          <ProductList
            menus={menus}
            setCurrentPageMenu={setCurrentPageMenu}
            currentPageMenu={currentPageMenu}
            setPageCountMenu={setPageCountMenu}
            pageCountMenu={pageCountMenu}
            setFilterCategory={setFilterCategory}
            filterCategory={filterCategory}
            setFilteredCategory={setFilteredCategory}
            filteredCategory={filteredCategory}
            isFilteredCategory={isFilteredCategory}
            setIsFilteredCategory={setIsFilteredCategory}
          />
        }
      />
      <Route path="/product-view" element={<ProductView />} />
      <Route path="/product-view/:id" element={<ProductViewItem />} />
      <Route path="/product-upload" element={<ProductUpload />} />
      <Route path="/product-upload/:id" element={<ProductUploadItem />} />
      {/* <Route path="/food-upload/:id" element={<ProductUpload />} /> */}
      <Route
        path="/inventories"
        element={
          <InventoryList
            inventories={inventories}
            menus={menus}
            setCurrentPageInventory={setCurrentPageInventory}
            currentPageInventory={currentPageInventory}
            setPageCountInventory={setPageCountInventory}
            pageCountInventory={pageCountInventory}
            setSearch={setSearch}
            loading={isFilteredCategory}
          />
        }
      />
      <Route
        path="/vat-revenue"
        element={
          <VATRevenue
            vats={vats}
            setCurrentPageVat={setCurrentPageVat}
            currentPageVat={currentPageVat}
            setPageCountVat={setPageCountVat}
            pageCountVat={pageCountVat}
          />
        }
      />
      <Route
        path="/reward"
        element={
          <Reward
            vats={vats}
            setCurrentPageVat={setCurrentPageVat}
            currentPageVat={currentPageVat}
            setPageCountVat={setPageCountVat}
            pageCountVat={pageCountVat}
          />
        }
      />
      <Route
        path="/logs"
        element={
          <Logs
            logs={logs}
            setLogDate={setLogDate}
            setCurrentPageLog={setCurrentPageLog}
            currentPageLog={currentPageLog}
            setPageCountLog={setPageCountLog}
            pageCountLog={pageCountLog}
            inventories={inventories}
            menus={menus}
            setMenuId={setMenuId}
          />
        }
      />
      {/* <Route
        path="/logs"
        element={
          <InventoryLog
            inventories={inventories}
            menus={menus}
            setMenuId={setMenuId}
          />
        }
      /> */}
      <Route
        path="/invoice-list"
        element={
          <InvoiceList
            invoices={invoices}
            setCurrentPageInvoice={setCurrentPageInvoice}
            currentPageInvoice={currentPageInvoice}
            setPageCountInvoice={setPageCountInvoice}
            pageCountInvoice={pageCountInvoice}
            setFilterYear={setFilterYear}
            setFilterMonth={setFilterMonth}
            isFilteredCategory={isFilteredCategory}
            setMode={setMode}
            setStatus={setStatus}
            status={status}
            laundry={laundry}
            setLaundry={setLaundry}
          />
        }
      />
      <Route path="/invoice-details/:id" element={<InvoiceDetails />} />
      <Route
        path="/sales"
        element={
          <Sale
            trendingSales={trendingSales}
            setCurrentPageTrending={setCurrentPageTrending}
            currentPageTrending={currentPageTrending}
            setPageCountTrending={setPageCountTrending}
            pageCountTrending={pageCountTrending}
            setFilterYear={setFilterYear}
            setFilterMonth={setFilterMonth}
            isFilteredCategory={isFilteredCategory}
            setWeeks={setWeeks}
            weeks={weeks}
            setWeek={setWeek}
            isFilteredCategory={isFilteredCategory}
            setSalesDate={setSalesDate}
            setSalesMonth={setSalesMonth}
          />
        }
      />
      <Route
        path="/coupon"
        element={
          <Coupon
            coupons={coupons}
            setCurrentPageCoupon={setCurrentPageCoupon}
            currentPageCoupon={currentPageCoupon}
            setPageCountCoupon={setPageCountCoupon}
            pageCountCoupon={pageCountCoupon}
          />
        }
      />
      <Route path="/order-list" element={<OrderList />} />
      <Route
        path="/customers"
        element={
          <Customers
            customers={customers}
            setCurrentPageCustomer={setCurrentPageCustomer}
            currentPageCustomer={currentPageCustomer}
            setPageCountCustomer={setPageCountCustomer}
            pageCountCustomer={pageCountCustomer}
            setFilterCustomerDate={setFilterCustomerDate}
            isFilteredCategory={isFilteredCategory}
          />
        }
      />
      <Route path="/message" element={<Message />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/blank-page" element={<BlankPage />} />

      {/* Blocks Pages */}
      <Route path="/headings" element={<Headings />} />
      <Route path="/buttons" element={<Buttons />} />
      <Route path="/avatars" element={<Avatars />} />
      <Route path="/colors" element={<Colors />} />
      <Route path="/charts" element={<Charts />} />
      <Route path="/tables" element={<Tables />} />
      <Route path="/fields" element={<Fields />} />
      <Route path="/alerts" element={<Alerts />} />

      {/* Supports Pages */}
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Login />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/changelog" element={<ChangeLog />} />
    </Routes>
  );
}
