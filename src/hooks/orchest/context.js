import * as React from "react";

export const OrchestContext = React.createContext(null);

export const useOrchest = () => React.useContext(OrchestContext);
