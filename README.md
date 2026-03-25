# Getting Started
## EmoSense – Mental Well-Being Chatbot
This project contains the frontend of EmoSense, a mental well-being chatbot built using Next.js as part of a MERN stack application.

EmoSense is a mental-wellbeing chatbot where users can share their emotions freely.
The chatbot analyzes user sentiment and responds with empathetic messages while suggesting personalized recommendations such as videos,
links, or calming activities to improve emotional well-being.

## Project Goals
- Provide a safe and supportive platform for users to express emotions
- Detect user sentiment/emotions from text conversations
- Offer empathetic responses instead of generic chatbot replies
- Recommend mood-enhancing content (videos, links, activities)
- Build a scalable MERN-stack web application
- Deploy the application on the cloud

## Tech Stack (MERN)
- Frontend: Next.js (React)
- Backend: Node.js + Express.js
- Database: MongoDB
- API- Gemini API
- Deployment: Cloud platform (Vercel / Render / Railway / AWS – TBD)

## Prerequisites
#### Make sure you have the following installed:
- Node.js (v18 or above)
- npm / yarn / pnpm


## Installation

#### Clone the repository:
```bash
git clone https://github.com/Shrutibansal22/QueryDocs.git
cd QueryDocs
```

#### Install dependencies:
```bash
npm install
```

#### Run the Development Server
```bash
npm run dev
or
yarn dev
or
pnpm dev
or
bun dev
```

Open [http://localhost:3000](http://localhost:3000/) in your browser to view the application.

## Project Structure (Frontend)
```bash
app/
 ├── page.js        # Main chatbot UI
 ├── layout.js      # Root layout
 ├── components/    # Reusable UI components
 └── styles/        # Global styles
```

 You can start editing the chatbot UI by modifying:
 - app/page.js
 - The page auto-updates as you save changes.

## Recommendation System (Planned)
Based on detected emotions:

😔 Sad → Motivational videos, calming music

😟 Stressed → Breathing exercises, relaxation links

😊 Happy → Positive reinforcement content

😞 Anxious → Mindfulness videos and grounding techniques

## Learn More

To learn more about the technologies used in this project, refer to:

Next.js Documentation: https://nextjs.org/docs

React Documentation: https://react.dev

Node.js Documentation: https://nodejs.org/en/docs

MongoDB Documentation: https://www.mongodb.com/docs

## Deployment

The application will be deployed on the cloud as required:

Frontend: Vercel (Next.js)

Backend: Render / Railway (Node.js + Express)

Database: MongoDB Atlas


## Developer

Shruti Bansal

GitHub: https://github.com/Shrutibansal22
