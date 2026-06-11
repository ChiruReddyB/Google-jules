from langchain_openai import ChatOpenAI
from ..core.config import settings
from .vector_service import VectorService

class ChatService:
    def __init__(self):
        self.llm = ChatOpenAI(temperature=0.7, openai_api_key=settings.OPENAI_API_KEY)
        self.vector_service = VectorService()

    async def get_response(self, query: str, user_id: int, document_id: int = None):
        # Retrieve context
        results = self.vector_service.query(query, user_id, document_id)
        context = "\n".join(results['documents'][0])
        sources = results['metadatas'][0]

        prompt = f"""
        You are a helpful study assistant. Use the following pieces of context to answer the user's question.
        If you don't know the answer based on the context, just say that you don't know, don't try to make up an answer.

        Context:
        {context}

        Question: {query}

        Answer:"""

        response = self.llm.invoke(prompt)

        return {
            "answer": response.content,
            "sources": sources
        }
