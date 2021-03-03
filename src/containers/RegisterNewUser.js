import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Registeration, RegisterationInfo } from "../pages";
export default function RegisterNewUser() {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Registeration />
      </Route>
      <Route path={`${path}/howto`}>
        <RegisterationInfo />
      </Route>
    </Switch>
  );
}
