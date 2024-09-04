import React, { useState, useEffect } from "react";
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
import { Logo, Loader } from "../../components";
import data from "../../data/master/login.json";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LogoImage from "../../assets/logo.png";

// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function Login() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [sendData, setSendData] = useState({
    phoneNumber: "",
    password: "",
  });

  const onChange = (e) => {
    setSendData({
      ...sendData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/auth/login", sendData);
      localStorage.setItem(
        "pos-token",
        JSON.stringify(response.data.data.token)
      );
      dispatch({
        type: "GET_USER",
        payload: response?.data?.data?.staff,
      });
      setLoading(false);
      history("/dashboard");
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
        src={data?.pattern.src}
        alt={data?.pattern.alt}
        className="mc-auth-pattern"
      />
      <Box className="mc-auth-group">
        <Logo
          src={LogoImage}
          alt={data?.logo.alt}
          href={data?.logo.path}
          className="mc-auth-logo"
        />
        <Heading as="h4" className="mc-auth-title">
          Login to Laundry System
        </Heading>
        <Form onSubmit={onSubmit} className="mc-auth-form">
          <IconField
            icon="phone"
            name="phoneNumber"
            type="number"
            placeholder="Enter your phone number"
            onChange={onChange}
          />
          <IconField
            icon="lock"
            name="password"
            type="password"
            placeholder="Enter your password"
            passwordVisible={true}
            onChange={onChange}
          />

          <Button
            className={`mc-auth-btn ${data?.button.fieldSize}`}
            type="submit"
            disabled={loading}
          >
            {loading ? <>Signing in...</> : data?.button.text}
          </Button>
          <Anchor className="mc-auth-forgot" href={data?.forgot.path}>
            {data?.forgot.text}
          </Anchor>
        </Form>
        <Box className="mc-auth-navigate">
          <Text as="span">{data?.navigate.title}</Text>
          <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
        </Box>
      </Box>
    </Box>
  );
}
