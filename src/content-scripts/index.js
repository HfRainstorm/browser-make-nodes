import ContentScripts from "./ContentScripts";
import React from "react";
import ReactDOM from "react-dom";

document.addEventListener("DOMContentLoaded", function () {
  const { document } = window;
  const base = document.querySelector("#chrome-extension-content-base-elemen");
  this.container = null;
  if (base) {
    this.container = base;
  } else {
    this.container = document.createElement("div");
    this.container.setAttribute("id", "chrome-browser-make-nodes-base-element");
    this.container.setAttribute("class", WRAPPER_CLASS_NAME);
    document.body.appendChild(this.container);
  }

  ReactDOM.render(<ContentScripts />, this.container);
});
