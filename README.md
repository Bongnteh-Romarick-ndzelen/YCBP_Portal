
# Youth Cyber Bootcamp Portal (YCBP)

**Building Cameroon's Next Generation of Cyber Defenders**

The Youth Cyber Bootcamp Portal (YCBP) is an interactive, gamified learning and competition platform dedicated to training young Cameroonians (aged 15–30) in practical, real-world cybersecurity skills, including ethical hacking, digital forensics, and secure coding.

-----

## 🚀 1. Project Goal & Impact

Cameroon, like many nations in Sub-Saharan Africa, faces a critical shortage of skilled cybersecurity professionals. YCBP directly addresses this by providing a safe, sandboxed environment where youth can gain the practical experience needed for careers in cybersecurity and contribute to national cyber defense.

### Key Objectives

* **Gamified Learning:** Deliver hands-on ethical hacking challenges (CTF-style) in a safe, sandboxed environment.
* **Talent Identification:** Promote cyber talent for internships and national CERT recruitment.
* **Certification:** Certify participants through progressive levels and digital badges (Bronze, Silver, Gold, National Cyber Defender).
* **Community:** Foster a culture of ethical conduct and provide a Mentorship Hub for expert guidance.

-----

## 💻 2. System Architecture & Core Technologies

The YCBP is built on a modern, robust, and scalable MERN-stack architecture (with MongoDB for flexibility).

### Architecture Overview

The system utilizes a secure separation between the public-facing React frontend and the protected Node.js backend which manages data, authentication, and communication with the isolated CTF challenge containers.

**Data Flow:** User (Browser/Mobile) $\xrightarrow{HTTPS}$ **React Frontend** $\xrightarrow{REST\ API}$ **Node.js (Express)** $\longrightarrow$ **MongoDB** / **AWS EC2 (CTF Labs)**

### Core Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React** + **Vite** | Fast, modern interface built with **TailwindCSS** for rapid, responsive styling. |
| **Backend** | **Node.js** + **Express.js** | Robust REST API for logic, data management, and orchestration. |
| **Database** | **MongoDB** | Non-relational database for flexible storage of user progress, challenges, and leaderboards. |
| **Auth** | **JWT** | Secure, stateless authentication with Role-Based Access Control (RBAC). |
| **Real-time** | **Socket.io** | Used for live updates on challenge scoring and the Mentorship Hub chat. |
| **CTF Labs** | **Docker** + **AWS EC2** | Sandboxed environment for running safe ethical hacking simulations. |

-----

## ✨ 3. Key Features

| Feature | Description |
| :--- | :--- |
| **Cyber Challenges (CTF)** | Gamified Capture The Flag scenarios, quizzes, and vulnerability labs categorized by difficulty. |
| **User Leaderboards** | Live, national, and regional rankings of participants based on total points. |
| **Progressive Badging** | Automatic issuance of digital badges and certificates upon meeting specific point criteria. |
| **Mentorship Hub** | Platform for students to interact with and seek guidance from cybersecurity experts and mentors (using Socket.io). |
| **Admin Panel** | Centralized dashboard for challenge content upload, user management, and detailed report generation. |

-----

## ⚙️ 4. Installation & Setup

These instructions are for setting up the project locally for development.

### Prerequisites

* Node.js (v18+)
* npm or yarn
* MongoDB Instance (Local or Atlas)
* (Optional but recommended) Docker for running local CTF challenges.

### A. Frontend Setup (`ycbp-frontend`)

1. Navigate to the frontend directory:

    ```bash
    cd ycbp-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root and add your backend API URL:

    ```bash
    # .env (Frontend)
    VITE_BACKEND_API_URL=http://localhost:5000/api
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

### B. Backend Setup (`ycbp-backend`)

1. Navigate to the backend directory:

    ```bash
    cd ycbp-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root:

    ```bash
    # .env (Backend)
    PORT=5000
    MONGODB_URI=<Your-MongoDB-Connection-String>
    JWT_SECRET=<A-Strong-Secret-Key>
    # Optional: AWS/Docker config for challenge deployment
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

-----

## 👥 5. Team & Contributions

This project is open-source and dedicated to promoting cybersecurity education in Cameroon.

We welcome contributions from developers, security researchers, educators, and technical writers\! Please check our open issues and consult the `CONTRIBUTING.md` guide.

### Target Users

* **Students:** University and technical school students (ICT, CS)
* **Youth:** Young professionals aged 15–30
* **Experts:** Mentors, instructors, and cybersecurity experts
