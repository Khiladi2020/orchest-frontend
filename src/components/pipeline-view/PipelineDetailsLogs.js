import * as React from "react";
import LogViewer, { ILogViewerProps } from "./LogViewer";

const PipelineDetailsLogs = (props) => (
  <div className={"detail-subview"}>
    <LogViewer {...props} />
  </div>
);

export default PipelineDetailsLogs;
