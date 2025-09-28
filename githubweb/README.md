# ASimpleStarGazer Web

一个为开源项目 **ASimpleStarGazer** 打造的宇宙风单页展示站点。项目基于 Vite、React、Tailwind CSS、shadcn/ui 与 Framer Motion，目标是展示核心能力、团队与文档，并引导访客体验 Demo、为仓库加星或订阅更新。

## ✨ 亮点特性
- 沉浸式首屏，内含视差星空背景（`packages/assets/images/banner3.png`）与 GitHub 行动按钮。
- 各版块均为独立 React 组件（位于 `src/sections`），方便维护与扩展。
- UI 基于 shadcn/ui 风格组件（`src/components/ui`），配合 Tailwind 提供一致设计语言。
- 使用 Framer Motion 实现平滑的进场、滚动动画，营造未来感体验。
- 桌面 / 平板 / 移动响应式布局，并兼顾可访问性（语义标签、键盘导航、焦点样式）。
- 订阅表单接入 Formspree，可按需启用；支持可选的 GitHub Star 实时读数。

## 🚀 快速开始

```bash
npm install
npm run dev
```

开发服务器默认运行于 <http://localhost:5173>，支持 HMR 热更新。

### 常用脚本
- `npm run dev` —— 启动开发服务器
- `npm run build` —— 类型检查并构建生产包
- `npm run preview` —— 预览生产构建结果
- `npm run lint` —— 执行 ESLint 检查

## 🧱 项目结构

```
├─ packages/assets/images/     # 提供横幅与图标占位素材
├─ public/                     # 原样输出的静态资源
├─ src/
│  ├─ components/
│  │  ├─ SiteHeader.tsx        # 顶部导航
│  │  └─ ui/                   # shadcn 风格组件
│  ├─ lib/utils.ts             # 工具函数（class 合并）
│  ├─ sections/                # 各个页面区块组件
│  ├─ App.tsx                  # 页面组合
│  └─ main.tsx                 # 应用入口 & 字体引入
├─ tailwind.config.ts|js       # Tailwind 主题与插件配置
└─ vite.config.ts              # Vite 配置（别名、GitHub Pages base 等）
```

## 🔧 配置指南

| 配置项 | 文件位置 | 说明 |
| --- | --- | --- |
| 品牌色 & 字体 | `tailwind.config.ts` / `tailwind.config.js` | 已预置宇宙主题配色 (#0B1E3D / #6E4AFF / #FFD66B) 与 Inter 字体 |
| Formspree 表单 | `.env`（需自行创建） | 新增 `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/yourFormId` 后启用订阅表单 |
| GitHub 链接 | `src/sections/*.tsx` | 若仓库地址有变，可统一替换相关链接 |

创建 `.env` 文件（不会被 Git 跟踪）：

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/yourFormId
```

## 📄 GitHub Pages 部署

1. **设置 base 路径**（若部署到项目页而非用户根域）：
   - 可在 `package.json` 增加 `"homepage": "https://<用户名>.github.io/<仓库名>/"`（辅助部分工具）。
   - 构建前设置环境变量，例如 PowerShell：`set VITE_BASE_PATH=/ASimpleStarGazer/`。

2. **新增 GitHub Actions 工作流**（`.github/workflows/deploy.yml`）：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - name: Install dependencies
        run: npm install
      - name: Build
        run: |
          echo "VITE_BASE_PATH=/ASimpleStarGazer/" >> $GITHUB_ENV
          npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - name: Deploy
        id: deploy
        uses: actions/deploy-pages@v4
```

3. 在仓库的 **Settings → Pages** 中选择 “GitHub Actions” 作为部署来源。
4. 首次工作流成功执行后，站点将发布在 `https://<用户名>.github.io/ASimpleStarGazer/`。

## ✅ 可访问性与测试
- 使用语义化标题、`aria-labelledby`、图片 alt 属性，提升可访问性。
- 顶部导航支持键盘访问，移动端抽屉菜单适配触控操作。
- Framer Motion 动画可结合 `prefers-reduced-motion` 做进一步优化（当前已降低动画侵入性）。
- 部署前建议执行 `npm run build`，确保类型检查与构建流程通过。

## 🤝 贡献指南
1. Fork 仓库并创建功能分支。
2. 开发完成后运行 `npm run lint`、`npm run build` 确认无警告与错误。
3. 如涉及 UI 或配置变更，请同步更新 README。

祝你观星愉快，拥抱每一次启程的星尘！🌌
