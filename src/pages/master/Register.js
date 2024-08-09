// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { verifyAccountAction } from "../../API/auth";
// import { showSuccessReturn } from "../../API/AuthService";
// import { Box, Text, Form, Image, Button, Anchor, Heading, Input, Label, Icon } from "../../components/elements";
// import IconField from "../../components/fields/IconField";
// import Logo from "../../components/Logo";
// import data from "../../data/master/register.json";

// export default function Register() {

//     const [form, setForm] = useState({ "code":"", "password":"", "phoneNumber":"" } )

//     const [isLoading, setIsLoading] = useState(false);

//     // const phoneRef = useRef()
//     // const codeRef = useRef()
//     // const passRef = useRef()

//     const navigate = useNavigate();

//     const onChanged = (event) => {
//         event.preventDefault();
//         setForm({...form, [event.target.name]: event.target.value });
//       };

       
//   const handleSubmit = async(e)  => {
//     e.preventDefault();


//      const res = await verifyAccountAction(form)
//      console.log(res)
//      if(!res){
//       showSuccessReturn(res?.toString())
//       setTimeout(() => {
//           navigate('/login')
//       }, 3000);

//      }
//      else if(res === false){
//       setIsLoading(false)
//      }
//      setIsLoading(false)
      

//   };

// //   const handleEmailInput = () => {
// //     const re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
// //     if (!re.test(userForm.email)) {
// //       emailRef.current.classList.add("is-invalid"); 
// //       return false;
// //     } else {
// //       emailRef.current.classList.remove("is-invalid");
// //       return true;
// //     }
// //   }

// //   const handleCodeInput = () => {
// //     const re = /^[0-9]{4,}$/;
// //     if (!re.test(userForm.code)) {
// //       codeRef.current.classList.add("is-invalid");
// //       return false;
// //     } else {
// //       codeRef.current.classList.remove("is-invalid");
// //       return true;
// //     }
// //   }
    





//     return (
//         <Box className="mc-register">
//             <Box className="mc-register-banner">
//                 <Image 
//                     className="mc-register-banner-pattern" 
//                     src={ data?.pattern.src } 
//                     alt={ data?.pattern.alt } 
//                 />
//                 <Box className="mc-register-banner-content">
//                     <Heading as="h2" className="mc-register-banner-title">{ data?.title.banner }</Heading>
//                     <Text as="p" className="mc-register-banner-descrip">{ data?.descrip }</Text>
//                     <Anchor 
//                         icon = { data?.anchor.icon } 
//                         text = { data?.anchor.text } 
//                         href = { data?.anchor.path }
//                         className = "mc-btn primary" 
//                     />
//                 </Box>
//             </Box>
//             <Form className="mc-register-form">
//                 <Logo 
//                     src = { data?.logo.src } 
//                     alt = { data?.logo.alt } 
//                     href = { data?.logo.path } 
//                     className = "mc-auth-logo"
//                 />
//                 <Heading as="h4" className="mc-auth-title">{ data?.title.from }</Heading>
//                 {data?.input.map((item, index) => (
//                     <IconField 
//                     onChange={onChanged}
//                         key = { index }
//                         icon = { item.icon }
//                         type = { item.type }
//                         name={item?.name}
//                         classes = { item.fieldSize }
//                         placeholder = { item.placeholder }
//                         passwordVisible = { item.passwordVisible }
//                     />
//                 ))}
                
//                 <Box className="mc-auth-checkbox d-none">
//                     <Input type="checkbox" id="checkbox" />
//                     <Label text={ data?.checkLabel } htmlFor="checkbox" />
//                 </Box>
//                 <Button onClick={handleSubmit} className={`mc-auth-btn ${data?.button.fieldSize}`} type={ data?.button.type }>{ data?.button.text }</Button>
//                 <Box className="mc-auth-divide d-none"><Text as="span">{ data?.divide.text }</Text></Box>
//                 <Box className="mc-auth-connect d-none">
//                     {data?.connect.map((item, index) => (
//                         <Anchor key={ index } href={ item.path } className={ item.classes }>
//                             <Icon className={ item.icon }></Icon>
//                             <Text as="span">{ item.text }</Text>
//                         </Anchor>
//                     ))}
//                 </Box>
//                 <Box className="mc-register-navigate">
//                     <Text as="span">{ data?.navigate.title }</Text>
//                     <Anchor href={ data?.navigate.path }>{ data?.navigate.text }</Anchor>
//                 </Box>
//             </Form>
//         </Box>
//     )
// }










import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/register.json";
import { verifyAccountAction } from "../../API/auth";
import { showSuccessReturn, showWarning } from "../../API/AuthService";

export default function Register() {


    const [form, setForm] = useState({ "code":"", "password":"", "phoneNumber":"" } )

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

    if(form.code && form.phoneNumber && form.password){

            const res = await verifyAccountAction(form)
            if(res){
            // showSuccessReturn(res?.toString())
            setTimeout(() => {
                navigate('/login')
                // navigate('/complete_registration')

            }, 3000);
        
            }
    }else{
        showWarning('All fields are required')
    }

      

  };







    return (
        <Box className="mc-auth">
            <Image
                src={ data?.pattern.src } 
                alt={ data?.pattern.alt }
                className="mc-auth-pattern"  
            />
            <Box className="mc-auth-group">
                <Logo 
                    src = { 'images/product/single/maverick_logos.png' }
                    alt = { data?.logo.alt }
                    href = { data?.logo.path }
                    className = "mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{ "Start Your Registration Process" }</Heading>
                <Form className="mc-auth-form">
                {data?.input.map((item, index) => (
                    <IconField 
                    onChange={onChanged}
                        key = { index }
                        icon = { item.icon }
                        type = { item.type }
                        name={item?.name}
                        classes = { item.fieldSize }
                        placeholder = { item.placeholder }
                        passwordVisible = { item.passwordVisible }
                    />
                ))}
                    <Button onClick={handleSubmit}  className={`mc-auth-btn ${data?.button.fieldSize}`} type={ data?.button.type }>{ data?.button.text }</Button>
         
                </Form>
                <Box className="mc-auth-navigate">
                    <Text as="span">{ data?.navigate.title }</Text>
                    <Anchor href={ data?.navigate.path }>{ data?.navigate.text }</Anchor>
                </Box>
            </Box>
        </Box>
    );
}