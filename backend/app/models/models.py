from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, JSON, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .core.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    profile_picture = Column(String)
    join_date = Column(DateTime(timezone=True), server_default=func.now())

    documents = relationship("Document", back_populates="owner")

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    file_type = Column(String)
    file_path = Column(String)
    upload_date = Column(DateTime(timezone=True), server_default=func.now())
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="documents")
    summaries = relationship("Summary", back_populates="document")
    quizzes = relationship("Quiz", back_populates="document")
    flashcards = relationship("Flashcard", back_populates="document")

class Summary(Base):
    __tablename__ = "summaries"
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"))
    short_summary = Column(Text)
    medium_summary = Column(Text)
    detailed_summary = Column(Text)
    key_takeaways = Column(JSON)
    important_concepts = Column(JSON)

    document = relationship("Document", back_populates="summaries")

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"))
    title = Column(String)
    difficulty = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    document = relationship("Document", back_populates="quizzes")
    questions = relationship("QuizQuestion", back_populates="quiz")

class QuizQuestion(Base):
    __tablename__ = "quiz_questions"
    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"))
    question_text = Column(Text)
    question_type = Column(String) # MCQ, TF, Short
    options = Column(JSON) # For MCQ
    correct_answer = Column(Text)

    quiz = relationship("Quiz", back_populates="questions")

class Flashcard(Base):
    __tablename__ = "flashcards"
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"))
    front = Column(Text)
    back = Column(Text)
    learned = Column(Boolean, default=False)

    document = relationship("Document", back_populates="flashcards")

class StudyPlan(Base):
    __tablename__ = "study_plans"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    exam_date = Column(DateTime)
    subjects = Column(JSON)
    study_hours = Column(Integer)
    plan_data = Column(JSON) # The generated plan

class ChatHistory(Base):
    __tablename__ = "chat_history"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    document_id = Column(Integer, ForeignKey("documents.id"))
    message = Column(Text)
    response = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class Analytics(Base):
    __tablename__ = "analytics"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    study_hours = Column(Float, default=0.0)
    documents_read = Column(Integer, default=0)
    quizzes_completed = Column(Integer, default=0)
    flashcards_reviewed = Column(Integer, default=0)
    last_active = Column(DateTime(timezone=True), onupdate=func.now())
