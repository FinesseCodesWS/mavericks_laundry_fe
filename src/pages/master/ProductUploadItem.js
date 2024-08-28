import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Box,
  Anchor,
  Button,
  Image,
  Input,
  Label,
  Icon,
  Text,
  Select,
  Option,
} from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productUpload.json";
import axios from "../../axios";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosMain from "axios";

export default function ProductUploadItem() {
  const navigate = useNavigate();
  const access = JSON.parse(localStorage.getItem("pos-token"));
  const { id } = useParams();
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.menu);
  const [menuItem, setMenuItem] = useState({});
  const [uploadFile, setUploadFile] = React.useState("");
  const [dataUri, setDataUri] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sendData, setSendData] = useState({
    itemName: "",
    unitPrice: "",
    image: ``,
    category_id: "",
    countable: true,
  });

  useEffect(() => {
    const getImage = async () => {
      const response = await axios.get(`/menu/image/${menu?._id}`, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    };
    getImage();
  }, [menu?._id]);

  useEffect(() => {
    if (menu) {
      return setMenuItem(menu);
    }
  }, [menu]);

  useEffect(() => {
    if (id) {
      dispatch({
        type: "GET_MENU",
        payload: id,
      });
    }
  }, [id, dispatch]);

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const onChange = (file) => {
    if (!file) {
      setDataUri("");
      return;
    }
    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri);
    });
  };

  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(`/menu/category/${id}`);
      console.log(response.data);
      setCategories((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    return setSendData({
      ...sendData,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`/menu/category`);
        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleEditCategory = async (id) => {
    try {
      const response = await axios.post(`/menu/category/${id}`, {
        category: sendData.category,
      });
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: `You have successfully edited this category.`,
      });
      setCategories([...categories, response.data.data]);
    } catch (error) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong!",
      });
    }
  };

  const handleSubmitMenu = async () => {
    const jsonFormat = {
      itemName: sendData.itemName ? sendData.itemName : menuItem?.itemName,
      unitPrice: sendData.unitPrice ? sendData.unitPrice : menuItem?.unitPrice,
      image: sendData.image ? sendData.image : menuItem?.image,
      category_id: sendData.category_id
        ? sendData.category_id
        : menuItem?.category_id,
      countable:
        sendData?.countable === true
          ? true
          : false
          ? sendData?.countable === true
            ? true
            : false
          : menuItem?.countable,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/menu/list/${menu?._id}`,
        jsonFormat
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "You have successfully updated this menu.",
      });
      return navigate("/product-list");
    } catch (error) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong!",
      });
    }
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={data?.pageTitle}>
              {data?.breadcrumb.map((item, index) => (
                <li key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </Breadcrumb>
          </CardLayout>
        </Col>
        <Col xl={7}>
          <CardLayout>
            <CardHeader title="basic information" />
            <Row>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="item name"
                  fieldSize="w-100 h-md"
                  name="itemName"
                  defaultValue={menuItem?.itemName}
                  onChange={handleChange}
                />
              </Col>
              <Col xl={6}>
                <Box className={`mc-label-field-group label-col`}>
                  <Label className="mc-label-field-title">
                    Select Category
                  </Label>
                  <Select
                    name="category_id"
                    onChange={handleChange}
                    className="mc-label-field-select w-100 h-md"
                    // defaultValue={menuItem?.category}
                  >
                    <Option value="">Select Category</Option>
                    {categories.map((item, index) => (
                      <Option key={index} value={item?._id}>
                        {item?.category}
                      </Option>
                    ))}
                  </Select>
                </Box>
              </Col>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="regular price"
                  fieldSize="w-100 h-md"
                  name="unitPrice"
                  onChange={handleChange}
                  defaultValue={menuItem?.unitPrice}
                />
              </Col>
            </Row>
          </CardLayout>
        </Col>
        <Col xl={5}>
          <CardLayout className="mb-4">
            <CardHeader title="organization" />
            <Row>
              <Col xl={12}>
                <Box className="mc-product-upload-organize mb-4">
                  <LabelField
                    type="text"
                    label="edit category selected"
                    name="category"
                    fieldSize="w-100 h-sm"
                    onChange={handleChange}
                  />
                  <Button
                    onClick={() => handleEditCategory(sendData?.category_id)}
                    className="mc-btn primary"
                  >
                    edit
                  </Button>
                </Box>
              </Col>
            </Row>
          </CardLayout>
          <CardLayout>
            <CardHeader title="specification" />
            <Row>
              <Col xl={12}>
                {/* <LabelField
                  type="text"
                  label="stock / quantity"
                  fieldSize="w-100 h-md"
                /> */}
                <Box className={`mc-label-field-group label-col`}>
                  <Label className="mc-label-field-title">Countable</Label>
                  <Select
                    name="countable"
                    onChange={handleChange}
                    className="mc-label-field-select w-100 h-md"
                  >
                    <Option value={true}>True</Option>
                    <Option value={false}>False</Option>
                  </Select>
                </Box>
              </Col>
            </Row>
          </CardLayout>
        </Col>
        <Col xl={12}>
          <CardLayout>
            <CardHeader title="media &amp; published" />
            <Box className="mc-product-upload-media">
              <Box className="mc-product-upload-image">
                {menu?.image && <Image src={menu?.image} alt="product image" />}
              </Box>
              <Box className="mc-product-upload-file">
                <Input
                  type="file"
                  id="product"
                  name="image"
                  onChange={handleChange}
                />
                <Label htmlFor="product">
                  <Icon type="collections" />
                  <Text>{uploadFile}</Text>
                </Label>
              </Box>
            </Box>
            <Anchor
              className="mc-btn w-100 primary mt-5"
              text="edit product"
              icon="cloud_upload"
              href="#"
              onClick={() => handleSubmitMenu()}
            />
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
