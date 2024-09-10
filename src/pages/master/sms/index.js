import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import PageLayout from "../../../layouts/PageLayout";
import { CardLayout } from "../../../components/cards";
import { Breadcrumb } from "../../../components";
import data from "../../../data/master/sms.json";
import {
  Anchor,
  Button,
  Heading,
  Box,
  Icon,
  Text,
} from "../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTemplates,
  deleteTemplate,
  fetchSmsHistory,
  createTemplate,
  sendSms,
  sendSmsCategory
} from "../templateService";
import Templates from "./Templates";
import History from "./History";
import Message from "./Message";
import Draft from "./Draft";

const SMSManagementSystem = () => {
  const [templateContact, setTemplateContact] = useState(null)
  const [lastSelectedCustomer, setLastSelectedCustomer] = useState(null);
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("templates");
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [message, setMessage] = useState("");

  const [drafts, setDrafts] = useState([]);

  const dispatch = useDispatch();
  const templates = useSelector((state) => state.sms.templates);
  const smsData = useSelector((state) => state.sms.smsHistory);

  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const savedDraft = localStorage.getItem("smsDrafts");
    if (savedDraft) {
      const draftData = JSON.parse(savedDraft);
      setDrafts(draftData);
    }
  }, [localStorage.getItem("smsDrafts")]);

  useEffect(() => {
    fetchTemplates(dispatch);
  }, [dispatch]);

  useEffect(() => {
    fetchSmsHistory(dispatch, currentPage, itemsPerPage, setCount);
  }, [dispatch, currentPage, itemsPerPage]);

  const defaultTemplates = [
    {
      title: "Newly Registered Users (Within 7 Days)",
      message: "Welcome to Maverick Laundry Services! Enjoy our offer on your first order. Let's get your laundry sparkling clean!",
      category: "New Customer Welcome",
    },
    {
      title: "Users With Active Laundry Being Processed",
      message: "Your laundry order is being processed! We'll keep you updated on its status. Thank you for choosing Maverick Laundry Services.",
      category: "Processed",
    },
    {
      title: "Users Who Have Not Performed A Transaction",
      message: "We miss you! Haven't used our services lately? Enjoy our offer on your next order. Let's get your laundry fresh and clean again.",
      category: "Inactive",
    },
    {
      title: "Male Users",
      message: "Looking for a reliable laundry service? We specialize in specific services for men, e.g., suit cleaning, shirt ironing. Enjoy our offere on your first order.",
      category: "Male",
    },
    {
      title: "Female Users",
      message: "Pamper yourself with our premium laundry services. We offer specific services for women, e.g., delicate fabric care, dress alterations. Enjoy our offer on your first order. ",
      category: "Female",
    },
  ];

  const handleTabSelect = (tab) => setActiveTab(tab);

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

  const handleDeleteDraft = (draftId) => {
    const updatedDrafts = drafts.filter((draft) => draft.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem("smsDrafts", JSON.stringify(updatedDrafts));
    navigate("/sms")
  };

  const handleTemplateSelect = (template) => {
    setMessage(template.message);
    setActiveTab("segmentation");
  };
  

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
            </Breadcrumb>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <ul className="nav nav-tabs mt-3">
              <li className="nav-item">
                <a
                  style={{ cursor: "pointer" }}
                  className={`nav-link cursor-pointer ${
                    activeTab === "templates" ? "active" : ""
                  }`}
                  onClick={() => handleTabSelect("templates")}
                >
                  Templates
                </a>
              </li>
              <li className="nav-item">
                <a
                  style={{ cursor: "pointer" }}
                  className={`nav-link cursor-pointer ${
                    activeTab === "segmentation" ? "active" : ""
                  }`}
                  onClick={() => handleTabSelect("segmentation")}
                >
                  Compose SMS
                </a>
              </li>
              <li className="nav-item">
                <a
                  style={{ cursor: "pointer" }}
                  className={`nav-link cursor-pointer ${
                    activeTab === "draft" ? "active" : ""
                  }`}
                  onClick={() => handleTabSelect("draft")}
                >
                  Draft
                </a>
              </li>
              <li className="nav-item">
                <a
                  style={{ cursor: "pointer" }}
                  className={`nav-link cursor-pointer ${
                    activeTab === "history" ? "active" : ""
                  }`}
                  onClick={() => handleTabSelect("history")}
                >
                  SMS History
                </a>
              </li>
            </ul>

            <div className="tab-content mt-3">
              {/* Templates Tab */}
              {activeTab === "templates" && (
                <Templates
                  defaultTemplates={defaultTemplates}
                  templates={templates}
                  deleteCustomTemplate={deleteCustomTemplate}
                  handleTemplateSelect={handleTemplateSelect}
                />
              )}

              {/* Customer Segmentation Tab */}
              {activeTab === "segmentation" && (
                <Message
                  drafts={drafts}
                  setDrafts={setDrafts}
                  message={message}
                  setMessage={setMessage}
                  templateContact={templateContact}
                  setTemplateContact={setTemplateContact}
                  lastSelectedCustomer={lastSelectedCustomer}
                  setLastSelectedCustomer={setLastSelectedCustomer}
                  createTemplate={createTemplate}
                  sendSms={sendSms}
                  sendSmsCategory={sendSmsCategory}
                  dispatch={dispatch}
                />
              )}

              {/* Draft Tab */}
              {activeTab === "draft" && <Draft drafts={drafts} setActiveTab={setActiveTab} handleDeleteDraft={handleDeleteDraft} navigate={navigate} />}

              {/* SMS History Tab */}
              {activeTab === "history" && (
                <History
                  smsData={smsData}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  count={count}
                  itemsPerPage={itemsPerPage}
                />
              )}
            </div>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default SMSManagementSystem;
