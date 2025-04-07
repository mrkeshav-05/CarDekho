# 🚗 CarPool – Smart Ride Sharing Platform

CarPool is a scalable, full-stack ride-sharing platform that connects drivers and passengers for optimized carpooling. The project is designed to reduce traffic congestion, carbon emissions, and daily commute costs by encouraging shared rides. It integrates real-time chat, wallet-based payments, secure authentication, and geolocation services to deliver a seamless user experience.

---

## 🌐 Tech Stack

- **Frontend**: Tailwind CSS, React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose ODM  
- **Authentication**: Firebase Auth (Email & Google)  
- **Real-Time Features**: Socket.IO  
- **Geolocation**: Google Maps JavaScript & Places API  
- **Payments**: Razorpay  
- **Deployment**: Vercel (Frontend), Render (Backend), MongoDB Atlas

---

## 🚀 Features

- 🔍 **Destination-Based Ride Matching**  
  Users can search for available rides by destination using Google Maps Autocomplete for precise queries.

- 🗺️ **Google Maps API Integration**  
  Displays map previews, captures geo-coordinates, and suggests verified locations using Google Places.

- 💬 **Real-Time Chat**  
  Enables secure in-app communication between drivers and passengers via Socket.IO.

- 💳 **Wallet-Based Payment System**  
  Users can add funds, split fares, and pay securely using Razorpay.

- 🔐 **Authentication & Authorization**  
  Secure login with Google or Email/Password using Firebase Authentication.

- 🛠️ **Admin Panel (Coming Soon)**  
  Role-based controls to manage ride listings, user reports, and payments.

---


### 🔑 Google Maps API Key
- Autocomplete used for source/destination input.
- Prevents user errors (e.g., typos or invalid locations).
- Only allows verified locations into the database for precise querying.

---

## ⚙️ Installation Guide

```bash
# Clone the repo
git clone https://github.com/Rishabh-Kushwaha/carpool-platform.git
cd carpool-platform

# Install dependencies
npm install

# Create environment variables
touch .env
