from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import materials, schools, users

app = FastAPI(
    title="保研申请助手 API",
    description="智能生成保研申请材料后端服务",
    version="1.0.0"
)

# CORS配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 路由注册
app.include_router(users.router, prefix="/api/users", tags=["用户"])
app.include_router(schools.router, prefix="/api/schools", tags=["学校"])
app.include_router(materials.router, prefix="/api/materials", tags=["材料"])


@app.get("/")
async def root():
    return {"message": "保研申请助手 API", "version": "1.0.0"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
