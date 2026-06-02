
# FoodyVai Client

A modern e-commerce platform built with Next.js for ordering food online.

## Tech Stack

- **Framework**: Next.js
- **HTTP Client**: Axios
- **UI Library**: Ant Design
- **State Management**: TanStack Query
- **Real-time**: Socket.io
- **Icons**: React Icons

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd foodyvai-client
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Environment Setup

Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

## Running the Project

Start the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

