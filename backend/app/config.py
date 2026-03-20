from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # API配置
    API_V1_PREFIX: str = "/api"
    PROJECT_NAME: str = "保研申请助手"
    VERSION: str = "1.0.0"

    # 数据库配置
    DATABASE_URL: str = "sqlite:///./graduate_app.db"

    # JWT配置
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7天

    # AI配置
    ANTHROPIC_API_KEY: str = ""
    ANTHROPIC_BASE_URL: str = "https://api.anthropic.com"

    # 文件存储配置
    UPLOAD_DIR: str = "./uploads"
    OUTPUT_DIR: str = "./outputs"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB

    class Config:
        env_file = ".env"


settings = Settings()
