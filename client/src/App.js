import { Switch, Route } from "react-router-dom";
import Home from "./containers/Home/Home";

let App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
};

export default App;
