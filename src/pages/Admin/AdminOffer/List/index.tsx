import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterOffer } from "types/FilterOffer";
import { OfferType } from "types/OfferType";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/requests";
import OfferCrudCard from "../OfferCrudCard";
import FilterOfferBar from "components/FilterOfferBar";
import Pagination from "components/Pagination";
import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  filterData: FilterOffer;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<OfferType>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { offer: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: FilterOffer) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getOffers = useCallback(() => {
    const controller = new AbortController();
    (async () => {
      const params: AxiosRequestConfig = {
        url: "/offers",
        withCredentials: true,
        method: "GET",
        params: {
          size: 4,
          page: controlComponentsData.activePage,
          edition: controlComponentsData.filterData.offer?.edition,
          name: controlComponentsData.filterData.offer?.name,
        },
        signal: controller.signal,
      };

      const data = (await requestBackend(params)).data;
      setPage(data);
    })();

    return () => controller.abort();
  }, [controlComponentsData]);

  useEffect(() => {
    getOffers();
  }, [getOffers]);

  return (
    <div className="admin-offer-content">
      <div className="offer-crud">
        <Link to="/admin/adminOffer/create">
          <button className="btn btn-primary text-white btn-add">
            ADICIONAR
          </button>
        </Link>
        <FilterOfferBar onSubmitFilter={handleSubmitFilter} />
      </div>
      {page &&
        page.content.map((offer) => (
          <OfferCrudCard offer={offer} onDelete={getOffers} key={offer.id} />
        ))}
      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={2}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default List;
