import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { requestBackendLogin } from "util/requests";
import { useContext, useState } from "react";
import { saveAuthData } from "util/storage";
import { AuthContext } from "AuthContext";
import { getTokenData } from "util/auth";
import ButtonIcon from "components/ButtonIcon";
import "./styles.css";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { setAuthContextData } = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const history = useNavigate();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        setHasError(false);
        history("/offer");
      })
      .catch(() => {
        setHasError(true);
      });
  };

  return (
    <div className="login-container">
      <div className="base-card login-card">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="text"
              className={`form-control base-input ${
                errors.username ? "is-invalid" : ""
              }`}
              placeholder="Email"
              {...register("username", {
                required: "Campo obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />
            <div className="invalid-feedback d-block">
              {errors.username?.message}
            </div>
          </div>
          <div className="mb-2">
            <input
              {...register("password", {
                required: "Campo obrigatório",
              })}
              type="password"
              className={`form-control base-input ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="Password"
            />
            <div className="invalid-feedback d-block">
              {errors.password?.message}
            </div>
          </div>
          {hasError && (
            <div className="alert alert-danger">Credenciais inválidas</div>
          )}
          <Link to="recover" className="login-link-recover">
            Esqueci a senha
          </Link>
          <div className="login-submit">
            <ButtonIcon text="Fazer login" />
          </div>
          <div className="signup-container">
            <span className="not-registered">Não tem Cadastro?</span>
            <Link to="register" className="login-link-register">
              CADASTRAR
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
