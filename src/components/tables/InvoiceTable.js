import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Heading,
  Anchor,
  Icon,
  Box,
  Text,
  Input,
  Image,
  Button,
} from "../elements";
import { toDateString } from "../../utils/date";
import axios from "../../axios";

import Loader from "../../pages/master/Loader";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function InvoiceTable({ thead, tbody, loading }) {
  const [alertModal, setAlertModal] = React.useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(tbody);
  }, [tbody]);

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;

    if (name === "allCheck") {
      const checkData = data?.map((item) => {
        return { ...item, isChecked: checked };
      });
      setData(checkData);
    } else {
      const checkData = data?.map((item) =>
        item.name === name ? { ...item, isChecked: checked } : item
      );
      setData(checkData);
    }
  };

  return (
    <Box className="mc-table-responsive">
      <Table className="mc-table">
        <Thead className="mc-table-head primary">
          <Tr>
            <Th>
              <Box className="mc-table-check">
                <Input
                  type="checkbox"
                  name="allCheck"
                  checked={
                    data?.filter((item) => item.isChecked !== true).length < 1
                  }
                  onChange={handleCheckbox}
                />
                <Text>uid</Text>
              </Box>
            </Th>
            {thead.map((item, index) => (
              <Th key={index}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody className="mc-table-body even">
          {loading ? (
            <Loader />
          ) : data?.length === 0 ? (
            <div
              style={{
                padding: "1.5rem",
              }}
            >
              {" "}
              😔 <strong>No record found!</strong>
            </div>
          ) : (
            data?.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <Box className="mc-table-check">
                    <Input
                      type="checkbox"
                      name={item.name}
                      checked={item?.isChecked || false}
                      onChange={handleCheckbox}
                    />
                    <Text>{item?.invoiceId}</Text>
                  </Box>
                </Td>
                <Td>
                  <Box className="mc-table-profile">
                    {/* <Image src={item?.src} alt={item?.alt} /> */}
                    {item?.items?.length > 1 ? (
                      <Text>{`+${item?.items?.length}`} items</Text>
                    ) : (
                      item.items?.map((item, index) => (
                        <Text key={index}>{item?.menuId?.itemName}</Text>
                      ))
                    )}
                  </Box>
                </Td>
                <Td>{item?.totalPrice}</Td>
                {/* <Td>{item?.month}</Td> */}
                <Td>
                  {item?.modeOfPayment?.length > 1 ? (
                    <Text>
                      {`+${item?.modeOfPayment?.length}`} modes of payment
                    </Text>
                  ) : (
                    item?.modeOfPayment?.map((mode, index) => (
                      <Text key={index} className={`mc-table-badge`}>
                        {mode}
                      </Text>
                    ))
                  )}
                </Td>
                <Td>
                  {/* <Image src={item?.src} alt={item?.alt} /> */}
                  {item?.items?.length > 1 ? (
                    <Text>{`+${item?.items?.length}`} statuses</Text>
                  ) : (
                    item.items?.map((item, index) => (
                      <Text
                        className={`mc-table-badge ${item?.status?.variant}`}
                      >
                        {item?.menuId?.status}
                      </Text>
                    ))
                  )}
                </Td>
                <Td>{toDateString(item?.createdAt, true)}</Td>
                <Td>
                  <Box className="mc-table-action">
                    <Anchor
                      title="View"
                      href={`/invoice-details/${item?._id}`}
                      className="material-icons view"
                    >
                      visibility
                    </Anchor>
                    {/* <Anchor
                    title="Download"
                    href="#"
                    className="material-icons download"
                    download
                  >
                    download
                  </Anchor> */}
                    {/* <Button
                    title="Delete"
                    className="material-icons delete"
                    onClick={() => setAlertModal(true)}
                  >
                    delete
                  </Button> */}
                  </Box>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Modal show={alertModal} onHide={() => setAlertModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">Want to delete this invoice?</Text>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setAlertModal(false)}
            >
              nop, close
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => setAlertModal(false)}
            >
              yes, delete
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
