from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class School(Base):
    __tablename__ = "schools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False, index=True)
    level = Column(String(20))  # 985/211/双一流
    location = Column(String(100))
    website = Column(String(500))

    # 学校亮点
    highlights = Column(JSON)  # ["985院校", "A+学科", "地理位置优越"]

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # 关系
    programs = relationship("SchoolProgram", back_populates="school", cascade="all, delete-orphan")


class SchoolProgram(Base):
    __tablename__ = "school_programs"

    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(Integer, ForeignKey("schools.id"), nullable=False)
    name = Column(String(200), nullable=False)  # 例如：商学院、计算机学院
    description = Column(Text)

    # 申请要求
    requirements = Column(JSON)  # ["GPA 3.5+", "英语六级500+", "有科研经历"]
    preferred_background = Column(JSON)  # 偏好背景

    # 材料清单及排序
    material_order = Column(JSON)  # ["申请表", "个人陈述", "推荐信", "成绩单", ...]

    # 文书风格偏好
    ps_style = Column(String(50))  # academic/practical/balanced
    ps_tone = Column(String(50))  # formal/warm/innovative

    # 创建和更新时间
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # 关系
    school = relationship("School", back_populates="programs")
