import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard, CardHeader } from "../../components/cards";
import InventoriesTable from "../../components/tables/InventoriesTable";
import LegendField from "../../components/fields/LegendField";
import { Pagination, Breadcrumb } from "../../components";
import {
  Button,
  Anchor,
  Select,
  Option,
  Fieldset,
  Legend,
  Box,
} from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productList.json";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toDateString } from "../../utils/date";

export default function InventoryList({
  menus,
  inventories,
  setCurrentPageInventory,
  currentPageInventory,
  setPageCountInventory,
  pageCountInventory,
  loading,
}) {
  const headers = [
    { label: "Item Name", key: "itemName" },
    { label: "Quantity", key: "quantity" },
    { label: "Status", key: "status" },
  ];
  const headersPDF = [["Item Name", "Quantity", "Status"]];
  const user = useSelector((state) => state.user.user);
  const [vatLoading, setVatLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [menuId, setMenuId] = useState("");
  const [getVAT, setGetVAT] = useState({});
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const filteredData = inventories?.filter((item) =>
    item?.status?.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };
  const [searchKeywordItem, setSearchKeywordItem] = useState("");
  const filteredDataItem = inventories?.filter((item) =>
    item?.itemName?.toLowerCase().includes(searchKeywordItem?.toLowerCase())
  );

  const handleInputChangeItem = (event) => {
    setSearchKeywordItem(event.target.value);
  };

  useEffect(() => {
    const getVAT = async () => {
      try {
        const response = await axios.get("sales/vat");
        setGetVAT(response.data.data.vat);
      } catch (error) {}
    };
    getVAT();
  }, []);

  const handleVATSubmit = async () => {
    try {
      setVatLoading(true);
      const response = await axios.put("/sales/vat", {
        threshold: threshold ? +threshold : getVAT?.threshold,
        amount: percentage ? +percentage : getVAT.percentage,
      });
      setVatLoading(false);
      return Swal.fire({
        icon: "success",
        title: "Success",
        text: "Successful",
      });
    } catch (error) {
      setVatLoading(true);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong!",
      });
      setVatLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // convert object data to arrays of values
    const rows = inventories.map((obj) => [
      obj?.itemName,
      obj?.quantity,
      obj?.status,
    ]);

    doc.autoTable({
      head: headersPDF,
      body: rows,
    });

    doc.save("laundry-table-inventories.pdf");
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="inventory list">
              {data?.breadcrumb.map((item, index) => (
                <li key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </Breadcrumb>
          </CardLayout>
        </Col>

        {user?.role === "super admin" && (
          <Col xl={12}>
            <CardLayout>
              <CardHeader title="Update VAT"></CardHeader>
              <Row>
                <Col xl={6}>
                  <LegendField
                    title="In Percentage (%)"
                    value={percentage}
                    defaultValue={getVAT?.amount ? 100 / getVAT?.amount : 0}
                    name="percentage"
                    onChange={(e) => setPercentage(e.target.value)}
                  />
                </Col>
                <Col xl={6}>
                  <LegendField
                    title="Threshold"
                    value={threshold}
                    defaultValue={getVAT?.threshold}
                    name="threshold"
                    onChange={(e) => setThreshold(e.target.value)}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col xl={2}>
                  <Button
                    onClick={() => handleVATSubmit()}
                    className="mc-btn primary"
                    icon="verified"
                    text={vatLoading ? `updating...` : "update"}
                  />
                </Col>
              </Row>
            </CardLayout>
          </Col>
        )}

        <Col xl={12}>
          <CardLayout>
            <Row>
              {/* <Col xs={12} sm={6} md={4} lg={3}>
                <LegendField
                  name="lastName"
                  title="Search Status Keyword"
                  value={searchKeyword}
                  onChange={handleInputChange}
                />
              </Col> */}
              <Col xs={12} sm={6} md={4} lg={3}>
                <LegendField
                  name="lastName"
                  title="Search Item Keyword"
                  value={searchKeywordItem}
                  onChange={handleInputChangeItem}
                />
              </Col>
              <Col xl={12}>
                <InventoriesTable
                  thead={["item name", "quantity", "status", , "action"]}
                  tbody={
                    filteredDataItem
                      ? filteredDataItem
                      : filteredData
                      ? filteredData
                      : inventories
                  }
                  loading={loading}
                />
                <Pagination
                  setCurrentPageInventory={setCurrentPageInventory}
                  currentPageInventory={currentPageInventory}
                  setPageCountInventory={setPageCountInventory}
                  pageCountInventory={pageCountInventory}
                />
              </Col>
            </Row>
          </CardLayout>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <CSVLink data={inventories} headers={headers}>
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
      {/* <br />
      <Button
        icon="verified"
        onClick={() => navigate("/logs/all")}
        className="mc-btn primary"
        text={`View all logs`}
      /> */}
    </PageLayout>
  );
}
