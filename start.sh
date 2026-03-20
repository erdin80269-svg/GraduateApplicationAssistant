#!/bin/bash

echo "========================================"
echo "保研申请助手 - 快速启动脚本 (Linux/Mac)"
echo "========================================"
echo

echo "[1/4] 检查Python环境..."
if ! command -v python3 &> /dev/null; then
    echo "错误: 未找到Python3，请先安装Python 3.10+"
    exit 1
fi

echo "[2/4] 设置后端环境..."
cd backend

if [ ! -d "venv" ]; then
    echo "创建虚拟环境..."
    python3 -m venv venv
fi

echo "激活虚拟环境..."
source venv/bin/activate

if [ ! -f ".env" ]; then
    echo "创建配置文件..."
    cp .env.example .env
    echo "请编辑 backend/.env 文件，配置API密钥等信息"
fi

echo "安装Python依赖..."
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

echo "初始化数据库..."
python -m app.init_data

echo "[3/4] 启动后端服务..."
python -m uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

echo "[4/4] 检查Node.js环境..."
cd ..
if ! command -v node &> /dev/null; then
    echo "警告: 未找到Node.js，请先安装Node.js 18+"
    exit 1
fi

echo "安装前端依赖..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi

echo "启动前端服务..."
npm run dev &
FRONTEND_PID=$!

echo
echo "========================================"
echo "启动完成！"
echo "========================================"
echo "前端地址: http://localhost:3000"
echo "后端地址: http://localhost:8000"
echo "API文档: http://localhost:8000/docs"
echo
echo "演示账号: demo / demo123"
echo
echo "按 Ctrl+C 停止所有服务"
echo

# 等待用户中断
wait
