import React from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { AnimatedSwitch } from "./AnimatedSwitch";
import Edit from "./components/operaciones/editor";
import Dashboard from "./components/ingenieros/Dashboard";

const home = () => (
  <div className="page">
    <div className="firstSelector">
      <Link to="/fe">Soy FE</Link>
      <Link to="/op">Operaciones</Link>
    </div>
  </div>
);

const historial = () => (
  <div className="page">
    <h1>Historial</h1>
    <Link to="/fe">Back to Dashboard</Link>
  </div>
);

const routes = [
  {
    component: home,
    path: "/",
  },
  {
    component: Dashboard,
    path: "/fe",
  },
  {
    component: historial,
    path: "/fe/historial",
  },
  {
    component: Edit,
    path: "/op",
  },
];

const Routes = withRouter(({ location }) => {
  return (
    <AnimatedSwitch location={location}>
      {routes.map((route) => {
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
