# 📍 Raha Field Tracker

A full-stack **Field Sales Tracking Platform** built with **Next.js**, **MongoDB Atlas**, and **OpenRouteService** to help organizations digitally manage field operations. The platform enables Sales Associates to log customer visits, capture GPS-based activities, visualize travel routes, and allows Branch Heads to monitor team performance through dashboards and reports.
---

# 🚀 Project Overview

Field sales teams often rely on manual reporting, making it difficult to verify customer visits and understand daily field movement.

Raha Field Tracker addresses this by providing:

* Secure role-based authentication
* GPS-enabled activity logging
* Interactive route visualization
* Road-distance calculation
* Associate activity timeline
* Branch-level analytics
* Monthly report export

The application is designed with two user roles:

* **Sales Associate** – Performs field operations.
* **Branch Head** – Monitors and analyzes field activities.

---

# ✨ Features

## 🔐 Authentication

* Role-based Login
* HTTP-only Cookie Authentication
* JWT-based Authentication
* Protected Backend APIs
* Sales Associate & Branch Head Roles

---

# 👨‍💼 Sales Associate

## Dashboard

* Start Day
* End Day
* Daily Statistics
* Route Map
* Recent Activities
* Lead Management

---

## Activity Logging

Each customer visit records:

* Lead
* Notes
* Latitude
* Longitude
* Timestamp

All activities are stored in MongoDB and displayed in chronological order on the Timeline page.

---

## Route Tracking

The application captures location during:

* Start Day
* Every Activity Logged
* End Day

These locations are displayed on an interactive map.

Unlike simple straight-line calculations, the application computes **actual road distance** using **OpenRouteService Directions API**, which provides significantly more realistic travel metrics for field operations.

---

## Timeline

Sales Associates can view:

* Complete activity history
* Visit locations
* Meeting notes
* Route visualization

---

# 👨‍💻 Branch Head Dashboard

Provides a complete overview of branch operations.

Features include:

* Total Associates
* Total Activities
* Total Sessions
* Total Distance Travelled
* Team Performance Chart
* Recent Activities
* Associate Search
* Monthly CSV Export

---

# 🎯 Workflow

To maintain the integrity of field operations, the application follows a day-based workflow.

### Before Starting the Day

* Activity Logging is disabled.
* End Day is disabled.

### After Starting the Day

* Start Day becomes disabled to prevent multiple active sessions.
* Activity Logging becomes available.
* End Day becomes available.

### After Ending the Day

* The session is marked as completed.
* End Day is disabled.
* A new session can only be started on the next working day.

This ensures every logged activity belongs to an active work session while preventing duplicate sessions.

---

# 📍 Data Captured

## Each Activity

* Associate
* Lead
* Notes
* Latitude
* Longitude
* Timestamp

## Each Day Session

* Start Time
* End Time
* Start Location
* End Location
* Road Distance Travelled
* Session Status

---

# 🗺 Maps & Distance Calculation

The application uses:

* **OpenStreetMap** for map tiles
* **Leaflet** for interactive maps
* **OpenRouteService Directions API** for road-distance calculation

Road distance was intentionally chosen over straight-line distance because it better represents actual travel undertaken by field associates.

---

# 📱 Responsive Design

The application has been designed to work across different screen sizes.

Responsive layouts are available for:

* Desktop
* Laptop
* Tablet
* Mobile devices

This allows Sales Associates to comfortably use the application while travelling and Branch Heads to monitor operations from larger screens.

---

# 🛠 Technology Stack

## Frontend

* Next.js 15 (App Router)
* React
* TypeScript
* Tailwind CSS
* Axios
* Lucide React
* Leaflet
* React Leaflet

---

## Backend

* Next.js API Routes
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Zod Validation

---

## Maps

* OpenStreetMap
* OpenRouteService Directions API

---

## Deployment

* Vercel
* MongoDB Atlas

---

# 📂 Project Structure

