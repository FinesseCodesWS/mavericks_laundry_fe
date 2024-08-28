import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Anchor,
  Box,
  Item,
  Text,
  Icon,
  List,
  Image,
  Heading,
  Button,
} from "../../components/elements";
import { CustomerReview, RatingAnalytics } from "../../components/review";
import { Breadcrumb, DivideTitle } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import LabelTextarea from "../../components/fields/LabelTextarea";
import CardLayout from "../../components/cards/CardLayout";
import data from "../../data/master/productView.json";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function ProductView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.menu);

  useEffect(() => {
    if (id) {
      dispatch({
        type: "GET_MENU",
        payload: id,
      });
    }
  }, [id, dispatch]);

  return (
    <PageLayout>
      <CardLayout className="mb-4">
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
      <CardLayout className="p-lg-5">
        <Row>
          <Col xl={5}>
            <DivideTitle title="food gallery" className="mb-4" />
            <Box className="mc-product-view-gallery">
              {menu?.image?.data?.map((item, index) => (
                // <Image key={index} src={item} alt="product image" />
                <img src={item} key={index} alt="image" />
              ))}
            </Box>
          </Col>
          <Col xl={7}>
            <DivideTitle title="food details" className="mb-4" />
            <Box className="mc-product-view-info-group">
              <Heading as="h2" className="mc-product-view-info-title">
                {menu?.itemName}
              </Heading>
              <Box className="mc-product-view-meta">
                <Icon type="pix" />
                <Heading as="h5">Category</Heading>
                <Text as="span">:</Text>
                <Text as="p">{menu?.category}</Text>
              </Box>
              <Box className="mc-product-view-meta">
                <Icon type="sell" />
                <Heading as="h5">Prize</Heading>
                <Text as="span">:</Text>
                <Text as="p">{menu?.unitPrice}</Text>
              </Box>
              <Box className="mc-product-view-meta">
                <Icon type="store" />
                <Heading as="h5">Quantity</Heading>
                <Text as="span">:</Text>
                <Text as="p">{menu?.quantity}</Text>
              </Box>
              <Box className="mc-product-view-meta">
                <Icon type="sell" />
                <Heading as="h5">Countable</Heading>
                <Text as="span">:</Text>
                <Text as="p">{menu?.countable?.toString()}</Text>
              </Box>
              {/* {data?.specify.map((item, index) => (
                <Box key={index} className="mc-product-view-meta">
                  <Icon type={item.icon} />
                  <Heading as="h5">{item.title}</Heading>
                  <Text as="span">:</Text>
                  {item.text && <Text as="p">{item.text}</Text>}
                  {item.price && (
                    <Text as="p">
                      {item.price.now} <del>{item.price.old}</del>
                    </Text>
                  )}
                  {item.list && (
                    <List>
                      {item.list.map((item, index) => (
                        <Item key={index}>{item}</Item>
                      ))}
                    </List>
                  )}
                </Box>
              ))} */}
            </Box>
          </Col>
          {/* <Col xl={12}>
            <DivideTitle title="food description" className="mt-5 mb-4" />
            <Box className="mc-product-view-descrip">
              <Text>{data?.descrip}</Text>
            </Box>
          </Col> */}
        </Row>
      </CardLayout>
    </PageLayout>
  );
}
