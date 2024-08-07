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
import CouponsTable from "../../components/tables/CouponsTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userList.json";
import axios from "../../axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toDateString } from "../../utils/date";

export default function Coupon({
  staffs,
  coupons,
  setCurrentPageCoupon,
  currentPageCoupon,
  setPageCountCoupon,
  pageCountCoupon,
}) {
  const headers = [
    { label: "Coupon Code", key: "couponId" },
    { label: "Times Used", key: "numberOfTimesUsed" },
    { label: "Type", key: "type" },
    { label: "Expiry Date", key: "expiryDate" },
    { label: "Amount", key: "amount" },
    { label: "Frequency", key: "frequency" },
  ];
  const headersPDF = [
    ["Coupon Code", "Times Used", "Type", `Expiry Date`, `Amount`, `Frequency`],
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [loadingThreshold, setLoadingThreshold] = useState(false);
  const [threshold, setThreshold] = useState(0);
  const [getThreshold, setGetThreshold] = useState(null);
  const [sendData, setSendData] = useState({
    title: "",
    type: "",
    expiryDate: "",
    amount: "",
    frequency: "",
  });
  const [size, setSize] = useState(10);

  const generatePDF = () => {
    const doc = new jsPDF();

    // convert object data to arrays of values
    const rows = coupons.map((obj) => [
      obj?.couponId,
      obj?.numberOfTimesUsed,
      obj?.type,
      toDateString(obj?.expiryDate),
      obj?.amount,
      obj?.frequency,
    ]);

    doc.autoTable({
      head: headersPDF,
      body: rows,
    });

    doc.save("laundry-table-coupon.pdf");
  };

  useEffect(() => {
    const getReward = async () => {
      try {
        const response = await axios.get("/user/threshold");
        setGetThreshold(response.data.data);
      } catch (error) {}
    };
    getReward();
  }, [getThreshold]);

  const handleSubmitReward = async () => {
    try {
      setLoadingThreshold(true);
      const response = await axios.post("/user/threshold", {
        threshold: threshold ? threshold : getThreshold,
      });
      setLoadingThreshold(false);
      return Swal.fire({
        icon: "success",
        title: "Success",
        text: `You have successfully set threshold.`,
      });
    } catch (error) {
      setLoadingThreshold(true);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong!",
      });
      setLoadingThreshold(false);
    }
  };

  const handleSubmit = async () => {
    if (sendData.type === "percentage" && sendData.amount > 100) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${`Amount must be in percentage.`}`,
      });
    } else {
      try {
        setLoading(true);
        const response = await axios.post("/coupon", {
          ...sendData,
          amount: sendData.amount,
          expiryDate: new Date(sendData.expiryDate),
        });
        dispatch({
          type: "ADD_COUPON",
          payload: response.data.data.coupon,
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Successful!`,
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
    }
  };

  const handleChange = (e) => {
    return setSendData({
      ...sendData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (user?.role === "super admin") return;
    const timeoutId = setTimeout(() => {
      return navigate("/dashboard");
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user]);

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={`Coupon List`}>
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
            <CardHeader title="Reward Coupon Threshold"></CardHeader>
            <Row>
              <Col xl={12}>
                <LegendField
                  title="Threshold"
                  defaultValue={getThreshold}
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  type="text"
                />
              </Col>

              <Row>
                <Col xl={4}>
                  <Button
                    icon="verified"
                    onClick={() => handleSubmitReward()}
                    className="mc-btn primary"
                    text={loadingThreshold ? `updating...` : "update"}
                  />
                </Col>
              </Row>
            </Row>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <CardHeader title="Generate Coupon"></CardHeader>
            <Row>
              <Col xl={6}>
                <Fieldset className={`mc-fieldset`}>
                  <Legend>Type</Legend>

                  <Select
                    name="type"
                    onChange={handleChange}
                    className={`w-100 h-lg" `}
                  >
                    <Option>{"Select Option"}</Option>
                    <Option value="percentage">Percentage</Option>
                    <Option value="absolute">Absolute</Option>
                  </Select>
                </Fieldset>
              </Col>
              <Col xl={6}>
                <LegendField
                  title="Expiry Date"
                  value={sendData.expiryDate}
                  name="expiryDate"
                  onChange={handleChange}
                  type="date"
                />
              </Col>
              <Col xl={6}>
                <LegendField
                  title="Amount"
                  value={sendData.amount}
                  name="amount"
                  onChange={handleChange}
                />
              </Col>
              <Col xl={6}>
                <Fieldset className={`mc-fieldset`}>
                  <Legend>Frequency</Legend>

                  <Select
                    name="frequency"
                    onChange={handleChange}
                    className={`w-100 h-lg" `}
                  >
                    <Option>{"Select Option"}</Option>
                    <Option value="recurring">Recurring</Option>
                    <Option value="one-off">One-Off</Option>
                  </Select>
                </Fieldset>
              </Col>

              <Row>
                <Col xl={4}>
                  <Button
                    icon="verified"
                    onClick={() => handleSubmit()}
                    className="mc-btn primary"
                    text={loading ? `generating...` : "generate"}
                  />
                </Col>
              </Row>
            </Row>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <CardHeader title="All Coupons" />
            {/* <Row xs={1} sm={4} className="mb-4">
              <Box className={`mc-label-field-group label-col }`}>
                <Label className="mc-label-field-title">Show by</Label>
                <Select className={`mc-label-field-select w-md h-sm`}>
                  <Option value={10}>10 Row</Option>
                  <Option value={15}>15 Row</Option>
                  <Option value={20}>20 Row</Option>
                </Select>
              </Box>
            </Row> */}
            <CouponsTable
              thead={[
                "coupon Id",
                "times used",
                "type",
                "expiry Date",
                "amount",
                "frequency",
                "isExpired",
              ]}
              tbody={coupons}
            />
            {/* <Pagination
              data={coupons}
              setCurrentPageCoupon={setCurrentPageCoupon}
              currentPageCoupon={currentPageCoupon}
              setPageCountCoupon={setPageCountCoupon}
              pageCountCoupon={pageCountCoupon}
            /> */}
          </CardLayout>

          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <CSVLink data={coupons} headers={headers}>
              <Box
                style={{
                  marginRight: ".5rem",
                }}
                className="mc-invoice-btns btn btn-success"
              >
                {<i className="material-icons">{"download"}</i>}
                {`Download as CSV`}
              </Box>
            </CSVLink>
            <Box className="mc-invoice-btns">
              <Anchor
                onClick={() => generatePDF()}
                icon="print"
                text="print as pdf"
                className="btn btn-dark"
              />
            </Box>
          </Box>
        </Col>
      </Row>
    </PageLayout>
  );
}
