Expense Sharing App:
An intuitive web application for splitting and tracking shared expenses among a group of people. This app simplifies managing payments, calculates debts, and ensures transparency in expense sharing.

Table of Contents
1.Features
2.Widgets/Algorithms Used
3.Technologies Used
4.Setup Instructions
5.Usage

1.Features
Group Management: Create, manage, and delete groups of members.
Expense Tracking: Add, edit, or delete payments made within the group.
Debt Calculation: Automatically calculate and display how much each member owes or is owed.
User-Friendly UI: Responsive design with interactive components for seamless user experience.
Persistent Storage: Data is stored locally to retain state across sessions.

2.Widgets/Algorithms Used
Debt Calculation Algorithm:
Determines who owes whom and how much by calculating balances based on payments.

Dropdown and Checkbox Widgets:
Dropdown for selecting the payer and checkboxes for selecting beneficiaries.

Dynamic State Management:
Leveraged React's useState and useEffect hooks for handling state.

Persistent Data Storage:
Utilizes localStorage to store group and payment details.

Validation Algorithm:
Ensures all required fields are filled before allowing payment addition or modification.

Responsive Design:
Styled with CSS to ensure the app is visually appealing across devices.

3.Technologies Used
Frontend:
React.js (with React Router for navigation)
HTML5, CSS3
Icons from react-icons

Other Tools:
canvas-confetti for visual effects on group creation.

4.Setup Instructions
Prerequisites
Node.js and npm installed on your machine.
A code editor like Visual Studio Code.

Steps:
 1.Download the zip file:
 cd expense-sharing-app
 cd frontend
 2.Install dependencies:
 npm install
 3.Start the app:
 npm start
 4.Open the app in your browser at:
 http://localhost:3000

5.Usage
1.Create a Group:
Start by creating a group and adding its members.
2.Add Payments:
Record payments made by group members, including the amount, purpose, and beneficiaries.
3.View Debt Summary:
See how much each member owes or is owed in real-time.
4.Modify Data:
Edit or delete payments as needed.
