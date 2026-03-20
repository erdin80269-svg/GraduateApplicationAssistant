from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.schemas.school import SchoolCreate, SchoolResponse, SchoolProgramCreate, SchoolProgramResponse
from app.schemas.material import MaterialCreate, MaterialResponse, MaterialGenerateRequest

__all__ = [
    "UserCreate", "UserLogin", "UserResponse",
    "SchoolCreate", "SchoolResponse", "SchoolProgramCreate", "SchoolProgramResponse",
    "MaterialCreate", "MaterialResponse", "MaterialGenerateRequest"
]
