import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { List, Item, Icon, Text, Box, Anchor } from "../../components/elements";
import axios from "../../axios";
import { Button } from "../../components/elements";
import {
  Breadcrumb,
  RoundAvatar,
  DivideTitle,
  DuelText,
} from "../../components";
import {
  CardLayout,
  CardHeader,
  FloatCard,
  ActivityCard,
} from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userProfile.json";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import defaultImage from "../../assets/image.png";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getStaff = async () => {
      try {
        const response = await axios.get(`/staff/${id}`);
        setUser(response.data.data);
      } catch (error) {}
    };
    getStaff();
  }, [id]);
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="user profile">
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
          </CardLayout>
        </Col>
        <Col xl={12}>
          <CardLayout>
            <CardHeader title="user information" />
            <Box className="mc-user-group">
              <Box className="mc-user-profile">
                <RoundAvatar
                  src={defaultImage}
                  alt={data?.profile.alt}
                  size={"lg"}
                />
                <DuelText
                  title={user?.emergencyContact?.fullName}
                  descrip={user?.firstName}
                  size={"lg"}
                />
              </Box>
              <Box className="mb-4">
                <DivideTitle title="communication" className="mb-4" />
                <List className="mc-user-metalist">
                  <Item>
                    <Icon>{"phone_in_talk"}</Icon>
                    <Text as="span">{user?.phoneNumber}</Text>
                  </Item>
                  <Item>
                    <Icon>{"feed"}</Icon>
                    <Text as="span">{user?.email}</Text>
                  </Item>
                  <Item>
                    <Icon>{"public"}</Icon>
                    <Text as="span">{user?.email}</Text>
                  </Item>
                  <Item>
                    <Icon>{"map"}</Icon>
                    <Text as="span">{user?.address}</Text>
                  </Item>
                </List>
              </Box>
              {/* <Box className="mb-4">
                <DivideTitle title={data?.bio.title} className="mb-3" />
                <Text className="mc-user-bio mb-4">{data?.bio.descrip}</Text>
              </Box> */}
              <Box className="mb-4">
                <DivideTitle title="other details" className="mb-4" />
                <Text>
                  <strong>Role:</strong> {user?.role}
                </Text>
                <Text>
                  <strong>Status:</strong> {user?.status}
                </Text>
                <Text>
                  <strong>Activated:</strong> {user?.activated?.toString()}
                </Text>
                {!user?.activated && (
                  <Text>
                    <strong>Verification Code:</strong> {user?.verificationCode}
                  </Text>
                )}
              </Box>

              <Box>
                <DivideTitle
                  title="Reset Password for this Staff"
                  className="mb-4"
                />
                <Box>
                  <Row>
                    <Col xl={4}>
                      <Button
                        onClick={async () => {
                          try {
                            const response = await axios.post(
                              `/auth/reset-password`,
                              {
                                staff_id: user?._id,
                              }
                            );
                            const code = response?.data?.data?.resetToken;
                            return Swal.fire({
                              icon: "success",
                              title: "Success",
                              text: `Code generated to reset password: ${code}`,
                            });
                            setTimeout(() => {
                              navigate("/forgotpassword");
                              localStorage.removeItem("pos-token");
                            }, 5000);
                          } catch (error) {
                            return Swal.fire({
                              icon: "error",
                              title: "Oops...",
                              text: error?.response?.data?.message
                                ? error?.response?.data?.message
                                : "Something went wrong!",
                            });
                          }
                        }}
                        className="mc-btn primary"
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Box>
              </Box>
            </Box>
          </CardLayout>
        </Col>
        {/* <Col xl={7}>
          <Row>
            {data?.float.map((item, index) => (
              <Col md={4} lg={4} key={index}>
                <FloatCard
                  variant={item.variant}
                  digit={item.digit}
                  title={item.title}
                  icon={item.icon}
                />
              </Col>
            ))}
            <Col xl={12}>
              <ActivityCard
                style={{ height: "540px" }}
                title={data?.activity.title}
                dotsMenu={data?.activity.dotsMenu}
                items={data?.activity.items}
              />
            </Col>
          </Row>
        </Col> */}
      </Row>
    </PageLayout>
  );
}
