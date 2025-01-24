# ASCII Art Printer - Backend

## Description

This is the **backend** for the ASCII Art Printer app. It handles file uploads, processes text files line by line, and communicates with the frontend in real-time using WebSocket.

### Notes:

- I want to emphasise that my primary focus for this task was on the **frontend development**, showcasing my ability to work with real-time payloads, styling, and handling the user experience.
- While I implemented the backend using Node.js, it hasn't been heavily optimized, refactored into TypeScript, or modularized. I approached it as a functional solution to meet the app's requirements.
- I included extensive comments in the backend code for clarity and my own learning.

## Features

- File upload handling via **Multer** middleware.
- Real-time updates using **WebSocket** (Socket.IO).
- Processes text files line by line, emitting progress and completion events.
- Deletes the uploaded file after processing to save storage.

---

## Prerequisites

- **Node.js** (version 14 or higher is recommended)
- **npm** (comes with Node.js)

---

## Installation and Setup

1. Download the ZIP file and extract it to a folder of your choice.
2. Install dependencies: (check .nvmrc for node version)
   ```bash
   npm install
   ```
3. Start backend server
   ```bash
   node server.js
   ```
4. Server will start on:
   ```bash
   http://localhost:3000
   ```

---

## Usage

1. Ensure the backend is running before using the frontend.
2. The backend exposes the following endpoints:

   - **POST /upload**: Handles `.txt` file uploads and processes them.

3. The backend communicates with the frontend via WebSocket (Socket.IO):
   - **Emits `"line"`**: Sends a line from the file along with the progress percentage.
   - **Emits `"complete"`**: Signals the end of file processing.

---

## Technologies Used

1. **Node.js**: Backend framework.
2. **Express**: For building the REST API.
3. **Socket.IO**: For real-time WebSocket communication.
4. **Multer**: Middleware for handling file uploads.
5. **fs**: Node.js module for file system operations.
