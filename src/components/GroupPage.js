import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; 
import "./GroupPage.css";
import { FaTrashAlt } from "react-icons/fa"; 

const GroupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state?.groupId; 
  const [groupDetails, setGroupDetails] = useState(null);

  useEffect(() => {
    if (groupId) {
      const groupData = JSON.parse(localStorage.getItem(groupId)) || {
        groupName: "Default Group",
        members: [],
        payments: [],
        currency: "USD",
      };
      setGroupDetails(groupData);
    } else {
      navigate("/create-group"); 
    }
  }, [groupId, navigate]);

  const calculateDebt = () => {
    if (!groupDetails?.payments?.length || !groupDetails?.members?.length) {
      return [];
    }

    const balances = {};
    groupDetails.members.forEach((member) => {
      balances[member] = 0; 
    });

    groupDetails.payments.forEach((payment) => {
      const totalPaid = parseFloat(payment.price) || 0;
      const contributionPerMember = totalPaid / payment.paymentFor.length;

      payment.paymentFor.forEach((member) => {
        balances[member] -= contributionPerMember; 
      });

      balances[payment.payerName] += totalPaid; 
    });

    const debts = [];
    const creditors = [];
    const debtors = [];

    for (const [member, balance] of Object.entries(balances)) {
      if (balance > 0) creditors.push({ member, amount: balance });
      else if (balance < 0) debtors.push({ member, amount: -balance });
    }

    let debtorIndex = 0;
    let creditorIndex = 0;

    while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
      const debt = Math.min(debtors[debtorIndex].amount, creditors[creditorIndex].amount);
      debts.push({
        payer: debtors[debtorIndex].member,
        receiver: creditors[creditorIndex].member,
        amount: debt.toFixed(2),
      });

      debtors[debtorIndex].amount -= debt;
      creditors[creditorIndex].amount -= debt;

      if (debtors[debtorIndex].amount === 0) debtorIndex++;
      if (creditors[creditorIndex].amount === 0) creditorIndex++;
    }

    return debts;
  };

  const handleDelete = (index) => {
    const updatedPayments = groupDetails.payments.filter((_, i) => i !== index);

    const updatedGroup = { ...groupDetails, payments: updatedPayments };
    localStorage.setItem(groupId, JSON.stringify(updatedGroup));
    setGroupDetails(updatedGroup);
  };

  if (!groupDetails) {
    return <div>Loading...</div>;
  }

  const debtSummary = calculateDebt();

  return (
    <div className="group-page">
      {}
      <div className="app-name">
        <Link to="/" className="app-name-link">Expense Splitter</Link>
      </div>

      <div className="group-card">
        <div className="group-details">
          <h1>{groupDetails.groupName}</h1>
          <h3>Members</h3>
          {groupDetails.members?.length > 0 ? (
            <ul>
              {groupDetails.members.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          ) : (
            <p>No members added yet.</p>
          )}

          <div className="payment-history">
            <h3>Payment History</h3>
            {groupDetails.payments?.length > 0 ? (
              <ul>
                {groupDetails.payments.map((payment, index) => (
                  <li key={index}>
                    <strong>{payment.paymentOf}</strong> - {payment.price}{" "}
                    {groupDetails.currency}
                    <span>Payer: {payment.payerName}</span>
                    <span>Payment For: {payment.paymentFor.join(", ")}</span>
                    <div className="edit-delete-btns">
                      <button onClick={() => handleDelete(index)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payments recorded yet.</p>
            )}
          </div>

          <div className="debt-summary">
            <h3>Settled Debts</h3>
            {debtSummary?.length > 0 ? (
              <ul>
                {debtSummary.map((debt, index) => (
                  <li key={index}>
                    <strong>{debt.payer}</strong> owes <strong>{debt.receiver}</strong>{" "}
                    {debt.amount} {groupDetails.currency}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No debts yet to settle.</p>
            )}
          </div>

          <div className="payment-section">
            <p>Register payment records from 'Add a Payment' button:</p>
            <button
              className="add-payment-btn"
              onClick={() => navigate("/add-payment", { state: { groupId } })}
            >
              Add Payment
            </button>
            <button
              className="see-details-btn"
              onClick={() => {
                console.log("Navigating to details with groupId:", groupId);
                navigate("/details", { state: { groupId } });
              }}
            >
              See Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
