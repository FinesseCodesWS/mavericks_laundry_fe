import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Anchor,
  Heading,
  Box,
  Text,
  Input,
  Image,
  Icon,
  Button,
} from "../elements";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toDateString } from "../../utils/date";

// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function CouponsTable({ thead, tbody }) {
  const navigate = useNavigate();
  const [alertModal, setAlertModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState({});
  const [inventoryId, setInventoryId] = useState("");
  const [quantity, setQuantity] = useState("");

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
      <Table className="mc-table product">
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
          {data?.map((item, index) => (
            <Tr key={index}>
              <Td title={index + 1}>
                <Box className="mc-table-check">
                  <Input
                    type="checkbox"
                    name={item?._id}
                    checked={item?.isChecked || false}
                    onChange={handleCheckbox}
                  />
                  <Text>#{index + 1}</Text>
                </Box>
              </Td>
              <Td>{item?.couponId}</Td>
              <Td>{item?.numberOfTimesUsed}</Td>
              <Td>{item?.type}</Td>
              <Td>{toDateString(item?.expiryDate)}</Td>
              <Td>{item?.amount}</Td>
              <Td>{item?.frequency}</Td>
              <Td>{item?.isExpired?.toString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal show={alertModal} onHide={() => setAlertModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">Want to delete this inventory?</Text>
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
              onClick={async () => {
                try {
                  const response = await axios.delete(
                    `/inventory/top-up/${id}`
                  );
                  Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: `You have successfully deleted this iventory.`,
                  });
                } catch (error) {
                  return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error?.response?.data?.message
                      ? error?.response?.data?.message
                      : "Something went wrong!",
                  });
                }
              }}
            >
              yes, delete
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>

      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="" />
          <Heading as="h3">Inventory</Heading>
          <Text as="p">Edit this inventory?</Text>
          <Modal.Body>
            <Input
              onChange={(e) => setQuantity(e.target.value)}
              type="text"
              name="Quantity"
              value={inventoryId?.quantity}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditModal(false)}
            >
              nop, close
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={async () => {
                try {
                  const response = await axios.patch(`/inventory/top-up`, {
                    inventId: inventoryId?._id,
                    quantity: +quantity,
                  });
                  Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: `You have successfully edited this inventory.`,
                  });
                  setEditModal(false);
                  navigate("/dashboard");
                } catch (error) {
                  return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error?.response?.data?.message
                      ? error?.response?.data?.message
                      : "Something went wrong!",
                  });
                }
              }}
            >
              save changes
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
