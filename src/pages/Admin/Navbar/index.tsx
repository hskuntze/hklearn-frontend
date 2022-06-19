import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="admin-navbar-container">
      <ul className="admin-navbar-content">
        <Link to="">
          <li className="admin-navbar-item">Oferta</li>
        </Link>
        <Link to="adminContent">
          <li className="admin-navbar-item">Conteúdo</li>
        </Link>
        <Link to="adminUsers">
          <li className="admin-navbar-item">Usuários</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
