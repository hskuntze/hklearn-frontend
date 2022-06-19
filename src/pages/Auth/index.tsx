import { ReactComponent as AuthImage } from "assets/images/auth-image.svg";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Recover from "./Recover";
import Register from "./Register";
import "./styles.css";

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-banner">
        <h1>Divulge seus conteúdos no HK Learn</h1>
        <p>
          Faça parte do nosso catálogo de divulgação e aumente a venda dos seus
          cursos.
        </p>
        <AuthImage />
      </div>
      <div className="auth-form">
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="recover" element={<Recover />} />
        </Routes>
      </div>
    </div>
  );
};

export default Auth;
