import React, { Component } from "react";
import { Form, Card, Button, Checkbox, Switch } from "antd";
import "./Popup.scss";
import { go, syncSetStorage, syncGetStorage } from "../chrome";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clearMarkChecked: false,
    };
  }
  state = {
    name: WRAPPER_CLASS_NAME,
  };

  componentDidMount() {
    syncGetStorage("clearMarkCfg").then((cfgval) => {
      this.state = {
        clearMarkChecked: cfgval,
      };
    });
  }

  gotoPage() {
    go("../html/view.html");
  }

  changeClearMarkNodes = () => {
    const { clearMarkChecked } = this.state;
    syncSetStorage("clearMarkCfg", !clearMarkChecked).then((cfgVal) => {
      this.setState({
        clearMarkChecked: cfgVal,
      });
    });
  };

  async getClearMarkCfg() {
    let cfgVal = await syncGetStorage("clearMarkCfg");
    const { clearMarkChecked } = this.state;
    if (clearMarkChecked != cfgVal) {
      this.setState({
        clearMarkChecked: cfgVal,
      });
    }
  }
  render() {
    this.getClearMarkCfg();
    const { clearMarkChecked } = this.state;

    return (
      <div className={`${WRAPPER_CLASS_NAME}`}>
        <Card
          title="设置面板"
          style={{
            minWidth: 400,
          }}
        >
          <Form name="basic" className="basic-table" {...formItemLayout}>
            <Form.Item label="下载文档后清空纪录" name="clearMarkNodes">
              <Switch
                checked={clearMarkChecked}
                onChange={this.changeClearMarkNodes}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  this.gotoPage();
                }}
                className="form-button"
              >
                查看笔记
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
