# mangekyou
![license](https://img.shields.io/github/license/frantic1048/mangekyou.svg?style=flat-square)
[![npmjs version](https://img.shields.io/npm/v/mangekyou.svg?style=flat-square)](https://www.npmjs.com/package/mangekyou)

[![codeclimate analysis](https://img.shields.io/codeclimate/github/frantic1048/mangekyou.svg?style=flat-square)](https://codeclimate.com/github/frantic1048/mangekyou)
[![travis-ci](https://img.shields.io/travis/frantic1048/mangekyou.svg?style=flat-square)](https://travis-ci.org/frantic1048/mangekyou)
[![david-dm](https://img.shields.io/david/frantic1048/mangekyou.svg?style=flat-square)](https://david-dm.org/frantic1048/mangekyou)

:stars:简易图像处理程序。

# 功能

- 采样：自定义距离重采样
- 量化：RGB 通道 1~256 级量化
- 灰度化（HSL，HSY，平均值，最大值，最小值）
- 位平面：RGB 通道分别 8 级量化后的位平面
- 直方图和统计信息：R/G/B/Rec. 709 4 个通道的直方图及详细信息
- 直方图均衡化：HSL、HSV、HSY 三种空间亮度通道均衡
- 二值图：HSL、HSV、HSY 三种空间亮度通道为阈值的二值图。

# 使用

## 桌面程序

```bash
# 从 npm 安装
npm i -g mangekyou

# 运行
mangekyou
```

## 现代浏览器

访问：[http://frantic1048.github.io/mangekyou](http://frantic1048.github.io/mangekyou)

# 目录结构

```
./
├── .babelrc          // 编译配置
├── .codeclimate.yml  // Code Climate 平台配置
├── .travis.yml       // Travis CI 平台配置
├── .eslintrc         // 静态分析配置
├── .gitignore        // git 忽略文件设定
├── .npmignore        // npm 忽略文件设定
├── gulpfile.babel.js // 构建配置
├── LICENSE           // 发布协议
├── package.json      // 依赖信息
├── README.md         // 自述文档
└── src               // 源代码目录
    └── app
        ├── index.html    // 界面基底
        ├── main.js       // 主程序入口
        ├── script
        │   ├── entry.js    // 界面程序入口
        │   ├── app.jsx     // 主窗口
        │   ├── keyMap.js   // 键盘映射配置
        │   ├── component   // 界面组件目录
        │   │  └── tool    // 各种算法对应的控件目录
        │   ├── constant    // 程序常量
        │   ├── action      // Flux 架构的 Action
        │   ├── dispatcher  // Flux 架构的 Dispatcher
        │   ├── store       // Flux 架构的 Store
        │   └── worker         // 处理计算的程序目录
        │       ├── worker.js  // 计算程序入口
        │       ├── util.js    // 通用算法模块
        │       └── ....js     // 文件名对应相关算法
        └── style // 界面样式表目录
```

# 构建

环境需求：

- Node.js，最新稳定版本
- npm，最新稳定版本
- git

```bash
#克隆代码到本地
git clone --depth=1 https://github.com/frantic1048/mangekyou.git
cd mangekyou

# 开始构建
gulp ci

# 运行
npm run run
```
