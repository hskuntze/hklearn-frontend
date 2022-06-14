import { AxiosRequestConfig } from "axios";
import ContentButton from "components/ContentButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContentType } from "types/ContentType";
import { requestBackend } from "util/requests";
import "./styles.css";

type UrlParams = {
  offerId: string;
};

const ContentDetails = () => {
  const [list, setList] = useState<ContentType[]>();

  const { offerId } = useParams<UrlParams>();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const params: AxiosRequestConfig = {
        withCredentials: true,
        url: `/offers/contents/${offerId}`,
        method: "GET",
        signal: controller.signal,
      };

      const newList = (await requestBackend(params)).data;
      setList(newList);
    })();

    return () => controller.abort();
  }, [offerId]);

  return (
    <div className="content-details-container">
      <div className="row">
        {list &&
          list?.map((content) => (
            <div className="col" key={content.id}>
              <div className="content base-card">
                <ContentButton content={content} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContentDetails;
