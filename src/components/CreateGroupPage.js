import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateGroupPage.css";

const CreateGroupPage = () => {
  const navigate = useNavigate(); 
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([""]);
  const [currency, setCurrency] = useState("USD");

  const handleGroupNameChange = (e) => setGroupName(e.target.value);

  const handleMemberChange = (index, e) => {
    const newMembers = [...members];
    newMembers[index] = e.target.value;
    setMembers(newMembers);
  };

  const handleAddMember = () => setMembers([...members, ""]);

  const handleRemoveMember = (index) => {
    const newMembers = members.filter((_, idx) => idx !== index);
    setMembers(newMembers);
  };

  const handleSubmit = () => {
    if (!groupName || members.some((member) => !member) || !currency) {
      alert("Please fill in all fields.");
      return;
    }

    const groupData = {
      groupName,
      members,
      currency,
      payments: [],
    };

    const groupId = `group_${Date.now()}`;
    localStorage.setItem(groupId, JSON.stringify(groupData));
    const recentGroups = JSON.parse(localStorage.getItem("recentGroups")) || [];
    localStorage.setItem("recentGroups", JSON.stringify([...recentGroups, groupId]));
    navigate("/group-created", { state: { groupId } });
  };

  const handleAppNameClick = () => {
    navigate("/"); 
  };

  return (
    <div className="create-group">
      <div className="app-name" onClick={handleAppNameClick}> {}
        Expense Splitter
      </div>
      <div className="card">
        <h1>Create a Group</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Group Name:</label>
            <input
              type="text"
              value={groupName}
              onChange={handleGroupNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Members:</label>
            {members.map((member, index) => (
              <div key={index} className="member-input">
                <input
                  type="text"
                  value={member}
                  onChange={(e) => handleMemberChange(index, e)}
                  required
                />
                {members.length > 1 && (
                  <button
                    type="button"
                    className="remove-member-btn"
                    onClick={() => handleRemoveMember(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-member-btn"
              onClick={handleAddMember}
            >
              Add Member
            </button>
          </div>
          <div className="form-group">
            <label>Currency:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <button
            type="submit"
            className="create-group-btn"
            onClick={handleSubmit}
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPage;
