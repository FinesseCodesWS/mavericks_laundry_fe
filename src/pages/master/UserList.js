import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Anchor,
  Item,
  Select,
  Option,
  Fieldset,
  Legend,
  Button,
  Box,
  Label,
} from "../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import { LabelField, LegendField } from "../../components/fields";
import UsersTable from "../../components/tables/UsersTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userList.json";
import axios from "../../axios";
import { useSelector, useDispatch } from "react-redux";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function UserList({
  staffs,
  setCurrentPageStaff,
  currentPageStaff,
  setPageCountStaff,
  pageCountStaff,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [sendData, setSendData] = useState({
    phoneNumber: "",
    role: "",
  });
  const [size, setSize] = useState(10);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/staff", sendData);
      const code = response?.data?.data?.code;
      dispatch({
        type: "ADD_STAFF",
        payload: response.data.data.staff,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `You have created this staff. Here is their verfication code: ${code}`,
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

  const handleChange = (e) => {
    return setSendData({
      ...sendData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
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
          </CardLayout>
        </Col>

        {user?.role === "super admin" && (
          <Col xl={12}>
            <CardLayout>
              <CardHeader title="Create Staff"></CardHeader>
              <Row>
                <Col xl={6}>
                  <LegendField
                    title="Phone Number"
                    value={sendData.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                </Col>
                <Col xl={6}>
                  <Fieldset className={`mc-fieldset`}>
                    <Legend>Role</Legend>

                    <Select
                      name="role"
                      onChange={handleChange}
                      className={`w-100 h-lg" `}
                    >
                      <Option>{"Select Option"}</Option>
                      <Option value="admin">Admin</Option>
                      <Option value="cashier">Cashier</Option>
                    </Select>
                  </Fieldset>
                </Col>

                <Col xl={4}>
                  <Button
                    icon="verified"
                    onClick={() => handleSubmit()}
                    className="mc-btn primary h-100"
                    text={loading ? `loading...` : `add staff`}
                  />
                </Col>
              </Row>
            </CardLayout>
          </Col>
        )}

        <Col xl={12}>
          <CardLayout>
            <CardHeader title={data?.cardTitle} />
            <Row xs={1} sm={4} className="mb-4"></Row>
            <UsersTable
              thead={[
                "email",
                "staff id",
                "phone number",
                "role",
                "created At",
                "action",
              ]}
              tbody={staffs}
            />
            {/* <Pagination
              data={staffs}
              setCurrentPageStaff={setCurrentPageStaff}
              currentPageStaff={currentPageStaff}
              setPageCountStaff={setPageCountStaff}
              pageCountStaff={pageCountStaff}
            /> */}
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
