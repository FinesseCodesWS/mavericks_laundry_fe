import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginWithResetCodeAction } from "../../API/auth";
import { showWarning } from "../../API/AuthService";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/forgot.json";
import { handlePOSLogin } from "../../redux/authentication";

export default function ForgotPassword() {
    // "newPassword":"superman", "newPassword":"09012345674", "resetToken":"070702"


    const [form, setForm] = useState({ "newPassword":"", "phoneNumber":"", "resetToken":"" } )

    const [isLoading, setIsLoading] = useState(false);
    // const phoneRef = useRef()
    // const codeRef = useRef()
    // const passRef = useRef()

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChanged = (event) => {
        event.preventDefault();
        setForm({...form, [event.target.name]: event.target.value });
      };

       
   const handleSubmit = async(e)  => {
    e.preventDefault();
    // console.log(form)

    if(form.phoneNumber && form.newPassword && form.resetToken){
            const res = await LoginWithResetCodeAction(form)
            if(res){
                dispatch(handlePOSLogin(res)) 
                navigate('/')
            }
    }else{
        showWarning('All fields are required')
    }

      

  };






    return (
        <Box className="mc-auth">
            <Image 
                className="mc-auth-pattern" 
                src={ data?.pattern.src } 
                alt={ data?.pattern.alt } 
            />
            <Box className="mc-auth-group">
                <Logo 
                    src = { 'images/product/single/maverick_logos.png' }
                    alt = { data?.logo.alt }
                    href = { data?.logo.path }
                    className = "mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{ data?.title }</Heading>
                <Form className="mc-auth-form">
                    {data?.input.map((item, index) => (
                        <IconField 
                            onChange={onChanged}
                            name={item?.name}
                            key = { index }
                            icon = { item.icon }
                            type = { item.type }
                            classes = { item.fieldSize }
                            placeholder = { item.placeholder }
                            passwordVisible = { item.passwordVisible }
                        />
                    ))}
                    <Button onClick={handleSubmit} className={`mc-auth-btn ${data?.button.fieldSize}`} type={ data?.button.type }>{ 'Login With Reset code' }</Button>
                </Form>
                <Box className="mc-auth-navigate">
                    <Text as="span">{ data?.navigate.title }</Text>
                    <Anchor href={ data?.navigate.path }>{ data?.navigate.text }</Anchor>
                </Box>
            </Box>
        </Box>
    );
}