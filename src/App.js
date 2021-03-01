import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Nav from "./components/nav";

import OrderPage from "./pages/orderspage";
import Completed from "./pages/completed";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <div className="App">
        <ChakraProvider>
          <Router>
            <Nav />
            <Switch>
              <Route exact path="/" component={OrderPage} />
              <Route exact path="/completed" component={Completed} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
        </ChakraProvider>
      </div>
    </>
  );
}

export default App;
