# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build to dist/
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

React app with no routing or external state management. `App` is the single source of truth — it holds the `transactions` array in `useState` and passes it down to child components.

**Component breakdown:**
- `App` — owns `transactions` state; passes `onAdd` callback to `TransactionForm` and `transactions` to the other two.
- `Summary` (`src/Summary.jsx`) — computes `totalIncome`, `totalExpenses`, and `balance` from the `transactions` prop.
- `TransactionForm` (`src/TransactionForm.jsx`) — owns its own form state; calls `onAdd(transaction)` on submit.
- `TransactionList` (`src/TransactionList.jsx`) — owns its own filter state (`filterType`, `filterCategory`); renders the filtered table.

The `categories` array is defined locally in both `TransactionForm` and `TransactionList` (no shared constant yet).

**Known intentional issue (course material):**
- Transaction #4 ("Freelance Work") is typed as `"expense"` but categorized as `"salary"` — data inconsistency left in intentionally.
- The table has no "Type" column despite type being relevant to display.
