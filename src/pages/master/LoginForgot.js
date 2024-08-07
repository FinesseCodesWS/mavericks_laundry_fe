import React, { useState } from "react"
import {
  Box,
  Form,
  Heading,
  Button,
  Anchor,
  Image,
  Text,
} from "../../components/elements"
import IconField from "../../components/fields/IconField"
import data from "../../data/master/login.json"

export default function LoginForgot() {
  const [sendData, setSendData] = useState({})
  return (
    <Box className="mc-auth">
      <Image
        src={data?.pattern.src}
        alt={data?.pattern.alt}
        className="mc-auth-pattern"
      />
      <Box className="mc-auth-group">
        <Form className="mc-auth-form">
          {data?.inputForgot.map((item, index) => (
            <IconField
              key={index}
              icon={item.icon}
              type={item.type}
              classes={item.fieldSize}
              placeholder={item.placeholder}
              passwordVisible={item.passwordVisible}
            />
          ))}
          <Button
            className={`mc-auth-btn ${data?.button.fieldSize}`}
            type={data?.button.type}>
            {data?.button.text}
          </Button>
        </Form>
        <Box className="mc-auth-navigate">
          <Text as="span">{data?.navigate.title}</Text>
          <Text as="span">{data?.navigate.text}</Text>
        </Box>
      </Box>
    </Box>
  )
}
