import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Image,
  Input,
  Text,
  Box,
  Icon,
  Button,
  Heading,
  Anchor,
} from "../elements";
import moment from "moment";
import { toDateString } from "../../utils/date";
import Loader from "../../pages/master/Loader";

export default function OrderTable({
  thead,
  tbody,
  loading,
  setActiveTab,
  handleDeleteDraft,
}) {
  const [alertModal, setAlertModal] = React.useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const handleDelete = (id) => {
    setAlertModal(true);
    setId(id);
  };

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
                <Text>s/n</Text>
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
                      name={item._id}
                      checked={item?.isChecked || false}
                      onChange={handleCheckbox}
                    />
                    <Text>{index + 1}</Text>
                  </Box>
                </Td>
                <Td>
                  {item?.data?.recipients &&
                  item?.data?.selectedCustomers?.length === 0
                    ? `Recipients, no customers`
                    : item?.data?.selectedCustomers?.length > 0
                    ? `${item?.data?.selectedCustomers?.length} ${
                        item?.data?.selectedCustomers?.length > 1
                          ? "customers"
                          : "customer"
                      }`
                    : `No data`}
                </Td>
                <Td>{item?.data?.message}</Td>
                <Td>{toDateString(item?.createdAt, true)}</Td>
                <Td>
                  <Box className="mc-table-action">
                    <Anchor
                      href={`/sms?draft=${item?._id}`}
                      title="Edit"
                      className="material-icons edit"
                      onClick={() => setActiveTab("segmentation")}
                    >
                      edit
                    </Anchor>
                    <Button
                      title="Delete"
                      className="material-icons delete"
                      onClick={() => handleDelete(item?._id)}
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
          <Text as="p">Want to delete this draft?</Text>
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
              onClick={() => {
                setAlertModal(false);
                handleDeleteDraft(id);
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
