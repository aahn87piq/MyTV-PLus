import "./assets/css/bootstrap.css";
import "./assets/css/mytv.min.css";
import { Switch, Route } from "react-router-dom";
import {
  AppLoader,
  ApplicationContainer,
  RegisterNewUser,
  Player,
} from "./containers";
function App() {
  return (
    <Switch>
      <Route exact path="/">
        <AppLoader />
      </Route>
      <Route path="/app">
        <ApplicationContainer />
      </Route>
      <Route path="/player">
        <Player />
      </Route>
      <Route path="/register">
        <RegisterNewUser />
      </Route>
    </Switch>
  );
}

export default App;
