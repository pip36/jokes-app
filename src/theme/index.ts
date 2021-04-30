import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
