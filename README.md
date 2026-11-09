# 🧺 Laundry Management System

A full-stack, modular Laundry Management System designed for laundromats, dry cleaners, and on-demand laundry services.

---

## 📁 System Architecture & Directory Structure

```text
laundry-system/
├── backend/
│   ├── src/
│   │   ├── app.js                  # Express app setup (middleware, routes)
│   │   ├── server.js               # Starts the HTTP server
│   │   ├── config/
│   │   │   ├── env.js              # Loads and validates environment variables
│   │   │   └── db.js               # PostgreSQL connection pool (pg)
│   │   ├── modules/
│   │   │   ├── auth/               # User authentication & registration
│   │   │   │   ├── auth.routes.js
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.service.js
│   │   │   │   ├── auth.repository.js
│   │   │   │   ├── auth.validation.js
│   │   │   │   └── index.js
│   │   │   ├── catalog/            # Laundry services & pricing
│   │   │   │   ├── catalog.routes.js
│   │   │   │   ├── catalog.controller.js
│   │   │   │   ├── catalog.service.js
│   │   │   │   ├── catalog.repository.js
│   │   │   │   ├── catalog.validation.js
│   │   │   │   └── index.js
│   │   │   ├── orders/             # Order creation, history & timeline
│   │   │   │   ├── orders.routes.js
│   │   │   │   ├── orders.controller.js
│   │   │   │   ├── orders.service.js
│   │   │   │   ├── orders.repository.js
│   │   │   │   ├── orders.validation.js
│   │   │   │   └── index.js
│   │   │   ├── delivery/           # Delivery staff assignment & logistics
│   │   │   │   ├── delivery.routes.js
│   │   │   │   ├── delivery.controller.js
│   │   │   │   ├── delivery.service.js
│   │   │   │   ├── delivery.repository.js
│   │   │   │   ├── delivery.validation.js
│   │   │   │   └── index.js
│   │   │   └── admin/              # Dashboard metrics & administrative management
│   │   │       ├── admin.routes.js
│   │   │       ├── admin.controller.js
│   │   │       ├── admin.service.js
│   │   │       └── index.js
│   │   ├── shared/
│   │   │   ├── middleware/
│   │   │   │   ├── authenticate.js # JWT verification
│   │   │   │   ├── authorize.js    # Role-based access control
│   │   │   │   ├── validate.js     # Request schema validation
│   │   │   │   └── errorHandler.js # Global error handler
│   │   │   ├── utils/
│   │   │   │   ├── AppError.js     # Operational error class
│   │   │   │   └── asyncHandler.js # Async wrapper for controllers
│   │   │   └── constants/
│   │   │       └── orderStatus.js  # Order & delivery status enums
│   │   └── routes.js               # Mounts module routes under /api
│   ├── db/
│   │   ├── migrations/             # Numbered SQL migration files
│   │   │   ├── 001_create_users.sql
│   │   │   ├── 002_create_services.sql
│   │   │   ├── 003_create_orders.sql
│   │   │   ├── 004_create_order_items.sql
│   │   │   ├── 005_create_order_status_history.sql
│   │   │   └── 006_create_delivery_assignments.sql
│   │   └── seeds/                  # Seed data (admin user, default services)
│   │       └── 001_seed_data.sql
│   ├── tests/
│   │   └── auth.test.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                # React app entry point
│   │   ├── App.jsx                 # App wrapper & providers
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx       # Route tree configuration
│   │   │   └── ProtectedRoute.jsx  # Role & auth guard
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── pages/ (LoginPage, RegisterPage)
│   │   │   │   ├── components/ (AuthForm)
│   │   │   │   ├── api.js
│   │   │   │   └── AuthContext.jsx
│   │   │   ├── catalog/
│   │   │   │   ├── pages/ (ServicesPage)
│   │   │   │   ├── components/ (ServiceCard)
│   │   │   │   └── api.js
│   │   │   ├── orders/
│   │   │   │   ├── pages/ (PlaceOrderPage, OrderHistoryPage, OrderTrackingPage)
│   │   │   │   ├── components/ (OrderForm, StatusTimeline, OrderCard)
│   │   │   │   └── api.js
│   │   │   └── admin/
│   │   │       ├── pages/ (DashboardPage, ManageOrdersPage, AssignStaffPage)
│   │   │       ├── components/ (OrdersTable, StatusUpdater)
│   │   │       └── api.js
│   │   ├── components/             # Reusable UI: Button, Input, Navbar, Modal
│   │   ├── layouts/                # CustomerLayout, AdminLayout
│   │   ├── lib/
│   │   │   └── apiClient.js        # Axios instance with auth interceptors
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   └── styles/
│   │       └── index.css           # Tailwind & base styling
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
├── docs/                           # API contract, ER diagram, report drafts
│   ├── api-contract.md
│   ├── er-diagram.md
│   └── report-drafts.md
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (v20+ recommended)
- **PostgreSQL**: v14+
- **npm** or **pnpm**

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
npm install
# Run database migrations in PostgreSQL
# Start the development server:
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
