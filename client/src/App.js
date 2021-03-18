import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./containers/Home/Home";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./containers/Signup/Signup";
import Signin from "./containers/Signin/Signin";
import { actionCreators } from "./state";
import { useEffect } from "react";
import CreateMemory from "./containers/CreateMemory/CreateMemory";
import EditMemory from "./containers/EditMemory/EditMemory";
import Review from "./containers/Review/Review";

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
        <Route path="/create-memory" component={CreateMemory} />
        <Route path="/edit/:memId" component={EditMemory} />
        <Route path="/review/:memId" component={Review} />
      </Switch>
    </div>
  );
};

export default App;
