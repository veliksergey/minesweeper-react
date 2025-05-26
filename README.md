# Minesweeper App

A simple Minesweeper game built with React, TypeScript, and Vite.

## Technologies Used

*   React
*   TypeScript
*   Vite

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Node.js and npm (or yarn) installed on your system. You can download Node.js from [https://nodejs.org/](https://nodejs.org/). npm is included with Node.js.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

## Available Scripts

In the project directory, you can run the following commands:

### `npm run dev` or `yarn dev`

Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser. The page will reload if you make edits.

### `npm run build` or `yarn build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint` or `yarn lint`

Lints the project files using ESLint to check for code quality and style issues.

### `npm run preview` or `yarn preview`

Serves the production build from the `dist` folder locally. This is a good way to check if the production build works correctly before deploying.

## How to Play

*   The goal is to uncover all cells that do not contain mines.
*   Click on a cell to reveal it.
*   If you reveal a mine, you lose the game.
*   If a revealed cell has a number, it indicates how many mines are in the adjacent cells.
*   Right-click (or your configured alternative) to place a flag on a cell you suspect contains a mine.
