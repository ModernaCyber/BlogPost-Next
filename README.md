```markdown
# BlogNextJsDjango Frontend

This project is a Next.js frontend application styled with Tailwind CSS and ShadCN, communicating with a Django backend API at `http://localhost:8000`.

## Setup Instructions

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/Mohamed-code-marvel/Blog_NextJs_Frontend.git
   cd Blog_NextJs_Frontend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the development server**:
   ```sh
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```plaintext
Blog_NextJs_Frontend/
├── components/        # Reusable UI components
├── pages/             # Next.js pages (routes)
├── public/            # Static files
├── styles/            # Global and component-specific styles
├── utils/             # Utility functions and constants
├── .env.local         # Environment variables
├── next.config.js     # Next.js configuration
├── package.json       # Project metadata and scripts
├── README.md          # Project documentation
└── tailwind.config.js # Tailwind CSS configuration
```

## Available Scripts

### `npm run dev`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm run build`

Builds the app for production to the `.next` folder.

### `npm run start`

Starts the application in production mode. Run `npm run build` first.

## API Integration

The frontend uses Axios to communicate with the Django backend.

### Example Axios Request

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

api.get('/api/posts/')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## Styling

- **Tailwind CSS**: Utility-first CSS framework.
- **ShadCN**: Modern UI components.

## Authentication

- **User Registration and Login**: Located in `pages/auth`.
- **JWT Tokens**: Used for authentication.

### Example Authentication Flow

1. **Register**:
   ```javascript
   api.post('/api/auth/register/', { username: 'exampleUser', password: 'examplePassword' });
   ```

2. **Login**:
   ```javascript
   api.post('/api/auth/login/', { username: 'exampleUser', password: 'examplePassword' })
     .then(response => {
       const { access, refresh } = response.data;
       // Store tokens for authenticated requests
     });
   ```

## Features

- User authentication (register, login, logout)
- Blog post management (create, read, update, delete)
- Comment management (add, delete)

## Assumptions and Simplifications

- Backend API runs locally at `http://localhost:8000`.
- JWT tokens for user authentication.

This project demonstrates a full-stack application with a Next.js frontend and a Django backend, covering user authentication, blog post management, and comment functionality.
```