import Logo from "../assets/img/logo.svg";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div className="logocontainer text-center">
        <img src={Logo} className="logoshow" alt="MyTV+" />
      </div>
      <hr className="bg-white mx-0 mt-1 mb-0 w-100" />
      <NavLink activeClassName="active" className="navlink" to="/app/channels">
        <i className="fas fa-tv mx-4"></i>
        <span className="NavText">Channels</span>
      </NavLink>
      <NavLink activeClassName="active" className="navlink" to="/app/movies">
        <i className="fas fa-film mx-4"></i>
        <span className="NavText">Movies</span>
      </NavLink>

      <NavLink activeClassName="active" className="navlink" to="/app/series">
        <i className="fas fa-video mx-4"></i>
        <span className="NavText">TV Series</span>
      </NavLink>
      <NavLink
        activeClassName="active"
        className="navlink"
        to="/app/favorites/channels"
      >
        <i className="fas fa-heart mx-4"></i>
        <span className="NavText">Favorite</span>
      </NavLink>
      {/*<NavLink activeClassName="active" className="navlink" to="/app/history">
          <i className="fas fa-history mx-4"></i>
        <span className="NavText">History</span>
      </NavLink>*/}
      <NavLink activeClassName="active" className="navlink" to="/app/search">
        <i className="fas fa-search mx-4"></i>
        <span className="NavText">Search</span>
      </NavLink>
      <div className="exitinfodiv">
        <NavLink activeClassName="active" className="navlink" to="/app/info">
          <i className="fas fa-info-circle mx-4"></i>
          <span className="NavText">Info</span>
        </NavLink>
        <NavLink activeClassName="active" className="navlink" to="/app/exit">
          <i className="fas fa-door-open mx-4"></i>
          <span className="NavText">Exit App</span>
        </NavLink>
      </div>
    </>
  );
}
