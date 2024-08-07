import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard, CardHeader } from "../../components/cards";
import LogTable from "../../components/tables/LogTable";
import { LegendField, LabelField } from "../../components/fields";
import { Pagination, Breadcrumb } from "../../components";
import {
  Button,
  Anchor,
  Select,
  Option,
  Fieldset,
  Legend,
} from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productList.json";
import axios from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function Logs({
  menus,
  inventories,
  setMenuId,
  logs,
  setLogDate,
  setCurrentPageLog,
  currentPageLog,
  setPageCountLog,
  pageCountLog,
}) {
  const { id } = useParams();
  const [vatLoading, setVatLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [getVAT, setGetVAT] = useState({});
  const navigate = useNavigate();
  const [searchKeywordItem, setSearchKeywordItem] = useState("");
  const filteredDataItem = logs.filter((item) =>
    item?.menu?.itemName.toLowerCase().includes(searchKeywordItem.toLowerCase())
  );

  const handleInputChangeItem = (event) => {
    setSearchKeywordItem(event.target.value);
  };

  console.log(logs);

  // useEffect(() => {
  //   if (id === "all") {
  //     return setMenuId("all");
  //   } else {
  //     return setMenuId(id);
  //   }
  // }, [id, setMenuId]);

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="inventory log">
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
        <Col xl={12}>
          <CardLayout>
            <CardHeader title="Select Menu"></CardHeader>
            <Row>
              <Col xl={12}>
                <Fieldset className={`mc-fieldset`}>
                  <Legend>Menu List</Legend>

                  <Select
                    onChange={(e) => setMenuId(e.target.value)}
                    className={`w-100 h-lg" `}
                  >
                    <Option value="all">{"All"}</Option>
                    {menus?.map((item, index) => (
                      <Option key={index} value={item?._id}>
                        {item?.itemName}
                      </Option>
                    ))}
                  </Select>
                </Fieldset>
              </Col>
            </Row>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <Row>
              {/* <Col xs={12} sm={6} md={4} lg={3}>
                <LabelField
                  type="date"
                  label="Show by Date"
                  placeholder="Choose date"
                  labelDir="label-col"
                  fieldSize="w-100 h-md"
                  onChange={(e) => setLogDate(e.target.value)}
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
                <LogTable
                  thead={[
                    "item name",
                    "quantity",
                    "added quantity",
                    "time",
                    "status",
                    "updated at",
                    "action by",
                  ]}
                  tbody={filteredDataItem ? filteredDataItem : logs}
                />
                {/* <Pagination
                  data={logs}
                  setCurrentPageLog={setCurrentPageLog}
                  currentPageLog={currentPageLog}
                  setPageCountLog={setPageCountLog}
                  pageCountLog={pageCountLog}
                /> */}
              </Col>
            </Row>
          </CardLayout>
          <br />
          <Button
            icon="verified"
            onClick={() => navigate("/inventories")}
            className="mc-btn primary"
            text={`Go Back`}
          />
        </Col>
      </Row>
    </PageLayout>
  );
}
