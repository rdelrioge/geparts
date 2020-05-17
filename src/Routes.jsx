import React from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { AnimatedSwitch } from "./AnimatedSwitch";
import Edit from "./components/editor";

const home = () => (
  <div className="page">
    <div className="firstSelector">
      <Link to="/readonly">Soy FE</Link>
      <Link to="/edit">Operaciones</Link>
    </div>
  </div>
);
const readonly = () => (
  <div className="page">
    <h1>Hello FE</h1>
  </div>
);

const routes = [
  {
    component: home,
    path: "/"
  },
  {
    component: readonly,
    path: "/readonly"
  },
  {
    component: Edit,
    path: "/edit"
  }
];

const Routes = withRouter(({ location }) => {
  return (
    <AnimatedSwitch location={location}>
      {routes.map(route => {
        return (
          <Route
            exact
            key={route.path}
            path={route.path}
            component={route.component}
          />
        );
      })}
    </AnimatedSwitch>
  );
});

export default Routes;
