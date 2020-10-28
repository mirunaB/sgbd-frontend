import React from "react";
import Navbar from "./components/navbar/Navbar";
import SwowDb from "./components/databases/ShowDb";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./routing/Routes";
import {
  StylesProvider,
  ThemeProvider as MUIThemeProvider,
} from "@material-ui/styles";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  const theme = createMuiTheme();
  return (
    <div className="App">
      <Provider store={store}>
        {/* <StylesProvider injectFirst> */}
        <MUIThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Router>
              <Navbar></Navbar>
              <Switch>
                <Route component={Routes} />
              </Switch>
              <ToastContainer />
            </Router>
          </ThemeProvider>
        </MUIThemeProvider>
        {/* </StylesProvider> */}
      </Provider>
    </div>
  );
};

export default App;
