import React from "react";
import { render } from "react-dom";
import { contentClient, syncSetStorage, syncGetStorage } from "../chrome";
import "./ContentScripts.scss";
import DrawerCom from "./components";

import { getMarkStr } from "../common";

export default class ContentScripts {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // 注意，必须设置了run_at=document_start 此段代码才会生效

    document.addEventListener("DOMContentLoaded", () => {
      this.initContainer();
      this.initMessageClient();
    });

    this.initGlobalFunc();
  }

  initGlobalFunc() {
    // window.getMarkStr = getMarkStr;
    // window.syncSetStorage = syncSetStorage;
    // window.syncGetStorage = syncGetStorage;
  }

  // 初始化消息通道
  initMessageClient() {
    const { container } = this;

    contentClient.listen("showCoplit", () => {
      this.showContainer();

      render(
        <DrawerCom
          onClose={() => {
            this.hideContainer();
          }}
        />,
        container
      );
    });
    contentClient.listen("saveMark", (res, sendResponse) => {
      let mark = getMarkStr();
      if (mark) {
        syncGetStorage("mark").then((val) => {
          val = val || [];
          val.push(mark);
          syncSetStorage("mark", val);
          sendResponse({ code: 0 });
        });
      }
    });
  }

  // 初始化外层包裹元素
  initContainer() {
    const { document } = window;
    const base = document.querySelector(
      "#chrome-extension-content-base-elemen"
    );
    if (base) {
      this.container = base;
    } else {
      this.container = document.createElement("div");
      this.container.setAttribute(
        "id",
        "chrome-browser-make-nodes-base-element"
      );
      this.container.setAttribute("class", WRAPPER_CLASS_NAME);
      document.body.appendChild(this.container);
    }
  }

  showContainer() {
    this.container.setAttribute("style", "display: block");
  }

  hideContainer() {
    this.container.setAttribute("style", "display: none");
  }
}
