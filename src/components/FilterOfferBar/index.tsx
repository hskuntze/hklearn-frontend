import { ReactComponent as SearchIcon } from "assets/images/Union.svg";
import { useForm } from "react-hook-form";
import { FilterOffer } from "types/FilterOffer";
import "./styles.css";

type Props = {
  onSubmitFilter: (data: FilterOffer) => void;
};

const FilterBar = ({ onSubmitFilter }: Props) => {
  const { register, handleSubmit } = useForm<FilterOffer>();

  const onSubmit = (filter: FilterOffer) => {
    onSubmitFilter(filter);
  };

  return (
    <div className="base-card filter-bar">
      <form onSubmit={handleSubmit(onSubmit)} className="filter-bar-form">
        <div className="filter-offer-input">
          <input
            type="text"
            placeholder="Título da oferta"
            className="form-control"
            {...register("offer.name")}
          />
        </div>
        <div className="filter-offer-input">
          <input
            type="text"
            placeholder="Número da edição"
            className="form-control"
            {...register("offer.edition")}
          />
          <button className="filter-icon">
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
