import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import JokeApp from "./JokeApp";
import theme from "./theme";

ReactDOM.render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <JokeApp />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById("root")
);
