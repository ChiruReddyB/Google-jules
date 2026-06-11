# StudyBuddy AI

Production-ready AI-powered study assistant built with FastAPI, Next.js, and LangChain.

## Features

- **Document Processing**: Upload PDF, DOCX, PPTX, and TXT files.
- **AI Chat (RAG)**: Chat with your documents using Retrieval-Augmented Generation.
- **AI Summarization**: Generate short, medium, and detailed summaries.
- **Smart Quizzes**: Automatically generate quizzes (MCQ, T/F, Short Answer) from your notes.
- **Flashcards**: 3D interactive flashcards for spaced repetition.
- **Study Planner**: AI-generated personalized study schedules.
- **Analytics**: Track your study hours and proficiency with beautiful charts.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: Python, FastAPI, SQLAlchemy, PostgreSQL.
- **AI/ML**: LangChain, OpenAI, ChromaDB, Sentence Transformers.
- **Auth/Storage**: Firebase.
- **Infrastructure**: Docker & Docker Compose.

## Getting Started

### Prerequisites

- Docker & Docker Compose
- OpenAI API Key
- Firebase Project Credentials

### Installation

1. Clone the repository.
2. Create a `.env` file in the `backend` directory with your keys:
   ```env
   DATABASE_URL=postgresql://user:password@db:5432/studybuddy
   OPENAI_API_KEY=your_key
   FIREBASE_SERVICE_ACCOUNT=your_json
   ```
3. Run the application:
   ```bash
   docker-compose up --build
   ```
4. Access the frontend at `http://localhost:3000` and backend at `http://localhost:8000`.

## Directory Structure

- `frontend/`: Next.js application.
- `backend/`: FastAPI application.
- `docker-compose.yml`: Infrastructure orchestration.
