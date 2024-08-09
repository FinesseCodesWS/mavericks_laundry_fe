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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../../axios";

import Loader from "../../pages/master/Loader";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function ProductsTable({ thead, tbody, loading }) {
  const [alertModal, setAlertModal] = useState(false);
  const [data, setData] = useState([]);
  const [base64, setBase64] = useState("");
  const [array, setArray] = useState(new Array(100000).fill("72"));
  const [isConverting, setIsConverting] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // useEffect(() => {
  //   if (isConverting) {
  //     const result = array.join("");
  //     const base64Encoded = btoa(result);
  //     setBase64(base64Encoded);
  //     setIsConverting(false);
  //   }
  // }, [array, isConverting]);

  // function handleConvert() {
  //   setArray(new Array(100000).fill("72"));
  //   setIsConverting(true);
  // }

  return (
    <Box className="mc-table-responsive">
      <Table className="mc-table product">
        <Thead className="mc-table-head primary">
          <Tr>
            
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
                  <Box className="mc-table-product md">
                    {/* <Image src="" alt={item?.category} /> */}
                    <Box className="mc-table-group">
                      <Heading as="h6">{item?.itemName}</Heading>
                      {/* <Text>{ item.descrip }</Text> */}
                    </Box>
                  </Box>
                </Td>
                <Td>{item?.category}</Td>
                <Td>
                  <Box className="mc-table-price">
                    {/* <del>{ item.price.previous }</del> */}
                    <Text>{item?.unitPrice}</Text>
                  </Box>
                </Td>
                {/* <Td>{item?.quantity}</Td> */}
                {/* <Td>{ item.order }</Td> */}
                {/* <Td>{ item.sales }</Td> */}
                <Td>
                  <Box className="mc-table-action">
                    <Anchor
                      href={`/product-view/${item?._id}`}
                      title="View"
                      className="material-icons view"
                    >
                      visibility
                    </Anchor>
                    <Anchor
                      href={`/product-upload/${item?._id}`}
                      title="Edit"
                      className="material-icons edit"
                    >
                      edit
                    </Anchor>
                    <Button
                      title="Delete"
                      className="material-icons delete"
                      onClick={() =>
                        setAlertModal(true, setDeleteId(item?._id))
                      }
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
          <Text as="p">Want to delete this product?</Text>
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
                  const response = await axios.delete(`/menu/list/${deleteId}`);
                  setAlertModal(false);
                  dispatch({
                    type: "DELETE_MENU",
                    payload: deleteId,
                  });
                  return Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: `You have deleted this menu`,
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
    </Box>
  );
}
