import { backgroundClient, ChromeMessage, removeStorage } from "../chrome";
import { create } from "../chrome/contextMenus";

export default class Background {
  constructor() {
    this.init();
  }

  init() {
    this.initContentMenu();
    this.initMessageClient();
  }

  // 初始化右键菜单
  initContentMenu() {
    create({
      id: "saveMark",
      title: "保留笔记",
      contexts: ["selection"],
      onclick: (info, tab) => {
        backgroundClient
          .seedMessage(new ChromeMessage("saveMark"))
          .then((res, response) => {
            // chrome.notifications.create("saveSuccess", {
            //   title: "通知",
            //   message: "保存成功",
            //   iconUrl: "https://www.baidu.com/img/bd_logo1.png",
            //   type: "basic",
            // });
          });
      },
    });

    create({
      id: "showCoplit",
      title: "查看笔记",
      contexts: ["all"],
      onclick: (info, tab) => {
        backgroundClient.seedMessage(new ChromeMessage("showCoplit"));
      },
    });
  }

  // 初始化消息通道
  initMessageClient() {
    backgroundClient.listen("test connect", (res, sendResponse) => {
      sendResponse(new ChromeMessage("connect success"));
    });
  }
}
