# mangekyou
[![codeclimate analysis](https://img.shields.io/codeclimate/github/frantic1048/mangekyou.svg?style=flat-square)](https://codeclimate.com/github/frantic1048/mangekyou)
[![travis-ci](https://img.shields.io/travis/frantic1048/mangekyou.svg?style=flat-square)](https://travis-ci.org/frantic1048/mangekyou)
[![david-dm](https://img.shields.io/david/frantic1048/mangekyou.svg?style=flat-square)](https://david-dm.org/frantic1048/mangekyou)

[作业]简单的图像处理程序。

# 目录结构

```
./
├── .babelrc          // 编译配置
├── .codeclimate.yml  // Code Climate 平台配置
├── .travis.yml       // Travis CI 平台配置
├── .eslintrc         // 静态分析配置
├── .gitignore        // git 忽略文件配置
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
