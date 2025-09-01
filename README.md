# 建筑设计作品集网站

这是一个专业的建筑设计作品集网站，采用现代化的设计风格，参考OMA建筑事务所的网页设计理念。

## 🚀 功能特点

- **响应式设计**：支持桌面端和移动端
- **作品集展示**：专业的项目展示弹窗
- **AI助手**：智能对话系统
- **现代化UI**：简洁优雅的界面设计
- **易于配置**：通过配置文件快速自定义

## 📁 文件结构

```
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互功能
├── config.js           # 配置文件
├── README.md           # 说明文档
└── images/             # 图片资源
```

## ⚙️ 配置说明

### 1. 个人信息配置

在 `config.js` 文件中修改 `personal` 部分，包括姓名、联系方式、教育背景、技能等。

### 2. 作品集项目配置

在 `config.js` 文件中修改 `projects` 部分，包括项目名称、描述、图片、技术参数等。

### 3. 网站设置

修改网站标题、描述、关键词等基本信息。

## 📱 响应式设计

网站支持桌面端、平板端和移动端，采用移动优先的设计理念。

## 🔧 技术栈

- **HTML5**：语义化标记
- **CSS3**：现代CSS特性，包括Grid、Flexbox、CSS变量
- **JavaScript ES6+**：现代JavaScript语法
- **响应式设计**：移动优先的设计理念
- **CSS动画**：流畅的过渡和动画效果

## 📝 更新内容

### 根据PDF文件更新网站

1. **查看PDF内容**：仔细阅读您的作品集PDF文件
2. **提取关键信息**：个人信息、项目信息、技能和获奖情况
3. **更新配置文件**：将信息填入 `config.js` 文件
4. **替换图片**：将PDF中的项目图片保存到 `images/` 文件夹
5. **测试网站**：在浏览器中查看效果

## 🚀 部署说明

1. **本地测试**：使用本地服务器测试
2. **上传到服务器**：将所有文件上传到您的网站服务器
3. **域名配置**：配置您的域名指向服务器
4. **SSL证书**：建议配置HTTPS

---

**注意**：请根据您的实际作品集内容更新配置文件，确保信息的准确性和完整性。

## 🚀 功能特点

- **响应式设计**：支持桌面端和移动端
- **作品集展示**：专业的项目展示弹窗
- **AI助手**：智能对话系统
- **现代化UI**：简洁优雅的界面设计
- **易于配置**：通过配置文件快速自定义

## 📁 文件结构

```
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互功能
├── config.js           # 配置文件
├── README.md           # 说明文档
└── images/             # 图片资源
```

## ⚙️ 配置说明

### 1. 个人信息配置

在 `config.js` 文件中修改 `personal` 部分：

```javascript
personal: {
    name: "您的姓名",
    title: "建筑设计师 | 探索空间与形式的可能性",
    subtitle: "专注于可持续设计、空间叙事与城市更新",
    email: "your.email@example.com",
    wechat: "your_wechat",
    phone: "+86 138-0000-0000",
    location: "北京",
    education: {
        degree: "建筑学学士",
        school: "XX大学",
        major: "建筑设计专业",
        graduationYear: "2024",
        gpa: "3.8/4.0"
    },
    awards: [
        "XX建筑设计竞赛 一等奖",
        "XX大学优秀毕业生",
        "XX设计周 最佳概念奖"
    ],
    skills: {
        software: [
            "Rhino & Grasshopper",
            "AutoCAD",
            "SketchUp",
            "Lumion",
            "Photoshop & Illustrator",
            "Revit"
        ],
        design: [
            "参数化设计",
            "BIM建模",
            "可持续设计",
            "城市设计",
            "室内设计"
        ],
        languages: [
            "中文（母语）",
            "英语（流利）",
            "日语（基础）"
        ]
    },
    experience: [
        {
            company: "XX建筑设计事务所",
            position: "建筑设计师",
            duration: "2023.06 - 2024.01",
            description: "参与多个建筑设计项目，负责概念设计、方案深化和施工图设计"
        }
    ]
}
```

