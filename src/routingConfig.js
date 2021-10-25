import React from "react";


import LogsView from "./components/pipeline-view/LogsView";
import PipelineView from "./components/pipeline-view/PipelineView";


const getTitle = (pageTitle) => `${pageTitle} · Orchest`;

// this is the central place where we maintain all the FE routes
// to add new route, you would also need to add the route name to RouteName.
// NOTE: the order of the routes matters, react-router loads the first route that matches the given path

export const orderedRoutes = [

  {
    name: "pipelines",
    path: "/pipelines",
    title: getTitle("Pipelines"),
    component: PipelinesView,
  },
  {
    name: "pipeline",
    path: "/pipeline",
    title: getTitle("Pipeline"),
    component: PipelineView,
  },
  {
    name: "logs",
    path: "/logs",
    title: getTitle("Logs"),
    component: LogsView,
  }
];

export const siteMap = orderedRoutes.reduce(
  (all, curr, i) => ({
    ...all,
    [curr.name]: {
      path: curr.path,
      component: curr.component,
      order: i,
    },
  }),
  {}
);

const snakeCase = (str) =>
  str
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();

export const toQueryString = (
  query
) => {
  const isObject =
    typeof query === "object" &&
    query !== null &&
    typeof query !== "function" &&
    !Array.isArray(query);
  return isObject
    ? Object.entries<string | number | boolean | undefined | null>(query)
        .reduce((str, entry) => {
          const [key, value] = entry;
          return value // we don't pass along null or undefined since it doesn't mean much to the receiver
            ? `${str}${snakeCase(key)}=${value.toString().toLowerCase()}&`
            : str;
        }, "?")
        .slice(0, -1) // remove the trailing '&' or '?'.
    : "";
};

export const generatePathFromRoute = (
  route,
  pathParams
) => {
  // replace the route params with the given object key-value pairs
  return Object.entries<string | number | boolean | null | undefined>(
    pathParams
  ).reduce((str, param) => {
    const [key, value] = param;
    const isValueValid = value !== undefined && value !== null;
    return str.replace(`:${key}`, isValueValid ? value.toString() : "");
  }, route);
};
