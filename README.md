

# `README.md` for DriveLink

```markdown
# DriveLink - Car & Driver Management System

DriveLink is a **mobile-based fleet management system** that allows car owners, managers, and drivers to efficiently manage cars, daily activities, expenses, revenues, and live location tracking.  
The app is built with **React Native (Expo)** and uses **Supabase** as the backend.

---

## ✅ Features

### **Owner**
- Create manager and driver accounts
- Assign cars to managers
- Assign drivers to cars
- Monitor car and driver activity
- View full reports

### **Manager**
- Manage assigned cars
- Manage drivers under assigned cars
- Track drivers via GPS
- Add or edit income/expense logs
- Review driver activity reports

### **Driver**
- Log daily income
- Log daily expenses
- View assigned car details
- Share live location via GPS
- Call manager if unable to fill logs

---

## 🎨 Design & Style

- **Design style**: Modern minimal + soft neumorphism
- **Layout**: Card-based
- **Navigation**: Floating rounded bottom tab bar (icons only)
- **Colors**: Neutral base with limited accents (yellow, orange, soft gray)
- **Typography**: Clean sans-serif with strong hierarchy
- **Minimalism**: High, content-first, distraction-free

---

## 🗂 Folder Structure

```

DriveLink/
├── app/
│   ├── layout.tsx
│   ├── index.tsx               # Redirect based on role
│
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/index.tsx      # -> imports LoginComponent from modules/auth
│   │   └── register/index.tsx   # -> imports RegisterComponent from modules/auth
│
│   ├── (owner)/
│   │   ├── layout.tsx
│   │   ├── dashboard/index.tsx  # -> imports DashboardComponent from modules/owner
│   │   ├── cars/index.tsx       # -> imports CarsComponent from modules/cars
│   │   ├── managers/index.tsx   # -> imports ManagersComponent from modules/manager
│   │   └── reports/index.tsx    # -> imports ReportsComponent from modules/reports
│
│   ├── (manager)/
│   │   ├── layout.tsx
│   │   ├── dashboard/index.tsx  # -> imports DashboardComponent from modules/manager
│   │   ├── work/index.tsx       # -> imports WorkComponent from modules/assignments
│   │   ├── finance/index.tsx    # -> imports FinanceComponent from modules/finance
│   │   └── tracking/index.tsx   # -> imports TrackingComponent from modules/tracking
│
│   ├── (driver)/
│   │   ├── layout.tsx
│   │   ├── dashboard/index.tsx  # -> imports DashboardComponent from modules/driver
│   │   ├── activity/index.tsx   # -> imports ActivityComponent from modules/activity
│   │   ├── my-car/index.tsx     # -> imports MyCarComponent from modules/cars
│   │   └── tracking/index.tsx   # -> imports TrackingComponent from modules/tracking
│
│   └── unauthorized.tsx
│
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── LoginComponent.tsx
│   │   │   ├── RegisterComponent.tsx
│   │   │   └── authUtils.ts
│   │   │
│   │   ├── owner/
│   │   │   ├── DashboardComponent.tsx
│   │   │   └── ReportsComponent.tsx
│   │   │
│   │   ├── manager/
│   │   │   ├── DashboardComponent.tsx
│   │   │   └── ManagersComponent.tsx
│   │   │
│   │   ├── driver/
│   │   │   ├── DashboardComponent.tsx
│   │   │   └── ActivityComponent.tsx
│   │   │
│   │   ├── cars/
│   │   │   ├── CarsComponent.tsx
│   │   │   └── MyCarComponent.tsx
│   │   │
│   │   ├── finance/
│   │   │   └── FinanceComponent.tsx
│   │   │
│   │   ├── assignments/
│   │   │   └── WorkComponent.tsx
│   │   │
│   │   ├── tracking/
│   │   │   └── TrackingComponent.tsx
│   │   │
│   │   └── announcements/
│   │       └── AnnouncementsComponent.tsx
│   │
│   ├── shared/
│   │   ├── services/
│   │   │   ├── supabase.ts
│   │   │   ├── auth-service.ts
│   │   │   ├── user-service.ts
│   │   │   ├── car-service.ts
│   │   │   ├── expense-service.ts
│   │   │   ├── revenue-service.ts
│   │   │   └── tracking-service.ts
│   │   │
│   │   ├── store/
│   │   │   ├── auth-store.ts
│   │   │   ├── user-store.ts
│   │   │   ├── car-store.ts
│   │   │   ├── expense-store.ts
│   │   │   ├── revenue-store.ts
│   │   │   ├── tracking-store.ts
│   │   │   └── ui-store.ts
│   │   │
│   │   ├── types/
│   │   │   ├── user.ts
│   │   │   ├── car.ts
│   │   │   ├── expense.ts
│   │   │   ├── revenue.ts
│   │   │   └── tracking.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useRole.ts
│   │   └── useTracking.ts
│   │
│   └── utils/
│       ├── helpers.ts
│       └── permissions.ts
│
├── app.json
├── package.json
├── tsconfig.json
└── README.md

---

## ⚡ Technologies

- **Frontend:** React Native (Expo), Expo Router
- **Backend:** Supabase (Auth, Database, Realtime)
- **State Management:** Zustand or similar
- **Language:** TypeScript
- **Design Style:** Modern minimal + soft neumorphism, card-based

---

## 🚀 Installation

```bash
git clone <repository-url>
cd DriveLink
npm install
expo start
````

---

## 📝 Notes

* Each **tab screen** (dashboard, cars, managers, etc.) imports its corresponding module component and renders it.
* **Hooks** handle authentication, role access, and tracking logic.
* **authUtils** contains reusable authentication helper functions.

---

## 📂 Contributing

* Follow the folder structure strictly for new modules
* Keep UI minimal and consistent with the design system
* Use card-based layouts for all new screens
* Maintain proper separation of **components, hooks, services, and stores**

---

## 📄 License



```

---

If you want, I can also **add a visual diagram of the folder structure** inside this README for better clarity — like a GitHub-style tree diagram with icons for modules, tabs, and components.  

Do you want me to do that?
```
