import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../components/home/Layout";
import LoginContainer from "../containers/LoginContainer";
import Auth from "./Auth";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <Auth>
          <Switch>
            <Route exact path="/" component={Layout} />
          </Switch>
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}
