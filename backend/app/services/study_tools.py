from langchain_openai import ChatOpenAI
from ..core.config import settings
import json

class StudyToolsService:
    def __init__(self):
        self.llm = ChatOpenAI(temperature=0.8, openai_api_key=settings.OPENAI_API_KEY)

    async def generate_quiz(self, text: str, difficulty: str = "Medium"):
        prompt = f"""
        Generate a quiz based on the following text.
        The quiz should have 5 Multiple Choice Questions, 3 True/False questions, and 2 Short Answer questions.
        Difficulty level: {difficulty}.
        Format the output as a JSON object with a list of questions, each having text, type, options (for MCQ), and correct_answer.

        Text: {text[:4000]}
        """
        response = self.llm.invoke(prompt)
        # In a real app, you'd use a parser here
        return response.content

    async def generate_flashcards(self, text: str):
        prompt = f"""
        Generate 10 flashcards based on the following text.
        Each flashcard should have a front (question/term) and a back (answer/definition).
        Format the output as a JSON array of objects with 'front' and 'back' fields.

        Text: {text[:4000]}
        """
        response = self.llm.invoke(prompt)
        return response.content
