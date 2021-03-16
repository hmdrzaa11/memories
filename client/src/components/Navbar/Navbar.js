import "./Navbar.css";
import logo from "../../images/camera.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../state";

let Navbar = () => {
  let { user } = useSelector((state) => state.auth);
  let dispatch = useDispatch();

  let renderLinks = () => {
    if (user) {
      return (
        <>
          <Link className="Navbar-link" to="/create-memory">
            Create Memory
          </Link>
          <button
            onClick={() => dispatch(actionCreators.logoutAction())}
            className="btn logout-button"
          >
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link className="Navbar-link" to="/signup">
            Signup
          </Link>
          <Link className="Navbar-link" to="/signin">
            Login
          </Link>
        </>
      );
    }
  };
  return (
    <nav className="Navbar">
      <div className="Navbar-left">
        <div className="Navbar-lef__logo-wrapper">
          <img className="Navbar-left__logo" src={logo} alt="logo" />
        </div>
        <div className="Navbar-left__info">
          <Link to="/" className="Navbar-left__info-title">
            Memories
          </Link>
        </div>
      </div>
      <div className="Navbar-right">
        <div className="Navbar-right__links">{renderLinks()}</div>
      </div>
    </nav>
  );
};

export default Navbar;
