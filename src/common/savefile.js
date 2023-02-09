export function doDownloadFile(stringData) {
  // dada 表示要转换的字符串数据，type 表示要转换的数据格式
  const blob = new Blob([stringData], {
    type: "text/markdown",
  });
  // 根据 blob生成 url链接
  const objectURL = URL.createObjectURL(blob);

  // 创建一个 a 标签Tag
  const aTag = document.createElement("a");
  // 设置文件的下载地址
  aTag.href = objectURL;
  // 设置保存后的文件名称
  aTag.download = "markdown文件.md";
  // 给 a 标签添加点击事件
  aTag.click();
  // 释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
  // 当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
  URL.revokeObjectURL(objectURL);
}
