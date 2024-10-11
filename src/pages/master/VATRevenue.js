import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from "react-bootstrap"; // Import Modal
import {
  Anchor,
  Item,
  Fieldset,
  Legend,
  Button,
  Box,
  List,
  Text,
} from "../../components/elements";
import { LabelField } from "../../components/fields";

import { CardLayout, CardHeader } from "../../components/cards";
import { Breadcrumb } from "../../components";
import VATTable from "../../components/tables/VATTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userList.json";
import axios from "../../axios";
import { useSelector, useDispatch } from "react-redux";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const addCommaToThousand = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function UserList({
  staffs,
  setCurrentPageStaff,
  currentPageStaff,
  setPageCountStaff,
  pageCountStaff,
  vats,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [threshold, setThreshold] = useState("");

  const totalCost = vats?.reduce((acc, obj) => acc + obj?.revenue, 0);

  useEffect(() => {
    handleShow()
  }, [])

  const handleShow = async () => {
    try {
      const response = await axios.get("/sales/vat")
      const { amount, threshold } = response.data.data.vat;
      setAmount(amount);
      setThreshold(threshold);
      setShowModal(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to fetch VAT data.",
      });
    }
  };

  const handleClose = () => {
    setAmount("");
    setThreshold("");
    setShowModal(false);
  };

  const handleUpdateVAT = async () => {
    if (!amount || !threshold) {
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in both fields.",
      });
    }

    try {
      await axios.put("/sales/vat", {
        amount: Number(amount),
        threshold: Number(threshold),
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `VAT updated successfully.`,
      });
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="V.A.T Revenue">
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
            <CardHeader title="Update V.A.T"></CardHeader>
            <Row>
            <Col>
              <LabelField
                type="number"
                label="Amount"
                fieldSize="w-100 h-md"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Col>
            <Col>
              <LabelField
                type="number"
                label="Threshold"
                fieldSize="w-100 h-md"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                required
              />
            </Col>
            <Row>
                <Col xl={4}>
                  <Button
                    icon="verified"
                    onClick={() => handleUpdateVAT()}
                    className="mc-btn primary"
                    text={"update"}
                  />
                </Col>
              </Row>
            </Row>
          </CardLayout>
        </Col>

        <Col xl={12}>
          
          <CardLayout>
            <CardHeader title="All Revenue"></CardHeader>
            <VATTable thead={["Date", "Count", "Revenue"]} tbody={vats} />
          </CardLayout>
          <Box className="mc-invoice-list-group">
            <List className="mc-invoice-list">
              <Item>
                <Text as="span" className="title">
                  Total
                </Text>
                <Text as="span" className="clone">
                  :
                </Text>
                <Text as="span" className={`digit`}>
                  N{addCommaToThousand(totalCost)}
                </Text>
              </Item>
            </List>
          </Box>
        </Col>
      </Row>
    </PageLayout>
  );
}