import React, { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const addTransaction = () => {
    if (!amount || !category) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      amount: Number(amount),
      category,
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setCategory("");
  };

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  const categorySummary = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => {
      acc[curr.category] =
        (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  return (
    <div className="container">
      <h1>💰 Daily Expense Analytics Dashboard</h1>

      <div className="form-section">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Expense</option>
          <option>Income</option>
        </select>

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button onClick={addTransaction}>
          Add Transaction
        </button>
      </div>

      <div className="summary">
        <div className="card income">
          <h3>Total Income</h3>
          <p>₹{income}</p>
        </div>

        <div className="card expense">
          <h3>Total Expenses</h3>
          <p>₹{expenses}</p>
        </div>

        <div className="card balance">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>
      </div>

      <div className="transactions">
        <h2>Transaction History</h2>

        {transactions.length === 0 ? (
          <p>No transactions added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.type}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="analytics">
        <h2>Category-wise Expense Summary</h2>

        {Object.keys(categorySummary).length === 0 ? (
          <p>No expense data available.</p>
        ) : (
          <ul>
            {Object.entries(categorySummary).map(
              ([category, amount]) => (
                <li key={category}>
                  <strong>{category}</strong> : ₹{amount}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;