import { AxiosRequestConfig } from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { OfferType } from "types/OfferType";
import { requestBackend } from "util/requests";
import "./styles.css";

type Props = {
  offer: OfferType;
  onDelete: Function;
};

const OfferCrudCard = ({ offer, onDelete }: Props) => {
  const handleDelete = (offerId: number) => {
    if (!window.confirm("Tem certeza que deseja deletar?")) {
      return;
    }

    const params: AxiosRequestConfig = {
      url: `/offers/${offerId}`,
      method: "DELETE",
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        toast.success("Deletado com sucesso");
        onDelete();
      })
      .catch((err) => {
        toast.error("Erro ao deletar: " + err);
      });
  };

  const handleDate = (date: string): string => {
    return new Date(Date.parse(date)).toLocaleString();
  };

  return (
    <div className="offer-card-content-container base-card">
      <div className="offer-card-img">
        <img src={offer.imgUri} alt={offer.name} />
      </div>
      <div className="offer-card-header">
        <div>
          <div className="offer-card-title">
            <h4>{offer.name}</h4>
            <p>{offer.edition}</p>
          </div>
          <p className="offer-desc">{offer.description}</p>
        </div>
        <div className="offer-card-info">
          <p>
            <b>Início: </b>
            {handleDate(offer.startMoment)}
          </p>
          <p>
            <b>Fim: </b>
            {handleDate(offer.endMoment)}
          </p>
        </div>
      </div>
      <div className="offer-card-buttons">
        <button
          className="btn btn-danger custom-button text-white"
          onClick={() => handleDelete(offer.id)}
        >
          DELETAR
        </button>
        <Link to={`/admin/adminOffer/${offer.id}`}>
          <button className="btn btn-outline-info custom-button">EDITAR</button>
        </Link>
      </div>
    </div>
  );
};

export default OfferCrudCard;
