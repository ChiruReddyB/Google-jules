from langchain_openai import ChatOpenAI
from langchain.chains.summarize import load_summarize_chain
from langchain.docstore.document import Document as LangchainDocument
from ..core.config import settings

class Summarizer:
    def __init__(self):
        self.llm = ChatOpenAI(temperature=0, openai_api_key=settings.OPENAI_API_KEY)

    async def generate_summaries(self, text: str):
        docs = [LangchainDocument(page_content=text)]

        # Simple implementation for brevity, in production would use more complex chains
        short_summary = await self._summarize(text, "Write a summary in about 100 words.")
        medium_summary = await self._summarize(text, "Write a summary in about 300 words.")
        detailed_summary = await self._summarize(text, "Write a detailed summary in about 1000 words.")

        key_takeaways = await self._extract_list(text, "Extract the key takeaways as a bulleted list.")
        important_concepts = await self._extract_list(text, "List the most important concepts discussed.")

        return {
            "short": short_summary,
            "medium": medium_summary,
            "detailed": detailed_summary,
            "takeaways": key_takeaways,
            "concepts": important_concepts
        }

    async def _summarize(self, text: str, prompt: str):
        # Implementation placeholder
        response = self.llm.invoke(f"{prompt}\n\nContent: {text[:4000]}") # Truncate for demo
        return response.content

    async def _extract_list(self, text: str, prompt: str):
        response = self.llm.invoke(f"{prompt}\n\nContent: {text[:4000]}")
        return response.content.split("\n")
