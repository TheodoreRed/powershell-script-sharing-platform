# PowerShell Script Sharing Platform

This documentation provides instructions for setting up and running the PowerShell Script Sharing Platform. The project is divided into two main parts: the frontend application (`app`) and the backend server (`server`).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Development Server](#running-the-development-server)
4. [Building the Project](#building-the-project)
5. [Serving the Built Project](#serving-the-built-project)
6. [Project Structure](#project-structure)
7. [Scripts Overview](#scripts-overview)

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 20.11.2 or higher)
- [npm](https://www.npmjs.com/)

## Installation

To install all dependencies for both the frontend (`app`) and backend (`server`), run the following command from the root directory of the project:

```bash
npm run install:all
```

This will execute `npm install` in both the `app` and `server` directories concurrently.

## Running the Development Server

To run the development servers for both the frontend and backend concurrently, use the following command:

```bash
npm run dev
```

This will start the frontend development server using Vite and the backend development server using Nodemon.

### Frontend Development Server

The frontend application can be accessed at `http://localhost:5173`.

### Backend Development Server

The backend server runs on `http://localhost:5000` by default.

## Building the Project

To build both the frontend and backend projects, run the following command:

```bash
npm run build
```

This command will concurrently build the frontend using Vite and the backend using TypeScript.

### Frontend Build

The built frontend files will be placed in the `app/dist` directory.

### Backend Build

The built backend files will be placed in the `server/dist` directory.

## Serving the Built Project

To serve the built project, use the following command:

```bash
npm run serve
```

This command will start the backend server using the built files in the `server/dist` directory. Ensure that the frontend build files are served correctly by the backend server if needed.

## Project Structure

Here is an overview of the project structure:

```
powershell-script-sharing-platform/
├── app/
|   ├── dist/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── server/
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── tsconfig.json
├── node_modules/
├── package.json
└── .gitignore
```

## Scripts Overview

### Root Scripts

- `dev`: Runs both frontend and backend development servers concurrently.
- `build`: Builds both frontend and backend projects concurrently.
- `serve`: Serves the built backend project.
- `install:all`: Installs dependencies for both frontend and backend concurrently.

### Frontend (App) Scripts

- `dev`: Starts the Vite development server.
- `build`: Builds the frontend application using Vite.
- `lint`: Runs ESLint on the frontend source files.
- `preview`: Previews the built frontend application.

### Backend (Server) Scripts

- `start`: Starts the backend server from the built files.
- `build`: Builds the backend project using TypeScript.
- `dev`: Starts the backend development server using Nodemon and ts-node.
