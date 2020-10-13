import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#b100e7",
      dark: "#9300c0",
    },
    secondary: {
      main: "#e2e2e2",
      dark: "#c4c4c4",
    },
    grey: {
      main: "#d1d1d1",
      dark: "grey",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 50,
      },
    },
  },
});

export default theme;
