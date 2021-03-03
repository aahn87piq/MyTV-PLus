import { Switch, Route, useRouteMatch } from "react-router-dom";
import FavTop from "../blocks/FavTop";
import FavSeries from "../blocks/FavSeries";
import FavMovies from "../blocks/FavMovies";
import FavChannels from "../blocks/FavChannels";
export default function Channels() {
  let { path } = useRouteMatch();
  return (
    <>
      <FavTop />
      <Switch>
        <Route exact path={path}>
          <FavChannels />
        </Route>
        <Route path={`${path}/channels`}>
          <FavChannels />
        </Route>
        <Route path={`${path}/movies`}>
          <FavMovies />
        </Route>
        <Route path={`${path}/series`}>
          <FavSeries />
        </Route>
      </Switch>
    </>
  );
}
