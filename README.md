# GigFlow – Mini Freelance Marketplace

GigFlow is a MERN-based mini freelance marketplace where users can post gigs, submit bids, and securely hire freelancers. The platform focuses on a clean hiring workflow with proper role handling, bid management, and automatic status updates.

This project was built as part of a **Full Stack Development Internship Assignment**.

---

## 🚀 Features

### 🔐 Authentication
- Secure user registration and login
- JWT-based authentication using HttpOnly cookies
- Any user can act as a **Client** or **Freelancer**

### 📌 Gig Management
- Create gigs with title, description, and budget
- Browse all open gigs
- Search gigs by title
- Automatic gig status handling (`open` → `assigned`)

### 💼 Bidding System
- Freelancers can submit bids with price and message
- Clients can view all bids for their gigs
- Bid statuses:
  - `pending`
  - `hired`
  - `rejected`

### 🏆 Hiring Logic (Core Feature)
- Client can hire **only one** freelancer per gig
- On hiring:
  - Selected bid → `hired`
  - All other bids → `rejected`
  - Gig status → `assigned`
- Prevents multiple hires for the same gig

---

## 👤 User Flow

1. User registers and logs in to the platform.
2. Any logged-in user can:
   - Act as a **Client** by posting gigs
   - Act as a **Freelancer** by bidding on gigs
3. Client posts a gig with required details.
4. Freelancers browse open gigs and submit bids.
5. Client reviews all received bids.
6. Client hires one freelancer.
7. System automatically updates gig and bid statuses.

---

## 🔄 Project Flow Diagram

```text
┌────────────┐
│   User     │
└─────┬──────┘
      │
      ▼
┌────────────┐
│ Register / │
│   Login    │
└─────┬──────┘
      │
      ▼
┌──────────────────────┐
│     Dashboard        │
└─────┬─────────┬──────┘
      │         │
      │         │
      ▼         ▼
┌──────────┐  ┌─────────────┐
│ Post Gig │  │ Browse Gigs │
└────┬─────┘  └─────┬───────┘
     │              │
     ▼              ▼
┌────────────┐  ┌────────────┐
│  View Bids │  │ Submit Bid │
└────┬───────┘  └─────┬──────┘
     │                │
     ▼                │
┌────────────┐        │
│ Hire One   │◄───────┘
└────┬───────┘
     │
     ▼
┌──────────────────────────┐
│ Gig → Assigned            │
│ One Bid → Hired           │
│ Others → Rejected         │
└──────────────────────────┘

🛠 Tech Stack
Frontend

React.js (Vite)

Tailwind CSS

Axios

Context API / Redux Toolkit

Backend

Node.js

Express.js

MongoDB with Mongoose

JWT Authentication

PORT=0000 
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

clone Repo 
git clone https://github.com/your-username/gigflow.git
cd gigflow

Backend Setup
cd backend
npm install
npm run dev

Frontend Setup
cd frontend
npm install
npm run dev

