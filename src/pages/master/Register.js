import React, { useState } from "react";
import {
  Box,
  Text,
  Form,
  Image,
  Button,
  Anchor,
  Heading,
  Input,
  Label,
  Icon,
} from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/register.json";
import logo from "../../assets/logo1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sendData, setSendData] = useState({
    phoneNumber: "",
    password: "",
    code: "",
  });

  const handleChange = (e) => {
    return setSendData({
      ...sendData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/auth/signup`,
        sendData
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `You have successfully created an account.`,
      });
      setLoading(false);
      return navigate("/");
    } catch (error) {
      setLoading(true);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong!",
      });
      return setLoading(false);
    }
  };
  return (
    <Box className="mc-register">
      <Box className="mc-register-banner">
        <Image
          className="mc-register-banner-pattern"
          src={data?.pattern.src}
          alt={data?.pattern.alt}
        />
        <Box className="mc-register-banner-content">
          <Heading as="h2" className="mc-register-banner-title">
            {data?.title.banner}
          </Heading>
          <Text as="p" className="mc-register-banner-descrip">
            {data?.descrip}
          </Text>
          <Anchor
            icon={data?.anchor.icon}
            text={data?.anchor.text}
            href={data?.anchor.path}
            className="mc-btn primary"
          />
        </Box>
      </Box>
      <Form className="mc-register-form">
        <Logo
          src={logo}
          alt={data?.logo.alt}
          href={data?.logo.path}
          className="mc-auth-logo"
        />
        <Heading as="h4" className="mc-auth-title">
          {data?.title.from}
        </Heading>
        <IconField
          onChange={handleChange}
          name="phoneNumber"
          icon="phone"
          type="tel"
          placeholder="Enter your phone number"
          classes="h-sm"
        />
        <IconField
          onChange={handleChange}
          name="password"
          icon="lock"
          type="password"
          placeholder="Enter your password"
          classes="h-sm"
        />
        <IconField
          onChange={handleChange}
          name="code"
          icon="verified_user"
          type="password"
          placeholder="Enter your code"
          classes="h-sm"
        />
        <Box className="mc-auth-checkbox">
          <Input type="checkbox" id="checkbox" />
          <Label text={data?.checkLabel} htmlFor="checkbox" />
        </Box>
        <Button
          onClick={() => handleSubmit()}
          className={`mc-auth-btn ${data?.button.fieldSize}`}
          type={data?.button.type}
        >
          {data?.button.text}
        </Button>
        <Box className="mc-register-navigate">
          <Text as="span">
            {loading ? `signing up...` : data?.navigate.title}
          </Text>
          <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
        </Box>
      </Form>
    </Box>
  );
}
