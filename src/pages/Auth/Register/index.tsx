import { AxiosRequestConfig } from "axios";
import ButtonIcon from "components/ButtonIcon";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { requestBackend } from "util/requests";
import "./styles.css";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const history = useNavigate();

  const onSubmit = (formData: FormData) => {
    const params: AxiosRequestConfig = {
      url: "/users",
      data: { ...formData, roles: [{ id: 1 }, { id: 3 }] },
      method: "POST",
    };

    requestBackend(params)
      .then(() => {
        toast.success("Cadastrado com sucesso");
        history("/auth");
        setHasError(false);
      })
      .catch((err) => {
        toast.error("Sem sucesso no cadastro");
        console.error(err);
        setHasError(true);
      });
  };

  return (
    <div className="register-container">
      <div className="base-card register-card">
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="text"
              className={`form-control base-input ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="Email"
              {...register("email", {
                required: "Campo obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />
            <div className="invalid-feedback d-block">
              {errors.email?.message}
            </div>
          </div>
          <div className="mb-4">
            <input
              type="text"
              className={`form-control base-input ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="Nome"
              {...register("name", {
                required: "Campo obrigatório",
              })}
            />
            <div className="invalid-feedback d-block">
              {errors.name?.message}
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
            <div className="alert alert-danger">Erro no cadastro</div>
          )}
          <div className="register-submit">
            <ButtonIcon text="Registrar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
