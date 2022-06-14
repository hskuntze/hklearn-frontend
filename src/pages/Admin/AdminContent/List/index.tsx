import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContentType } from "types/ContentType";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/requests";
import ContentCrudCard from "../ContentCrudCard";
import Pagination from "components/Pagination";
import "./styles.css";

type ControlComponentsData = {
  activePage: number;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<ContentType>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
    });
  };

  const getContents = useCallback(() => {
    const controller = new AbortController();
    (async () => {
      const params: AxiosRequestConfig = {
        url: "/contents",
        withCredentials: true,
        method: "GET",
        params: {
          offerId: 0,
          title: "",
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
    getContents();
  }, [getContents]);

  return (
    <div className="admin-content-list">
      <div className="content-crud">
        <Link to="/admin/adminContent/create">
          <button className="btn btn-primary text-white">ADICIONAR</button>
        </Link>
      </div>
      {page &&
        page.content.map((content) => (
          <ContentCrudCard
            content={content}
            onDelete={getContents}
            key={content.id}
          />
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
