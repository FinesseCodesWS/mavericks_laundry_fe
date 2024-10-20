import React, { useEffect, useRef, useState } from "react";
// import data from "../../../data/master/analytics.json";
// import PageLayout from "../../../layouts/PageLayout";

// import Modal from 'react-bootstrap/Modal';

import {
  // Collapse,
  // Navbar,
  // NavbarToggler,
  // NavbarBrand,
  // Nav,
  // NavItem,
  // NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // NavbarText,

  Modal,
  //  Input, Label, ModalHeader, ModalBody, InputGroup, InputGroupText, Card, CardText
} from "reactstrap";

import { Row, Col } from "react-bootstrap";
import { Box, Button, Heading } from "../../../components/elements";

import { CardLayout, CardHeader } from "../../../components/cards";

// import { Breadcrumb } from "../../../components";
// import { TrafficsTable, PagesTable } from "../../../components/tables";
import Product from "./Product";

import "./NewSales.scss";
import "./Nav.scss";
import SalesTable from "./SalesTable";
// import { IconField } from "../../../components/fields";
import CustomField, {
  CustomField2,
  CustomField3,
  CustomFieldSearch,
  // CustomFieldBrand,
} from "./CustomField";
import { Link } from "react-router-dom";
import { ProfileDropdown } from "../../../components/header";

import InvoiceDetails from "./InvoiceDetails";
import {
  getAllMenuAction,
  FilterMenuByCategoryAction,
  getAllMenuCategoryAction,
} from "../../../API/menu";
import { confirm } from "../../../utils/Utils";
import {
  getCouponAction,
  getCustomerAction,
  getTaxAction,
  getUserDetailsAction,
  createUserInfoAction,
  makeSalesAction,
} from "../../../API/sales";
import { useSelector } from "react-redux";
// import { AlignRight, Database, Grid, Power, RefreshCcw } from "react-feather";
import Currency from "react-currency-formatter";
import { formatError, showWarning } from "../../../API/AuthService";
import HoldView from "./HoldView";
import { Anchor, Bookmark, Menu, X } from "react-feather";
import Calculator from "./Calculator";
import { type } from "@testing-library/user-event/dist/type";
import { getAddOns } from "../../../API/sales";
// import { Mail, User } from "react-feather";

var profile = {
  name: "miron mahmud",
  username: "@mironcoder",
  image: "images/avatar/01.webp",
  dropdown: [
    { path: "/my-account", icon: "person", text: "my account" },
    // { path: "/forgot-password", icon: "privacy_tip", text: "reset password" },
    { path: "/login", icon: "lock", text: "logout" },
  ],
};

// absolute //percentage
const saleTableData = {
  title: "Sales Data",
  localUserData: { name: "", phone: "" },
  coupon: {
    title: "",
    type: "",
    isValid: "",
    isExpired: "",
    amount: "",
    couponId: "",
  },
  tax: {
    amount: null,
    threshold: null,
  },
  thead: ["Item Name", "Stock", "Quantity", "Price", "Subtotal", "X"],
  tbody: [],
};

const saleTableDraftData = {
  title: "Sales Data draft",
  coupon: "",
  tax: "",
  thead: ["Item Name", "Stock", "Quantity", "Price", "Subtotal", "X"],
  draftList: [],

  // "tbody": [
  // ]
};

const saleProductData = {
  title: "Product Data",

  data: [
    // {
    //     category: "Swallow",
    //     countable : true,
    //     createdAt:  "2023-02-08T15:28:37.776Z",
    //     createdBy: "63e2990887bae053bbafeb3e",
    //     date: "Wed Feb 08 2023",
    //     id: "63e3bfa51238c70985e8839a",
    //     itemName : "Amala",
    //     month: "Feb 2023",
    //     quantity : 5,
    //     status: "AVAILABLE",
    //     unitPrice : 1000,
    //     updatedAt: "2023-02-08T15:28:37.776Z",
    //     week:6,
    //     __v: 0,
    //     _id : "63e3bfa51238c70985e8839a",
    //     image: {type: 'Buffer', data: []},
    //     "discount": 0,
    //     "tax":0,
    //     'quantity_bought': 0,
    //     "delete": { "icon": "delete", "text": "delete" },
    //     'default_image':'images/product/single/04.webp'
    // },
    // {
    //     "item_name": { "icon": "edit", "text": "Window PC" },
    //     "stock": 5,
    //     "quantity": 5,
    //     "price": 872,
    //     "discount": 0,
    //     "subtotal": "0",
    //     "tax":0,
    //     "delete": { "icon": "delete", "text": "delete" },
    //     '_id': 2,
    //     'image':'images/product/single/04.webp'
    // },
  ],
};

