# browser-make-nodes

使用 react + antd 开发 chrome-extension 的脚手架工程，具有热加载功能。

选择页面中的内容后，通过点击鼠标右键，可进行笔记添加。

## 特性

1. 使用 antd + react 开发 chrome extension。
2. 解决了当前页面与 content-script 间的 css 污染问题。
3. 增加开发模式，提供 chrome extension 热更新功能。

## 使用

```
npm run start
```

启动开发模式，在 chrome 浏览器中加载该应用的 dist 目录，此时 dist 目录下的文件具有热更新功能，并且会自动刷新当前页面。

```
npm run build
```

打包模式，不赘述。
