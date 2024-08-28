import React, { useState, useEffect } from "react";
import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
import {
  LegendField,
  LegendTextarea,
  IconField,
} from "../../components/fields";
import {
  Item,
  Anchor,
  Box,
  Button,
  Image,
  Input,
  Label,
  Icon,
  Text,
} from "../../components/elements";
import { CardLayout, TabCard } from "../../components/cards";
import { Breadcrumb, FileUpload } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/myAccount.json";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axios";
import axiosMain from "axios";
import imageDefault from "../../assets/image.png";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function MyAccount() {
  const [imageUrl, setImageUrl] = useState(null);
  const access = JSON.parse(localStorage.getItem("pos-token"));
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [getImage, setGetImage] = useState("");
  const userImage = JSON.parse(localStorage.getItem("pos-user-image"));
  const [loading, setLoading] = useState(false);
  const [sendData, setSendData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    image: "",
    address: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });
  const [dataUri, setDataUri] = useState("");

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await axiosMain.get(
          `${process.env.REACT_APP_URL}/staff/px`,
          {
            responseType: "arraybuffer",
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.log(error);
      }
    };
    getImage();
  }, [access]);

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const onChange = async (file) => {
    if (!file) {
      setDataUri("");
      return;
    }
    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri);
      localStorage.setItem("pos-user-image", JSON.stringify(dataUri));
    });
    let formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axiosMain.post(
        `${process.env.REACT_APP_URL}/staff/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return Swal.fire({
        icon: "success",
        title: "Success",
        text: `Profile image updated!`,
      });
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

  const handleChange = (e) => {
    setSendData({
      ...sendData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const data = {
      oldPassword: sendData.oldPassword,
      newPassword: sendData.newPassword,
    };

    if (sendData.newPassword !== sendData.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Passwords do not match!`,
      });
    }

    try {
      const response = await axios.post("/staff/change-password", data);
      return Swal.fire({
        icon: "success",
        title: "Success",
        text: `Password Changed Successfully!`,
      });
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

  const handleEdit = async () => {
    const data = {
      email: sendData.email ? sendData.email : user?.email,
      address: sendData.address ? sendData.address : user?.address,
    };

    // if (sendData.newPassword !== sendData.confirmPassword) {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: `Passwords do not match!`,
    //   });
    // }

    try {
      setLoading(true);
      const response = await axios.post(
        `/staff/update-profile?staff_id=${user?._id}`,
        {
          firstName: sendData.firstName ? sendData.firstName : user?.firstName,
          lastName: sendData.lastName ? sendData.lastName : user?.lastName,
          email: sendData.email ? sendData.email : user?.email,
          address: sendData.address ? sendData.address : user?.address,
          emergencyContact: {
            fullName: sendData.fullName
              ? sendData.fullName
              : user?.emergencyContact?.fullName,
            phoneNumber: user?.phoneNumber,
            address: sendData.address ? sendData.address : user?.address,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Profile Updated Successfully!`,
      });
      dispatch({
        type: "GET_USER",
        payload: response.data.data,
      });
      setLoading(false);
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
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <Breadcrumb title={data?.pageTitle}>
            {data?.breadcrumb.map((item, index) => (
              <Item key={index} className="mc-breadcrumb-item">
                {item.path ? (
                  <Anchor className="mc-breadcrumb-link" href={item.path}>
                    {item.text}
                  </Anchor>
                ) : (
                  item.text
                )}
              </Item>
            ))}
          </Breadcrumb>
        </Col>
        <Col xl={12}>
          <CardLayout>
            <Tabs defaultActiveKey="profile" id="mc" className="mc-tabs">
              <Tab
                eventKey="profile"
                title="edit Profile"
                className="mc-tabpane profile"
              >
                <TabCard title="public information">
                  <Row>
                    <Col xl={4}>
                      <Box className="mc-user-avatar-upload">
                        <Box className="mc-user-avatar">
                          <Image
                            src={imageUrl ? imageUrl : imageDefault}
                            alt={data?.avatar.alt}
                          />
                        </Box>
                        <Box className={`mc-file-upload button`}>
                          <Input
                            type="file"
                            id="avatar"
                            onChange={(event) =>
                              onChange(event.target.files[0] || null)
                            }
                          />
                          <Label htmlFor="avatar">
                            <Icon>{"cloud_upload"}</Icon>
                            <Text as="span">{"upload"}</Text>
                          </Label>
                        </Box>
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <LegendField
                            name="firstName"
                            title="First name"
                            defaultValue={`${
                              user?.firstName ? user?.firstName : `First name`
                            }`}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            name="lastName"
                            title="Last name"
                            onChange={handleChange}
                            defaultValue={`${
                              user?.lastName ? user?.lastName : `Last name`
                            }`}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            name="fullName"
                            title="full name"
                            defaultValue={`${user?.emergencyContact?.fullName}`}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col xl={6}>
                          <LegendField
                            onChange={handleChange}
                            name="address"
                            title="address"
                            defaultValue={user?.address}
                          />
                        </Col>
                        {/* <Col xl={12}><LegendTextarea title={ data?.bio.title } longText={ data?.bio.longText } /></Col> */}
                      </Row>
                    </Col>
                  </Row>
                </TabCard>
                <TabCard title="private information">
                  <Row>
                    {/* <Col xl={4}>
                      <LegendField
                        disabled
                        title={data?.id.title}
                        value={user?._id}
                      />
                    </Col> */}
                    <Col xl={6}>
                      <LegendField
                        title={data?.role.title}
                        option={data?.role.option}
                        disabled
                        activeOption={user?.role}
                      />
                    </Col>
                    <Col xl={6}>
                      <LegendField
                        title={data?.status.title}
                        option={data?.status.option}
                        activeOption={user?.status}
                      />
                    </Col>
                    <Col xl={6}>
                      <LegendField
                        title={data?.email.title}
                        defaultValue={user?.email}
                        name="email"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xl={6}>
                      <LegendField
                        title={data?.phone.title}
                        value={user?.phoneNumber}
                      />
                    </Col>
                    <Col xl={12}>
                      <LegendTextarea
                        title={data?.address.title}
                        longText={user?.address}
                        defaultValue={user?.address}
                        name="address"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </TabCard>
                <Button
                  className="mc-btn primary"
                  icon="verified"
                  text={loading ? `updating...` : `save changes`}
                  onClick={() => handleEdit()}
                />
              </Tab>
              <Tab
                eventKey="password"
                title="Change Password"
                className="mc-tabpane password"
              >
                <TabCard title="generate password">
                  <Row>
                    <Col xs={12} md={12}>
                      <IconField
                        name="oldPassword"
                        onChange={handleChange}
                        icon="lock"
                        type="password"
                        placeholder="current password"
                        classes="w-100 h-lg"
                        passwordVisible
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <IconField
                        name="newPassword"
                        onChange={handleChange}
                        icon="add_moderator"
                        type="password"
                        placeholder="new password"
                        classes="w-100 h-lg"
                        passwordVisible
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <IconField
                        name="confirmPassword"
                        onChange={handleChange}
                        icon="verified_user"
                        type="password"
                        placeholder="confirm password"
                        classes="w-100 h-lg"
                        passwordVisible
                      />
                    </Col>
                  </Row>
                </TabCard>
                <Button
                  className="mc-btn primary"
                  icon="verified"
                  text="save changes"
                  onClick={() => handleSubmit()}
                />
              </Tab>
              {/* <Tab
                eventKey="settings"
                title="other settings"
                className="mc-tabpane settings"
              >
                <Row xs={1} md={2}>
                  <Col>
                    <TabCard title="activity email settings">
                      <Form.Check
                        type="switch"
                        id="switch1"
                        label="Someone adds you as a connection"
                      />
                      <Form.Check
                        type="switch"
                        id="switch2"
                        label="you're sent a direct message"
                        defaultChecked
                      />
                      <Form.Check
                        type="switch"
                        id="switch3"
                        label="New membership approval"
                        defaultChecked
                      />
                      <Form.Check
                        type="switch"
                        id="switch4"
                        label="Send Copy To Personal Email"
                        defaultChecked
                      />
                      <Form.Check
                        type="switch"
                        id="switch5"
                        label="Tips on getting more out of PCT-themes"
                      />
                    </TabCard>
                  </Col>
                  <Col>
                    <TabCard title="product email settings">
                      <Form.Check
                        type="checkbox"
                        id="check1"
                        label="Someone adds you as a connection"
                        defaultChecked
                      />
                      <Form.Check
                        type="checkbox"
                        id="check2"
                        label="you're sent a direct message"
                        defaultChecked
                      />
                      <Form.Check
                        type="checkbox"
                        id="check3"
                        label="New membership approval"
                        defaultChecked
                      />
                      <Form.Check
                        type="checkbox"
                        id="check4"
                        label="Send Copy To Personal Email"
                      />
                      <Form.Check
                        type="checkbox"
                        id="check5"
                        label="Tips on getting more out of PCT-themes"
                      />
                    </TabCard>
                  </Col>
                </Row>
                <Button
                  className="mc-btn primary"
                  icon="verified"
                  text="update changes"
                />
              </Tab> */}
            </Tabs>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
