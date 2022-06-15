import { ReactComponent as SearchIcon } from "assets/images/Union.svg";
import { Controller, useForm } from "react-hook-form";
import { FilterContent } from "types/FilterContent";
import Select from "react-select";
import "./styles.css";
import { useEffect, useState } from "react";
import { OfferAux } from "types/OfferAux";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";

type Props = {
  onSubmitFilter: (data: FilterContent) => void;
};

const FilterBar = ({ onSubmitFilter }: Props) => {
  const { register, handleSubmit, control, setValue, getValues } =
    useForm<FilterContent>();

  const [selectOffers, setSelectOffers] = useState<OfferAux[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const params: AxiosRequestConfig = {
        url: "/offers",
        method: "GET",
        withCredentials: true,
        signal: controller.signal,
      };

      const data = (await requestBackend(params)).data.content;
      setSelectOffers(data);
    })();

    return () => controller.abort();
  }, []);

  const handleChangeOffer = (value: OfferAux) => {
    setValue("offer", value);
    const obj = {
      title: getValues("title"),
      offer: getValues("offer"),
    };
    onSubmitFilter(obj);
  };

  const handleClear = () => {
    setValue("title", "");
    setValue("offer", null);
  };

  const onSubmit = (filter: FilterContent) => {
    onSubmitFilter(filter);
  };

  return (
    <div className="base-card filter-bar">
      <form onSubmit={handleSubmit(onSubmit)} className="filter-bar-form">
        <div className="filter-input">
          <input
            type="text"
            placeholder="Título do conteúdo"
            className="form-control"
            {...register("title")}
          />
          <button className="filter-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="filter-offer-container">
          <div className="filter-offer">
            <Controller
              name="offer"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectOffers}
                  isClearable
                  placeholder="Oferta"
                  classNamePrefix="offer-filter-select"
                  onChange={(value) => handleChangeOffer(value as OfferAux)}
                  getOptionLabel={(offer: OfferAux) =>
                    offer.name + " " + offer.edition
                  }
                  getOptionValue={(offer: OfferAux) => String(offer.id)}
                />
              )}
            />
          </div>
          <button
            onClick={handleClear}
            className="btn btn-outline-secondary clean-button"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
