from langchain_openai import ChatOpenAI
from ..core.config import settings

class PlannerService:
    def __init__(self):
        self.llm = ChatOpenAI(temperature=0.5, openai_api_key=settings.OPENAI_API_KEY)

    async def generate_study_plan(self, subjects: list, exam_date: str, study_hours: int):
        prompt = f"""
        Create a detailed study plan for the following subjects: {', '.join(subjects)}.
        Exam Date: {exam_date}.
        Available daily study hours: {study_hours}.
        Include a daily schedule, weekly goals, and revision intervals.
        """
        response = self.llm.invoke(prompt)
        return response.content

    async def generate_exam_prep(self, text: str):
        prompt = f"""
        Based on the following study materials, generate:
        1. Most Important Questions
        2. Expected Exam Questions
        3. Revision Notes
        4. Last Minute Revision Sheet

        Text: {text[:4000]}
        """
        response = self.llm.invoke(prompt)
        return response.content
