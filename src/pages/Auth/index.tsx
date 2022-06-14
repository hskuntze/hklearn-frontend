import { ReactComponent as AuthImage } from "assets/images/auth-image.svg";
import Login from "./Login";
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
        <Login />
      </div>
    </div>
  );
};

export default Auth;
