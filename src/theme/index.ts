import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
  },
  props: {
    MuiTextField: {
      variant: "outlined",
    },
    MuiCard: {
      variant: "outlined",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
