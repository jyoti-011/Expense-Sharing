import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddPaymentPage.css";

const AddPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { payment, paymentIndex, groupId } = location.state || {}; 

  const [groupDetails, setGroupDetails] = useState(null);
  const [payerName, setPayerName] = useState("");
  const [paymentOf, setPaymentOf] = useState("");
  const [paymentFor, setPaymentFor] = useState([]);
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (groupId) {
      const groupData = JSON.parse(localStorage.getItem(groupId));
      if (groupData) {
        setGroupDetails(groupData);
      } else {
        alert("Group data not found!");
        navigate("/group-page");
      }
    } else {
      alert("Invalid group ID!");
      navigate("/group-page");
    }

    if (payment) {
      setPayerName(payment.payerName);
      setPaymentOf(payment.paymentOf);
      setPrice(payment.price);
      setPaymentFor(payment.paymentFor);
    }
  }, [payment, groupId, navigate]);

  const handlePaymentForChange = (member) => {
    setPaymentFor((prev) =>
      prev.includes(member)
        ? prev.filter((item) => item !== member)
        : [...prev, member]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!payerName.trim() || !paymentOf.trim() || !price || paymentFor.length === 0) {
      alert("Please fill out all fields and select at least one member.");
      return;
    }

    const newPayment = {
      payerName: payerName.trim(),
      paymentOf: paymentOf.trim(),
      price: parseFloat(price).toFixed(2),
      paymentFor,
    };

    const updatedGroup = { ...groupDetails };

    if (paymentIndex !== undefined) {
      updatedGroup.payments[paymentIndex] = newPayment;
    } else {
      updatedGroup.payments = [...(groupDetails.payments || []), newPayment];
    }

    localStorage.setItem(groupId, JSON.stringify(updatedGroup));
    alert(payment ? "Payment updated!" : "Payment added!");
    navigate("/group-page", { state: { groupId } });
  };

  if (!groupDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="add-payment-page">
      <div className="app-name">Expense Splitter</div>
      <h2>{payment ? "Edit Payment" : "Add Payment"}</h2>
      <div className="payment-form">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Payer's Name</label>
            <select
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
              required
            >
              <option value="" disabled>Select Payer</option>
              {groupDetails.members.map((member, index) => (
                <option key={index} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>Payment Of</label>
            <input
              type="text"
              value={paymentOf}
              onChange={(e) => setPaymentOf(e.target.value)}
              placeholder="Flight...."
              required
            />
          </div>

          <div className="form-field">
            <label>Price</label>
            <div className="price-field">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter amount"
                required
              />
              <span className="currency-symbol">
                {groupDetails.currency || "USD"}
              </span>
            </div>
          </div>

          <div className="form-field">
            <label>Payment For</label>
            <div className="checkbox-group">
              {groupDetails.members.map((member, index) => (
                <div key={index} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`paymentFor-${member}`}
                    checked={paymentFor.includes(member)}
                    onChange={() => handlePaymentForChange(member)}
                  />
                  <label htmlFor={`paymentFor-${member}`}>{member}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit">
              {payment ? "Save Changes" : "Add Payment"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/group-page", { state: { groupId } })}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentPage;