### 2. 作品集项目配置

在 `config.js` 文件中修改 `projects` 部分：

```javascript
projects: [
    {
        id: "project1",
        title: "项目名称",
        type: "项目类型",
        location: "项目地点",
        date: "项目时间",
        role: "您的角色",
        duration: "项目周期",
        status: "项目状态",
        description: "项目描述",
        concept: "设计理念",
        software: "使用软件",
        scale: "项目规模",
        highlights: "设计亮点",
        challenges: "设计挑战",
        solutions: "解决方案",
        coverImage: "封面图片URL",
        images: ["图片1", "图片2", "图片3"],
        tags: ["标签1", "标签2", "标签3"]
    }
]
```

### 3. 网站设置

```javascript
site: {
    title: "建筑设计作品集 | Portfolio",
    description: "个人建筑设计作品集网站，展示设计理念和项目作品",
    keywords: "建筑设计,作品集,建筑设计师,空间设计,城市规划,可持续设计",
    author: "您的姓名"
}
```

## 🎨 自定义样式

### 颜色主题

在 `styles.css` 文件中修改CSS变量：

```css
:root {
    --primary-white: #ffffff;
    --secondary-white: #fafafa;
    --light-gray: #f5f5f5;
    --medium-gray: #e0e0e0;
    --dark-gray: #333333;
    --accent-color: #E6B3FF;
    --accent-hover: #D19FFF;
    --text-primary: #1a1a1a;
    --text-secondary: #666666;
}
```

### 字体设置

网站使用 Inter 字体，您可以在 `styles.css` 中修改：

```css
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

## 📱 响应式设计

网站支持以下断点：
- **桌面端**：1200px+
- **平板端**：768px - 1199px
- **移动端**：< 768px

## 🔧 技术栈

- **HTML5**：语义化标记
- **CSS3**：现代CSS特性，包括Grid、Flexbox、CSS变量
- **JavaScript ES6+**：现代JavaScript语法
- **响应式设计**：移动优先的设计理念
- **CSS动画**：流畅的过渡和动画效果

## 📝 更新内容

### 根据PDF文件更新网站

1. **查看PDF内容**：仔细阅读您的作品集PDF文件
2. **提取关键信息**：
   - 个人信息（姓名、联系方式、教育背景等）
   - 项目信息（项目名称、描述、图片等）
   - 技能和获奖情况
3. **更新配置文件**：将信息填入 `config.js` 文件
4. **替换图片**：将PDF中的项目图片保存到 `images/` 文件夹
5. **测试网站**：在浏览器中查看效果

### 常见更新项目

- **个人信息**：姓名、邮箱、电话、地址
- **教育背景**：学校、专业、毕业年份
- **技能列表**：软件技能、设计技能、语言能力
- **获奖经历**：竞赛获奖、荣誉称号
- **工作经历**：公司、职位、工作内容
- **项目作品**：项目名称、描述、图片、技术参数

## 🚀 部署说明

1. **本地测试**：使用本地服务器（如 Live Server）测试
2. **上传到服务器**：将所有文件上传到您的网站服务器
3. **域名配置**：配置您的域名指向服务器
4. **SSL证书**：建议配置HTTPS

## 📞 技术支持

如果您在使用过程中遇到问题，请检查：

1. **浏览器兼容性**：建议使用现代浏览器（Chrome、Firefox、Safari、Edge）
2. **文件路径**：确保所有文件路径正确
3. **JavaScript控制台**：查看是否有错误信息
4. **网络连接**：确保图片和字体资源能够正常加载

## 📄 许可证

本项目采用 MIT 许可证，您可以自由使用和修改。

---

**注意**：请根据您的实际作品集内容更新配置文件，确保信息的准确性和完整性。

