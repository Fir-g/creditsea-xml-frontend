# CreditSea Report Processor

CreditSea Report Processor is a web application that allows users to upload and view credit reports. The application is built using **React**, **TypeScript**, and **Tailwind CSS**, and it leverages **Vite** as the build tool for fast development and optimized production builds.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/creditsea-report-processor.git
cd creditsea-report-processor
```

### 2. Install Dependencies

```sh
npm install
```

## Usage

To start the development server, run:

```sh
npm run dev
```

This will start the **Vite development server** and open the application in your default web browser.

## Scripts

The following scripts are available:

- **`dev`**: Starts the Vite development server.
- **`build`**: Builds the project for production.
- **`lint`**: Runs ESLint to lint the codebase.
- **`preview`**: Previews the production build.
- **`server`**: Starts the backend server using Nodemon.

## Project Structure

```
src/
├── App.tsx               # Main application component
├── types/
│   └── CreditReport.ts   # Interface definitions
├── components/
│   ├── Header/
│   ├── UploadSection/
│   ├── ReportsList/
│   └── ReportDetails/
│       ├── BasicDetails/
│       ├── ReportSummary/
│       └── CreditAccountsTable/
├── utils/
│   └── helpers.ts        # Helper functions
└── styles/
    └── tailwind.css      # Styles
```

## Configuration

The project uses the following configurations:

- **Vite (****`vite.config.ts`****)**: Configuration for Vite build tool.
- **TypeScript (****`tsconfig.json`****)**: TypeScript compiler settings.
- **Tailwind CSS (****`tailwind.config.js`****)**: Custom styles and theme settings.
- **ESLint (****`eslint.config.js`****)**: Linting rules for maintaining code quality.

## Dependencies

Key dependencies used in this project:

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vite**: Fast build tool for modern web applications.
- **ESLint**: Linter for enforcing coding standards.

## Live Demo

Check out the live demo of the application here: CreditSea Report Processor

