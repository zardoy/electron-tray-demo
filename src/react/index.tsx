import React from "react";
import ReactDom from "react-dom";
import App from "./App";

import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

if (process.env.NODE_ENV === "development") console.clear();

ReactDom.render(<App />, document.getElementById("root"));