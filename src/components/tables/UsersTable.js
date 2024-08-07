import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Button,
  Image,
  Input,
  Text,
  Box,
  Icon,
  Anchor,
  Option,
  Heading,
} from "../elements";
import userInfo from "../../data/master/userList.json";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axios";
import moment from "moment";
import { toDateString } from "../../utils/date";
// ALERT
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function UsersTable({ thead, tbody }) {
  const user = useSelector((state) => state.user.user);
  const [data, setData] = useState([]);
  const [userData, setUserData] = React.useState({});
  const [editModal, setEditModal] = React.useState(false);
  const [blockModal, setBlockModal] = React.useState(false);
  const [id, setID] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/staff/${id}`);
      setBlockModal(false);
      dispatch({
        type: "DELETE_STAFF",
        payload: id,
      });
      return Swal.fire({
        icon: "success",
        title: "Success",
        text: `You have deleted this staff.`,
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
  };

  const handleStatus = async (id) => {
    try {
      const response = await axios.post("/staff/status", {
        status,
        staff_id: id,
      });
      setEditModal(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Profile status updated!`,
      });
    } catch (error) {
      setEditModal(false);
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong!",
      });
    }
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
              <Td title="id">
                <Box className="mc-table-check">
                  <Input
                    type="checkbox"
                    name={item.name}
                    checked={item?.isChecked || false}
                    onChange={handleCheckbox}
                  />
                  <Text>#{index + 1}</Text>
                </Box>
              </Td>
              <Td title={item?.email}>
                <Text>{item?.email ? item?.email : "PROFILE NOT UPDATED"}</Text>
              </Td>
              <Td title={item?._id}>{item?._id}</Td>
              <Td title={item?.phoneNumber}>{item?.phoneNumber}</Td>
              <Td title={item?.role}>{item?.role}</Td>
              <Td title={item?.createdAt}>
                {toDateString(item?.createdAt, true)}
              </Td>
              <Td>
                <Box className="mc-table-action">
                  <Anchor
                    href={`/staff-profile/${item?._id}`}
                    title="View"
                    className="material-icons view"
                  >
                    visibility
                  </Anchor>
                  {user?.role === "super admin" && (
                    <Button
                      title="Edit"
                      className="material-icons edit"
                      onClick={() => setEditModal(true, setUserData(item))}
                    >
                      edit
                    </Button>
                  )}
                  {user?.role === "super admin" && (
                    <Button
                      title="Delete"
                      className="material-icons block"
                      onClick={() => {
                        setBlockModal(true);
                        setID(item?._id);
                      }}
                    >
                      block
                    </Button>
                  )}
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal
        show={editModal}
        onHide={() => setEditModal(false, setUserData({}))}
      >
        <Box className="mc-user-modal">
          <Image src={userData.src} alt={userData?.alt} />
          <Heading as="h4">{userData?.first_name}</Heading>
          <Text as="p">{userData?.email}</Text>
          <Form.Group className="form-group inline mb-4">
            <Form.Label>status</Form.Label>
            <Form.Select onChange={(e) => setStatus(e.target.value)}>
              <Option>Select Option</Option>
              <Option value="enable">enable</Option>
              <Option value="disable">disable</Option>
            </Form.Select>
          </Form.Group>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditModal(false)}
            >
              close popup
            </Button>
            <Button
              type="button"
              className="btn btn-success"
              onClick={() => handleStatus(userData?._id)}
            >
              save Changes
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>

      <Modal show={blockModal} onHide={() => setBlockModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">Want to delete this staff's account?</Text>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setBlockModal(false)}
            >
              nop, close
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete()}
            >
              yes, delete
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
