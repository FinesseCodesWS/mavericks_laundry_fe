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
import { useDispatch } from "react-redux";
import { LegendField } from "../fields";
import moment from "moment";
import { toDateString } from "../../utils/date";

// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function ProductsTable({ thead, tbody }) {
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
              <Td>{item?.menu?.itemName}</Td>
              <Td>{item?.menu?.quantity}</Td>
              <Td>{item?.addedQuantity}</Td>
              <Td>{item?.time}</Td>
              <Td>{item?.menu?.status}</Td>
              <Td>{toDateString(item?.updatedAt, true)}</Td>
              {/* <Td>{item?.createdAt}</Td> */}
              <Td>{item?.actionBy}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
