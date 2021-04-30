import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import JokeApp from "./JokeApp";
import theme from "./theme";
import JokesProvider from "./api/jokes/JokesProvider";

ReactDOM.render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <JokesProvider>
        <JokeApp />
      </JokesProvider>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById("root")
);
