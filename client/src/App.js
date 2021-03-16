import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./containers/Home/Home";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./containers/Signup/Signup";
import Signin from "./containers/Signin/Signin";
import { actionCreators } from "./state";
import { useEffect } from "react";

let App = () => {
  let { getCurrentUser } = actionCreators;
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, getCurrentUser]);
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
