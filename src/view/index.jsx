import React from "react";
import { render } from "react-dom";
import MarkShow from "../content-scripts/components/MarkShow";

render(
  <MarkShow showTitle />,
  document.querySelector("#chrome-make-nodes-view")
);
