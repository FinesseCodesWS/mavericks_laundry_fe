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
  List,
  Text,
} from "../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import { LabelField, LegendField } from "../../components/fields";
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

  const totalCost = vats?.reduce((acc, obj) => acc + obj?.revenue, 0);

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
            <CardHeader title="All Revenue" />
            <Row xs={1} sm={4} className="mb-4"></Row>
            <VATTable thead={["Date", "Count", "Revenue"]} tbody={vats} />
            {/* <Pagination
              data={staffs}
              setCurrentPageStaff={setCurrentPageStaff}
              currentPageStaff={currentPageStaff}
              setPageCountStaff={setPageCountStaff}
              pageCountStaff={pageCountStaff}
            /> */}
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
                {}
                <Text
                  as="span"
                  className={`digit
                            }`}
                >
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
