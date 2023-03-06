import React, { Component } from "react";
import { Card, Button } from "antd";
import DrawerTitle from "./DrawerTitle";
import {
  contentClient,
  syncSetStorage,
  syncGetStorage,
  removeStorage,
} from "../../chrome";
import ReactMarkdown from "react-markdown";
import { uriTransformer, doDownloadFile } from "../../common";

export default class MarkShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markList: [],
    };
  }

  componentDidMount() {}

  async getMarkData() {
    let markList = await syncGetStorage("mark");
    this.setState({
      markList,
    });
  }

  async deleteMarkRecord(markId) {
    let markList = (await syncGetStorage("mark")) || [];
    if (markList && markList.length > 0) {
      let newMarked = nums.filter((markItem) => {
        return markItem.id != markId;
      });

      syncSetStorage("mark", newMarked);
    }
  }

  render() {
    this.getMarkData();
    const { markList } = this.state;
    const { showTitle } = this.props;
    return (
      <div className={`${WRAPPER_CLASS_NAME}`}>
        {showTitle && <DrawerTitle />}
        {markList &&
          markList.map((markInfo, index) => {
            return (
              <div
                id={index}
                key={markInfo.id}
                style={{ paddingBottom: "1rem" }}
              >
                <Card
                  title={markInfo.name}
                  bordered={false}
                  hoverable
                  extra={
                    <a
                      tabIndex={markInfo.id}
                      className="ant-notification-notice-close"
                      onClick={() => {
                        this.deleteMarkRecord(markInfo.id);
                      }}
                    >
                      <span className="ant-notification-close-x">
                        <span
                          role="img"
                          aria-label="close"
                          className="anticon anticon-close ant-notification-close-icon"
                        >
                          <svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            data-icon="close"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                          </svg>
                        </span>
                      </span>
                    </a>
                  }
                >
                  {/* <ReactMarkdown
                    id={index}
                    children={markInfo.text}
                    skipHtml //html标签不解析保留文本
                    transformLinkUri={(href, children, title) => {
                      return uriTransformer(href, markInfo.href);
                    }}
                  /> */}
                  <div
                    className="editor-wrapper"
                    dangerouslySetInnerHTML={{ __html: markInfo.htmlstr }}
                  />
                </Card>
              </div>
            );
          })}
      </div>
    );
  }
}
