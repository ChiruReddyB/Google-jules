from fastapi import FastAPI, Depends, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .core.database import get_db, engine
from .models import models
from .services.extractor import TextExtractor
from .services.vector_service import VectorService
from .services.summarizer import Summarizer
from .services.chat_service import ChatService
from .services.study_tools import StudyToolsService
from .services.planner import PlannerService

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="StudyBuddy AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vector_service = VectorService()
summarizer = Summarizer()
chat_service = ChatService()
study_tools = StudyToolsService()
planner_service = PlannerService()

@app.get("/")
async def root():
    return {"message": "Welcome to StudyBuddy AI API"}

@app.post("/upload")
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    content = await file.read()
    text = TextExtractor.extract_text(content, file.filename)

    # Save to DB
    db_doc = models.Document(filename=file.filename, file_type=file.filename.split(".")[-1], user_id=1) # Mock user_id
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)

    # Process for RAG
    vector_service.process_and_store(text, db_doc.id, 1)

    return {"id": db_doc.id, "filename": db_doc.filename}

@app.get("/documents")
async def get_documents(db: Session = Depends(get_db)):
    return db.query(models.Document).all()

@app.post("/chat")
async def chat(query: str, document_id: int = None):
    return await chat_service.get_response(query, user_id=1, document_id=document_id)

@app.post("/generate-summary/{document_id}")
async def generate_summary(document_id: int, db: Session = Depends(get_db)):
    doc = db.query(models.Document).filter(models.Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    # In real app, we'd read the file or get text from vector store
    # For now, let's assume we have the text
    text = "Sample text from document..."
    summaries = await summarizer.generate_summaries(text)

    db_summary = models.Summary(
        document_id=document_id,
        short_summary=summaries['short'],
        medium_summary=summaries['medium'],
        detailed_summary=summaries['detailed'],
        key_takeaways=summaries['takeaways'],
        important_concepts=summaries['concepts']
    )
    db.add(db_summary)
    db.commit()

    return summaries

@app.post("/generate-quiz/{document_id}")
async def generate_quiz(document_id: int, db: Session = Depends(get_db)):
    text = "Sample text from document..."
    quiz_content = await study_tools.generate_quiz(text)
    return {"quiz": quiz_content}
