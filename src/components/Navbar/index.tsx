import { AuthContext } from "AuthContext";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getTokenData, hasAnyRoles, isAuthenticated } from "util/auth";
import history from "util/navigate";
import "bootstrap/js/src/collapse.js";
import "./styles.css";
import { removeAuthData } from "util/storage";

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace("/");
  };

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  return (
    <nav className="bg-primary navbar navbar-dark navbar-expand-md main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h1>HK Learn</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#catalog-navbar"
          aria-controls="catalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="catalog-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/offer">CONTEÚDO</NavLink>
            </li>
            {authContextData.authenticated && hasAnyRoles(["ROLE_ADMIN"]) ? (
              <li>
                <NavLink to="/admin">ADMIN</NavLink>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>
              <span className="nav-username">
                {authContextData.tokenData?.user_name}
              </span>
              <a href="logout" onClick={handleLogout}>
                LOGOUT
              </a>
            </>
          ) : (
            <Link to="/auth">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
