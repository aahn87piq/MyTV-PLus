import { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Navbar from "../common/Navbar";
import {
  AppMain,
  Channels,
  Movies,
  Movie,
  Series,
  SeriesShow,
  Favorites,
  Search,
  Info,
  ExitApp,
} from "../pages";
export default function ApplicationContainer() {
  let { path, url } = useRouteMatch();
  const [isOpen, SetisOpen] = useState(false);
  return (
    <div className="pagewrapper">
      <div
        role="button"
        onFocus={() => SetisOpen(true)}
        onMouseOver={() => SetisOpen(true)}
        onBlur={() => SetisOpen(false)}
        onMouseOut={() => SetisOpen(false)}
        className={isOpen ? "sidebar focused" : "sidebar"}
      >
        <Navbar />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div
            className={isOpen ? "col px-0 navarea focused" : "col px-0 navarea"}
          ></div>
          <div
            className={
              isOpen
                ? "col px-0 contentwrapper focused"
                : "col px-0 contentwrapper"
            }
          >
            <Switch>
              <Route exact path={path}>
                <AppMain />
              </Route>
              <Route path={`${path}/channels`}>
                <Channels />
              </Route>
              <Route path={`${path}/movies`}>
                <Movies />
              </Route>
              <Route path={`${path}/movie/:id`}>
                <Movie />
              </Route>
              <Route path={`${path}/series`}>
                <Series />
              </Route>
              <Route path={`${path}/seriesview/:id`}>
                <SeriesShow />
              </Route>
              <Route path={`${path}/favorites`}>
                <Favorites />
              </Route>
              <Route path={`${path}/search`}>
                <Search />
              </Route>
              <Route path={`${path}/info`}>
                <Info />
              </Route>
              <Route path={`${path}/exit`}>
                <ExitApp />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
