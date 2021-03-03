import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ChannelPlayer, MoviePlayer, SeriesPlayer } from "../pages";
export default function Player() {
  let { path, url } = useRouteMatch();

  return (
    <div className="playercontainer">
      <Switch>
        <Route path={`${path}/channel/:id`}>
          <ChannelPlayer />
        </Route>
        <Route path={`${path}/movie/:type/:id`}>
          <MoviePlayer />
        </Route>
        <Route path={`${path}/series/:id/:sid/:series`}>
          <SeriesPlayer />
        </Route>
      </Switch>
    </div>
  );
}
