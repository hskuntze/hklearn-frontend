import { Link, useParams } from "react-router-dom";
import "./styles.css";

type UrlParams = {
  email: string;
};

const EmailSent = () => {
  const { email } = useParams<UrlParams>();
  return (
    <div className="email-sent-container">
      <h1>Confirmação de Conta</h1>
      <h6>
        Um e-mail foi enviado para: <i>{email}</i>
      </h6>
      <Link to="/auth">
        <button className="btn btn-success">Prosseguir</button>
      </Link>
    </div>
  );
};

export default EmailSent;
