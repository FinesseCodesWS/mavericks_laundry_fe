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
import { Breadcrumb, DivideTitle } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import CardLayout from "../../components/cards/CardLayout";
import data from "../../data/master/productView.json";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function ProductView({ data }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.menu);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

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
        <Breadcrumb title="View Product">
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
            <DivideTitle title="laundry gallery" className="mb-4" />
            <Box className="mc-product-view-gallery">
              <Image src={menu?.image ? menu?.image : "https://placeholder.com/500"} alt="product image" />
            </Box>
          </Col>
          <Col xl={7}>
            <DivideTitle title="laundry details" className="mb-4" />
            <Heading as="h2" className="mc-product-view-info-title">
              {menu?.itemName}
            </Heading>
            <Row className="mc-product-view-meta">
              <Col xs={12} md={6} className="d-flex align-items-center mb-3">
                <Icon>pix</Icon> {/* Replace with appropriate icon if needed */}
                <h5 className="mb-0 ms-2">Category</h5>
                <span className="mx-2">:</span>
                <p className="mb-0">{menu?.category}</p>
              </Col>

              <Col xs={12} md={6} className="d-flex align-items-center mb-3">
                <Icon>male</Icon>
                <h5 className="mb-0 ms-2">Male Ordinary Price</h5>
                <span className="mx-2">:</span>
                <p className="mb-0">{menu?.adultMalePrice?.ordinary}</p>
              </Col>

              <Col xs={12} md={6} className="d-flex align-items-center mb-3">
                <Icon>male</Icon>
                <h5 className="mb-0 ms-2">Male Ironed Price</h5>
                <span className="mx-2">:</span>
                <p className="mb-0">{menu?.adultMalePrice?.ironed}</p>
              </Col>

              <Col xs={12} md={6} className="d-flex align-items-center mb-3">
                <Icon>female</Icon>
                <h5 className="mb-0 ms-2">Female Ordinary Price</h5>
                <span className="mx-2">:</span>
                <p className="mb-0">{menu?.adultFemalePrice?.ordinary}</p>
              </Col>

              <Col xs={12} md={6} className="d-flex align-items-center mb-3">
                <Icon>female</Icon>
                <h5 className="mb-0 ms-2">Female Ironed Price</h5>
                <span className="mx-2">:</span>
                <p className="mb-0">{menu?.adultFemalePrice?.ironed}</p>
              </Col>

              <Col xs={12} md={6} className="d-flex align-items-center mb-3">
                <Icon>child_care</Icon>
                <h5 className="mb-0 ms-2">Children Ordinary Price</h5>
                <span className="mx-2">:</span>
                <p className="mb-0">{menu?.childrenPrice?.ordinary}</p>
              </Col>

              <Col xs={12} md={6} className="d-flex align-items-center mb-3">
                <Icon>child_care</Icon>
                <h5 className="mb-0 ms-2">Children Ironed Price</h5>
                <span className="mx-2">:</span>
                <p className="mb-0">{menu?.childrenPrice?.ironed}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
        <br />
        <Button
          icon="verified"
          onClick={() => navigate("/product-list")}
          className="mc-btn primary"
          text={`Go Back`}
        />
      </CardLayout>
    </PageLayout>
  );
}
