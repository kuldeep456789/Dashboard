# Finance Dashboard UI

A responsive frontend finance dashboard built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Project Objective
This project demonstrates frontend skills for a finance dashboard assignment:
- clear information hierarchy and UI design
- modular component structure
- role-based UI behavior (frontend simulated)
- charts/insights from mock data
- responsive behavior across mobile/tablet/desktop

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4 + custom global CSS
- Context API for app state

## Features Implemented

### 1. Dashboard Overview
- Summary cards: Total Balance, Monthly Income, Monthly Expenses
- Time-based visualization: Balance trend line chart (interactive hover tooltip)
- Category visualization: Spending breakdown ring chart + legend

### 2. Transactions Section
- Transaction table with date, amount, category, type, and payment method
- Filter tabs: All, Income, Expenses
- Search input for merchant/category/method/date/amount
- Sort dropdown:
  - Newest first
  - Oldest first
  - Highest amount
  - Lowest amount
- Empty-state message for no matching results

### 3. Basic Role-Based UI (Frontend Simulated)
- Role switcher in top header: Admin / Viewer
- Viewer restrictions are simulated in UI behavior:
  - Add Transaction action blocked for Viewer
  - Profile editing and certain controls shown/disabled by role

### 4. Insights Section
- Monthly comparison chart
- Explicit highest spending category indicator
- Additional observations (growth streak, alert cards, predictive CTA)

### 5. State Management
Context-based state management for:
- Role (`RoleContext`)
- Layout/sidebar collapse (`LayoutContext`)
- Theme mode + localStorage persistence (`ThemeContext`)
- Toast notifications (`NotificationContext`)

Local component state handles:
- transactions filters/search/sort
- settings notification toggles
- chart hover interactions

### 6. UI/UX
- Responsive layout for mobile, tablet, and desktop
- Fixed sidebar on desktop and mobile bottom navigation on smaller screens
- Clean interaction feedback (hover/focus/tooltips)
- No-data handling in transactions section

## Project Structure
```text
src/
  app/
    page.tsx
    transactions/page.tsx
    insights/page.tsx
    settings/page.tsx
    layout.tsx
    globals.css
  components/
    TopHeader.tsx
    Sidebar.tsx
    MobileNav.tsx
    TopBar.tsx
    BarChart.tsx
    PortfolioChart.tsx
    DoughnutChart.tsx
    AppLayoutHandler.tsx
  context/
    RoleContext.tsx
    LayoutContext.tsx
    ThemeContext.tsx
    NotificationContext.tsx
```

## Run Locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Build & Lint
```bash
npm run lint
npm run build
```

## Notes
- Data is currently mock/static (no backend required for this assignment).
- The dashboard is intentionally frontend-focused and demonstrates interaction and state handling quality.
