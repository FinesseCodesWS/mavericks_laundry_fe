import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Item, Anchor, Box } from "../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import CustomersTable from "../../components/tables/CustomersTable";
import LabelField from "../../components/fields/LabelField";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/orderList.json";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Customers({
  customers,
  setCurrentPageCustomer,
  currentPageCustomer,
  setPageCountCustomer,
  pageCountCustomer,
  setFilterCustomerDate,
  isFilteredCategory,
}) {
  const headers = [
    { label: "Full Name", key: "fullName" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Amount", key: "amount" },
    { label: "Status", key: "status" },
    { label: "Registered Date", key: "createdAt" },
  ];
  const headersPDF = [
    [
      "Full Name",
      "Phone Number",
      "Amount",
      `Status`,
      `Registered Date`,
    ],
  ];
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const generatePDF = () => {
    const doc = new jsPDF();

    // convert object data to arrays of values
    const rows = customers.map((obj) => [
      obj?.fullName,
      obj?.phoneNumber,
      obj?.amount,
      obj?.status,
      obj?.createdAt,
    ]);

    doc.autoTable({
      head: headersPDF,
      body: rows,
    });

    doc.save("laundry-table-pdf.pdf");
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
            <Breadcrumb title="Customers Information">
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
        <Col xl={3}>
          <FloatCard
            variant="lg green"
            digit={pageCountCustomer ? pageCountCustomer : 0}
            title="Total Customers"
            icon="local_shipping"
          />
        </Col>
        <Col xl={12}>
          <CardLayout>
            <CardHeader title="customers information" />
            <Row xs={1} sm={4} className="mb-4">
              <LabelField
                type="date"
                label="Filter by Date"
                fieldSize="w-100 h-md"
                name="date"
                onChange={(e) => setFilterCustomerDate(e.target.value)}
              />
            </Row>
            <CustomersTable
              thead={[
                "full name",
                "phone number",
                "amount",
                "status",
                "registered date",
              ]}
              tbody={customers}
              loading={isFilteredCategory}
            />
            {/* <Pagination
              data={customers}
              setCurrentPageCustomer={setCurrentPageCustomer}
              currentPageCustomer={currentPageCustomer}
              setPageCountCustomer={setPageCountCustomer}
              pageCountCustomer={pageCountCustomer}
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
            <CSVLink data={customers} headers={headers}>
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
