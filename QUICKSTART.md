# 快速开始指南

## 方法一：使用启动脚本（推荐）

### Windows用户
双击运行 `start.bat` 脚本，脚本会自动完成以下操作：
- 检查Python和Node.js环境
- 创建Python虚拟环境
- 安装依赖
- 初始化数据库
- 启动后端和前端服务

### Linux/Mac用户
```bash
chmod +x start.sh
./start.sh
```

## 方法二：手动启动

### 1. 启动后端

```bash
cd backend

# 创建虚拟环境（首次运行）
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，配置API密钥

# 初始化数据库
python -m app.init_data

# 启动后端服务
python -m uvicorn main:app --reload --port 8000
```

后端服务将在 http://localhost:8000 启动

### 2. 启动前端

打开新的终端窗口：

```bash
cd frontend

# 安装依赖（首次运行）
npm install

# 启动开发服务器
npm run dev
```

前端服务将在 http://localhost:3000 启动

## 访问应用

- **前端应用**: http://localhost:3000
- **后端API**: http://localhost:8000
- **API文档**: http://localhost:8000/docs

## 演示账号

```
用户名: demo
密码: demo123
```

## 常见问题

### 问题1: Python安装失败
使用国内镜像源：
```bash
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### 问题2: npm安装失败
使用国内镜像源：
```bash
npm install --registry=https://registry.npmmirror.com
```

### 问题3: 端口被占用
修改启动命令中的端口号：
```bash
python -m uvicorn main:app --reload --port 8001
npm run dev -- -p 3001
```

### 问题4: 数据库初始化失败
删除现有的数据库文件后重新初始化：
```bash
cd backend
rm -f graduate_app.db  # Linux/Mac
del graduate_app.db     # Windows
python -m app.init_data
```

## 下一步

1. 访问 http://localhost:3000
2. 使用演示账号登录
3. 上传简历和选择目标学校
4. 生成申请材料

## 配置AI服务

编辑 `backend/.env` 文件：

```env
ANTHROPIC_API_KEY=your-api-key-here
ANTHROPIC_BASE_URL=https://api.anthropic.com
```

如果不配置，系统会使用示例模板生成内容。

## 开发说明

- 前端热重载：修改前端代码会自动刷新
- 后端热重载：修改后端代码会自动重启
- 数据库文件：`backend/graduate_app.db`
- 上传文件：`backend/uploads/`
- 生成文件：`backend/outputs/`
