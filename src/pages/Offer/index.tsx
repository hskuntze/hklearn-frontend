import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SpringPage } from "types/vendor/spring";
import { OfferType } from "types/OfferType";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { FilterOffer } from "types/FilterOffer";
import FilterOfferBar from "components/FilterOfferBar";
import Pagination from "components/Pagination";
import ContentCard from "components/ContentCard";
import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  filterData: FilterOffer;
};

const Offer = () => {
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

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const params: AxiosRequestConfig = {
        withCredentials: true,
        method: "GET",
        url: "/offers",
        params: {
          page: controlComponentsData.activePage,
          size: 3,
          name: controlComponentsData.filterData.offer?.name,
          edition: controlComponentsData.filterData.offer?.edition,
        },
        signal: controller.signal,
      };

      const newPage = (await requestBackend(params)).data;
      setPage(newPage);
    })();

    return () => controller.abort();
  }, [controlComponentsData]);

  return (
    <div className="content-main-page container">
      <FilterOfferBar onSubmitFilter={handleSubmitFilter} />
      <div className="row">
        {page?.content.map((offer) => (
          <div className="col-md-6 col-lg-12" key={offer.id}>
            <Link to={`/offer/${offer.id}`}>
              <ContentCard offer={offer} />
            </Link>
          </div>
        ))}
        <Pagination
          forcePage={page?.number}
          pageCount={page ? page.totalPages : 0}
          range={2}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Offer;
