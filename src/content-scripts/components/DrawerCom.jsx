import React, { Component } from "react";
import { Drawer, Button } from "antd";
import "./DrawerCom.scss";
import { contentClient, ChromeMessage, syncGetStorage } from "../../chrome";
import DrawerTitle from "./DrawerTitle";
import MarkShow from "./MarkShow";

export default class DrawerCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFromBg: null,
    };
  }

  // Background 通讯
  async sendMsgToBackground() {
    const res = await contentClient.seedMessage(
      new ChromeMessage("test connect")
    );

    this.setState({
      messageFromBg: res.msg,
    });
  }

  render() {
    return (
      <Drawer
        title={<DrawerTitle />}
        size={"large"}
        getContainer={document.querySelector(
          "#chrome-browser-make-nodes-base-element"
        )}
        placement="right"
        closable={false}
        onClose={() => {
          this.props.onClose();
        }}
        visible
      >
        <MarkShow showTitle={false} />
        <Button type="primary" onClick={() => this.sendMsgToBackground()}>
          点击和 background 通讯
        </Button>
        <p>{this.state.messageFromBg}</p>
      </Drawer>
    );
  }
}
