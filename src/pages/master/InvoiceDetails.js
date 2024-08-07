import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Box,
  Text,
  List,
  Item,
  Image,
  Anchor,
  Heading,
} from "../../components/elements";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import CardLayout from "../../components/cards/CardLayout";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/invoiceDetails.json";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jsPDF from "jspdf";

export default function InvoiceDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice.invoice);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (invoice) {
      setTotalAmount(
        invoice?.items?.reduce((acc, item) => acc + item.totalPrice, 0)
      );
    }
  }, [invoice]);

  useEffect(() => {
    if (id) {
      dispatch({
        type: "GET_INVOICE",
        payload: id,
      });
    }
  }, [id, dispatch]);

  const handleDownload = () => {
    const pdf = new jsPDF();
    // let content =
    //   "Sales ID, Product Name, Price Per Unit, Total Amount, Quantity, Created By\n";

    // invoice?.items?.forEach((item) => {
    //   content += `${item.salesId}, ${item.menuId.itemName}, ${item.menuId.unitPrice}, ${item.totalPrice}, ${item.quantity}, ${item.createdBy.email}\n`;
    // });

    // pdf.text(content, 10, 10);
    pdf.save("laundry-invoice.pdf");

    const tableData = [
      [
        "Sales ID",
        "Product Name",
        "Price Per Unit",
        `Total Amount`,
        `Quantity`,
        `Created By`,
      ],
      invoice?.items?.map((obj) => {
        return Object.values(obj);
      }),
    ];

    const columnWidths = [50, 25, 25];
    const rowHeight = 10;

    const x = 10;
    const y = 10;
    tableData.forEach((rowData, i) => {
      rowData.forEach((cellData, j) => {
        pdf.cell(
          x + j * columnWidths[j],
          y + i * rowHeight,
          columnWidths[j],
          rowHeight,
          cellData,
          i === 0 ? 1 : 0
        );
      });
    });

    pdf.save("laundry-invoice.pdf");
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
          <CardLayout className="p-md-5">
            <Box className="mc-invoice-head">
              {/* <Image src={data?.logo.src} alt={data?.logo.alt} /> */}
              <Heading as="h2">{`invoice #${invoice?.invoiceId}`}</Heading>
            </Box>

            <Box className="mc-table-responsive">
              <Table className="mc-table">
                <Thead className="mc-table-head">
                  <Tr>
                    {[
                      "uid",
                      "product name",
                      "price per unit",
                      "total amount",
                      "quantity",
                      "created by",
                    ].map((item, index) => (
                      <Th key={index}>{item}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody className="mc-table-body">
                  {invoice?.items?.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item?.salesId}</Td>
                      <Td>{item?.menuId?.itemName}</Td>
                      <Td>{item?.menuId?.unitPrice}</Td>
                      <Td>{item?.totalPrice}</Td>
                      <Td>{item?.quantity}</Td>
                      <Td>{item?.createdBy?.email}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <Box className="mc-invoice-list-group">
              <List className="mc-invoice-list">
                <Item>
                  <Text as="span" className="title">
                    Subtotal
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
                    {totalAmount}
                  </Text>

                  {/* {invoice?.items?.map((item, index) => (
                        <>
                        {item.totalPrice && (
                            <Text
                            as="span"
                            className={`digit
                            }`}
                          >
                            {item.digit}
                          </Text>
                        )}
                        </>
                        
                    ))} */}
                </Item>
              </List>
            </Box>
            <Text className="mc-invoice-note">
              Before printing a webpage, please ensure that the sidebar is
              closed to avoid any unnecessary content being printed. Simply
              click on the menu icon button located on top of the webpage to
              remove it from the view. This will ensure that only the main
              content of the webpage is printed and save paper and ink in the
              process.
            </Text>
            <Box className="mc-invoice-btns">
              <Anchor
                onClick={() => window.print()}
                icon="print"
                text="print this reciept"
                className="btn btn-dark"
              />
              {/* <Anchor
                onClick={() => handleDownload()}
                icon="download"
                text="download as pdf"
                className="btn btn-success"
              /> */}
            </Box>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
