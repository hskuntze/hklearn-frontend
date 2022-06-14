import { AxiosRequestConfig } from "axios";
import Pagination from "components/Pagination";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OfferType } from "types/OfferType";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/requests";
import OfferCrudCard from "../OfferCrudCard";
import "./styles.css";

type ControlComponentsData = {
  activePage: number;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<OfferType>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
    });
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
          <button className="btn btn-primary text-white">ADICIONAR</button>
        </Link>
      </div>
      {page?.content.map((offer) => (
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
