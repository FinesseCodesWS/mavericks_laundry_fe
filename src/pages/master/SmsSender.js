import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Modal,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import Swal from "sweetalert2";
import PageLayout from "../../layouts/PageLayout";
import { CardLayout, CardHeader } from "../../components/cards";
import { Breadcrumb } from "../../components";
import data from "../../data/master/sms.json";
import { Anchor, Button, Heading, Box, Icon } from "../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTemplates,
  createTemplate,
  deleteTemplate,
  sendSms,
  fetchSmsHistory
} from "./templateService";

const SMSManagementSystem = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateCategory, setTemplateCategory] = useState("");
  const [customerSegment, setCustomerSegment] = useState([]);
  const [message, setMessage] = useState("");
  const [isUnknownCustomer, setIsUnknownCustomer] = useState(false);
  const [customerNumbers, setCustomerNumbers] = useState([""]);
  const [addTemplate, setAddTemplate] = useState(false);

  const dispatch = useDispatch();
  const templates = useSelector((state) => state.sms.templates);
  const smsData = useSelector((state) => state.sms.smsHistory);

  useEffect(() => {
    fetchTemplates(dispatch);
    fetchSmsHistory(dispatch)
  }, [dispatch]);

  const defaultTemplates = [
    {
      title: "Birthday Wishes",
      text: "Happy Birthday! Wishing you a wonderful day!",
      category: "Greeting",
    },
    {
      title: "Holiday Greetings",
      text: "Season's Greetings! Enjoy a wonderful holiday season.",
      category: "Holiday",
    },
  ];

  const handleTabSelect = (tab) => setActiveTab(tab);

  const handleModalClose = () => {
    setShowModal(false);
    setCustomerSegment([]);
    setIsUnknownCustomer(false);
    setCustomerNumbers([""]);
    setTemplateCategory("");
  };

  const handleModalShow = (template) => {
    setSelectedTemplate(template);
    setMessage(template !== "compose" ? template : "");
    setShowModal(true);
  };

  const handleSegmentChange = (segment) => {
    setCustomerSegment((prev) =>
      prev.includes(segment)
        ? prev.filter((s) => s !== segment)
        : [...prev, segment]
    );

    if (segment === "Unknown Customer") {
      setIsUnknownCustomer(!isUnknownCustomer);
      setCustomerNumbers([""]);
    }
  };

  const handleCustomerNumberChange = (index, value) => {
    const updatedNumbers = [...customerNumbers];
    updatedNumbers[index] = value;
    setCustomerNumbers(updatedNumbers);
  };

  const addCustomerNumberField = () => {
    setCustomerNumbers([...customerNumbers, ""]);
  };

  const removeCustomerNumberField = (index) => {
    const updatedNumbers = customerNumbers.filter((_, i) => i !== index);
    setCustomerNumbers(updatedNumbers);
  };

  const addCustomTemplate = () => {
    setAddTemplate(true);
  };

  const reverseCustomTemplate = () => {
    setAddTemplate(false);
  };

  const saveTemplate = () => {
    if (message.trim() && templateCategory.trim()) {
      const data = {
        category: templateCategory,
        message,
      };
      createTemplate(dispatch, data);
      setMessage("");
      setTemplateCategory("");
      reverseCustomTemplate();
      handleModalClose();
    }
  };

  const deleteCustomTemplate = (template) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTemplate(dispatch, template?._id);
        Swal.fire("Deleted!", "Your template has been deleted.", "success");
      }
    });
  };

  const handleSendSMS = () => {
    if (message.trim()) {
        const data = {
          message,
          phoneNumbers: customerNumbers
        };
        sendSms(dispatch, data);
        setMessage("");
        setTemplateCategory("");
        reverseCustomTemplate();
        handleModalClose();
      }
    alert("SMS Sent!");
    handleModalClose();
  };

  const isSendDisabled =
    customerSegment.length === 0 ||
    (isUnknownCustomer &&
      customerNumbers.some((number) => number.length !== 11));

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please select at least one customer segment or enter valid 11-digit phone
      numbers to enable the button.
    </Tooltip>
  );

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={data?.pageTitle}>
              {data?.breadcrumb.map((item, index) => (
                <li key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </li>
              ))}

              <span className="d-inline-block">
                <Button
                  className="btn btn-primary"
                  onClick={() => handleModalShow("compose")}
                >
                  Compose SMS
                </Button>
              </span>
            </Breadcrumb>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <ul className="nav nav-tabs mt-3">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "templates" ? "active" : ""
                  }`}
                  onClick={() => handleTabSelect("templates")}
                  href="#"
                >
                  Templates
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "segmentation" ? "active" : ""
                  }`}
                  onClick={() => handleTabSelect("segmentation")}
                  href="#"
                >
                  Customer Segmentation
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "history" ? "active" : ""
                  }`}
                  onClick={() => handleTabSelect("history")}
                  href="#"
                >
                  SMS History
                </a>
              </li>
            </ul>

            <div className="tab-content mt-3">
              {/* Templates Tab */}
              {activeTab === "templates" && (
                <div className="row">
                  {defaultTemplates.map((template, index) => (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleModalShow(template.text)}
                      className="col-md-4"
                      key={index}
                    >
                      <CardLayout className="mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{template.title}</h5>
                          <p className="card-text">{template.text}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              {template.category}
                            </small>
                          </p>
                        </div>
                      </CardLayout>
                    </div>
                  ))}

                  {templates?.map((template, index) => (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleModalShow(template.message)}
                      className="col-md-4"
                      key={index}
                    >
                      <CardLayout className="mb-3 cursor-pointer">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div className="card-body">
                            <h5 className="card-title">Template {index + 1}</h5>
                            <p className="card-text">{template.message}</p>
                            <p className="card-text">
                              <small className="text-muted">
                                {template?.category?.name}
                              </small>
                            </p>
                          </div>
                          <Button
                            className="btn btn-danger"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCustomTemplate(template);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardLayout>
                    </div>
                  ))}
                </div>
              )}

              {/* Customer Segmentation Tab */}
              {activeTab === "segmentation" && (
                <div className="row">
                  <div className="col">
                    <CardLayout className="mb-3">
                      <div className="card-header mb-3">
                        Select Customer Segments
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="form-group">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="newCustomers"
                                onChange={() =>
                                  handleSegmentChange("new customers")
                                }
                                checked={customerSegment.includes(
                                  "new customers"
                                )}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="newCustomers"
                              >
                                Newly Registered Users (Within 7 Days)
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="activeLaundry"
                                onChange={() =>
                                  handleSegmentChange("active laundry")
                                }
                                checked={customerSegment.includes(
                                  "active laundry"
                                )}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="activeLaundry"
                              >
                                Users With Active Laundry Being Processed
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="zeroTransaction"
                                onChange={() =>
                                  handleSegmentChange("zero transaction")
                                }
                                checked={customerSegment.includes(
                                  "zero transaction"
                                )}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="zeroTransaction"
                              >
                                Users Who Have Not Performed A Transaction
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="male"
                                onChange={() =>
                                  handleSegmentChange("male")
                                }
                                checked={customerSegment.includes(
                                  "male"
                                )}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="male"
                              >
                                All Male
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="female"
                                onChange={() =>
                                  handleSegmentChange("female")
                                }
                                checked={customerSegment.includes(
                                  "female"
                                )}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="female"
                              >
                                All Female
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="unknownCustomer"
                                onChange={() =>
                                  handleSegmentChange("Unknown Customer")
                                }
                                checked={isUnknownCustomer}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="unknownCustomer"
                              >
                                Unknown Customer
                              </label>
                            </div>
                          </div>
                          {isUnknownCustomer && (
                            <div className="form-group my-3">
                              <label htmlFor="customerNumber">
                                Enter Customer's Phone Numbers
                              </label>
                              {customerNumbers.map((number, index) => (
                                <div className="input-group mb-2" key={index}>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={number}
                                    onChange={(e) =>
                                      handleCustomerNumberChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                    placeholder={`Phone number ${index + 1}`}
                                  />
                                  <div className="input-group-append">
                                    {index > 0 && (
                                      <Button
                                        className="btn btn-danger"
                                        variant="outline-secondary"
                                        onClick={() =>
                                          removeCustomerNumberField(index)
                                        }
                                      >
                                        Remove
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                              <Button
                                className="btn btn-primary"
                                variant="primary"
                                onClick={addCustomerNumberField}
                              >
                                Add Another Number
                              </Button>
                            </div>
                          )}
                        </form>
                      </div>
                    </CardLayout>
                  </div>
                </div>
              )}

              {/* SMS History Tab */}
              {activeTab === "history" && (
  <div className="row">
    <div className="col">
      <CardLayout className="mb-3">
      <CardHeader title="SMS History"></CardHeader>
        <div className="card-body">
          {smsData?.length > 0 ? (
            <ul className="list-group">
              {smsData.map((data, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1">{data.message}</p>
                    <small className="text-muted">
                      Sent to {data.recipients?.length || 0} {data.recipients?.length === 1 ? 'person' : 'people'}
                    </small>
                  </div>
                  <small className="text-muted">
                    {new Date(data.createdAt).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted">No SMS history available.</p>
          )}
        </div>
      </CardLayout>
    </div>
  </div>
)}

            </div>
          </CardLayout>
        </Col>
      </Row>

      {/* Modal for composing SMS */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Box className="mc-alert-modal">
          <Icon type="" />
          <Heading as="h3">
            {selectedTemplate === "compose"
              ? "Compose SMS"
              : addTemplate
              ? "Save Template"
              : selectedTemplate}
          </Heading>
          <Modal.Body>
            <Form>
              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
              {addTemplate && (
                  <Form.Group controlId="templateCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter category"
                      value={templateCategory}
                      onChange={(e) => setTemplateCategory(e.target.value)}
                    />
                  </Form.Group>
              )}
              <Button
                variant="primary"
                className="btn btn-info my-3"
                onClick={
                  addTemplate === false
                    ? addCustomTemplate
                    : reverseCustomTemplate
                }
              >
                {addTemplate ? "Go Back" : "Save As Template?"}
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={handleModalClose}
            >
              Close
            </Button>
            {addTemplate ? (
              <Button
                type="button"
                className="btn btn-primary"
                onClick={saveTemplate}
              >
                {"Save template"}
              </Button>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={isSendDisabled ? renderTooltip : <></>}
              >
                <Button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSendSMS}
                  disabled={isSendDisabled}
                  style={isSendDisabled ? { pointerEvents: "none" } : {}}
                >
                  {"Send SMS"}
                </Button>
              </OverlayTrigger>
            )}
          </Modal.Footer>
        </Box>
      </Modal>
    </PageLayout>
  );
};

export default SMSManagementSystem;
