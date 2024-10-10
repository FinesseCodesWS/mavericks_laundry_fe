import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/ecommerce.json";
import { Box, Item, Anchor } from "../../components/elements";
import {
  EcommerceCard,
  SalesCard,
  ProductsCard,
  RevenueCard,
  ClientsCard,
  ActivityCard,
  OrdersCard,
  pageCountInvoice,
} from "../../components/cards";
import TrendingTable from "../../components/tables/TrendingTable";

export default function Ecommerce({
  staffs,
  filter,
  setFilter,
  invoices,
  pageCountInvoice,
  menus,
  revenues,
  sales,
  trendingSales,
  logs,
  pageCountStaff,
  pageCountLog,
}) {
  const [dropdowns, setDropdowns] = useState([
    { icon: "history", text: "last day" },
    { icon: "history", text: "last week" },
    { icon: "history", text: "last month" },
    { icon: "history", text: "last year" },
  ]);

  const addCommaToThousand = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <Box className="mc-card">
            <Breadcrumb title="dashboard">
              {data?.breadcrumb?.map((item, index) => (
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
          </Box>
        </Col>
        <Col xs={12} xl={8}>
          <Row xs={1} sm={2}>
            <Col>
              <EcommerceCard
                variant="green"
                title="total staffs"
                icon="account_circle"
                number={pageCountStaff ? pageCountStaff : 0}
                trend=""
                percent=""
                compare="last month"
              />
            </Col>
            <Col>
              <EcommerceCard
                variant="purple"
                title="total invoices"
                icon="newspaper"
                number={pageCountInvoice ? pageCountInvoice : 0}
                trend=""
                percent=""
                compare="last month"
              />
            </Col>
            <Col>
              <EcommerceCard
                variant="blue"
                title="total menu list"
                icon="list"
                number={menus?.length}
                trend=""
                percent=""
                compare="last month"
              />
            </Col>
            
          </Row>
        </Col>
        <Col xs={12} xl={4}>
          <SalesCard
            title={data?.sales.title}
            amount={`₦${addCommaToThousand(
              revenues?.length > 0
                ? revenues?.map((revenue) => revenue.revenue)
                : 0
            )}`}
            percent={data?.sales.percent}
            trendIcon={data?.sales.trendIcon}
            compare={data?.sales.compare}
            chart={[
              { week: "fri", sale: 2000 },
              { week: "sat", sale: 3000 },
              { week: "san", sale: 2000 },
              { week: "mon", sale: 2780 },
              { week: "tue", sale: 1890 },
              { week: "wen", sale: 2390 },
              { week: "thu", sale: 3490 },
            ]}
          />
        </Col>

        <Col xl={12}>
          <TrendingTable thead={["id", "count", "revenue"]} tbody={revenues} pageCountInvoice={pageCountInvoice} />
        </Col>

        {/* <Col xl={8}>
          <RevenueCard
            title={data?.revenue.title}
            field={data?.revenue.field}
            report={data?.revenue.report}
            chart={data?.revenue.chart}
          />
        </Col>
        <Col xl={4}>
          <OrdersCard
            title={data?.orders.title}
            dotsMenu={data?.orders.dotsMenu}
            items={data?.orders.items}
          />
        </Col> */}
      </Row>
    </PageLayout>
  );
}
