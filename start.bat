@echo off
echo ========================================
echo 保研申请助手 - 快速启动脚本
echo ========================================
echo.

echo [1/4] 检查Python环境...
python --version >nul 2>&1
if errorlevel 1 (
    echo 错误: 未找到Python，请先安装Python 3.10+
    pause
    exit /b 1
)

echo [2/4] 设置后端环境...
cd backend
if not exist venv (
    echo 创建虚拟环境...
    python -m venv venv
)

echo 激活虚拟环境...
call venv\Scripts\activate

if not exist .env (
    echo 创建配置文件...
    copy .env.example .env
    echo 请编辑 backend\.env 文件，配置API密钥等信息
)

echo 安装Python依赖...
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

echo 初始化数据库...
python -m app.init_data

echo [3/4] 启动后端服务...
start cmd /k "cd /d %~dp0backend && call venv\Scripts\activate && python -m uvicorn main:app --reload --port 8000"

echo [4/4] 检查Node.js环境...
cd ..
node --version >nul 2>&1
if errorlevel 1 (
    echo 警告: 未找到Node.js，请先安装Node.js 18+
    pause
    exit /b 1
)

echo 安装前端依赖...
cd frontend
if not exist node_modules (
    call npm install
)

echo 启动前端服务...
start cmd /k "cd /d %~dp0frontend && call npm run dev"

echo.
echo ========================================
echo 启动完成！
echo ========================================
echo 前端地址: http://localhost:3000
echo 后端地址: http://localhost:8000
echo API文档: http://localhost:8000/docs
echo.
echo 演示账号: demo / demo123
echo.
echo 按任意键关闭此窗口（服务将继续运行）...
pause >nul
