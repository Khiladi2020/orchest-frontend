import React from "react";
import { useOrchest } from "./orchest";
import { makeRequest } from "../components/lib-utils";

// use this hook as a side effect by specifying the parameters, it will fire when the component mounts
// useSendAnalyticEvent('view load', { name: 'projectsView' });
// in this case, this hook doesn't return anything
// you can also use this hook as a factory, by leaving out the parameters
// const sendEvent = useSendAnalyticEvent();
// sendEvent("alert show", { title: 'Error', content: 'Could not find any pipelines for this project.' });

const useSendAnalyticEvent = (
  event,
  props
) => {
  const context = useOrchest();
  const shouldSend = !context.state.config["TELEMETRY_DISABLED"];

  const send = React.useCallback(
    (innerEvent, innerProps) => {
      if (shouldSend) {
        makeRequest("POST", "/analytics", {
          type: "json",
          content: innerProps
            ? {
                event: innerEvent,
                properties: innerProps,
              }
            : { event: innerEvent },
        });
      }
    },
    [shouldSend]
  );

  React.useEffect(() => {
    if (event) {
      send(event, props);
    }
  }, []);
  return event ? undefined : send;
};

export { useSendAnalyticEvent };
