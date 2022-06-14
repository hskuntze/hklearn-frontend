import ButtonIcon from "components/ButtonIcon";
import { Link } from 'react-router-dom';
import "./styles.css";

const Home = () => {
  return (
    <div className="main-container">
      <div className="main-content">
        <h1>A melhor solução para a sua educação</h1>
        <p>
          Venha conhecer a melhor plataforma de ensino para a sua instrução!
          Também atendemos a instituições de ensino que queiram integrar a nossa
          plataforma.
        </p>
      </div>
      <div className="button">
        <Link to="/offer">
          <ButtonIcon text={"Acesse nosso conteúdo"} />
        </Link>
      </div>
    </div>
  );
};
export default Home;
