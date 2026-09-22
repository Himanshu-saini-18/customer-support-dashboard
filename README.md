# Customer Support Dashboard

A small customer support dashboard for viewing and managing support tickets. I built this project using React, Redux Toolkit, and Tailwind CSS.

Ticket data is fetched from MockAPI, and ticket status changes are also saved through the API.

## Features

* Ticket summary for total, open, in-progress, and resolved tickets
* Search by customer name, email, or ticket subject
* Filter tickets by status and priority
* View complete ticket and customer details
* Change the current status of a ticket
* Responsive layout for desktop and mobile
* Loading, error, and empty states

## Built With

* React
* JavaScript
* Redux Toolkit
* Tailwind CSS
* Vite
* MockAPI
* Lucide React

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/Himanshu-saini-18/customer-support-dashboard.git
cd customer-support-dashboard
```

Install the required packages:

```bash
npm install
```

Create a `.env` file in the project root and add the MockAPI URL:

```env
VITE_API_URL=https://6ab280bf5b9b60f39d34cfab.mockapi.io/api/v1/tickets
```

Start the development server:

```bash
npm run dev
```

The project will usually run at:

```text
http://localhost:5173
```

## Useful Commands

```bash
npm run dev
```

Starts the local development server.

```bash
npm run lint
```

Checks the code for linting issues.

```bash
npm run build
```

Creates the production build.

```bash
npm run preview
```

Runs the production build locally for testing.

## Project Structure

```text
src/
├── components/
│   ├── Badge.jsx
│   ├── Header.jsx
│   ├── StatsCard.jsx
│   ├── TicketDetails.jsx
│   ├── TicketFilters.jsx
│   ├── TicketList.jsx
│   └── TicketRow.jsx
├── pages/
│   └── Dashboard.jsx
├── redux/
│   ├── store.js
│   └── ticketsSlice.js
├── App.jsx
├── index.css
└── main.jsx
```

## API

The project uses a MockAPI resource for ticket data.

* `GET /tickets` – fetch all tickets
* `PUT /tickets/:id` – update a ticket's status

## State Management

Redux Toolkit handles ticket data, filters, the selected ticket, loading states, and API errors. Async API requests are managed using `createAsyncThunk`.

## Live Demo

https://plantperfect.in

## Repository

https://github.com/Himanshu-saini-18/customer-support-dashboard.git
