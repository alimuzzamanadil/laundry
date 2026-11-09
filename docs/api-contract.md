# 📡 API Contract

Base URL: `/api`

## 1. Authentication Module (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register new customer account | No |
| POST | `/api/auth/login` | Authenticate and obtain JWT token | No |
| GET | `/api/auth/me` | Get profile of logged-in user | Yes |

## 2. Catalog Module (`/api/catalog`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/catalog` | Get list of all active laundry services | No |
| GET | `/api/catalog/:id` | Get details for specific service | No |
| POST | `/api/catalog` | Create service item | Admin |
| PUT | `/api/catalog/:id` | Update service item | Admin |
| DELETE | `/api/catalog/:id` | Deactivate or delete service | Admin |

## 3. Orders Module (`/api/orders`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/orders` | Place a new laundry order | Customer |
| GET | `/api/orders/my-orders` | List all orders for the current user | Customer |
| GET | `/api/orders/:id` | Get specific order and timeline | Customer/Admin |
| PATCH | `/api/orders/:id/cancel` | Cancel order (if still PLACED) | Customer/Admin |

## 4. Delivery Module (`/api/delivery`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/delivery/assign` | Assign staff to pickup/delivery | Admin |
| GET | `/api/delivery/my-tasks` | View assigned tasks for logged-in staff | Staff |
| PATCH | `/api/delivery/:assignmentId/status` | Update delivery assignment status | Staff/Admin |

## 5. Admin Module (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/admin/dashboard` | Aggregated metrics (revenue, orders, staff) | Admin |
| GET | `/api/admin/orders` | List and filter all orders in the system | Admin |
| PATCH | `/api/admin/orders/:id/status` | Update order status and log timeline | Admin |
| GET | `/api/admin/staff` | List available delivery staff | Admin |
