# TutorLink Frontend

TutorLink is an online tutoring platform that connects students with tutors. This is the **frontend** of the application built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Shadcn** and **Redux**.

## 🚀 Features

- ✅ Role-based user interface for **Students** and **Tutors**
- 🔐 Authentication & Authorization
- 📅 Tutor discovery & session booking
- 📊 Dashboards for students and tutors
- 📚 Blog, FAQ, Contact, and About pages
- 🎨 Fully responsive design with Tailwind CSS


---

## 🗂️ Project Structure

```
tutorlink-frontend/
├── public/
├── src/
│   ├── Redux/                # Redux Toolkit setup and slices
│   ├── app/                  # App routes and layouts
│   │   ├── (WithCommonLayout)/  # Public pages (about, blogs, etc.)
│   │   │   ├── about/
│   │   │   ├── blogs/
│   │   │   ├── contact/
│   │   │   ├── faq/
│   │   │   ├── tutors/
│   │   │   └── [tutorId]/
│   │   │       ├── page.tsx
│   │   ├── (WithDashBoardLayOut)/  # Authenticated dashboards
│   │   │   └── studentdashboard/
│   │   │   └── tutor/
│   │   ├── layout.tsx       # Root layout
│   │   ├── loading.tsx      # Global loading UI
│   │   ├── not-found.tsx    # 404 page
│   ├── assets/              # Images and static assets
│   ├── components/          # Reusable UI components
│   ├── constants/           # Static config or constants
│   ├── context/             # Global context providers (e.g., Auth)
│   ├── lib/                 # Utility functions
│   ├── providers/           # App-level providers (Redux, Auth, etc.)
│   ├── services/            # API calls and service logic
│   ├── types/               # TypeScript types and interfaces
│   ├── login/               # Login page
│   ├── register/            # Register page
│   ├── faild/               # Payment or action failed page
│   ├── sucess/              # Payment or action success page
├── .gitignore
├── README.md
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── middleware.ts
```
## 🧪 Tech Stack

- Next.js – React Framework

- TypeScript – Type safety

- Tailwind CSS & shadcn – Styling

- Context API – Auth handling

- Stripe (assumed) – Payment integration

# 🛠️ Getting Started
### 1. Clone the Repository
```
git clone https://github.com/your-username/tutorlink-frontend.git
cd tutorlink-frontend
```
### 2. Install Dependencies
```
npm install
```
### 3. Start the Development Server
```
npm run dev
```
# 🌐 Environment Variables
Create a .env.local file at the root and add your variables like:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
```