```text
src
│
├── app
│   ├── api
│   ├── associate
│   ├── branch-head
│   └── login
│
├── client-services
├── components
├── config
├── constants
├── hooks
├── middleware
├── models
├── services
├── types
├── validations
└── utils
```

---

# ⚙️ Getting Started

## Clone Repository

```bash
git clone https://github.com/snehareddy2112/field-tracker-for-sales
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env.local`

```env
MONGODB_URI=

JWT_SECRET=

OPENROUTESERVICE_API_KEY=

NEXT_PUBLIC_OPENROUTESERVICE_API_KEY=
```

## Seed Database

The project includes predefined seed data.

Seeded collections include:

* Users
* Leads

Run the seed script before starting the application.

```bash
npm run seed
```

(or execute the provided `scripts/seed.ts` file according to your project setup.)

---

## Start Development Server

```bash
npm run dev
```

Application runs at

```
http://localhost:3000
```

---

# 📊 API Overview

## Authentication

* POST `/api/auth/login`
* POST `/api/auth/logout`

## Sessions

* POST `/api/sessions/start`
* POST `/api/sessions/end`

## Activities

* POST `/api/activities/log`

## Associate

* GET `/api/associate/session`
* GET `/api/associate/timeline`

## Branch Head

* GET `/api/branch-head/dashboard`
* GET `/api/branch-head/activities`
* GET `/api/branch-head/associates`
* GET `/api/branch-head/search`
* GET `/api/branch-head/export`

---

# 🔒 Security

* JWT Authentication
* HTTP-only Cookies
* Protected Backend APIs
* Role Validation Middleware
* Zod Input Validation

---

# 📌 Assumptions

The following assumptions were made while developing the MVP:

* The application uses predefined Sales Associate and Branch Head accounts for testing.
* Seed scripts populate the initial Users and Leads collections.
* Each Sales Associate works on one active day session at a time.
* Browser location permission is granted.
* Internet connectivity is available while logging activities.
* OpenRouteService is available for calculating road distance.

---

# 🚶 Continuous Route Tracking (Design Discussion)

Currently, the application captures location at three important checkpoints:

* Start Day
* Activity Logging
* End Day

This approach was chosen to keep the implementation lightweight while still providing meaningful travel insights.

If building this system for production-scale deployments, I would implement **continuous route tracking**.

Modern browsers expose `navigator.geolocation.watchPosition()`, allowing the application to receive location updates while the page remains active.

However, browser-based continuous tracking has several limitations:

* Browsers suspend JavaScript when tabs move to the background.
* Mobile browsers often pause execution when the device is locked.
* Users may accidentally close the browser tab.
* Continuous GPS polling significantly impacts battery life.
* Different browsers enforce different background execution policies.

For a production-ready solution, I would move this functionality into a native or hybrid mobile application (such as React Native or Flutter) using background location services.

The mobile application could periodically upload coordinates (for example every 30–60 seconds or after significant movement), enabling:

* Accurate travel history
* Reliable background tracking
* Improved battery optimization
* Real-time route monitoring

---

# 💡 Reflection & Future Improvements

If given more development time, I would further enhance the application by adding:

### Security

* Dedicated frontend "Restricted Access" pages.
* Route guards preventing direct navigation across user roles.
* Centralized handling of HTTP 401 and 403 responses.

### Branch Head Dashboard

* Associate filter
* Date range filter
* Individual associate activity history
* Additional productivity analytics

### User Experience

* Rich toast notifications for all actions
* Better loading states
* Improved empty states
* Auto-refresh dashboard without page reload
* Offline activity synchronization

### Mapping

* Continuous GPS tracking
* Route replay
* Live location monitoring
* Visit clustering

### Reporting

* Enhanced CSV reports with richer business insights
* Additional export formats such as PDF

### Performance

* Server-side caching
* Dashboard query optimization
* Pagination for large datasets
* Real-time dashboard updates using WebSockets

---

Test Users:
neha@raha.com

priya@raha.com

amit@raha.com

branchhead@raha.com


Password(same for all): Password@123


