# Xeno CRM

## Overview
Mini CRM platform with customer segmentation, campaign management, and AI-powered insights.

## Features
- Data ingestion APIs with Redis pub-sub
- Campaign creation with dynamic rule builder
- Campaign delivery logging (90% success simulation)
- Google OAuth login
- AI-powered message suggestions (Vertex AI)

## Tech Stack
- Frontend: React.js
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Messaging: Redis
- AI: Google Vertex AI

## Setup Instructions

### Clone Repo
```bash
git clone https://github.com/agrani0613s/xeno-crm.git
cd xeno-crm

### Backend setup and start
```bash
cd backend
npm install
node server.js

### Frontend setup and start
```bash
cd frontend
cd crm-frontend
npm install
npm start

# Xeno-CRM Architecture Diagram

Below is a high-level architectural overview of the `xeno-crm` repository:

```mermaid
+-------------------+
|                   |
|   React Frontend  |    (frontend/crm-frontend)
|                   |
+-------------------+
          |
          |  HTTP (REST, fetch/axios)
          v
+-------------------+            +-----------------------+
|                   | <--------> |     MongoDB Atlas     |
| Node.js Backend   |            |  (or compatible DB)   |
|   (Express API)   |            +-----------------------+
| (backend/)        |
+-------------------+
          |
          |  API Calls, SDK
          v
+---------------------+
|                     |
| Google Vertex AI    |
| (Gemini-Pro Model)  |
+---------------------+
```
## Components

### 1. Frontend (React)
- **Location:** `frontend/crm-frontend/`
- **Framework:** React (bootstrapped with Create React App)
- **Features:**
  - User authentication (via AuthContext)
  - Campaign management (create, view logs, dashboard, etc.)
  - AI message suggestions (calls `/api/ai/suggest-messages`)
  - Smart segmentation (SegmentBuilder component)
  - Routing using React Router

### 2. Backend (Node.js/Express)
- **Location:** `backend/`
- **Framework:** Express (inferred)
- **Features:**
  - Exposes REST APIs for:
    - Campaigns (`/api/campaigns`)
    - AI features (`/api/ai/suggest-messages`)
  - Handles authentication/session
  - Integrates with Google Vertex AI for generative suggestions
  - Connects to MongoDB (inferred from "parseSegmentRule" returning Mongo queries and campaign logs)
- **Important files:**
  - `backend/utils/vertexAiClient.js`: Handles communication with Google Vertex AI (Gemini-pro)
  - `backend/utils/testVertex.js`: Test script for Vertex integration

### 3. Database (MongoDB)
- **Location:** Not directly shown, but implied in code (e.g., campaign logs, customerId, segment rules)
- **Likely Used For:**
  - Storing user data, campaigns, logs, segments

### 4. External AI Service (Google Vertex AI)
- **Integration:** Via `@google-cloud/vertexai` SDK
- **Purpose:** Provides AI-powered message suggestions and natural language-to-query conversion

---

## Data Flow Overview

1. **User interacts with React UI:** 
   - Logs in, creates/view campaigns, requests AI suggestions, etc.
2. **Frontend makes HTTP requests** to backend Express server.
3. **Backend processes requests:**
   - For normal CRUD: interacts with MongoDB.
   - For AI features: sends requests to Vertex AI and processes results.
4. **MongoDB** stores persistent data for users, campaigns, logs, and segments.
5. **AI results** (e.g., campaign suggestions) are returned to the frontend for display.

---

## Sequence Example: "Get AI Campaign Suggestions"
1. User enters a campaign objective in Dashboard input.
2. React app sends POST to `/api/ai/suggest-messages` with the objective.
3. Backend uses `vertexAiClient.js` to query Vertex AI (Gemini-pro).
4. Suggestions returned by Vertex AI.
5. Backend returns suggestions to frontend.
6. Suggestions displayed in the UI.

---

## Key Directories

- `frontend/crm-frontend/` – React app source (components, pages, context)
- `backend/utils/` – Backend utility modules including AI client logic

---

## Diagram Legend

- **Blue:** Frontend (UI, React)
- **Green:** Backend (Node.js/Express)
- **Yellow:** Database (MongoDB)
- **Red:** External AI Service (Vertex AI)

---
