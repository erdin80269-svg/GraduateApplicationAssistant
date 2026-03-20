# GitHub Pages 部署指南

本指南将帮助您将保研申请助手部署到 GitHub Pages，这样就可以通过浏览器直接访问了。

## 🚀 快速部署步骤

### 步骤 1：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建一个新仓库，命名为 `GraduateApplicationAssistant`
3. 设置为 Public（公开）或 Private（私有都可以）
4. **不要**勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

### 步骤 2：上传项目到 GitHub

打开命令行（在项目根目录），执行以下命令：

```bash
cd D:/GraduateApplicationAssistant

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit - 保研申请助手"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/GraduateApplicationAssistant.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 3：启用 GitHub Pages

1. 访问你的仓库页面（https://github.com/YOUR_USERNAME/GraduateApplicationAssistant）
2. 点击 **Settings**（设置）标签
3. 在左侧菜单中找到 **Pages**
4. 在 "Build and deployment" 下：
   - Source 选择 **GitHub Actions**
5. 点击 **Save**

### 步骤 4：等待部署完成

1. 点击 **Actions** 标签查看部署进度
2. 等待几分钟，部署完成后会显示绿色✅
3. 点击 **Pages** 标签，会显示访问地址

### 步骤 5：访问你的网站

访问地址通常是：
```
https://YOUR_USERNAME.github.io/GraduateApplicationAssistant/
```

## 📝 常见问题

### 问题 1：部署失败

**解决方案**：
- 检查 `frontend-demo/package.json` 是否存在
- 确认 `frontend-demo/out` 目录是否正确生成
- 查看 Actions 日志了解具体错误

### 问题 2：页面空白

**解决方案**：
- 清除浏览器缓存
- 检查 `next.config.ts` 中的 `basePath` 配置
- 确认 GitHub Pages URL 是否正确

### 问题 3：样式丢失

**解决方案**：
- 确认 `tailwind.config.ts` 配置正确
- 检查 `app/globals.css` 是否存在

### 问题 4：更新后网站不刷新

**解决方案**：
- 推送新代码后，GitHub Actions 会自动重新部署
- 等待 2-3 分钟后刷新页面
- 强制刷新（Ctrl + F5 或 Cmd + Shift + R）

## 🔧 本地开发和测试

在推送到 GitHub 之前，你可以先在本地测试：

```bash
cd D:/GraduateApplicationAssistant/frontend-demo

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 进行测试。

## 📦 更新网站

当你修改代码后，只需：

```bash
git add .
git commit -m "描述你的更改"
git push
```

GitHub Actions 会自动部署你的更改。

## 🌐 自定义域名（可选）

如果你有自己的域名：

1. 在仓库的 Settings → Pages 中
2. 在 "Custom domain" 输入你的域名
3. 配置你的域名 DNS：
   - 添加 CNAME 记录指向 `YOUR_USERNAME.github.io`
4. 等待 DNS 生效（可能需要几小时）

## 📊 项目结构说明

```
GraduateApplicationAssistant/
├── frontend-demo/          # 前端演示版（部署到 GitHub Pages）
│   ├── app/
│   │   ├── page.tsx       # 主页面
│   │   ├── layout.tsx     # 布局
│   │   └── globals.css    # 样式
│   ├── out/               # 构建输出（自动生成）
│   └── package.json
├── frontend/              # 完整前端（需要后端）
├── backend/              # 后端（需要 Python 环境）
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions 配置
```

## 🎯 下一步

部署成功后，你可以：

1. 分享网址给朋友测试
2. 继续添加新功能
3. 连接真实的 AI API（需要后端）
4. 优化用户体验

## 💡 提示

- GitHub Pages 是免费的，非常适合个人项目展示
- 部署过程可能需要 2-5 分钟
- 每次推送代码都会自动重新部署
- 可以在 Settings → Pages 中查看访问统计

## 🆘 需要帮助？

如果遇到问题，可以：
1. 查看 GitHub Actions 的详细日志
2. 搜索 GitHub Pages 文档
3. 在 GitHub Issues 中提问

---

**祝你部署成功！** 🎉