const NewSales = () => {
  // nav
  const [collapsed, setCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  //
  // search 
  const [searchValue, setSearchValue] = useState('')
  const [searchValueCat, setSearchValueCat] = useState('')
  const [filteredData, setFilteredData] = useState([])




  // update

  const [userDetails, setUserDetails] = useState({ name: "", phone: "" });
  const [userNumInp, setUserNumInp] = useState("");
  const [showUserBox, setShowUserBox] = useState(false);
  const [paymentMode, setPaymentMode] = useState([]);
  const [searchUserDetails, setSearchUserDetails] = useState("");

  const user = useSelector((state) => state.auth.userPOSData);
  const [tableList, setTableList] = useState(saleTableData);
  const [tableListDraft, setTableListDraft] = useState(saleTableDraftData);
  const [productList, setProductList] = useState(saleProductData);
  const [allCat, setAllcat] = useState([]);
  const [allUser, setAllUser] = useState([
    { value: "Walk In Customer", label: "Walk In Customer" },
  ]);
  const [currentUserNumber, setCurrentUserNumber] = useState({
    value: "Walk In Customer",
    label: "Walk In Customer",
  });
  const [grandTotal, setGrandTotal] = useState(0);
  const [grandBalance, setGrandBalance] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const [invoice, setInvoice] = useState(null);

  const [couponVal, setCouponVal] = useState("");
  const [clotheSize, setClotheSize] = useState("");
  const [laundryOptions, setLaundryOptions] = useState("");
  const [product, setProduct] = useState({});


  const [alertModal, setAlertModal] = React.useState(false);
  const [alModal, setAlModal] = React.useState(false);
  const [calModal, setCalModal] = React.useState(false);
  const [genModal, setGenModal] = React.useState(false);
  const [isSizeSelected, setIsSizeSelected] = React.useState(true);
  const [addOnsList, setAddOnsList] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [screenSize, setScreenSize] = useState();

  const [defaultValue, setDefaultValue] = useState({
    discount: 0,
    tax: 0,
    quantity_bought: 0,
    delete: { icon: "delete", text: "delete" },
    default_image: "images/product/single/04.webp",
  });

  // nav
  const toggleNavbar = () => setCollapsed(!collapsed);
  const toggle = () => setIsOpen(!isOpen);

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth >= 700)
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth])

  useEffect(() => {
    const addOns = async () => {
        const res = await getAddOns()
        console.log(res)
        setAddOnsList(res);
    }
    addOns();
  }, [])

  // modal
  const handleModal = () => {
    setOpen(!open);
  };

  // user
  const setUserInfoDetails = (e) => {
    e.preventDefault();
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

    // console.log(userDetails)
  };

  // clothe sizes
  

  const sendNewUserData = async () => {
    if (userDetails?.name && userDetails.phone) {
      const res = await createUserInfoAction(userDetails);
      if (res) {
        setShowUserBox(true);
        setAlModal(false);

        let setValue = {
          ...tableList,
          localUserData: { name: userDetails?.name, phone: userDetails?.phone },
        };
        setTableList(setValue);
        localStorage.setItem("salesLocalData", JSON.stringify(setValue));
      }
    } else {
      showWarning("please enter customer details");
    }
  };
  const clearUserData = async () => {
    setUserDetails({ name: "", phone: "" });
    setPaymentMode([]);
    setShowUserBox(false);
  };

  const removeUserData = async () => {

    const prompt = await  confirm('Customer details will be removed')


    if(prompt){
      setUserDetails({ name: "", phone: "" });
  
      let setValue = {
        ...tableList,
        localUserData: { name: "", phone: "" },
      };
  
      setTableList(setValue);
      localStorage.setItem("salesLocalData", JSON.stringify(setValue));
  
      setShowUserBox(false);

    }



  };

  const searchUser = async (userInfo) => {
    if (userInfo) {
      setSearchUserDetails(userInfo);
      const res = await getUserDetailsAction(userInfo);
      if (res) {
        setUserDetails({ name: res?.fullName, phone: res?.phoneNumber });
        setShowUserBox(true);

        let setValue = {
          ...tableList,
          localUserData: { name: res?.fullName, phone: res?.phoneNumber },
        };
        setTableList(setValue);
        localStorage.setItem("salesLocalData", JSON.stringify(setValue));

        // localUserData
        setUserNumInp("");
      }
      // else if(Number(userInfo)){
      //   let setValue = {
      //     ...tableList,
      //     localUserData: {phone: userDetails?.phone}
      //   };
      //   setTableList(setValue);
      //   localStorage.setItem("salesLocalData", JSON.stringify(setValue));

      // }
    } else {
      showWarning("please enter customer phone number");
    }
  };

  const getRecurringUserData = async () => {};

  //  pos
  const pickMode = (val) => {
    const searchMode = paymentMode.find((e) => e === val);

    if (searchMode) {
      setPaymentMode([...paymentMode?.filter((e) => e !== searchMode)]);
    } else {
      setPaymentMode([...paymentMode, val]);
    }

    // console.log(paymentMode)
  };

  // integration
  const getAllMenu = async () => {
    setSearchValueCat('All Categories')
    const res = await getAllMenuAction();
    if (res) {

        const filteredMenu = await  res?.data;





      let vl = filteredMenu?.map((val) => {
        val["discount"] = 0;
        val["tax "] = 0;
        val["coupon "] = 0;
        val.quantity_bought = 0;
        val.delete = { icon: "delete", text: "delete" };
        val.default_image = "images/food-icons.jpg";

        return val;
      });

      setProductList({ ...productList, data: [...vl] });

      // console.log(vl)
      //   'images/product/single/maverick_logos.png'
    }
  };

  // get menu list
  useEffect(() => {
    getAllMenu();

    return () => {};
  }, []);

  // get menu category
  useEffect(() => {
    const getMenuCategory = async () => {
      const res = await getAllMenuCategoryAction();

      if (res) {
        setAllcat([...res]);
      }
    };
    getMenuCategory();

    return () => {};
  }, []);

  const getMenuByCategory = async (e) => {
    e.preventDefault();
    let target = e?.target?.value;


    setSearchValueCat(target)

    if (target !== "All Categories") {
      const res = await FilterMenuByCategoryAction(target);
      // console.log(res)

      if (res) {


        
        const filteredMenu = await  res?.data;

        let vl = filteredMenu?.map((val) => {
          val["discount"] = 0;
          val["tax "] = 0;
          val.quantity_bought = 0;
          val.delete = { icon: "delete", text: "delete" };
          val.default_image = "images/product/single/04.webp";

          return val;
        });

        setProductList({ ...productList, data: [...vl] });
      }
    } else if (target === "All Categories") {
      getAllMenu();
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await getCustomerAction();
      if (res) {
        console.log(res)
        // phoneNumber
        setAllUser([
          ...allUser,
          ...res?.map((e) => {
            let val = { value: e?.phoneNumber, label: e?.phoneNumber };
            return val;
          }),
        ]);
      }
    };

    getUser();

    return () => {};
  }, []);

  const selectUser = (userData) => {
    // console.log(userData);
    setCurrentUserNumber(userData);
  };

  const createUser = (userData) => {
    if (Number(userData)) {
      // console.log(userData);
      const user = { value: userData, label: userData };
      setAllUser([...allUser, user]);
      selectUser(user);
    }
  };

  // initiLIZE LOCALSTORAGE
  useEffect(() => {
    const setLocalStorage = () => {
      const storage = localStorage.getItem("salesLocalData");
      if (!storage) {
        localStorage.setItem("salesLocalData", JSON.stringify(tableList));
      }
    };
    setLocalStorage();

    return () => {};
  }, []);

  // GET DATA FROM DEFAULT STORAGE
  useEffect(() => {
    const setLocalStorage = () => {
      const storage = localStorage.getItem("salesLocalData");
      if (storage) {
        setTableList({ ...JSON.parse(storage) });

        // console.log(tableList)
      }
    };
    setLocalStorage();

    return () => {};
  }, []);

  // initiLIZE LOCALSTORAGE DRAFT
  useEffect(() => {
    const setLocalStorage = () => {
      const storage = localStorage.getItem("salesLocalDataDraft");
      if (!storage) {
        localStorage.setItem(
          "salesLocalDataDraft",
          JSON.stringify(tableListDraft)
        );
      }
    };
    setLocalStorage();

    return () => {};
  }, []);

  // GET DATA FROM DEFAULT STORAGE DRAFT
  useEffect(() => {
    const setLocalStorage = () => {
      const storage = localStorage.getItem("salesLocalDataDraft");
      if (storage) {
        setTableListDraft({ ...JSON.parse(storage) });
      }
    };
    setLocalStorage();

    return () => {};
  }, []);

  useEffect(() => {
    const calculateSalesTotal = async () => {
      if (tableList?.tbody.length > 0) {
        let totalG = 0;
        let totalQ = 0;
        let totalA = 0;
        let totalD = 0;

        // Number(item?.price * item?.quantity) - ( (item?.price * item?.quantity) *item?.discount/100)

        tableList?.tbody?.map((c) => {
          totalG += Number(
            ((c.price.price * c.item.quantity_bought) + (c.addonPrice * c.item.quantity_bought)) -
              (c?.price?.price * c?.item?.quantity_bought * c?.item?.discount) / 100
          );
        });
        setGrandTotal(totalG);

        tableList?.tbody?.map((c) => {
          totalQ += Number(c.item.quantity_bought);
        });
        setTotalQuantity(totalQ);
        tableList?.tbody?.map((c) => {
          totalA += Number((c.price.price * c.item.quantity_bought)+ (c.addonPrice * c.item.quantity_bought));
        });
        setTotalAmount(totalA);
        tableList?.tbody?.map((c) => {
          totalD += Number(c.item.discount);
        });
        setTotalDiscount(totalD);
      } else {
        setTotalQuantity(0);
        setTotalAmount(0);
        setTotalDiscount(0);
        setGrandTotal(0);
      }
    };

    calculateSalesTotal();

    return () => {
      setGrandTotal(0);
    };
  }, [tableList]);

    

  useEffect(() => {
    const getBalance = ()=>{
     const theVal = totalQuantity !== 0 ? (tableList?.tax?.amount &&
      totalAmount >= tableList?.tax?.threshold
        ? totalAmount +
          (totalAmount * tableList?.tax?.amount) / 100 -
          (tableList?.coupon?.type === "percentage"
            ? (totalAmount * tableList?.coupon?.amount) /
              100
            : tableList?.coupon?.type === "absolute"
            ? tableList?.coupon?.amount
            : 0)
        : tableList?.coupon?.amount
        ? grandTotal -
          (tableList?.coupon?.type === "percentage"
            ? (totalAmount * tableList?.coupon?.amount) /
              100
            : tableList?.coupon?.type === "absolute"
            ? tableList?.coupon?.amount
            : 0)
        : grandTotal) : 0

        setGrandBalance(theVal)
    }

    getBalance()
  
    // return () => {
    //   setGrandBalance(0)
    // }
  }, [totalQuantity])
  


  useEffect(() => {
    const getT = async () => {
      const res = await getTaxAction();
      console.log(res);
      if (res) {
        if (res?.vat) {
          const val = {
            amount: res?.vat?.amount,
            threshold: res?.vat?.threshold,
          };

          const storage = localStorage.getItem("salesLocalData");

          let seValue = { ...JSON.parse(storage), tax: val };

          setTableList(seValue);
          localStorage.setItem("salesLocalData", JSON.stringify(seValue));

          // console.log(tableList?.tbody)
        }
      }
    };

    getT();

    return () => {};
  }, []);




  const reloadMenu = ()=>{
    setSearchValue('')
  }


  const searchMenu = (e)=>{
    e.preventDefault()
    const value = e?.target?.value


    let updatedData = []
    setSearchValue(value)
    // console.log(value, productList?.data)

    
    if (value?.length) {
      updatedData = productList?.data?.filter((item, i )=> {
        const startsWith =
          item?.itemName?.toString()?.toLowerCase()?.startsWith(value.toLowerCase()) 
         
        const includes =
        item?.itemName?.toString()?.toLowerCase()?.includes(value.toLowerCase()) 
       
        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }



  const selectProduct = (product) => {
    console.log(product)
    setGenModal(true)
    setProduct(product)
  }





  const addOrUpdateProduct = (product, launType) => {
    console.log(product)
    let theProduct;
    if (clotheSize === "adultMalePrice") {
      const { childrenPrice, adultFemalePrice, ...Product } = product;
      const {adultMalePrice, ...item} = Product
      theProduct = {item, price: {_id: adultMalePrice._id, price: launType === "ordinary" ? adultMalePrice.ordinary : adultMalePrice.ironed, size: "Adult Male", laundryOptions: launType }, addons: [], addonPrice: 0};
      console.log(theProduct)
    }else if (clotheSize === "adultFemalePrice"){
      const { adultMalePrice, childrenPrice, ...Product } = product;
      const {adultFemalePrice, ...item} = Product
      theProduct = {item, price: {_id: adultFemalePrice._id, price: launType === "ordinary" ? adultFemalePrice.ordinary : adultFemalePrice.ironed, size: "Adult Female", laundryOptions: launType}, addons: [], addonPrice: 0};
      console.log(theProduct)
    }else {
      const { adultMalePrice, adultFemalePrice, ...Product } = product;
      const {childrenPrice, ...item} = Product
      theProduct = {item, price: {_id: childrenPrice._id, price: launType === "ordinary" ? childrenPrice.ordinary : childrenPrice.ironed, size: "Child", laundryOptions: launType}, addons: [], addonPrice: 0};
      console.log(theProduct)
    }
    
    console.log(tableList?.tbody);

    const checkExistence = tableList?.tbody?.find((e) => e?.item?._id === theProduct?.item?._id && e?.price?._id === theProduct.price._id && e?.price?.laundryOptions === theProduct.price.laundryOptions );
    console.log(checkExistence)
    if (!checkExistence) {
      // if (product.quantity !== 0) {
        theProduct.item.quantity_bought = 1;

        let setValue = {
          ...tableList,
          tbody: [...tableList.tbody, theProduct],
        };
        setTableList(setValue);

        localStorage.setItem("salesLocalData", JSON.stringify(setValue));
      // }
    } else {
      if (
        // product.quantity !== 0 &&
        product.quantity > checkExistence?.item?.quantity_bought
      ) {
        let setValue = {
          ...tableList,
          tbody: [
            ...tableList.tbody.map((e) => {
              if (e?.item?._id === product._id) {
                e.item.quantity_bought++;
                return e;
              } else {
                return e;
              }
            }),
          ],
        };
        setTableList(setValue);
        localStorage.setItem("salesLocalData", JSON.stringify(setValue));
      }
    }
  };

  const updateproductList = (productId) => {
    setProductList({
      ...productList,
      data: [
        ...productList.data.map((e) => {
          if (e._id === productId) {
            e.quantity--;
            return e;
          } else {
            return e;
          }
        }),
      ],
    });
  };

  const deleteProduct = (productId, sizeId, laundryOptions) => {
    if (tableList?.tbody?.length === 1) {
      let setValue = {
        ...tableList,
        tbody: [...tableList.tbody.filter((e) => e?.item?._id !== productId || e?.price?._id !== sizeId || e?.price?.laundryOptions !== laundryOptions)],
      };

      setValue = {
        ...tableList,
        tbody: [],
        localUserData: { name: "", phone: "" },
        coupon: {
          title: "",
          type: "",
          isValid: "",
          isExpired: "",
          amount: "",
          couponId: "",
        },
      };
      setTableList(setValue);

      localStorage.setItem("salesLocalData", JSON.stringify(setValue));
    } else {
      let seValue = {
        ...tableList,
        tbody: [...tableList.tbody.filter((e) => e?.item?._id !== productId || e?.price?._id !== sizeId || e?.price?.laundryOptions !== laundryOptions)],
      };
      console.log([...tableList.tbody.filter((e) => e?.item?._id !== productId || e?.price?._id !== sizeId || e?.price?.laundryOptions !== laundryOptions)])
      setTableList(seValue);

      localStorage.setItem("salesLocalData", JSON.stringify(seValue));
    }
  };

  const updateField = (nextVal, productId) => {
    let setValue = {
      ...tableList,
      tbody: [
        ...tableList.tbody.map((e) => {
          if (e._id === productId) {
            e.quantity_bought = Number(nextVal);
            return e;
          } else {
            return e;
          }
        }),
      ],
    };
    setTableList(setValue);
    localStorage.setItem("salesLocalData", JSON.stringify(setValue));
  };

  const alterProductQuantity = (productId, isIncrement, sizeId, laundryOptions) => {
    // const productFromList = productList?.data?.find(e=> e._id === productId)
    const product = tableList?.tbody?.find((e) => e?.item?._id === productId && e?.price?._id === sizeId && e?.price?.laundryOptions === laundryOptions);
    if (isIncrement) {
      // if (product.quantity > product.quantity_bought) {
        console.log(product)
        product.item.quantity_bought++;

        let setValue = {
          ...tableList,
          tbody: [
            ...tableList.tbody.map((e) => (e?.item?._id === productId && e?.price?._id === sizeId && e?.price?.laundryOptions === laundryOptions ? product : e)),
          ],
        };

        setTableList(setValue);
        localStorage.setItem("salesLocalData", JSON.stringify(setValue));
      // }
    } else {
      if (product?.item?.quantity_bought > 1) {
        product.item.quantity_bought--;

        let setValue = {
          ...tableList,
          tbody: [
            ...tableList.tbody.map((e) => (e?.item?._id === productId && e?.price?._id && e?.price?.laundryOptions === laundryOptions === sizeId ? product : e)),
          ],
        };

        setTableList(setValue);

        localStorage.setItem("salesLocalData", JSON.stringify(setValue));
      }
    }
  };

  const setConfirmPage = (info) => {
    setInvoice(info);
    setAlertModal(true);
  };

  const attemptCheckout = async () => {
    if (paymentMode.length > 0) {
      const allSales = tableList.tbody.map((data) => {
        // let requiredData = {};
        // requiredData.menuId = data?._id;
        // requiredData.quantity = data?.quantity_bought;

        return {
          menuId: data?.item?._id,
          quantity: data?.item?.quantity_bought,
          menuOption: data?.price?.size === "Adult Male" ? "adultMalePrice": data?.price?.size === "Adult Female" ? "adultFemalePrice" : "childrenPrice",
          laundryOptions: data?.price?.laundryOptions,
          addOns: data?.addons
        };
      });
      console.log(allSales);
      let data = { ...tableList };
      data.allSales = allSales;
      data.totalAmount = totalAmount;
      data.totalDiscount = totalDiscount;
      data.grandTotal = grandTotal;
      data.taxValue = tableList?.tax?.amount
        ? (totalAmount * tableList?.tax?.amount) / 100
        : 0;

      if (tableList?.localUserData?.phone === "" || tableList?.localUserData?.name === "") {
        showWarning("Please search and add a customer");
        return;
      }
      setConfirmPage(data);
      // localUserData
    } else {
      showWarning("Please select payment method");
    }
  };

  const clearCurrentTable = () => {
    let setValue = {
      ...tableList,
      tbody: [],
      localUserData: { name: "", phone: "" },
      coupon: {
        title: "",
        type: "",
        isValid: "",
        isExpired: "",
        amount: "",
        couponId: "",
      },
    };

    setTableList(setValue);
    localStorage.setItem("salesLocalData", JSON.stringify(setValue));
  };

  // coupon function
  const onCouponInputChange = (e) => {
    e?.preventDefault();
    setCouponVal(e?.target?.value);
  };

  // canBeUsedToday
  const onCouponInputSubmit = async (e) => {
    e?.preventDefault();

    if (couponVal) {
      const res = await getCouponAction(couponVal);
      // MAV-0649412742

      if (res) {
        if (!res?.coupon?.isExpired && res?.coupon?.isValid) {
          const newValue = {
            title: res?.coupon?.title,
            type: res?.coupon?.type,
            isValid: res?.coupon?.isValid,
            isExpired: res?.coupon?.isExpired,
            amount: res?.coupon?.amount,
            couponId: res?.coupon?.couponId,
          };

          let setValue = { ...tableList, coupon: { ...newValue } };
          setTableList(setValue);
          localStorage.setItem("salesLocalData", JSON.stringify(setValue));
        } else {
          if (res?.coupon?.isExpired) {
            formatError({ message: "the coupon has expired" });
          } else if (!res?.coupon?.isValid) {
            formatError({ message: "the coupon is invalid" });
          }
        }

        setCouponVal("");
      }
    } else {
      showWarning("Enter a valid coupon code");
    }
  };

  // draft
  const saveDraft = () => {
    if (tableList?.tbody?.length >= 1) {
      const body = [...tableList?.tbody];
      const user = { ...tableList?.localUserData };

      body?.forEach((e, i) => {
        if (i === 0) {
          e.coupon = { ...tableList?.coupon };
          e.localUserData = { ...tableList?.localUserData };
          return e;
        }
        return e;
      });

      const draft = [...tableListDraft?.draftList];

      draft.unshift([...body]);

      let setValue = {
        ...tableListDraft,
        draftList: [...draft],
      };

      setTableListDraft(setValue);
      localStorage.setItem("salesLocalDataDraft", JSON.stringify(setValue));

      clearCurrentTable();
    }
  };

  const deleteADraft = (id) => {
    let setValue = {
      ...tableListDraft,
      draftList: [...tableListDraft.draftList?.filter((el, ind) => ind !== id)],
    };

    setTableListDraft(setValue);
    localStorage.setItem("salesLocalDataDraft", JSON.stringify(setValue));
  };

  const selectDraft = (id) => {
    const theDraft = tableListDraft.draftList?.find((el, ind) => ind === id);

    let setValue = {
      ...tableList,
      tbody: theDraft,
      coupon: theDraft[0]?.coupon,
      localUserData: theDraft[0]?.localUserData,
    };

    setTableList(setValue);
    localStorage.setItem("salesLocalData", JSON.stringify(setValue));

    deleteADraft(id);
  };

  const deleteAllDraft = () => {
    let setValue = { ...tableListDraft, draftList: [] };

    setTableListDraft(setValue);
    localStorage.setItem("salesLocalDataDraft", JSON.stringify(setValue));
  };

  // new user

  const closeNewUserModal = () => {};

  const saveUser = () => {
    // modaltap
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions)
  }


  return (
    <div
    className=" g-0"

      style={{
        background: "rgb(245, 247, 248)",
        rowGap: "0px",
        columnGap: '0px',
        width: "100vw",
        height: "100vh",
        padding: "0px",
        margin: "0px",
        overflowX : 'hidden'
      }}
    >
      
    <div className="row p-0 m-0 mb-4">
        <div
          xl={12}
          className="align-items-center m-0 shadow p-2 mb-3"
          style={{ maxHeight: "60px", background: "blueviolet"}}
        >
          <Box
            className="pos-top-container h-100"
            style={{
              background: "blueviolet",
              color: "#fff",
              maxHeight: "60px",
            }}
          >
            <div className="harmburger-btn" onClick={toggleOptions} >
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 6.5H19V8H5V6.5Z" fill="#1F2328"/>
              <path d="M5 16.5H19V18H5V16.5Z" fill="#1F2328"/>
              <path d="M5 11.5H19V13H5V11.5Z" fill="#1F2328"/>
              </svg>
            </div>
            <div style={{whiteSpace: 'nowrap'}} className="title">Laundry Orders</div> 
            {showOptions || screenSize ? (<div className="title-left" >
                <div className="d-flex">
                  <span></span>
                  <Link to={"/orders-list"} className="text-white">
                    <span style={{ fontSize: "16px" }}>Orders List</span>
                  </Link>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setAlModal(true)}
                >
                  <span style={{ fontSize: "16px" }}>New Customer</span>
                </div>
                <HoldView
                draftData={tableListDraft}
                onDeleteDraft={deleteADraft}
                onDeleteAllDraft={deleteAllDraft}
                onSelectDraft={selectDraft}
              />
              </div>) : ""
              }
              <div>
                <ProfileDropdown
                  fullName={user?.emergencyContact?.fullName}
                  name={user?.role}
                  image={profile.image}
                  dropdown={profile.dropdown}
                />
              </div>
          </Box>

        </div>

    </div>
      

      {/* nav end */}
      {/* <RefreshCcw size={16} color={"gold"}></RefreshCcw> */}
    



      <div className="order-wrapper px-1">
      {/* product table */}
        <Col
          xs={12}
          xl={7}
          className="   product-table mb-3"
        >
          <Box
            className="mc-card p-2"
            style={{
              borderTop: "3px solid blueviolet",
              borderRadius: "10px 10px ",
            }}
          >
            <CardHeader title={"Sales Invoice"} />
            <Row className="justify-content-between">
              <Col xs={12} sm={6} md={5} xl={5}>
                <CustomField2
                  iconRight="add"
                  classes="w-100 h-md gray"
                  value={userNumInp}
                  setUserNumInp={setUserNumInp}
                  // option={allUser}
                  // selectUser={selectUser}
                  // createUser={createUser}
                  onClick={searchUser}
                  onKeyDown={(e) =>
                    e?.keyCode === 13 && searchUser(e?.target?.value)
                  }
                />
              </Col>

              <Col xs={12} sm={6} md={5} xl={5}>
                <CustomField3
                  value={couponVal}
                  disabled={tableList.tbody?.length === 0}
                  onChange={onCouponInputChange}
                  onSubmit={onCouponInputSubmit}
                  onClick={onCouponInputSubmit}
                  onKeyDown={(e) => e?.keyCode === 13 && onCouponInputSubmit(e)}
                  type={"text"}
                  icon="s"
                  classes="w-100 h-md gray"
                />
              </Col>
            </Row>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            ></div>

            <div className="mb-0">
              <SalesTable
                thead={tableList?.thead}
                tbody={tableList?.tbody}
                updateField={updateField}
                deleteProduct={deleteProduct}
                alterProductQuantity={alterProductQuantity}
                setTableList={setTableList}
                tableList={tableList}
              />
            </div>

            {totalQuantity !== 0 ? (
              <div className="under-element">
                {/* incoming... */}

                <div className="top-container  row my-5 p-0">
                  {(showUserBox ||
                    tableList?.localUserData?.name ||
                    (userDetails?.name && userDetails?.phone)) && (
                    <Row>
                      <Col xs={12} sm={6} md={5} xl={5} className='nameTemplate' style={{position: 'relative'}}>
                        <span style={{ fontWeight: "bolder" }}>
                          {" "}
                          Customer's Name{" "}
                        </span>
                        :{" "}
                        <span>
                          {tableList?.localUserData?.name || userDetails?.name}
                        </span>

                        <i title='remove customer' className="text-danger" style={{position: 'absolute', top: '-10px',  right: '0', cursor: 'pointer'}}  onClick={removeUserData}> <X size={25} style={{border: '1px solid grey', borderRadius: '50%'}} />  </i>
                      </Col>
                      {/* <Col xs={12} sm={6} md={5} xl={5} >
                        <span style={{ fontWeight: "bolder" }}> User Phone Number </span> : <span className='text-bold font-12'>{tableList?.localUserData?.phone || userDetails?.phone}</span>
                      </Col> */}
                    </Row>
                  )}

                  {/* <div className="left-container">
                                  <div>
                                      <input className="checkbox"  type='checkbox'/>
                                  </div>
                                  <div> <span>Send SMS to Customer</span></div>
                              </div> */}
                  {/* <div className="left-container">
                                  <div>
                                      <input className="checkbox"  type='checkbox'/>
                                  </div>
                                  <div> <span>Send SMS to Customer</span></div>
                              </div> */}

                  {tableList?.tax?.amount >= 1 &&
                    totalAmount >= tableList?.tax?.threshold && (
                      <Col
                        xs={12}
                        sm={6}
                        md={5}
                        xl={5}
                        className="right-container"
                      >
                        <div style={{ marginRight: "3px" }}>
                          <span style={{ fontWeight: "bolder" }}>
                            Tax Deduction
                          </span>{" "}
                          <span className="text-danger"></span>
                        </div>
                        <div>
                          {" "}
                          {/* #${totalAmount * tableList?.tax?.amount/100 }   */}
                          <input
                            value={`${tableList?.tax?.amount}%`}
                            disabled
                            type="text"
                            placeholder="0%"
                          />
                        </div>
                      </Col>
                    )}
                  {tableList?.coupon?.amount && (
                    <Col xs={12} sm={6} md={5} xl={5} className="right-container">
                      <div style={{ marginRight: "3px" }}>
                        <span style={{ fontWeight: "bolder" }}>Coupon Value: </span>{" "}
                        <span className="text-danger"></span>
                      </div>
                      <div>
                        {" "}
                        <input
                          disabled
                          value={
                            tableList?.coupon.type === "percentage"
                              ? `${tableList?.coupon?.amount}%`
                              : tableList?.coupon.type === "absolute"
                              ? `#${tableList?.coupon?.amount}`
                              : ""
                          }
                          type="text"
                          placeholder=""
                        />
                      </div>
                    </Col>
                  )}
                  {/* <div className="right-container">
                                  <div><span>Other Charges</span> <span className="text-danger">*</span></div>
                                  <div> <input   type='number' placeholder="0.00"  /></div>
                              </div> */}
                </div>

                <Row className="contain m-0 mb-0">
                  <Row className="b-container m-0 mb-0">
                    <Col xs={12} sm={6} md={3} xl={3} className="button-col">
                      <div className="text-bold" style={{ fontWeight: "bolder" }}>
                        Quantity:
                      </div>
                      <div>{totalQuantity}</div>
                    </Col>
                    <Col xs={12} sm={6} md={3} xl={3} className="button-col">
                      <div style={{ fontWeight: "bolder" }}>Total Amount:</div>
                      <div>
                        <Currency quantity={totalAmount} currency="NGN" />
                        {/* ${totalAmount} */}
                      </div>
                      {/* <Button className="mc-btn purple">Multiple</Button> */}
                    </Col>
                    {console.log(tableList)}
                    {tableList?.tax?.amount >= 1 &&
                      totalAmount >= tableList?.tax?.threshold && (
                        <Col xs={12} sm={6} md={3} xl={3} className="button-col">
                          <div style={{ fontWeight: "bolder" }}>Tax Amount:</div>
                          <div>
                            <Currency
                              quantity={
                                (totalAmount * tableList?.tax?.amount) / 100
                              }
                              currency="NGN"
                            />
                            {/* ${totalDiscount} */}
                          </div>
                        </Col>
                      )}
                    <Col xs={12} sm={6} md={3} xl={3} className="button-col">
                      <div style={{ fontWeight: "bolder" }}>Grand Total:</div>
                      <div>
                        <Currency
                          quantity={
                            tableList?.tax?.amount &&
                            totalAmount >= tableList?.tax?.threshold
                              ? totalAmount +
                                (totalAmount * tableList?.tax?.amount) / 100 -
                                (tableList?.coupon?.type === "percentage"
                                  ? (totalAmount * tableList?.coupon?.amount) /
                                    100
                                  : tableList?.coupon?.type === "absolute"
                                  ? tableList?.coupon?.amount
                                  : 0)
                              : tableList?.coupon?.amount
                              ? grandTotal -
                                (tableList?.coupon?.type === "percentage"
                                  ? (totalAmount * tableList?.coupon?.amount) /
                                    100
                                  : tableList?.coupon?.type === "absolute"
                                  ? tableList?.coupon?.amount
                                  : 0)
                              : grandTotal
                          }
                          currency="NGN"
                        />
                        {/* ${grandTotal} */}
                      </div>
                    </Col>
                  </Row>

                  <Row className="mb-1  mt-0 mx-0">
                    <div style={{ fontWeight: "bolder", fontSize: "18px" }}>
                      <span>Payment Methods</span>
                    </div>
                    <Col xs={12} md={12} xl={12} className=" p-0 mr-0 ">
                      <Row className="b-container">
                        <Col xs={10} sm={6} md={3} xl={3} className="button-col-2">
                          <div className="d-flex justify-content-start align-items-center">
                            <input
                              onChange={() => pickMode("cash")}
                              type="checkbox"
                              name="cash"
                              id="cash"
                            />
                            <label
                              style={{ fontWeight: "bold" }}
                              htmlFor="cash"
                              className="mx-1"
                            >
                              CASH
                            </label>
                          </div>
                        </Col>
                        <Col xs={12} sm={6} md={4} xl={4} className="button-col-2">
                          <div className="d-flex justify-content-start align-items-center">
                            <input
                              onChange={() => pickMode("transfer")}
                              type="checkbox"
                              name="transfer"
                              id="transfer"
                            />
                            <label
                              style={{ fontWeight: "bold" }}
                              htmlFor="transfer"
                              className="mx-1"
                            >
                              BANK TRANSFER
                            </label>
                          </div>
                        </Col>
                        <Col xs={12} sm={6} md={5} xl={5} className="button-col-2">
                          <div className="d-flex justify-content-start align-items-center">
                            <input
                              onChange={() => pickMode("pos")}
                              type="checkbox"
                              name="pos"
                              id="pos"
                            />
                            <label
                              style={{ fontWeight: "bold" }}
                              htmlFor="pos"
                              className="mx-1"
                            >
                              POS
                            </label>
                          </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} xl={6} className="button-col-2">
                          <div className="d-flex justify-content-start align-items-center">
                            <input
                              onChange={() => pickMode("pay later")}
                              type="checkbox"
                              name="pay later"
                              id="pay later"
                            />
                            <label
                              style={{ fontWeight: "bold" }}
                              htmlFor="pay later"
                              className="mx-1"
                            >
                              PAY LATER
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="b-containers mb-3 mx-0">
                      <Row className="action-container mx-0">

                        
                          <Button
                            onClick={() => setCalModal(true)}
                            className="action-btns"
                            style={{backgroundColor: 'blueviolet'}}
                          >
                            Calculator
                          </Button>

                          <Button
                            onClick={saveDraft}
                            className="action-btns"
                            style={{backgroundColor: '#1a9f53'}}
                          >
                            Save To Draft
                          </Button>

                          <Button
                            onClick={attemptCheckout}
                            className="action-btns"
                            style={{backgroundColor: '#0858f7'}}
                          >
                            Confirm
                          </Button>

                      </Row>
                  </Row>
                </Row>
              </div>
            ) : (
              <>
                <Row className="b-containers mb-3 my-5">
                        <Col xs={12} sm={6} md={4} xl={4}>
                          <Button
                            onClick={() => setCalModal(true)}
                            className="mc-btn purple px-4 button"
                          >
                            Calculator
                          </Button>
                        </Col>
                    {/* <Col xs={12} md={12} xl={12} className=" p-0 m-0 px-5 ">
                      <Row className=" arrangdiv d-flex justify-content-between">

                      </Row>
                    </Col> */}
                  </Row>
              </>
            )}
          </Box>
        </Col>
        {/* table end */}


        {/* product list */}
        <Col
          xl={5}
          xs={12}

          className="order-0 order-sm-0 order-md-1  saleContainer   product-list mb-3"
        >
          <Box
            className="mc-card p-2 "
            style={{
              borderTop: "3px solid blueviolet",
              borderRadius: "10px 10px ",
            }}
          >
      
            <Row className="justify-content-between">
              <Col xs={12} sm={6} md={6} xl={6}>
                <CustomField
                  onClick={getAllMenu}
                  cats={allCat}
                  onChange={(e) => getMenuByCategory(e)}
                  icon="refresh"
                  value={searchValueCat}
                  classes="w-100 h-md gray"
                  option={["admin", "member", "client"]}
                />
              </Col>
              <Col xs={12} sm={6} md={6} xl={6}>
                <CustomFieldSearch
                  onChange={(e) => searchMenu(e)}
                  classes="w-100 h-md gray"
                  icon="refresh"
                  value={searchValue}
                  onClick={reloadMenu}
                />
              </Col>

            </Row>

              {/* <div style={{ width: "47%" }}>
                <input list="browsers" name="browser"/>
                      <datalist id="browsers">
                          <option value="Internet Explorer"/>
                          <option value="Firefox"/>
                          <option value="Chrome"/>
                          <option value="Opera"/>
                          <option value="Safari"/>
                      </datalist>

                <CustomFieldBrand
                  onClick={getAllMenu}
                  icon="refresh"
                  classes="w-100 h-md gray"
                  option={[]}
                />
              </div> */}
           {console.log(productList?.data)}

            <Col className="salesProductContainer">
              {searchValue?.length ? filteredData?.map((p) => (
                <Product
                  key={p._id}
                  productData={p}
                  addoRUpdateProduct={selectProduct}
                />
              )) : 
                  productList?.data?.map((p) => (
                <Product
                  key={p._id}
                  productData={p}
                  addoRUpdateProduct={selectProduct}
                />
              ))}
            </Col>
          </Box>
        </Col>
        {/* product list end */}

      </div>






















      {/* comfirm page */}
      {/* size?: 'sm' | 'lg' | 'xl';
    fullscreen?: true | string | 'sm-down' | 'md-down' | 'lg-down' | 'xl-down' | 'xxl-down'; */}
    {/* confirm */}
      <Modal
        isOpen={alertModal}
        onClosed={() => setAlertModal(false)}
        size="sm"
        backdrop="static"
      >
        <InvoiceDetails
          clearUserData={clearUserData}
          paymentMode={paymentMode}
          userDetails={
            tableList?.localUserData?.name
              ? tableList?.localUserData
              : userDetails
          }
          tableList={invoice}
          grandTotal={grandTotal}
          totalDiscount={totalDiscount}
          setAlertModal={setAlertModal}
          totalAmount={totalAmount}
          clearCurrentTable={clearCurrentTable}
          getAllMenu={getAllMenu}
          userPhoneNumber={currentUserNumber}
          addOnsList={addOnsList}
        />
      </Modal>


      {/* add user */}
      <Modal isOpen={alModal} onClosed={() => setAlModal(false)}>
        <Box className="mc-alert-modal p-3">
          {/* <Icon type="add_user" /> */}
          <Heading as="h3">Add New Customer</Heading>
          {/* <Text as="p">Add New User</Text> */}

          <div>
            <input
              onChange={setUserInfoDetails}
              name="name"
              type="text"
              placeholder="Enter customer's name"
              className="form-control my-2"
            />

            <input
              onChange={setUserInfoDetails}
              name="phone"
              type="number"
              placeholder="Enter customer's phone number"
              className="form-control my-2"
            />
            <input
              onChange={setUserInfoDetails}
              name="email"
              type="email"
              placeholder="Enter customer's email address"
              className="form-control my-2"
            />
            <select
              onChange={setUserInfoDetails}
              name="sex"
              placeholder="Select gender"
              className="form-control my-2"
              style={{fontSize: "15px", fontWeight: "normal"}}
            >
              <option value="None">Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            {/* <input
              onChange={setUserInfoDetails}
              name="amount"
              type="number"
              placeholder="Enter amount"
              className="form-control my-2"
            /> */}
          </div>

          <div className="footer">
            <Button
              type="button"
              className="btn btn-danger mx-1"
              onClick={() => setAlModal(false)}
            >
              close
            </Button>
            <Button
              type="button"
              className="btn btn-secondary mx-1"
              onClick={sendNewUserData}
            >
              Save Customer
            </Button>
          </div>
          {/* <Modal.Footer>
                       
                    </Modal.Footer> */}
        </Box>
      </Modal>



      {/* calculator */}
      <Modal isOpen={calModal} onClosed={() => setCalModal(false)}>
        <Box className="mc-alert-modal p-3 bg-light rounded" style={{width: '350px'}}>
          {/* <Icon type="add_user" /> */}
          <Heading as="h3">
            <span style={{textAlign: 'left'}} >
               Calculator
            </span>

            <i className="bg-light" style={{float: 'right', cursor: 'pointer'}}  onClick={() => setCalModal(false)}> <X size={30} style={{border: '1px solid grey', borderRadius: '50%'}} />  </i>
          
          </Heading>
          {/* <Text as="p">Add New User</Text> */}

          <div style={{width: '350px'}}>
            <Calculator amount={grandBalance}/>
          </div>

          {/* <div className="footer">
            <Button
              type="button"
              className="btn btn-danger mx-1"
              onClick={() => setCalModal(false)}
            >
              close
            </Button>
          </div> */}
          {/* <Modal.Footer>
                       
                    </Modal.Footer> */}
        </Box>
      </Modal>
      
      {/* select adult or child */}
      <Modal isOpen={genModal} onClosed={() => setGenModal(false)}>
        <Box className="mc-alert-modal p-3 bg-light rounded" style={{minWidth: '350px'}}>
          {/* <Icon type="add_user" /> */}
          <Heading as="h3">
            <span style={{textAlign: 'left'}} >
               Size & Type
            </span>

            <i className="bg-light" style={{float: 'right', cursor: 'pointer'}}  onClick={() => setGenModal(false)}> <X size={30} style={{border: '1px solid grey', borderRadius: '50%'}} />  </i>
          
          </Heading>
          {/* <Text as="p">Add New User</Text> */}

          <div style={{minWidth: '350px'}}>
          <select
              onChange={(e) => {
                if (e.target.value !== "" && e.target.value !== "None") {
                  setClotheSize(e.target.value)
                  setIsSizeSelected(false);
                } else {
                  setIsSizeSelected(true);
                }  
              }}
              name="size"
              className="form-control my-2"
              style={{fontSize: "15px", fontWeight: "normal"}}
            >
              <option value="None">Select size</option>
              <option value="adultMalePrice">Adult male</option>
              <option value="adultFemalePrice">Adult female</option>
              <option value="childrenPrice">Children</option>
            </select>

            <select
              onChange={(e) => {
                setGenModal(false);
                addOrUpdateProduct(product, e.target.value);
                setLaundryOptions(e.target.value);
              }}
              name="laundry-options"
              className="form-control my-2"
              style={{fontSize: "15px", fontWeight: "normal"}}
              disabled={isSizeSelected}
            >
              <option value="None">Select laundry option</option>
              <option value="ordinary">Wash and Iron</option>
              <option value="ironed">Iron Only</option>
            </select>
          </div>

          
        </Box>
      </Modal>
    </div>

    // <PageLayout>
    // </PageLayout>
  );
};

export default NewSales;
