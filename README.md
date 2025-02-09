# CreditSea Report Processor

CreditSea Report Processor is a web application that allows users to upload and view credit reports. The application is built using **React**, **TypeScript**, and **Tailwind CSS**, and it leverages **Vite** as the build tool for fast development and optimized production builds.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Dependencies](#dependencies)

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/Fir-g/creditsea-xml-backend.git
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

# CreditSea XML - Setup Guide

Follow these steps to set up and run the project locally.

## 1. Clone & Run the Backend

```bash
git clone https://github.com/Fir-g/creditsea-xml-backend.git
cd creditsea-xml-backend
npm install  # or yarn install
npm run dev  # or yarn dev

```

Make sure you configure the .env file if required before running the backend.

## 2. Clone & Run the Frontend
Once the backend is running, move to your frontend directory and set it up similarly:

```git clone https://github.com/Fir-g/creditsea-xml-frontend.git
git clone https://github.com/Fir-g/creditsea-xml-frontend.git # If you haven’t cloned it before
npm install  # or yarn install
npm run dev  # or yarn dev
```

Or if you've already cloned it, just navigate to the directory:
```
npm install  # or yarn install
npm run dev  # or yarn dev
```
# Now, the project should be up and running! 🚀

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
    - Check out the live demo of the application here: CreditSea Report Processor [https://creditsea-xml-assignment.netlify.app/]

