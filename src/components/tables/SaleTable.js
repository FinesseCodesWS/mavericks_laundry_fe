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
                    <Text>{index + 1}</Text>
                  </Box>
                </Td>
                <Td>
                  <Box className="mc-table-profile">
                   <Text>{item?._id}</Text>
                  </Box>
                </Td>
                <Td>{item?.salesCount}</Td>
              <Td>{item?.soldItemCount}</Td>
                <Td>{item?.revenue}</Td>
                
                
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
