import { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

const categoryMeta = {
  food:          { label: "Food",          icon: "🍔" },
  housing:       { label: "Housing",       icon: "🏠" },
  utilities:     { label: "Utilities",     icon: "⚡" },
  transport:     { label: "Transport",     icon: "🚗" },
  entertainment: { label: "Entertainment", icon: "🎬" },
  salary:        { label: "Salary",        icon: "💼" },
  other:         { label: "Other",         icon: "📦" },
};

function CategoryBadge({ category }) {
  const meta = categoryMeta[category] || { label: category, icon: "📦" };
  return (
    <span className={`badge badge-${category}`}>
      {meta.icon} {meta.label}
    </span>
  );
}

function TypeBadge({ type }) {
  return (
    <span className={`badge badge-${type}`}>
      {type === 'income' ? '📈 Income' : '📉 Expense'}
    </span>
  );
}

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filtered = transactions;
  if (filterType !== "all") {
    filtered = filtered.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filtered = filtered.filter(t => t.category === filterCategory);
  }

  const fmt = (n) =>
    parseFloat(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="card">
      <div className="card-title">📋 Transactions</div>

      <div className="filters">
        <select
          className="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">📈 Income</option>
          <option value="expense">📉 Expense</option>
        </select>

        <select
          className="filter-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {categoryMeta[cat].icon} {categoryMeta[cat].label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          No transactions match your filters.
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td style={{ color: '#94a3b8', fontSize: 13 }}>{t.date}</td>
                  <td style={{ fontWeight: 500 }}>{t.description}</td>
                  <td><TypeBadge type={t.type} /></td>
                  <td><CategoryBadge category={t.category} /></td>
                  <td className={`td-amount ${t.type}`}>
                    {t.type === "income" ? "+" : "−"}${fmt(t.amount)}
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => {
                        if (window.confirm('Delete this transaction?')) onDelete(t.id);
                      }}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList
