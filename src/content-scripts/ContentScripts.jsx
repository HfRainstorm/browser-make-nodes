import React from "react";
import { render } from "react-dom";
import { contentClient, syncSetStorage, syncGetStorage } from "../chrome";
import "./ContentScripts.scss";
import DrawerCom from "./components";

import { getMarkStr } from "../common";

export default class ContentScripts extends React.Component {
  constructor(props) {
    super(props);
    this.comContaioner = null;
    this.init();
    this.state = {
      drawerOpen: false,
    };
  }

  init = () => {
    // 注意，必须设置了run_at=document_start 此段代码才会生效

    // document.addEventListener("DOMContentLoaded", () => {
    this.initContainer();
    this.initMessageClient();
    // });

    this.initGlobalFunc();
  };

  initGlobalFunc = () => {
    // window.getMarkStr = getMarkStr;
    // window.syncSetStorage = syncSetStorage;
    // window.syncGetStorage = syncGetStorage;
  };

  // 初始化消息通道
  initMessageClient = () => {
    // const { container } = this;

    contentClient.listen("showCoplit", () => {
      this.showContainer();

      // render(
      //   <DrawerCom
      //     onClose={() => {
      //       this.hideContainer();
      //     }}
      //     open={this.state.drawerOpen}
      //   />,
      //   container
      // );
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
  };

  // 初始化外层包裹元素
  initContainer = () => {
    const { document } = window;
    this.comContainer = document.getElementById(
      "chrome-extension-content-base-elemen"
    );
  };

  showContainer = () => {
    debugger;
    document
      .getElementById("chrome-browser-make-nodes-base-element")
      .setAttribute("style", "display: block");
    debugger;
    this.setState({
      drawerOpen: true,
    });
  };

  hideContainer = () => {
    document
      .getElementById("chrome-browser-make-nodes-base-element")
      .setAttribute("style", "display: none");
    this.setState({
      drawerOpen: false,
    });
  };

  render() {
    return (
      <div id="chrome-browser-make-nodes-base-element-content">
        <DrawerCom
          onClose={() => {
            this.hideContainer();
          }}
          open={this.state.drawerOpen}
        />
      </div>
    );
  }
}
