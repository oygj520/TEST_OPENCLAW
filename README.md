# Test OA System

企业级OA系统前端项目

## 功能模块

- 用户认证
- 仪表盘
- 员工管理
- 请假/加班申请
- 公告管理
- 个人中心

## 技术栈

- Vue 3
- TypeScript
- Tailwind CSS
- Vite
- Naive UI

## 启动项目

```bash
npm install
npm run dev
```

## API对接

后端API文档请参考：[后端仓库地址]

### API前缀
```
/api
```

### 主要接口
- `POST /api/auth/login` - 登录
- `GET /api/users` - 员工列表
- `POST /api/leave` - 请假申请
- `GET /api/announcements` - 公告列表

## 项目结构
```
src/
├── api/          # API接口定义
├── components/   # 公共组件
├── utils/        # 工具函数
├── router/       # 路由配置
├── store/        # 状态管理
├── views/        # 页面组件
├── types/        # TypeScript类型定义
└── styles/       # 样式文件
```

## 开发规范

- 使用 TypeScript 类型安全
- 组件命名采用 PascalCase
- API 请求使用 axios 统一封装
- 权限控制基于角色
