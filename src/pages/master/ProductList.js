import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import { Anchor, Label, Select, Option } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productList.json";
import axios from "../../axios";

export default function ProductList({
  menus,
  setCurrentPageMenu,
  currentPageMenu,
  setPageCountMenu,
  pageCountMenu,
  filterCategory,
  setFilterCategory,
  filteredCategory,
  setFilteredCategory,
  isFilteredCategory,
  setIsFilteredCategory,
}) {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("/menu/category");
        setCategories(response.data.data);
      } catch (error) {}
    };
    getCategories();
  }, []);

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={data?.pageTitle}>
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
        {/* {data?.float.map((item, index) => (
          <Col key={index} sm={6} lg={4}>
            <FloatCard
              variant={item.variant}
              digit={item.digit}
              title={item.title}
              icon={item.icon}
            />
          </Col>
        ))} */}
        <Col xl={12}>
          <CardLayout>
            <Row>
              <Col xs={12} sm={6} md={4} lg={3}>
                <Label className="mc-label-field-title">Filter by Status</Label>
                <Select
                  name="category_id"
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="mc-label-field-select w-100 h-md"
                >
                  <Option value="">Select Option</Option>
                  <Option value="ALL">All</Option>
                  <Option value="AVAILABLE">Available</Option>
                  <Option value="OUT OF STOCK">Out of Stock</Option>
                </Select>
              </Col>

              <Col xs={12} sm={6} md={4} lg={3}>
                <Label className="mc-label-field-title">
                  Filter by Category
                </Label>
                <Select
                  onChange={(e) => setFilteredCategory(e.target.value)}
                  className="mc-label-field-select w-100 h-md"
                >
                  <Option value="">Select Option</Option>
                  {categories?.map((category, index) => (
                    <Option key={index} value={category._id}>
                      {category.category}
                    </Option>
                  ))}
                </Select>
              </Col>

              <Col xl={12}>
                <ProductsTable
                  thead={["item", "category", "price", "stock", "action"]}
                  tbody={menus}
                  loading={isFilteredCategory}
                />
                {/* <Pagination
                  data={menus}
                  setCurrentPageMenu={setCurrentPageMenu}
                  currentPageMenu={currentPageMenu}
                  setPageCountMenu={setPageCountMenu}
                  pageCountMenu={pageCountMenu}
                /> */}
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
