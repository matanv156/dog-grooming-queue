# 🐶 Dog Grooming Queue Management System

A full-stack appointment queue management system for a dog grooming salon.

The system allows customers to register, log in, and manage their grooming appointments, including selecting dog size, viewing prices and discounts, and managing their own queue entries.

---

## ✨ Features

- User registration and login with JWT authentication
- Appointment queue with:
  - Dog size selection (Small / Medium / Large)
  - Automatic duration and pricing per dog size
  - Loyalty discount (10% after 3 previous appointments)
- Customers can:
  - Create, edit, and delete **their own** appointments
  - View full appointment details in a popup
- Business rules enforced on the server:
  - Users cannot edit or delete appointments that are not theirs
  - Appointments scheduled for the current day cannot be deleted
- Filtering appointments by:
  - Date
  - Customer name
- Secure password handling (hashing + salting)

---

## 🛠 Tech Stack

### Backend

- ASP.NET Core Web API (.NET 7)
- Entity Framework Core
- Microsoft SQL Server
- JWT Authentication

### Frontend

- React
- TypeScript
- Material UI (MUI)

### Database

- SQL Server
- Stored Procedures
- SQL Views

---

## 🗂 Project Structure
