# simpleChat

A small real-time chat application built as a hands-on project for learning how a browser client and a Node.js server communicate over Socket.IO.

The app lets people connected to the local server choose a display name, exchange messages, and see typing indicators. Its focus is the fundamentals of event-driven communication and React state, not production chat features.

# LIVE LINK : https://simple-chat-2.vercel.app/

## What You Can Learn

- How to establish and clean up a Socket.IO client connection in a React component.
- How a server listens for events and broadcasts updates to connected clients.
- How to represent messages with TypeScript and render them from component state.
- How to update the local UI immediately while distributing an event to other clients.
- How to manage transient UI state, such as typing indicators and their timeouts.
- How a frontend development server and a separate backend process work together.

## Features

- Choose a display name before chatting.
- Send and receive messages in real time.
- See messages aligned differently for the current user and other users.
- Receive temporary typing indicators from other connected clients.
- Test multiple participants by opening the app in more than one browser tab or window.

## Technology

| Area | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS 4 |
| Realtime communication | Socket.IO 4 client and server |
| Backend | Node.js, TypeScript, Express 5, Node HTTP server |
| Development tools | npm, `tsx`, ESLint |

## How It Works

The frontend connects to the Socket.IO server at `http://localhost:3000`. After a user submits a display name, it emits a `room1` event. The server sends a `roomNotice` event to the other connected clients. When a user sends a message, the client adds it to its own UI and emits a `message` event; the server broadcasts that message to the other clients. Typing updates are sent using the `typing` event and removed from the UI after a short delay.

> **Current scope:** `room1` is an event name, not an isolated Socket.IO room. The server uses global broadcasts, so all connected clients share the same conversation. Messages are held in browser memory only and are not saved after a reload or disconnect.

## Run Locally

You will need [Node.js](https://nodejs.org/) and npm installed.

1. Install and start the backend in a terminal:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   The Socket.IO server listens on `http://localhost:3000`.

2. In a second terminal, install and start the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open the local URL printed by Vite, usually `http://localhost:5173`.

4. Open the same URL in another tab or browser window, choose a different display name, and exchange messages.

Keep both development processes running while using the app. The frontend currently connects to the backend at the fixed address `http://localhost:3000`.

## Available Scripts

Run these commands from the relevant directory:

| Directory | Command | Purpose |
| --- | --- | --- |
| `frontend` | `npm run dev` | Start the Vite development server. |
| `frontend` | `npm run build` | Type-check and build the frontend for production. |
| `frontend` | `npm run lint` | Run ESLint on the frontend. |
| `frontend` | `npm run preview` | Preview the built frontend locally. |
| `backend` | `npm run dev` | Run the backend with `tsx` watch mode. |

There is currently no automated backend test suite configured.

## Project Structure

```text
simpleChat/
├── backend/
│   ├── index.ts             # HTTP server and Socket.IO event handlers
│   ├── package.json         # Backend dependencies and scripts
│   └── tsconfig.json        # Backend TypeScript configuration
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Chat state, socket events, and main interface
│   │   ├── we.ts            # Socket.IO client connection
│   │   ├── App.css          # Tailwind CSS entry point
│   │   └── component/
│   │       ├── Message.tsx  # Message list and message layout
│   │       └── Popup.tsx    # Display-name form
│   ├── index.html           # Frontend document entry point
│   ├── package.json         # Frontend dependencies and scripts
│   └── vite.config.ts       # Vite, React, and Tailwind configuration
└── README.md
```

## Learning Project Boundaries

This project intentionally keeps the server and data model small. It does not currently provide persistent message history, authentication, private or isolated rooms, message delivery guarantees, or production deployment configuration. The backend also allows cross-origin connections for development, so its current settings should not be treated as a production security configuration.
