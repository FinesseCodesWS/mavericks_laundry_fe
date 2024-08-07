import React, { useState, useEffect, useRef } from "react";
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
import axiosMain from "axios";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductUpload() {
  const menus = useSelector((state) => state.menu.menus);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const access = JSON.parse(localStorage.getItem("pos-token"));
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [uploadFile, setUploadFile] = React.useState("");
  const [dataUri, setDataUri] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewOffline, setPreviewOffline] = useState(null);
  const [binaryString, setBinaryString] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [sendData, setSendData] = useState({
    itemName: "",
    unitPrice: "",
    image: ``,
    category_id: "",
    countable: true,
  });

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
      setCategories((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {}
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
        const response = await axios.get("/menu/category");
        setCategories(response.data.data);
      } catch (error) {}
    };
    getCategories();
  }, []);

  const handleSubmitCategory = async () => {
    try {
      const response = await axios.post("/menu/category", {
        category: sendData.category,
      });
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: `You have successfully created a category.`,
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
      itemName: sendData.itemName,
      unitPrice: sendData.unitPrice,
      image: sendData.image,
      category_id: sendData.category_id,
      countable: sendData?.countable === true ? true : false,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/menu/list`,
        jsonFormat
      );
      const newData = {
        ...response.data.data,
        image: [sendData.image, previewOffline],
      };
      localStorage.removeItem("pos-menus");
      const newArray = [newData, ...menus];
      localStorage.setItem("pos-menus", JSON.stringify(newArray));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "You have successfully created a menu.",
      });
      setLoading(false);
      navigate("/product-list");
    } catch (error) {
      setLoading(true);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong!",
      });
      setLoading(false);
    }
  };

  /**
   * * Upload image to cloudinary storage
   * @params {string} image_base64
   * @returns {string} uploaded image remote url
   */

  const uploadImage = async (image_base64) => {
    setPreviewOffline(image_base64);
    try {
      const payload = {
        file: `${image_base64}`,
        upload_preset: "bxlilcsc",
      };
      const response = await axiosMain.post(
        "https://api.cloudinary.com/v1_1/dmvaqisig/image/upload",
        payload
      );
      return response?.data?.secure_url;
    } catch (error) {}
  };

  const handleUrlImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(async () => {
        setLoadingImage(true);
        let res = await uploadImage(e.target.result);
        setLoadingImage(false);
        setPreviewImage(res);
        return setSendData({
          ...sendData,
          image: res,
        });
        // setImageLoading(false);
      }, 2000);
    };
    reader.readAsDataURL(file);
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
                  onChange={handleChange}
                />
              </Col>
              <Col xl={6}>
                <Box className={`mc-label-field-group label-col`}>
                  <Label className="mc-label-field-title">Category</Label>
                  <Select
                    name="category_id"
                    onChange={handleChange}
                    className="mc-label-field-select w-100 h-md"
                    defaultValue={category}
                  >
                    <Option value="">Select Option</Option>
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
                    label="add category"
                    name="category"
                    fieldSize="w-100 h-sm"
                    onChange={handleChange}
                  />
                  <Button
                    onClick={() => handleSubmitCategory()}
                    className="mc-btn primary"
                  >
                    add
                  </Button>
                </Box>
                <Box className="mc-product-upload-organize p-2">
                  <Row>
                    {categories?.map((category, index) => (
                      <Col xl={6}>
                        <span>{category.category}</span>
                        <span
                          style={{
                            cursor: "pointer",
                            marginLeft: ".2rem",
                          }}
                          onClick={() => handleRemove(category?._id)}
                        >
                          <i className="fa fa-trash">x</i>
                        </span>
                      </Col>
                    ))}
                  </Row>
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
              {previewOffline ? (
                <Box className="mc-product-upload-image">
                  <Image src={previewOffline} alt="product image" />
                </Box>
              ) : (
                previewImage && (
                  <Box className="mc-product-upload-image">
                    <Image src={previewImage} alt="product image" />
                  </Box>
                )
              )}
              <Box className="mc-product-upload-file">
                <Input
                  type="file"
                  id="product"
                  // onChange={(e) => setUploadFile(e.target.files[0])}
                  // onChange={(event) => onChange(event.target.files[0] || null)}
                  type="file"
                  name="image"
                  // onChange={handleChange}
                  onChange={(e) => handleUrlImage(e.target.files[0])}
                />
                <Label htmlFor="product">
                  <Icon type="collections" />
                  <Text>{loadingImage ? `Uploading....` : uploadFile}</Text>
                </Label>
              </Box>
            </Box>
            <Anchor
              className="mc-btn w-100 primary mt-5"
              onClick={() => handleSubmitMenu()}
              text={
                loadingImage
                  ? `uploading...`
                  : loading
                  ? `publishing...`
                  : `publish`
              }
              icon="cloud_upload"
              href="#"
            />
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
