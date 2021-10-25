import * as React from "react";
import { OnboardingDialog } from "./OnboardingDialog";

export const Layout = (props) => {
  return (
    <React.Fragment>
      {props.children}
      <OnboardingDialog />
    </React.Fragment>
  );
};
