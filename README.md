<!-- 🏥 MEDILINK PREMIUM README -->

<p align="center">
  <img src="./public/medilink-preview.png" width="100%" alt="MediLink Banner"/>
</p>

<h1 align="center">🏥 MediLink – Smart Healthcare Platform</h1>

<p align="center">
  <a href="https://medilink-doctors.netlify.app/">
    <img src="https://img.shields.io/badge/Live-Demo-0A66C2?style=for-the-badge&logo=netlify&logoColor=white"/>
  </a>
  <a href="https://github.com/Amitpal261/Medilink">
    <img src="https://img.shields.io/badge/GitHub-Repository-0A66C2?style=for-the-badge&logo=github"/>
  </a>
</p>

---

## 🚀 Live Demo

👉 **Experience MediLink Live:**
🔗 https://medilink-doctors.netlify.app/

---

## 🌟 About the Project

**MediLink** is a **fullstack doctor appointment platform** built using modern web technologies.

It connects:

* 👨‍⚕️ Doctors
* 🧑 Patients
* 🛠️ Admins

into a **unified healthcare ecosystem**.

> 💡 Built with scalable architecture & real-world production practices

---

## 📸 Preview

<p align="center">
  <img src="./public/medilink-preview.png" width="80%" alt="MediLink Preview"/>
</p>

---

## ⚡ Features

✨ **Core Highlights**

* 🔐 Secure Authentication System
* 🩺 Doctor Profile Management
* 📅 Appointment Booking System
* 👨‍⚕️ Role-Based Dashboards (Admin / Doctor / Patient)
* 🧠 Smart Triage System
* ⚡ Fast & optimized performance
* 📱 Responsive UI with clean UX

---

## 🎯 Feature Breakdown

### 🔐 Authentication

* User signup & login
* Secure JWT-based sessions
* Role-based access control

---

### 🩺 Doctor System

* Browse doctors
* Create & update profiles
* Dedicated doctor dashboard

---

### 📅 Appointment System

* Book appointments
* Manage bookings
* Interactive UI panel

---

### 👨‍⚕️ Dashboards

* **Admin:** Manage users
* **Doctor:** Manage profile
* **Patient:** View appointments

---

### 🧠 Triage System

* Symptom-based guidance
* Helps users before booking

---

## 🧠 Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,nodejs" />
</p>

| Tech            | Purpose             |
| --------------- | ------------------- |
| Next.js 13+     | Fullstack Framework |
| React           | UI Development      |
| TypeScript      | Type Safety         |
| Tailwind CSS    | Styling             |
| API Routes      | Backend Logic       |
| Database Models | Data Handling       |

---

## 🏗️ Project Structure

```bash
app/
 ├── (auth)/           
 ├── (dashboard)/      
 │    ├── admin/
 │    ├── doctor/
 │    └── patient/
 ├── api/              
 │    ├── auth/
 │    ├── doctors/
 │    ├── appointments/
 │    └── users/
 ├── doctors/          
 ├── appointments/     
 └── triage/           

components/
 ├── ui/               
 ├── forms/            
 ├── doctor/           
 └── appointment/      

lib/
 ├── db.ts             
 ├── auth.ts           
 └── validators/       

models/
 ├── User.ts
 ├── Doctor.ts
 └── Appointment.ts
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Amitpal261/Medilink.git
cd Medilink
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Environment Variables

Create `.env.local`:

```env
DATABASE_URL=
JWT_SECRET=
NEXT_PUBLIC_BASE_URL=
```

---

### 4️⃣ Run Project

```bash
npm run dev
```

---

## 🌍 Deployment

* 🚀 Hosted on **Netlify**
* ⚡ Optimized for modern SSR setups

👉 https://medilink-doctors.netlify.app/

---

## 🧩 Key Concepts

* App Router Architecture
* Server & Client Components
* API Route Handling
* Custom Hooks
* Role-Based UI
* Modular Design

---

## 🚧 Future Improvements

* 🔔 Notifications
* 💳 Payment Integration
* 🤖 AI-based Triage
* 📱 Better Mobile UX
* 📅 Doctor Scheduling

---

## ⚠️ Disclaimer

> This project is for educational/demo purposes only.
> Not intended for real medical usage.

---

## 👨‍💻 Author

**Amitpal**

GitHub: https://github.com/Amitpal261

---

## 💡 Final Thought

> “Great software doesn't just solve problems — it builds better systems.”
