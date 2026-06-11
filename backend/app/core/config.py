from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://user:password@localhost/studybuddy"
    CHROMA_DB_PATH: str = "./chroma_db"
    FIREBASE_SERVICE_ACCOUNT: str = ""
    OPENAI_API_KEY: str = ""
    SECRET_KEY: str = "supersecretkey"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
