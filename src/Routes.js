import React from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { AnimatedSwitch } from "./AnimatedSwitch";

/**
 * The ".page" class is key to animating a full page and not receive bumps while
 * animating pages in/out. It is position: fixed to allow the animation to play
 * without the DOM elements messing up.
 *
 * Try to remove .page to see the effect.
 */
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
const edit = () => (
  <div className="page">
    <h1>Hello Editor</h1>
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
    component: edit,
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
