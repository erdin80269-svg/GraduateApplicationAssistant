from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.school import School, SchoolProgram
from app.schemas.school import SchoolCreate, SchoolResponse, SchoolProgramCreate, SchoolProgramResponse

router = APIRouter()


@router.get("", response_model=List[SchoolResponse])
async def get_schools(
    level: str = None,
    location: str = None,
    db: Session = Depends(get_db)
):
    """获取学校列表，支持按级别和地点筛选"""
    query = db.query(School)

    if level:
        query = query.filter(School.level == level)
    if location:
        query = query.filter(School.location.like(f"%{location}%"))

    return query.all()


@router.get("/{school_id}", response_model=SchoolResponse)
async def get_school(school_id: int, db: Session = Depends(get_db)):
    """获取学校详情"""
    school = db.query(School).filter(School.id == school_id).first()
    if not school:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="学校不存在"
        )
    return school


@router.post("", response_model=SchoolResponse, status_code=status.HTTP_201_CREATED)
async def create_school(school: SchoolCreate, db: Session = Depends(get_db)):
    """创建学校"""
    db_school = School(**school.model_dump())
    db.add(db_school)
    db.commit()
    db.refresh(db_school)
    return db_school


@router.get("/{school_id}/programs", response_model=List[SchoolProgramResponse])
async def get_school_programs(school_id: int, db: Session = Depends(get_db)):
    """获取学校的所有项目"""
    programs = db.query(SchoolProgram).filter(SchoolProgram.school_id == school_id).all()
    return programs


@router.get("/programs/{program_id}", response_model=SchoolProgramResponse)
async def get_program(program_id: int, db: Session = Depends(get_db)):
    """获取项目详情"""
    program = db.query(SchoolProgram).filter(SchoolProgram.id == program_id).first()
    if not program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="项目不存在"
        )
    return program


@router.post("/programs", response_model=SchoolProgramResponse, status_code=status.HTTP_201_CREATED)
async def create_program(program: SchoolProgramCreate, db: Session = Depends(get_db)):
    """创建学校项目"""
    # 检查学校是否存在
    school = db.query(School).filter(School.id == program.school_id).first()
    if not school:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="学校不存在"
        )

    db_program = SchoolProgram(**program.model_dump())
    db.add(db_program)
    db.commit()
    db.refresh(db_program)
    return db_program
