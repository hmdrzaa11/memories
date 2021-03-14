import { Switch, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

let App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
};

export default App;
