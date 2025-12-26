

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


