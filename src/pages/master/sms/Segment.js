import React, { useState, useEffect } from "react";
import { CardLayout } from "../../../components/cards";

const Segment = ({
  activeTab,
  handleTabClick,
  customers,
  selectedCustomers,
  setSelectedCustomers,
  customerSegment,
  setCustomerSegment,
  setTemplateContact,
  setLastSelectedCustomer
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [areAllSelected, setAreAllSelected] = useState(false);

  // Filter customers based on searchTerm
  const filteredCustomers = customers?.filter((customer) =>
    customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedCustomers.length > 0) {
      const selectedCustomer = customers.find(
        (customer) => customer.phoneNumber === selectedCustomers[0]
      );
      setLastSelectedCustomer(selectedCustomer);
    } else {
      setLastSelectedCustomer(null);
    }
  }, [selectedCustomers, customers]);

  useEffect(() => {
    setAreAllSelected(
      filteredCustomers.length > 0 && filteredCustomers.every((customer) =>
        selectedCustomers.includes(customer.phoneNumber)
      )
    );
  }, [selectedCustomers, filteredCustomers]);

  const handleCustomerClick = (customerPhoneNumber) => {
    const isSelected = selectedCustomers.includes(customerPhoneNumber);
    const updatedSelectedCustomers = isSelected
      ? selectedCustomers.filter((c) => c !== customerPhoneNumber)
      : [...selectedCustomers, customerPhoneNumber];
    setSelectedCustomers(updatedSelectedCustomers);

    if (!isSelected) {
      if (updatedSelectedCustomers.length === 0) {
        setLastSelectedCustomer(null);
      }
    } else {
      const selectedCustomer = customers.find(
        (customer) => customer.phoneNumber === customerPhoneNumber
      );
      setLastSelectedCustomer(selectedCustomer);
    }
  };

  const handleSegmentChange = (segment) => {
    if (customerSegment.includes(segment)) {
      setCustomerSegment([]);
    } else {
      setCustomerSegment([segment]);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTabClickWithClear = (tab) => {
    if (tab === "customers") {
      setCustomerSegment([]);
    } else if (tab === "categories") {
      setSelectedCustomers([]);
    }
    handleTabClick(tab);
  };

  // Toggle select/unselect all customers
  const handleToggleSelectAll = () => {
    if (areAllSelected) {
      setSelectedCustomers([]);
    } else {
      const allCustomerPhones = filteredCustomers.map((customer) => customer.phoneNumber);
      setSelectedCustomers(allCustomerPhones);
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <CardLayout className="shadow-sm border-0 p-4">
        <div className="alert alert-info mb-3">
          You can only select from either 'Customers' or 'Categories', not both.
        </div>
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`p-3 nav-link ${
                activeTab === "customers" ? "active" : ""
              }`}
              onClick={() => handleTabClickWithClear("customers")}
              disabled={customerSegment.length > 0}
              style={{
                borderBottom:
                  activeTab === "customers" ? "2px solid #007bff" : "none",
              }}
            >
              Customers
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`p-3 nav-link ${
                activeTab === "categories" ? "active" : ""
              }`}
              onClick={() => handleTabClickWithClear("categories")}
              disabled={selectedCustomers?.length > 0}
              style={{
                borderBottom:
                  activeTab === "categories" ? "2px solid #007bff" : "none",
              }}
            >
              Categories
            </button>
          </li>
        </ul>

        {activeTab === "customers" && (
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="mt-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={handleToggleSelectAll}
              >
                {areAllSelected ? "Unselect All" : "Select All"}
              </button>
            </div>
          </div>
        )}

        <div className="tab-content">
          <div
            className={`tab-pane fade ${
              activeTab === "customers" ? "show active" : ""
            }`}
          >
            <div className="customer-list">
              {filteredCustomers?.length > 0 ? (
                filteredCustomers?.map((customer, index) => {
                  return (
                    <div
                      key={index}
                      className={`d-flex py-2 px-3 mb-2 rounded ${
                        selectedCustomers?.includes(customer.phoneNumber)
                          ? "bg-light"
                          : ""
                      }`}
                      style={{
                        border: "1px solid #e9ecef",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setTemplateContact(customer);
                        handleCustomerClick(customer.phoneNumber);
                      }}
                    >
                      <input
                        type="checkbox"
                        className="me-3"
                        checked={selectedCustomers?.includes(customer.phoneNumber)}
                        onChange={() => {
                          setTemplateContact(customer);
                          handleCustomerClick(customer.phoneNumber);
                        }}
                      />
                      <span className="customer-name">
                        {customer?.fullName}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p>No customers found</p>
              )}
            </div>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "categories" ? "show active" : ""
            }`}
          >
            <form>
              <div className="form-group">
                <div
                  className={`d-flex py-2 px-3 mb-2 rounded ${
                    customerSegment?.includes("new customers") ? "bg-light" : ""
                  }`}
                  style={{
                    border: "1px solid #e9ecef",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "10px",
                    flexShrink: 0,
                  }}
                  onClick={() => handleSegmentChange("new customers")}
                >
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="newCustomers"
                    checked={customerSegment?.includes("new customers")}
                    onChange={() => handleSegmentChange("new customers")}
                  />
                  <label className="form-check-label" htmlFor="newCustomers">
                    Newly Registered Users (Within 7 Days)
                  </label>
                </div>
                <div
                  className={`d-flex py-2 px-3 mb-2 rounded ${
                    customerSegment?.includes("active laundry")
                      ? "bg-light"
                      : ""
                  }`}
                  style={{
                    border: "1px solid #e9ecef",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "10px",
                    flexShrink: 0,
                  }}
                  onClick={() => handleSegmentChange("active laundry")}
                >
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="activeLaundry"
                    checked={customerSegment.includes("active laundry")}
                    onChange={() => handleSegmentChange("active laundry")}
                  />
                  <label className="form-check-label" htmlFor="activeLaundry">
                    Users With Active Laundry Being Processed
                  </label>
                </div>
                <div
                  className={`d-flex py-2 px-3 mb-2 rounded ${
                    customerSegment?.includes("zero transaction")
                      ? "bg-light"
                      : ""
                  }`}
                  style={{
                    border: "1px solid #e9ecef",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "10px",
                    flexShrink: 0,
                  }}
                  onClick={() => handleSegmentChange("zero transaction")}
                >
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="zeroTransaction"
                    checked={customerSegment.includes("zero transaction")}
                    onChange={() => handleSegmentChange("zero transaction")}
                  />
                  <label className="form-check-label" htmlFor="zeroTransaction">
                    Users Who Have Not Performed A Transaction
                  </label>
                </div>
                <div
                  className={`d-flex py-2 px-3 mb-2 rounded ${
                    customerSegment?.includes("male") ? "bg-light" : ""
                  }`}
                  style={{
                    border: "1px solid #e9ecef",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "10px",
                    flexShrink: 0,
                  }}
                  onClick={() => handleSegmentChange("male")}
                >
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="male"
                    checked={customerSegment.includes("male")}
                    onChange={() => handleSegmentChange("male")}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male Users
                  </label>
                </div>
                <div
                  className={`d-flex py-2 px-3 mb-2 rounded ${
                    customerSegment?.includes("female") ? "bg-light" : ""
                  }`}
                  style={{
                    border: "1px solid #e9ecef",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "10px",
                    flexShrink: 0,
                  }}
                  onClick={() => handleSegmentChange("female")}
                >
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id="female"
                    checked={customerSegment.includes("female")}
                    onChange={() => handleSegmentChange("female")}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female Users
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default Segment;
