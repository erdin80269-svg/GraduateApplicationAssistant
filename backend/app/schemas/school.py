from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class SchoolBase(BaseModel):
    name: str
    level: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    highlights: Optional[List[str]] = []


class SchoolCreate(SchoolBase):
    pass


class SchoolResponse(SchoolBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class SchoolProgramBase(BaseModel):
    school_id: int
    name: str
    description: Optional[str] = None
    requirements: Optional[List[str]] = []
    preferred_background: Optional[List[str]] = []
    material_order: Optional[List[str]] = []
    ps_style: Optional[str] = "academic"
    ps_tone: Optional[str] = "formal"


class SchoolProgramCreate(SchoolProgramBase):
    pass


class SchoolProgramResponse(SchoolProgramBase):
    id: int
    school: Optional[SchoolResponse]
    created_at: datetime

    class Config:
        from_attributes = True
