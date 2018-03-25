# 微信小游戏

1. 游戏开发是面向对象 浏览器是面向过程

    game.js 是游戏全局的入口文件，必须
    main.js 程序主类 初始化canvas和全局对象，各个精灵绑定点击事件
    director.js 程序导演类，用来控制游戏的逻辑和精灵的创建与销毁，控制游戏主循环
    dataStore.js 存储游戏需要长期保存的变量和需要定时销毁的变量
    resources.js 游戏资源的数组
    resourcesLoader.js 资源加载器，保证游戏是在图片加载完成后开始主循环
    sprite.js 游戏精灵的基类，背景，陆地等

```html
<script type='module' src='game.js'></script>
<!-- 加载es6 import -->
```