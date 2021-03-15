import { Switch, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./containers/Signup/Signup";
import Signin from "./containers/Signin/Signin";

let App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </div>
  );
};

export default App;
