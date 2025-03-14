# 幸福时刻生成器 - 开发指南

## 项目设置

### 安装依赖

首先，确保你已经安装了Node.js和npm，然后在frontend目录下运行：

```bash
# 安装依赖
npm install
```

## 开发

### 使用命令行开发

```bash
# 开发模式 (默认H5)
npm run dev

# 或者指定平台
npm run dev:h5         # H5
npm run dev:mp-weixin  # 微信小程序
npm run dev:app        # App
```

## 构建

### 构建H5版本

```bash
npm run build:h5
```

构建完成后，生成的文件将位于`dist/build/h5`目录下。

### 构建小程序

```bash
npm run build:mp-weixin
```

构建完成后，使用微信开发者工具打开`dist/dev/mp-weixin`目录。

### 构建APP

```bash
npm run build:app
```

## 项目结构

```
frontend/
├── src/                # 源代码目录
│   ├── pages/          # 页面文件
│   │   ├── index/      # 主页
│   │   ├── history/    # 历史记录页
│   │   └── detail/     # 详情页
│   ├── static/         # 静态资源
│   │   └── tailwind.css # Tailwind CSS样式
│   ├── App.vue         # 应用入口组件
│   ├── main.js         # 应用入口文件
│   ├── manifest.json   # 应用配置文件
│   └── pages.json      # 页面路由配置
├── vite.config.js      # Vite配置文件
└── package.json        # 项目配置文件
```

## 数据存储

项目使用UniApp的本地存储API来保存事件数据：

- `uni.setStorageSync('happyEvents', events)` - 保存事件列表
- `uni.getStorageSync('happyEvents')` - 获取事件列表
- `uni.removeStorageSync('currentEventId')` - 移除当前事件ID

## 图片API

项目使用Pollinations.ai的API来生成与事件相关的图片：

```
https://image.pollinations.ai/prompt/{encodedPrompt}
```

其中`{encodedPrompt}`是URL编码后的事件描述文本。 