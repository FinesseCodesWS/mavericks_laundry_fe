import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard, CardHeader } from "../../components/cards";
import LogsTable from "../../components/tables/LogsTable";
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
import { useNavigate } from "react-router-dom";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function InventoryLog({
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
  const [vatLoading, setVatLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [getVAT, setGetVAT] = useState({});
  const navigate = useNavigate();

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
        {/* <Col xl={12}>
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
                    <Option>{"Select Option"}</Option>
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
        </Col> */}

        <Col xl={12}>
          <CardLayout>
            <Row>
              <Col xl={12}>
                <LogsTable
                  thead={["item name", "quantity", "status", "action"]}
                  tbody={inventories}
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
        </Col>
      </Row>
    </PageLayout>
  );
}
