// 监听回调函数
const listeners = {};

// 事件分发
function dispatchEvent(tabInfo, tab) {
  const { menuItemId } = tabInfo;

  let callBack;

  Object.keys(listeners).forEach((key) => {
    if (key === menuItemId) {
      callBack = listeners[key];
    }
  });

  if (callBack) {
    callBack(tabInfo, tab);
  }
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.onClicked.addListener(function (tabInfo, tab) {
    dispatchEvent(tabInfo, tab);
  });
});
function create({ id, title, contexts, onclick }) {
  chrome.contextMenus.create({ id, title, contexts });
  if (listeners[id]) {
    console.warn("Duplicate to create contextMenu!");
  }
  listeners[id] = onclick;
}
export { create };
