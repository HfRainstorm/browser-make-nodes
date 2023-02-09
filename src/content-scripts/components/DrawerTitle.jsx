import React, { Component } from "react";
import { Drawer, Button } from "antd";
import {
  contentClient,
  syncSetStorage,
  syncGetStorage,
  removeStorage,
} from "../../chrome";

import "./DrawerCom.scss";

import { uriTransformer, doDownloadFile } from "../../common";

export default class DrawerTitle extends Component {
  constructor(props) {
    super(props);
  }

  async doSave() {
    let markList = (await syncGetStorage("mark")) || [];
    let tempStr = [];
    markList.forEach((markInfo) => {
      tempStr.push(markInfo.text);
    });
    let stringData = tempStr.join();
    doDownloadFile(stringData);

    let isClearMark = (await syncGetStorage("clearMarkCfg")) || false;

    if (isClearMark) {
      removeStorage("mark");
    }
  }

  render() {
    return (
      <div className={`${WRAPPER_CLASS_NAME}  mark-node-list-drawer-title`}>
        <div className="mark-node-list-title">Marked Node List</div>
        <div className="mark-node-list-btns">
          <Button
            type="primary"
            onClick={() => {
              removeStorage("mark");
            }}
          >
            删除所有笔记
          </Button>

          <Button
            type="primary"
            onClick={() => {
              this.doSave();
            }}
          >
            下载笔记
          </Button>
        </div>
      </div>
    );
  }
}
