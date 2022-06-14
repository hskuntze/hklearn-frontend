import { OfferType } from "types/OfferType";
import "./styles.css";

type Props = {
  offer: OfferType;
};

const ContentCard = ({ offer }: Props) => {
  return (
    <div className="content-container">
      <div className="base-card content-card">
        <img src={offer.imgUri} alt={offer.name} />
        <div className="offer-info">
          <h3>{offer.name}</h3>
          <h5>{offer.description}</h5>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
