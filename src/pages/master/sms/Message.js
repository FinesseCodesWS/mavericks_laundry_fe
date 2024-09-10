import React, { useState, useEffect } from "react";
import Segment from "./Segment";
import { useSelector } from "react-redux";
import { CardLayout } from "../../../components/cards";

const ComposeMessage = ({
  drafts,
  setDrafts,
  message,
  setMessage,
  templateContact,
  setTemplateContact,
  lastSelectedCustomer,
  setLastSelectedCustomer,
  createTemplate,
  sendSms,
  sendSmsCategory,
  dispatch,
}) => {
  const { customers } = useSelector((state) => state.customer);
  const [sender, setSender] = useState("");
  const [recipients, setRecipients] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [customerSegment, setCustomerSegment] = useState([]);
  const [customer, setCustomer] = useState("");
  const [activeTab, setActiveTab] = useState("customers");
  const [currentPage, setCurrentPage] = useState(1);
  const maxCharactersPerPage = [160, 306];
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [category, setCategory] = useState("");
  const [personalizedMessage, setPersonalizedMessage] = useState(message);

  const replaceName = (message, customerName) => {
    if (selectedCustomers.length > 1 || customerSegment.length > 0) {
      return message.replace("[Name]", "Customer");
    }
    return message.replace("[Name]", customerName || "[Name]");
  };

  useEffect(() => {
    const customerName = lastSelectedCustomer?.fullName;
    const updatedMessage = replaceName(message, customerName);
    setPersonalizedMessage(updatedMessage);
  }, [message, lastSelectedCustomer, selectedCustomers, customerSegment]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const draftId = urlParams.get("draft");

    if (draftId && drafts.length > 0) {
      const matchingDraft = drafts.find((draft) => draft.id === draftId);
      if (matchingDraft) {
        setRecipients(matchingDraft.recipients);
        setSelectedCustomers([...matchingDraft.selectedCustomers]);
        setMessage(matchingDraft.message);
      }
    }
  }, [drafts]);

  useEffect(() => {
    if (selectedCustomers?.length > 0) {
      const selectedPhoneNumbers = selectedCustomers?.map((c) => c).join(",");
      setRecipients(selectedPhoneNumbers);
    } else {
      setRecipients("");
    }
  }, [selectedCustomers]);

  const handleInputChange = (event) => {
    const newMessage = event.target.value;
    const totalCharacters = newMessage.length;

    if (totalCharacters <= maxCharactersPerPage[0]) {
      setCurrentPage(1);
    } else if (
      totalCharacters > maxCharactersPerPage[0] &&
      totalCharacters <= maxCharactersPerPage[1]
    ) {
      setCurrentPage(2);
    } else {
      alert("Message exceeds character limit for 2 pages.");
      return;
    }

    setMessage(newMessage);
    setPersonalizedMessage(
      replaceName(newMessage, lastSelectedCustomer?.fullName)
    );
  };

  const charactersLeft =
    maxCharactersPerPage[currentPage - 1] - message?.length;

  const handleSaveTemplate = () => {
    if (message.trim()) {
      const data = {
        category: "66be5578ab8db63ae227ea70",
        message: personalizedMessage,
      };
      createTemplate(dispatch, data);
      alert(`Template saved successfully!`);
      setMessage("");
      setPersonalizedMessage("");
    }
  };

  const handleSaveAsDraft = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const draftId = urlParams.get("draft");

    let updatedDrafts;

    if (draftId) {
      updatedDrafts = drafts.map((draft) => {
        if (draft.id === draftId) {
          return {
            ...draft,
            recipients,
            message,
            selectedCustomers,
            customerSegment,
            updatedAt: new Date().toISOString(),
          };
        }
        return draft;
      });
      alert("Draft updated successfully!");
    } else {
      const newDraft = {
        id: Math.random().toString(36).substring(2, 15),
        recipients,
        message,
        selectedCustomers,
        customerSegment,
        createdAt: new Date().toISOString(),
      };
      updatedDrafts = [...drafts, newDraft];
      alert("Draft saved successfully!");
    }

    setDrafts(updatedDrafts);
    localStorage.setItem("smsDrafts", JSON.stringify(updatedDrafts));
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (recipients?.length > 0) {
      const data = {
        phoneNumbers: recipients.split(",").map((num) => num.trim()),
        message: personalizedMessage,
      };
      sendSms(dispatch, data);
    } else {
      const data = {
        category: customerSegment?.join(""),
        message: personalizedMessage,
      };
      sendSmsCategory(dispatch, data);
    }

    setMessage("");
    setPersonalizedMessage("");
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <CardLayout className="p-4 mb-4">
            <h5 className="mb-3">Compose Message</h5>
            <form>
              <div className="form-group mb-3">
                <label htmlFor="recipients">Recipients</label>
                <textarea
                  className="form-control"
                  id="recipients"
                  placeholder="Numbers (e.g. 08152425622,2347047373782)"
                  rows="3"
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>
                  Total recipients:{" "}
                  {recipients ? recipients?.split(",")?.length : 0}
                </span>
                <span>
                  Recipients from list:{" "}
                  {selectedCustomers?.length + customerSegment?.length}
                </span>
              </div>

              <small className="form-text text-muted mb-3">
                Note: Please send to Nigerian numbers only, international
                numbers will be removed.
              </small>

              <div className="form-group my-3">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  placeholder="Enter your message here"
                  rows="5"
                  value={personalizedMessage}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <div className="d-flex justify-content-between mb-3 px-1">
                  <small className="text-muted">
                    Characters left: {charactersLeft}/
                    {maxCharactersPerPage[currentPage - 1]}
                  </small>
                  <small className="text-muted">Page(s): {currentPage}</small>
                </div>
              </div>
              <div className="form-check my-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="saveAsTemplate"
                  checked={saveAsTemplate}
                  onChange={() => setSaveAsTemplate(!saveAsTemplate)}
                />
                <label className="form-check-label" htmlFor="saveAsTemplate">
                  Save this message as a template
                </label>
              </div>

              {/* {saveAsTemplate && (
                <div className="form-group mb-3">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder="Enter template category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
              )} */}

              {saveAsTemplate && (
                <small className="form-text text-danger fw-bold mb-3">
                  Note: To automatically insert the customer's name, make sure
                  to include <strong>[Name]</strong> somewhere in the message
                  text inside the box above.
                </small>
              )}

              <div className="row mt-1">
                <div className="col-md-3">
                  {!saveAsTemplate ? (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSend}
                    >
                      Send Message
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSaveTemplate}
                    >
                      Save Template
                    </button>
                  )}
                </div>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleSaveAsDraft}
                  >
                    {new URLSearchParams(window.location.search).get("draft")
                      ? "Update Draft"
                      : "Save as Draft"}
                  </button>
                </div>
              </div>
            </form>
          </CardLayout>
        </div>

        <Segment
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          customers={customers}
          setCustomer={setCustomer}
          selectedCustomers={selectedCustomers}
          setSelectedCustomers={setSelectedCustomers}
          customerSegment={customerSegment}
          setCustomerSegment={setCustomerSegment}
          setTemplateContact={setTemplateContact}
          setLastSelectedCustomer={setLastSelectedCustomer}
        />
      </div>
    </div>
  );
};

export default ComposeMessage;
