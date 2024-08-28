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
import { useDispatch, useSelector } from "react-redux";
import { LegendField } from "../fields";
import Loader from "../../pages/master/Loader";

// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function ProductsTable({ thead, tbody, loading }) {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alertModal, setAlertModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState({});
  const [inventoryId, setInventoryId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [removeQuantity, setRemoveQuantity] = useState("");

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
                <Td>{item?.itemName}</Td>
                <Td>{item?.quantity}</Td>
                <Td>{item?.status}</Td>
                {/* <Td>{item?.createdAt}</Td> */}
                <Td>
                  <Box className="mc-table-action">
                    {/* {user?.role === "super admin" && (
                    <Anchor
                      href={`/logs/${item?._id}`}
                      title="View"
                      className="material-icons view"
                    >
                      visibility
                    </Anchor>
                  )} */}
                    <Anchor
                      href="#"
                      onClick={() => setEditModal(true, setInventoryId(item))}
                      title="Edit"
                      className="material-icons edit"
                    >
                      edit
                    </Anchor>
                    <Button
                      title="Delete"
                      className="material-icons delete"
                      onClick={() => setAlertModal(true, setId(item?._id))}
                    >
                      delete
                    </Button>
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
          <Text as="p">Want to remove quantity from this inventory?</Text>
          <Modal.Body>
            <LegendField
              title="Quantity"
              onChange={(e) => setRemoveQuantity(+e.target.value)}
              type="text"
              name="Quantity"
            />
          </Modal.Body>
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
                  const response = await axios.post(`/inventory/remove`, {
                    menuId: id,
                    quantity: removeQuantity,
                  });
                  dispatch({
                    type: "UPDATE_INVENTORY",
                    id: id,
                    payload: response.data.data.menu,
                  });
                  Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: `You have removed the quantity in this inventory.`,
                  });
                  setAlertModal(false);
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
          <Text as="p">Add to this menu inventory?</Text>
          <Modal.Body>
            <LegendField
              title="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
              type="text"
              name="Quantity"
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
                  const response = await axios.post(`/inventory/add`, {
                    menuId: inventoryId?._id,
                    quantity: +quantity,
                  });
                  dispatch({
                    type: "UPDATE_INVENTORY",
                    id: inventoryId?._id,
                    payload: response.data.data.menu,
                  });
                  Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: `You have successfully added to this inventory.`,
                  });
                  setEditModal(false);
                  // navigate("/dashboard");
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
