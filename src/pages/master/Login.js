import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../API/auth";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/login.json";
import { handlePOSLogin } from "../../redux/authentication";

export default function Login() {


    const [form, setForm] = useState({"password":"", "phoneNumber":"" } )

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

     const res = await loginAction(form)

     if(res){
       dispatch(handlePOSLogin(res)) 
       navigate('/')

     }
     else if(res === false){
      setIsLoading(false)
     }
     setIsLoading(false)
      

  };

//   const handleEmailInput = () => {
//     const re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
//     if (!re.test(userForm.email)) {
//       emailRef.current.classList.add("is-invalid"); 
//       return false;
//     } else {
//       emailRef.current.classList.remove("is-invalid");
//       return true;
//     }
//   }

//   const handleCodeInput = () => {
//     const re = /^[0-9]{4,}$/;
//     if (!re.test(userForm.code)) {
//       codeRef.current.classList.add("is-invalid");
//       return false;
//     } else {
//       codeRef.current.classList.remove("is-invalid");
//       return true;
//     }
//   }
    














    return (
        <Box className="mc-auth">
            <Image
                src={ data?.pattern?.src } 
                alt={ data?.pattern?.alt }
                className="mc-auth-pattern"  
            />
            <Box className="mc-auth-group">
                <Logo 
                    src = { 'images/product/single/maverick_logos.png' }
                    alt = { data?.logo?.alt }
                    href = { data?.logo?.path }
                    className = "mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{ data?.title }</Heading>
                <Form className="mc-auth-form">
                    {data?.input?.map((item, index) => (
                        
                        <IconField 
                            name={item?.name}
                            key = { index }
                            icon = { item?.icon }
                            type = { item?.type }
                            option = { item?.option }
                            classes = { item?.fieldSize }
                            placeholder = { item?.placeholder }
                            passwordVisible = { item?.passwordVisible }
                            onChange={onChanged}
                        />
                    ))}
                    <Button onClick={handleSubmit}  className={`mc-auth-btn ${data?.button?.fieldSize}`} type={ data?.button?.type }>{ data?.button?.text }</Button>
                    <Anchor className="mc-auth-forgot" href={ data?.forgot?.path }>{ data?.forgot?.text }</Anchor>
                    {/* <Box className="mc-auth-divide"><Text as="span">{ data?.divide.text }</Text></Box> */}
                    {/* <Box className="mc-auth-connect">
                        {data?.connect.map((item, index) => (
                            <Anchor key={ index } href={ item.path } className={ item.classes }>
                                <i className={ item.icon }></i>
                                <span>{ item.text }</span>
                            </Anchor>
                        ))}
                    </Box> */}
                </Form>
                <Box className="mc-auth-navigate">
                    <Text as="span">{ data?.navigate.title }</Text>
                    <Anchor href={ data?.navigate.path }>{ data?.navigate.text }</Anchor>
                </Box>
            </Box>
        </Box>
    );
}