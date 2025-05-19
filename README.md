Dashboard Task

<!-- Staff IT Dashboard -->

A responsive internal dashboard built with React, Typescript, and Material UI for managing IT requests, tickets, staff directories, and task lists. Designed for seamless use across desktop and mobile devices.

<!-- Features -->

- Staff Login Page
- Dashboard Overview
- Staff Directory Search
- IT Request Submission Form
- Ticket Tracking and Management
- To-Do List for Staff

<!-- Tech Stack -->

- React + Typescript
- React Router DOM for routing
- MUI for UI components
- React Context API for global state (auth, tickets)

<!-- Summary of Features Completed -->

- Responsive Sidebar Navigation:
  Created a responsive sidebar with navigation links for Dashboard, Staff Directory, IT Request Form, Tickets, and To-Do List. It adapts to mobile devices with a hamburger menu.

- Dashboard Overview Page:
  Built a main dashboard landing page with essential metrics and summary information.

- Staff Directory:
  Developed a searchable and filterable staff directory listing with profile cards.

- IT Request Form:
  Created a form for submitting IT support requests, integrated with context for state management.

- Ticket Management:
  Implemented ticket creation, status updates (Open, In Progress, Resolved)

- To-Do List:
  Developed a full-featured to-do list with add, edit, toggle complete, delete, and clear all functionality. State is saved to local storage.

- Material-UI Styling:
  Applied consistent UI styling using MUI components and theming, including responsive layouts, buttons and icons.

- Routing:
  Configured React Router for client-side navigation between pages with protected routes for authenticated users.

- Persistent State:
  Used localStorage to save tickets and tasks, preserving data across browser sessions.

<!-- Assumptions Made -->

- User Roles and Permissions:
  Assumed a basic authentication system without role-based access control (e.g., admin vs. regular user). All authenticated users have access to the same dashboard features.

- Data Persistence Scope:
  Tickets and to-do tasks are persisted using localStorage for simplicity, assuming no backend or database integration is required at this stage.

- Ticket Status Flow:
  The ticket statuses are limited to three fixed states: Open, In Progress, and Resolved, assuming this covers the typical workflow without additional states or custom workflows.

- Form Validation:
  Basic client-side validation is implemented (e.g., required fields), assuming no complex validation rules or server-side validation needed for initial development.

- Styling Consistency:
  Used Material-UI default themes and components assuming uniform styling is acceptable and no custom design system or branding beyond basic colors is required.

- Responsiveness:
  Designed components to be responsive mainly for desktop and small screen sizes, assuming no specific support needed for very large screens or unusual devices.

- Local User Data:
  Assumed all user data (tickets, tasks) is specific to the current browser session or user on that device, without multi-user or cloud synchronization features.

  <!-- What I Would Add With More Time -->

- Backend Integration:
  Connect the app to a backend API or database such as Firebase or Node.js to persist tickets, tasks, and user data securely, enabling multi-user access and real-time updates.

- User Authentication & Roles:
  Implement role-based access control so admins can manage tickets and users, while regular users have limited permissions.

- Drag & Drop To-Do:
  Allow users to reorder tasks via drag-and-drop for better task management.

- Dark Mode and Theming:
  Add support for light/dark modes and customizable themes to improve user experience.

- Notifications and Alerts:
  Implement email or in-app notifications to alert users and staff about ticket updates, deadlines, or task reminders.

- Improved Accessibility:
  Enhance accessibility with ARIA attributes, keyboard navigation, and screen reader support.

- Mobile App Version:
  Develop a mobile app version using React Native or similar tech for on-the-go access.

Ps: I would be enhancing this project further in my spare to implement features I would add with more time, connecting with backend toolss and adding a login in system.
>>>>>>> 62937ad (Task)
