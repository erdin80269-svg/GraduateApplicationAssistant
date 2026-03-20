from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime


class MaterialBase(BaseModel):
    material_type: str  # ps/recommendation_letter/research_plan/ppt/merged_pdf
    title: Optional[str] = None
    parameters: Optional[Dict[str, Any]] = {}


class MaterialCreate(MaterialBase):
    user_id: int
    school_program_id: Optional[int] = None


class MaterialGenerateRequest(BaseModel):
    resume_content: str  # 简历内容
    user_info: Dict[str, Any]  # 用户信息
    school_program_id: int  # 学校项目ID
    material_type: str  # ps/recommendation_letter/research_plan/ppt
    parameters: Dict[str, Any]  # 参数，如word_count, style等


class MaterialResponse(MaterialBase):
    id: int
    user_id: int
    school_program_id: Optional[int]
    content: Optional[str]
    word_count: Optional[int]
    file_path: Optional[str]
    file_size: Optional[int]
    status: str
    error_message: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
