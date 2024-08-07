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
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axios";
// import Packer from "js-binary-packer";

export default function ProductView({ data, width, height }) {
  const [png, setPng] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.menu);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getImage = async () => {
  //     const response = await axios.get(`/menu/image/${menu?._id}`, {
  //       responseType: "arraybuffer",
  //     });
  //     const blob = new Blob([response.data], {
  //       type: response.headers["content-type"],
  //     });
  //     const url = URL.createObjectURL(blob);
  //     setImageUrl(url);
  //   };
  //   getImage();
  // }, [menu?._id]);

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
            <DivideTitle title="food gallery" className="mb-4" />
            <Box className="mc-product-view-gallery">
              <Image src={menu?.image} alt="product image" />

              {/* {menu?.image?.data?.map((item, index) => (
                // <Image key={index} src={item} alt="product image" />
                
              ))} */}
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
            </Box>
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
