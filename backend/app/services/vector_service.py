import chromadb
from chromadb.config import Settings as ChromaSettings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
from ..core.config import settings
import uuid

class VectorService:
    def __init__(self):
        self.client = chromadb.PersistentClient(path=settings.CHROMA_DB_PATH)
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100
        )

    def process_and_store(self, text: str, document_id: int, user_id: int):
        chunks = self.text_splitter.split_text(text)
        collection = self.client.get_or_create_collection(name=f"user_{user_id}_docs")

        embeddings = self.model.encode(chunks).tolist()
        ids = [str(uuid.uuid4()) for _ in chunks]
        metadatas = [{"document_id": document_id} for _ in chunks]

        collection.add(
            ids=ids,
            embeddings=embeddings,
            documents=chunks,
            metadatas=metadatas
        )
        return len(chunks)

    def query(self, query_text: str, user_id: int, document_id: int = None, n_results: int = 5):
        collection = self.client.get_or_create_collection(name=f"user_{user_id}_docs")
        query_embedding = self.model.encode([query_text]).tolist()

        where = {}
        if document_id:
            where = {"document_id": document_id}

        results = collection.query(
            query_embeddings=query_embedding,
            n_results=n_results,
            where=where
        )
        return results
