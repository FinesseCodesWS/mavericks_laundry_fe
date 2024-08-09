import React, { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordAction,
  getProfilePixAction,
  updateProfileAction,
} from "../../API/auth";
import { formatError, formatSuccess, showWarning } from "../../API/AuthService";

import { Breadcrumb, FileUpload } from "../../components";
import { CardLayout, TabCard } from "../../components/cards";
import { Anchor, Box, Button, Image, Item } from "../../components/elements";
import { IconField, LegendField } from "../../components/fields";
import data from "../../data/master/myAccount.json";
import PageLayout from "../../layouts/PageLayout";
import axios from "axios";
import { handlePOSProfileUpdate } from "../../redux/authentication";

const MyAccount = () => {
  const user = useSelector((state) => state.auth.userPOSData);
  const dispatch = useDispatch()
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });

  const [account, setAccount] = useState({
    image: user?.image?.link,
    address: user?.address,
    email: user?.email,
    fullName: user?.emergencyContact?.fullName,
    phoneNumber: user?.emergencyContact?.phoneNumber,
    emagency_address: user?.emergencyContact?.address,
  });
  const [theImage, setTheImage] = useState("");


  // IMAGE
  const sendImage = async (val) => {
    if (val) {
      var formData = new FormData();
      formData.append("image", val);
      try {
        const res = await axios(
            {
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}staff/update-profile`,
            data: formData,
            headers: { 
                "Authorization":  `Bearer ${JSON.parse(localStorage.getItem('auth_pos_token'))}`,
            "Content-Type": "multipart/form-data",
         }
        });

         formatSuccess('image updated succesfully')
      } catch (error) {
        return formatError(error?.response?.data);
      }
    } else {
      showWarning("Image field is required");
    }
  };


  async function setFile(e) {
    e.preventDefault();
    // console.log(e.target.files[0]);

    // setImage(e.target.files[0]);
    sendImage(e.target.files[0]);

    let reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(async () => {
        setAccount({ ...account, image: e.target.result });
        // console.log(e.target.result);
      }, 2000);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  // PASSWORD
  const onChanged = (event) => {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.oldPassword && form.newPassword) {
      const res = await changePasswordAction(form);
    } else {
      showWarning("All fields are required");
    }
  };

  // PROFILE
  const onChangedProfile = (event) => {
    event.preventDefault();



    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    if (
      account.image ||
      account.address ||
      account.email ||
      account.phoneNumber ||
      account.fullName ||
      account.emagency_address
    ) {
      const res = await updateProfileAction(account);
      // console.log(res)
      dispatch(handlePOSProfileUpdate(res?.data))
    } else {
      showWarning("fields are required");
    }
  };

  // GET IMAGE
  useEffect(() => {
    const getImage = async () => {
    //   const res = await getProfilePixAction();
      //   setTheImage(res)
      //   setAccount({ ...account, image: res });
      
      try {
          const res = await axios.get(
              `${process.env.REACT_APP_BASE_URL}staff/px`,
              {
                  responseType: "arraybuffer",
                  headers: {
                      Authorization:  `Bearer ${JSON.parse(localStorage.getItem('auth_pos_token'))}`,
                    },
                }
                );
            
                // console.log(res)
                
                const blob = new Blob([res?.data], {
                    type: res.headers["content-type"],
                });
                
                const url = URL.createObjectURL(blob);
                setAccount({ ...account, image: url });
                // console.log(url);
                localStorage.setItem('pos-user-image', url)
      } catch (error) {
        console.log(error)
      }
    };

    getImage();

    return () => {};
  }, []);

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <Breadcrumb title={data?.pageTitle}>
            {data?.breadcrumb?.map((item, index) => (
              <Item key={index} className="mc-breadcrumb-item text-dark">
                {item.path ? (
                  <Anchor className="mc-breadcrumb-link" href={item?.path}>
                    {'User'}
                  </Anchor>
                ) : (
                  item?.text
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
                            src={account?.image || 'images/default.webp'}
                            alt={data?.avatar.alt}
                          />
                        </Box>
                        <FileUpload
                          onChange={(e) => setFile(e)}
                          name="file"
                          accept=".png,.jpeg,.jpg"
                          icon="cloud_upload"
                          text="upload"
                        />
                      </Box>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={12}>
                          <LegendField
                            name="email"
                            onChange={onChangedProfile}
                            title={data?.email?.title}
                            value={account?.email}
                          />
                        </Col>
                        <Col xl={12}>
                          <LegendField
                            onChange={onChangedProfile}
                            name="address"
                            title={data?.address?.title}
                            value={account?.address}
                          />
                        </Col>

                        {/* <Col xl={6}><LegendField title={ data?.username.title } value={ data?.username.value } /></Col>
                                                    <Col xl={12}><LegendTextarea title={ data?.bio.title } longText={ data?.bio.longText } /></Col> */}
                      </Row>
                    </Col>
                  </Row>
                </TabCard>
                <TabCard title="Emergency Contact information">
                  <Row>
                    <Col xl={6}>
                      <LegendField
                        name="fullName"
                        onChange={onChangedProfile}
                        title={data?.name?.title}
                        value={account?.fullName}
                      />
                    </Col>
                    <Col xl={6}>
                      <LegendField
                        name="phoneNumber"
                        onChange={onChangedProfile}
                        title={data?.phone?.title}
                        value={account?.phoneNumber}
                      />
                    </Col>

                    <Col xl={12}>
                      <LegendField
                        name="emagency_address"
                        onChange={onChangedProfile}
                        title={data?.address?.title}
                        value={account?.emagency_address}
                      />
                    </Col>

                    {/* <Col xl={4}><LegendField title={ data?.phone.title } value={ data?.phone.value } /></Col>
                                            <Col xl={4}><LegendField title={ data?.id.title } value={ data?.id.value } /></Col>
                                            <Col xl={4}><LegendField title={ data?.role.title } option={ data?.role.option } activeOption={ data?.role.activeOption } /></Col>
                                            <Col xl={4}><LegendField title={ data?.status.title } option={ data?.status.option } activeOption={ data?.status.activeOption } /></Col>
                                            <Col xl={4}><LegendField title={ data?.email.title } value={ data?.email.value } /></Col>
                                            <Col xl={4}><LegendField title={ data?.phone.title } value={ data?.phone.value } /></Col>
                                            <Col xl={4}><LegendField title={ data?.website.title } value={ data?.website.value } /></Col>
                                            <Col xl={12}><LegendTextarea title={ data?.address.title } longText={ data?.address.longText } /></Col> */}
                  </Row>
                </TabCard>
                {/* <TabCard title="social information">
                                        <Row xs={1} md={2}>
                                            {data?.social.map((item, index)=> (
                                                <Col key={ index }>
                                                    <LegendField 
                                                        type = { item.type }
                                                        value = { item.value }
                                                        title = { item.title } 
                                                    />
                                                </Col>
                                            ))}
                                        </Row>
                                    </TabCard> */}
                <Col className="d-flex justify-content-center">
                  <Button
                    onClick={handleSubmitProfile}
                    className="mc-btn primary"
                    icon="verified"
                    text="update profile"
                  />
                </Col>
              </Tab>

              <Tab
                eventKey="password"
                title="Change Password"
                className="mc-tabpane password"
              >
                <TabCard title="Change password">
                  <Row>
                    <Col xs={12} md={6}>
                      <IconField
                        onChange={onChanged}
                        name="oldPassword"
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
                        onChange={onChanged}
                        icon="lock"
                        type="password"
                        placeholder="new password"
                        classes="w-100 h-lg"
                        passwordVisible
                      />
                    </Col>
                    {/* <Col xs={12} md={6}><IconField icon="verified_user" type="password" placeholder="confirm password" classes="w-100 h-lg" passwordVisible /></Col> */}
                  </Row>
                </TabCard>
                <Col className="d-flex justify-content-center">
                  <Button
                    onClick={handleSubmit}
                    className="mc-btn primary  text-center"
                    icon="verified"
                    text="change password"
                  />
                </Col>
              </Tab>

              {/* <Tab eventKey="settings" title="other settings" className="mc-tabpane settings">
                                    <Row xs={1} md={2}>
                                        <Col>
                                            <TabCard title="activity email settings">
                                                <Form.Check type="switch" id="switch1" label="Someone adds you as a connection" />
                                                <Form.Check type="switch" id="switch2" label="you're sent a direct message" defaultChecked/>
                                                <Form.Check type="switch" id="switch3" label="New membership approval" defaultChecked/>
                                                <Form.Check type="switch" id="switch4" label="Send Copy To Personal Email" defaultChecked/>
                                                <Form.Check type="switch" id="switch5" label="Tips on getting more out of PCT-themes" />
                                            </TabCard>
                                        </Col>
                                        <Col>
                                            <TabCard title="product email settings">
                                                <Form.Check type="checkbox" id="check1" label="Someone adds you as a connection" defaultChecked/>
                                                <Form.Check type="checkbox" id="check2" label="you're sent a direct message" defaultChecked/>
                                                <Form.Check type="checkbox" id="check3" label="New membership approval" defaultChecked/>
                                                <Form.Check type="checkbox" id="check4" label="Send Copy To Personal Email" />
                                                <Form.Check type="checkbox" id="check5" label="Tips on getting more out of PCT-themes" />
                                            </TabCard>
                                        </Col>
                                    </Row>
                                    <Button className="mc-btn primary" icon="verified" text="update changes" />
                                </Tab> */}
            </Tabs>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default MyAccount;

// import React, { useEffect, useState } from "react";
// import { Col, Row, Tab, Tabs } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { changePasswordAction, getProfilePixAction, updateProfileAction } from "../../API/auth";
// import { formatError, showWarning } from "../../API/AuthService";
// import API from "../../API/AxiosInstance";
// import { Breadcrumb, FileUpload } from "../../components";
// import { CardLayout, TabCard } from "../../components/cards";
// import { Anchor, Box, Button, Image, Item } from "../../components/elements";
// import { IconField, LegendField } from "../../components/fields";
// import data from "../../data/master/myAccount.json";
// import PageLayout from "../../layouts/PageLayout";
// import axios from "axios";

// export default function MyAccount() {
//     const user = useSelector(state => state.auth.userPOSData)
//     console.log(user)
//     const [form, setForm] = useState({ "oldPassword":"", "newPassword":"" })

//     const [account, setAccount] = useState({
//         "image": user?.image?.link,
//         "address":user?.address,
//          "email":user?.email,
//         "fullName":user?.emergencyContact?.fullName,
//         "phoneNumber":user?.emergencyContact?.phoneNumber,
//         "emagency_address":user?.emergencyContact?.address

//     })

//     const [image,setImage] = useState('')

// `

//     `

// useEffect(() => {
//     const getImage = async ()=>{
//         const res = await  getProfilePixAction()
//         console.log(res)

//         try {
//             const res = await axios.get('https://pos.vxbqq.onrender.com/api/staff/px', {
//                 responseType: 'arraybuffer',
//                 headers: {
//                     Authorization: 'Bearer ',
//                 },
//             }

//             );

//             const blob = new Blob([res?.data], {
//                 type: res.headers['content-type']
//             })

//             const url = URL.createObjectURL(blob)
//             setAccount({...account, image: url})
//         } catch (error) {

//         }
//     }

//     getImage()

//   return () => {

//   }
// }, [])

//     const onChangedProfile = (event) => {
//         event.preventDefault();

//         setAccount({...account, [e.target.name]: e.target.name === "image" ? e.target.files[0] :  e.target.value });

//         setAccount({...account, [event.target.name]: event.target.value });
//       };

//       const handleSubmitProfile = async(e)  => {
//         e.preventDefault();

//         if(account.image || account.address  || account.email || account.phoneNumber || account.fullName || account.emagency_address){

//                 const res = await updateProfileAction(account)
//         }else{
//             showWarning('fields are required')
//         }
//       }

//     const onChanged = (event) => {
//         event.preventDefault();
//         setForm({...form, [event.target.name]: event.target.value });
//       };

//    const handleSubmit = async(e)  => {
//     e.preventDefault();

//     if(form.oldPassword && form.newPassword){
//             const res = await changePasswordAction(form)
//     }else{
//         showWarning('All fields are required')
//     }
// }

// const sendImage = async (val)=>{

//   if(val){
//       var formData = new FormData();
//       formData.append('image',  val )
//       try {
//           const res = await API.post("staff/update-profile", formData)
//           console.log(res.data)
//       } catch (error) {
//         return   formatError(error?.response?.data);
//       }

//   }else {
//       showWarning('Image field is required')
//   }

// }

// file creation
// async function setFile(e) {
//     e.preventDefault()
//     console.log(e.target.files[0])

//     setImage( e.target.files[0]);
//     sendImage(e.target.files[0])

//         let reader = new FileReader();
//         reader.onload = (e) => {
//         setTimeout(async () => {
//             setAccount({...account, image: e.target.result });
//             console.log(e.target.result )
//         }, 2000);
//         };
//         reader.readAsDataURL(e.target.files[0]);

//     }

//     return (
//         <PageLayout>
//             <Row>
//                 <Col xl={12}>
//                     <Breadcrumb title={ data?.pageTitle }>
//                         {data?.breadcrumb?.map((item, index) => (
//                             <Item key={ index } className="mc-breadcrumb-item text-dark">
//                                 {item.path ? <Anchor className="mc-breadcrumb-link" href={ item?.path }>{ item?.text }</Anchor> : item?.text }
//                             </Item>
//                         ))}
//                     </Breadcrumb>
//                 </Col>

//                 <Col xl={12}>
//                     <CardLayout>
//                         <Tabs defaultActiveKey="profile" id="mc" className="mc-tabs">
//                             <Tab eventKey="profile" title="edit Profile" className="mc-tabpane profile">
//                                 <TabCard title="public information">
//                                     <Row>
//                                         <Col xl={4}>
//                                             <Box className="mc-user-avatar-upload">
//                                                 <Box className="mc-user-avatar"><Image src={ account?.image ||  data?.avatar?.src } alt={ data?.avatar.alt } /></Box>
//                                                 <FileUpload
//                                                      onChange={(e) => setFile(e)}
//                                                      name="file"
//                                                      accept=".png,.jpeg,.jpg"
//                                                     icon="cloud_upload" text="upload" />
//                                             </Box>
//                                         </Col>
//                                         <Col xl={8}>
//                                             <Row>
//                                             <Col xl={12}><LegendField
//                                             name='email'
//                                             onChange={onChangedProfile}
//                                              title={ data?.email?.title } value={ data?.email?.value } /></Col>
//                                             <Col xl={12}><LegendField
//                                             onChange={onChangedProfile}
//                                             name='address'
//                                              title={ data?.address?.title } value={ data?.address?.value }
//                                             /></Col>

//                                                 {/* <Col xl={6}><LegendField title={ data?.username.title } value={ data?.username.value } /></Col>
//                                                 <Col xl={12}><LegendTextarea title={ data?.bio.title } longText={ data?.bio.longText } /></Col> */}
//                                             </Row>
//                                         </Col>
//                                     </Row>
//                                 </TabCard>
//                                 <TabCard title="Emergency Contact information">
//                                         <Row>
//                                         <Col xl={6}><LegendField
//                                         name='fullName'
//                                         onChange={onChangedProfile}
//                                          title={ data?.name?.title } value={ data?.name?.value } /></Col>
//                                         <Col xl={6}><LegendField
//                                         name='phoneNumber'
//                                         onChange={onChangedProfile}
//                                         title={ data?.phone?.title } value={ data?.phone?.value } /></Col>

//                                         <Col xl={12}><LegendField
//                                         name='emagency_address'
//                                         onChange={onChangedProfile}
//                                         title={ data?.address?.title } value={ data?.address?.value }
//                                         /></Col>

//                                     {/* <Col xl={4}><LegendField title={ data?.phone.title } value={ data?.phone.value } /></Col>
//                                         <Col xl={4}><LegendField title={ data?.id.title } value={ data?.id.value } /></Col>
//                                         <Col xl={4}><LegendField title={ data?.role.title } option={ data?.role.option } activeOption={ data?.role.activeOption } /></Col>
//                                         <Col xl={4}><LegendField title={ data?.status.title } option={ data?.status.option } activeOption={ data?.status.activeOption } /></Col>
//                                         <Col xl={4}><LegendField title={ data?.email.title } value={ data?.email.value } /></Col>
//                                         <Col xl={4}><LegendField title={ data?.phone.title } value={ data?.phone.value } /></Col>
//                                         <Col xl={4}><LegendField title={ data?.website.title } value={ data?.website.value } /></Col>
//                                         <Col xl={12}><LegendTextarea title={ data?.address.title } longText={ data?.address.longText } /></Col> */}
//                                     </Row>
//                                 </TabCard>
//                                 {/* <TabCard title="social information">
//                                     <Row xs={1} md={2}>
//                                         {data?.social.map((item, index)=> (
//                                             <Col key={ index }>
//                                                 <LegendField
//                                                     type = { item.type }
//                                                     value = { item.value }
//                                                     title = { item.title }
//                                                 />
//                                             </Col>
//                                         ))}
//                                     </Row>
//                                 </TabCard> */}
//                                 <Col className="d-flex justify-content-center">
//                                 <Button
//                                     onClick={handleSubmitProfile}
//                                  className="mc-btn primary" icon="verified" text="update profile" />
//                                 </Col>
//                             </Tab>

//                             <Tab eventKey="password" title="Change Password" className="mc-tabpane password">
//                                 <TabCard title="generate password">
//                                     <Row>
//                                         <Col xs={12} md={6}><IconField
//                                             onChange={onChanged}
//                                             name='oldPassword'
//                                         icon="lock" type="password" placeholder="current password" classes="w-100 h-lg" passwordVisible /></Col>
//                                         <Col xs={12} md={6}><IconField
//                                                name='newPassword'
//                                                onChange={onChanged}
//                                                icon="lock" type="password" placeholder="new password" classes="w-100 h-lg" passwordVisible /></Col>
//                                         {/* <Col xs={12} md={6}><IconField icon="verified_user" type="password" placeholder="confirm password" classes="w-100 h-lg" passwordVisible /></Col> */}
//                                     </Row>
//                                 </TabCard>
//                                 <Col className="d-flex justify-content-center">
//                                 <Button onClick={handleSubmit} className="mc-btn primary  text-center" icon="verified" text="change password" />

//                                 </Col>
//                             </Tab>

//                             {/* <Tab eventKey="settings" title="other settings" className="mc-tabpane settings">
//                                 <Row xs={1} md={2}>
//                                     <Col>
//                                         <TabCard title="activity email settings">
//                                             <Form.Check type="switch" id="switch1" label="Someone adds you as a connection" />
//                                             <Form.Check type="switch" id="switch2" label="you're sent a direct message" defaultChecked/>
//                                             <Form.Check type="switch" id="switch3" label="New membership approval" defaultChecked/>
//                                             <Form.Check type="switch" id="switch4" label="Send Copy To Personal Email" defaultChecked/>
//                                             <Form.Check type="switch" id="switch5" label="Tips on getting more out of PCT-themes" />
//                                         </TabCard>
//                                     </Col>
//                                     <Col>
//                                         <TabCard title="product email settings">
//                                             <Form.Check type="checkbox" id="check1" label="Someone adds you as a connection" defaultChecked/>
//                                             <Form.Check type="checkbox" id="check2" label="you're sent a direct message" defaultChecked/>
//                                             <Form.Check type="checkbox" id="check3" label="New membership approval" defaultChecked/>
//                                             <Form.Check type="checkbox" id="check4" label="Send Copy To Personal Email" />
//                                             <Form.Check type="checkbox" id="check5" label="Tips on getting more out of PCT-themes" />
//                                         </TabCard>
//                                     </Col>
//                                 </Row>
//                                 <Button className="mc-btn primary" icon="verified" text="update changes" />
//                             </Tab> */}
//                         </Tabs>
//                     </CardLayout>
//                 </Col>
//             </Row>
//         </PageLayout>
//     )
// }
