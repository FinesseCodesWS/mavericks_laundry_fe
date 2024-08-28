import React from "react";
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
import SaleTable from "../../components/tables/SaleTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/invoiceList.json";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toDateString } from "../../utils/date";

export default function SaleList({
  setCurrentPageTrending,
  currentPageTrending,
  setPageCountTrending,
  pageCountTrending,
  setFilterYear,
  setFilterMonth,
  isFilteredCategory,
  setWeeks,
  weeks,
  setWeek,
  trendingSales,
  setSalesDate,
  setSalesMonth,
}) {
  const headers = [
    { label: "Product Name", key: "_id" },
    { label: "Sales Count", key: "salesCount" },
    { label: "Sold Items", key: "soldItemCount" },
    { label: "Revenue", key: "revenue" },
  ];
  const headersPDF = [["Product Name", "Sales Count", "Sold Items", "Revenue"]];

  const generatePDF = () => {
    const doc = new jsPDF();

    // convert object data to arrays of values
    const rows = trendingSales.map((obj) => [
      obj?._id,
      obj?.salesCount,
      obj?.soldItemCount,
      obj?.revenue,
    ]);

    doc.autoTable({
      head: headersPDF,
      body: rows,
    });

    doc.save("laundry-sales-coupon.pdf");
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="sales inventory">
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
            <CardHeader title="sales inventory" />
            <Row>
              <Col xs={1} sm={2} lg={3}>
                <LabelField
                  type="date"
                  label="Filter by Day"
                  fieldSize="w-100 h-md"
                  name="date"
                  onChange={(e) => setSalesDate(e.target.value)}
                />
              </Col>
              <Col xs={1} sm={2} lg={3}>
                <LabelField
                  type="date"
                  label="Filter by Month"
                  fieldSize="w-100 h-md"
                  name="date"
                  onChange={(e) => setSalesMonth(e.target.value)}
                />
              </Col>
              <Col lg={12} className="mb-4">
                <Fieldset className={`mc-fieldset`}>
                  <Legend>Weeks</Legend>

                  <Select
                    name="type"
                    onChange={(e) => setWeek(e.target.value)}
                    className={`w-100 h-sm" `}
                  >
                    <Option value="">{"Select Option"}</Option>
                    {weeks?.map((week, index) => (
                      <Option key={index} value={week}>
                        {week}
                      </Option>
                    ))}
                  </Select>
                </Fieldset>
              </Col>
            </Row>
            <SaleTable
              thead={["product name", "sales count", "sold items", "revenue"]}
              tbody={trendingSales}
              loading={isFilteredCategory}
            />
            {/* <Pagination
              data={trendingSales}
              setCurrentPageTrending={setCurrentPageTrending}
              currentPageTrending={currentPageTrending}
              setPageCountTrending={setPageCountTrending}
              pageCountTrending={pageCountTrending}
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
            <CSVLink data={trendingSales} headers={headers}>
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
