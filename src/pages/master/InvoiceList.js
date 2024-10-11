import React, { useState } from "react";
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
import LabelField from "../../components/fields/LabelField";
import LegendField from "../../components/fields/LegendField";
import InvoiceTable from "../../components/tables/InvoiceTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/invoiceList.json";

export default function InvoiceList({
  invoices,
  setCurrentPageInvoice,
  currentPageInvoice,
  setPageCountInvoice,
  pageCountInvoice,
  setFilterYear,
  setFilterMonth,
  isFilteredCategory,
  setMode,
  setStatus,
}) {
  const handlePageChange = (e) => {
    setCurrentPageInvoice(e.target.value);
  };
  const [searchKeyword, setSearchKeyword] = useState("");
  const filteredData = invoices?.filter((item) =>
    item?.totalPrice === parseInt(searchKeyword)
      ? item?.totalPrice === parseInt(searchKeyword)
      : item
  );

  const handleInputChange = (event) => {
    setSearchKeyword(+event.target.value);
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

        <Col xl={12}>
          <CardLayout>
            <CardHeader title="shopping invoices" />

            <Row>
              <Col xs={1} sm={2} lg={4} className="mb-4">
                <LabelField
                  type="date"
                  label="Filter by Month/Year"
                  fieldSize="w-100 h-md"
                  name="date"
                  onChange={(e) => setFilterMonth(e.target.value)}
                />
              </Col>
              <Col xs={1} sm={2} lg={4} className="mb-4">
                <Label className="mc-label-field-title">
                  Filter by Mode of Payment
                </Label>
                <Select
                  name="category_id"
                  onChange={(e) => setMode(e.target.value)}
                  className="mc-label-field-select w-100 h-md"
                >
                  <Option value="">Select Option</Option>
                  <Option value="transfer">Transfer</Option>
                  <Option value="pay later">Pay Later</Option>
                  <Option value="cash">Cash</Option>
                  <Option value="pos">POS</Option>
                </Select>
              </Col>
              <Col xs={1} sm={2} lg={4} className="mb-4">
                <Label className="mc-label-field-title">Filter by Status</Label>
                <Select
                  name="category_id"
                  onChange={(e) => setStatus(e.target.value)}
                  className="mc-label-field-select w-100 h-md"
                >
                  <Option value="">Select Option</Option>
                  <Option value="new">New</Option>
                  <Option value="delivered">Delivered</Option>
                  <Option value="washed">Washed</Option>
                  <Option value="sorted">Sorted</Option>
                  <Option value="ironed">Ironed</Option>
                  <Option value="packaged">Packaged</Option>
                  <Option value="picked up">Picked Up</Option>
                  <Option value="dispatched">Dispatched</Option>
                </Select>
              </Col>
            </Row>
            <InvoiceTable
              thead={[
                "product name",
                "total price",
                "mode of payment",
                "status",
                "issue date",
                "action",
              ]}
              tbody={invoices}
              loading={isFilteredCategory}
            />
            {/* <Pagination
              data={invoices}
              setCurrentPageInvoice={setCurrentPageInvoice}
              currentPageInvoice={currentPageInvoice}
              setPageCountInvoice={setPageCountInvoice}
              pageCountInvoice={pageCountInvoice}
            /> */}
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
