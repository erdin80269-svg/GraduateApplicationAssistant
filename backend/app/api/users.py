from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserResponse

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    """用户注册"""
    # 检查用户名是否已存在
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="用户名已存在"
        )

    # 检查邮箱是否已存在
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="邮箱已被注册"
        )

    # 创建新用户
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


@router.post("/login")
async def login(user: UserLogin, db: Session = Depends(get_db)):
    """用户登录"""
    db_user = db.query(User).filter(User.username == user.username).first()

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="用户名或密码错误"
        )

    if not db_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="账户已被禁用"
        )

    # TODO: 生成并返回JWT token
    return {
        "message": "登录成功",
        "user": UserResponse.model_validate(db_user)
    }


@router.get("/me", response_model=UserResponse)
async def get_current_user(current_user: User = Depends(get_db)):
    """获取当前用户信息"""
    # TODO: 从JWT token中获取用户ID
    return current_user


@router.put("/me", response_model=UserResponse)
async def update_user(
    name: str = None,
    phone: str = None,
    university: str = None,
    major: str = None,
    gpa: str = None,
    db: Session = Depends(get_db)
):
    """更新用户信息"""
    # TODO: 从JWT token中获取用户ID
    # 这里简化处理，实际需要从token中获取user_id
    user_id = 1

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="用户不存在"
        )

    if name is not None:
        user.name = name
    if phone is not None:
        user.phone = phone
    if university is not None:
        user.university = university
    if major is not None:
        user.major = major
    if gpa is not None:
        user.gpa = gpa

    db.commit()
    db.refresh(user)

    return user
