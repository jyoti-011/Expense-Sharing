import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DetailsPage.css";

const DetailsPage = () => {
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
        currency: "INR",
      };
      setGroupDetails(groupData);
    } else {
      navigate("/group-page"); 
    }
  }, [groupId, navigate]);

  const calculateLendingBorrowing = () => {
    if (!groupDetails?.payments || !groupDetails?.members) {
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

    const lending = [];
    const borrowing = [];

    for (const [member, balance] of Object.entries(balances)) {
      if (balance > 0)
        lending.push({
          member,
          sentence: `${member} is lending ${balance.toFixed(2)} ${groupDetails.currency}`,
        });
      else if (balance < 0)
        borrowing.push({
          member,
          sentence: `${member} is borrowing ${(-balance).toFixed(2)} ${groupDetails.currency}`,
        });
    }

    return { lending, borrowing };
  };

  const calculateTotalExpense = () => {
    if (!groupDetails?.payments) return 0;
    return groupDetails.payments.reduce(
      (acc, payment) => acc + (parseFloat(payment.price) || 0),
      0
    );
  };

  const lendingBorrowing = calculateLendingBorrowing();
  const totalGroupExpense = calculateTotalExpense();

  if (!groupDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-page">
      <div className="app-name">Expense Splitter</div>

      <div className="content">
        <div className="lending-borrowing">
          <h3>Lending</h3>
          {lendingBorrowing.lending.length > 0 ? (
            <ul>
              {lendingBorrowing.lending.map((entry, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={entry.sentence}
                    style={{ color: "blue", textAlign: "center" }}
                    readOnly
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No one is lending money.</p>
          )}

          <h3>Borrowing</h3>
          {lendingBorrowing.borrowing.length > 0 ? (
            <ul>
              {lendingBorrowing.borrowing.map((entry, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={entry.sentence}
                    style={{ color: "red", textAlign: "center" }}
                    readOnly
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No one is borrowing money.</p>
          )}
        </div>

        <div className="total-expense">
          <h3>Total Group Expense</h3>
          <p style={{ textAlign: "center" }}>
            {totalGroupExpense.toFixed(2)} {groupDetails.currency}
          </p>
        </div>
      </div>

      <div className="button-row">
        <button onClick={() => navigate("/group-page", { state: { groupId } })}>Back to Group</button>
      </div>
    </div>
  );
};

export default DetailsPage;
