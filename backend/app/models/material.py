from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Material(Base):
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    school_program_id = Column(Integer, ForeignKey("school_programs.id"))

    # 材料类型
    material_type = Column(String(50))  # ps/recommendation_letter/research_plan/ppt/merged_pdf

    # 内容
    title = Column(String(200))
    content = Column(Text)  # 生成的内容
    word_count = Column(Integer)  # 字数限制

    # 参数
    parameters = Column(JSON)  # {"style": "academic", "word_count": 800}

    # 文件信息
    file_path = Column(String(500))
    file_size = Column(Integer)

    # 状态
    status = Column(String(20), default="pending")  # pending/generating/completed/failed
    error_message = Column(Text)

    # 时间戳
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # 关系
    user = relationship("User")
    school_program = relationship("SchoolProgram")


class MaterialTemplate(Base):
    __tablename__ = "material_templates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    material_type = Column(String(50), nullable=False)  # ps/recommendation_letter/research_plan/ppt
    description = Column(Text)

    # 模板内容
    template = Column(Text)
    structure = Column(JSON)  # PS的结构模板
    prompts = Column(JSON)  # 生成提示词模板

    # 适用场景
   适用场景 = Column(JSON)  # ["985", "211", "双一流"]

    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
