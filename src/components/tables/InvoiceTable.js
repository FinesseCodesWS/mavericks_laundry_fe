import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Heading, Anchor, Icon, Box, Text, Input, Button } from "../elements";
import { toDateString } from "../../utils/date";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "../../axios";
import { useDispatch } from "react-redux";

import Loader from "../../pages/master/Loader";

export default function InvoiceTable({ thead, tbody, loading }) {
  const dispatch = useDispatch()
  const [status, setStatus] = useState("");
  const [deleteId, setDeleteId] = useState("");
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
                    {item?.items?.length > 1 ? (
                      <Text>{`+${item?.items?.length}`} items</Text>
                    ) : (
                      item.items?.map((item, index) => (
                        <Text key={index}>{item?.menuId?.itemName}</Text>
                      ))
                    )}
                  </Box>
                </Td>
                <Td>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item?.totalPrice)}</Td>
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
                  <Text className="text-capitalize">{item?.status}</Text>
                  
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
                    <Anchor
                      title="Edit"
                      className="material-icons edit"
                      onClick={() =>
                        setAlertModal(true, setDeleteId(item?._id))
                      }
                    >
                      edit
                    </Anchor>
                  </Box>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Modal show={alertModal} onHide={() => setAlertModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="edit" />
          <Heading as="h3">Edit</Heading>

          <div className="mb-3">
            <label htmlFor="laundryOptions" className="form-label">
              Laundry Status Options
            </label>
            <select onChange={(e) => setStatus(e.target.value)} className="form-select" id="laundryOptions">
              <option value="">Select an option</option>
              <option value="new">New</option>
              <option value="delivered">Delivered</option>
              <option value="washed">Washed</option>
              <option value="sorted">Sorted</option>
              <option value="ironed">Ironed</option>
              <option value="packaged">Packaged</option>
              <option value="picked up">Picked Up</option>
              <option value="dispatched">Dispatched</option>
            </select>
          </div>

          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => setAlertModal(false)}
            >
              CLose
            </Button>
            <Button
              type="button"
              className="btn btn-success"
              onClick={async () => {
                try {
                  const response = await axios.patch(`/sales/invoices`, {
                    status,
                    invoiceId: deleteId,
                  });
                  setAlertModal(false);
                  dispatch({
                    type: "EDIT_INVOICE",
                    payload: response.data.data
                  })
                  return Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: `You have edited this invoice`,
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
              Save
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
