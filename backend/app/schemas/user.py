from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(UserBase):
    id: int
    name: Optional[str]
    phone: Optional[str]
    university: Optional[str]
    major: Optional[str]
    gpa: Optional[str]
    created_at: datetime
    is_active: bool

    class Config:
        from_attributes = True
