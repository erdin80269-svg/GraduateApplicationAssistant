# 保研申请助手

智能生成保研申请材料的AI助手，帮助保研学生快速生成个人陈述、推荐信、研究计划书等申请材料。

## 功能特性

- 📄 **智能文档生成**
  - 个人陈述（支持300/500/800/1000字）
  - 推荐信（教授/导师/实习主管）
  - 研究计划书（学术型/应用型/综合型）
  - 个人介绍PPT

- 🎓 **学校项目库**
  - 热门985/211院校信息
  - 项目要求和偏好
  - 申请材料清单及排序

- 📋 **材料汇总**
  - 自动整合申请材料
  - 按学校要求排序
  - 生成完整PDF包

## 技术栈

### 前端
- Next.js 15
- React 19
- Tailwind CSS
- TypeScript

### 后端
- FastAPI
- Python 3.10+
- SQLAlchemy
- SQLite（可升级到PostgreSQL）

### AI服务
- Claude API / GPT-4

### 文件处理
- python-pptx (PPT生成)
- reportlab (PDF生成)
- PyPDF2 (PDF合并)

## 快速开始

### 前置要求
- Node.js 18+
- Python 3.10+
- npm

### 安装后端

```bash
cd backend

# 创建虚拟环境（可选）
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 复制环境变量文件
cp .env.example .env

# 编辑 .env 文件，配置API密钥等信息
# vim .env

# 初始化数据库
python -m app.init_data

# 启动后端服务
python -m uvicorn main:app --reload --port 8000
```

后端服务将在 http://localhost:8000 启动

API文档: http://localhost:8000/docs

### 安装前端

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端服务将在 http://localhost:3000 启动

## 项目结构

```
GraduateApplicationAssistant/
├── frontend/              # Next.js前端
│   ├── app/              # App Router页面
│   ├── components/       # React组件
│   ├── lib/              # 工具函数
│   └── public/           # 静态资源
├── backend/              # Python后端
│   ├── app/
│   │   ├── api/          # API路由
│   │   ├── models/       # 数据库模型
│   │   ├── schemas/      # Pydantic模型
│   │   ├── config.py     # 配置
│   │   └── database.py   # 数据库
│   ├── uploads/          # 上传文件
│   └── outputs/          # 生成文件
└── shared/               # 共享类型和工具
```

## API接口

### 用户相关
- `POST /api/users/register` - 用户注册
- `POST /api/users/login` - 用户登录
- `GET /api/users/me` - 获取当前用户信息
- `PUT /api/users/me` - 更新用户信息

### 学校相关
- `GET /api/schools` - 获取学校列表
- `GET /api/schools/{id}` - 获取学校详情
- `GET /api/schools/{id}/programs` - 获取学校项目列表
- `POST /api/schools` - 创建学校（管理员）

### 材料相关
- `POST /api/materials/generate` - 生成申请材料
- `GET /api/materials` - 获取材料列表
- `GET /api/materials/{id}` - 获取材料详情

## 演示账号

```
用户名: demo
密码: demo123
```

## 开发计划

### 已完成 ✅
- [x] 项目基础架构
- [x] 数据库模型设计
- [x] 用户系统API
- [x] 学校项目库API
- [x] 材料生成API框架

### 进行中 🚧
- [ ] 前端UI完善
- [ ] AI集成（Claude API）
- [ ] 文件上传功能
- [ ] PPT生成功能

### 待完成 📋
- [ ] PDF合并功能
- [ ] 用户认证（JWT）
- [ ] 材料预览和编辑
- [ ] 部署优化

## 配置说明

编辑 `backend/.env` 文件：

```env
# 数据库配置
DATABASE_URL=sqlite:///./graduate_app.db

# AI配置
ANTHROPIC_API_KEY=your-api-key-here
ANTHROPIC_BASE_URL=https://api.anthropic.com

# JWT配置
SECRET_KEY=your-secret-key-change-in-production
```

## 常见问题

**Q: 如何更换AI服务？**
A: 编辑 `backend/app/api/materials.py` 中的生成函数，替换为你需要的AI API。

**Q: 如何添加新学校？**
A: 使用API `POST /api/schools` 或直接修改 `backend/app/init_data.py`。

**Q: 如何自定义文书模板？**
A: 修改 `backend/app/api/materials.py` 中的prompt模板，或添加新的MaterialTemplate。

## 许可证

MIT

## 联系方式

如有问题或建议，欢迎提交Issue。
