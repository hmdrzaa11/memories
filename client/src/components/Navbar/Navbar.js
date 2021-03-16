import "./Navbar.css";
import logo from "../../images/camera.png";
import { Link } from "react-router-dom";
//TODO render create post if user is auth
let Navbar = () => {
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
        <div className="Navbar-right__links">
          <Link className="Navbar-link" to="/signup">
            Signup
          </Link>
          <Link className="Navbar-link" to="/signin">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
