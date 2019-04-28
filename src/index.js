import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

serviceWorker.register();
