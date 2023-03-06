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
        open={this.props.open}
      >
        <MarkShow showTitle={false} />
      </Drawer>
    );
  }
}
