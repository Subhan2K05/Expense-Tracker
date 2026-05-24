function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const fmt = (n) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

  return (
    <div className="summary">
      <div className="summary-card">
        <div className="summary-icon income">💵</div>
        <div className="summary-info">
          <h3>Total Income</h3>
          <p className="income-amount">{fmt(totalIncome)}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon expense">💸</div>
        <div className="summary-info">
          <h3>Total Expenses</h3>
          <p className="expense-amount">{fmt(totalExpenses)}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon balance">⚖️</div>
        <div className="summary-info">
          <h3>Balance</h3>
          <p className={`balance-amount ${balance >= 0 ? 'balance-positive' : 'balance-negative'}`}>
            {fmt(balance)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Summary
