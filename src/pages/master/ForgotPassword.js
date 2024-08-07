import React, { useState } from "react";
import {
  Box,
  Form,
  Heading,
  Button,
  Anchor,
  Image,
  Text,
} from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/forgot.json";
import image from "../../assets/logo.png";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function ForgotPassword() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataNow, setDataNow] = useState({
    newPassword: "",
    phoneNumber: "",
    resetToken: "",
  });

  const handleChange = (e) => {
    return setDataNow({
      ...dataNow,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/auth/login-token", dataNow);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Password changed successfully!`,
      });
      history("/");
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
    <Box className="mc-auth">
      <Image
        className="mc-auth-pattern"
        src={data?.pattern.src}
        alt={data?.pattern.alt}
      />
      <Box className="mc-auth-group">
        <Logo
          src={image}
          alt={data?.logo.alt}
          href={data?.logo.path}
          className="mc-auth-logo"
        />
        <Heading as="h4" className="mc-auth-title">{`Laundry System`}</Heading>
        <Form className="mc-auth-form">
          <IconField
            icon="lock"
            type="password"
            placeholder="Enter your new password"
            fieldSize="h-sm"
            name="newPassword"
            onChange={handleChange}
          />
          <IconField
            icon="phone"
            type="number"
            placeholder="Enter your phone number"
            fieldSize="h-sm"
            name="phoneNumber"
            onChange={handleChange}
          />
          <IconField
            icon="lock"
            type="password"
            placeholder="Enter your reset token"
            fieldSize="h-sm"
            name="resetToken"
            onChange={handleChange}
          />
          <Button
            onClick={() => handleSubmit()}
            className={`mc-auth-btn ${data?.button.fieldSize}`}
            type={data?.button.type}
          >
            {loading ? `ACCESSING...` : data?.button.text}
          </Button>
        </Form>
        <Box className="mc-auth-navigate">
          <Text as="span">{data?.navigate.title}</Text>
          <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
        </Box>
      </Box>
    </Box>
  );
}
