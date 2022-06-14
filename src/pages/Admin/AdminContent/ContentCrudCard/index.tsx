import { AxiosRequestConfig } from "axios";
import { ContentType } from "types/ContentType";
import { requestBackend } from "util/requests";
import { toast } from "react-toastify";
import ContentBadge from "../ContentBadge";
import "./styles.css";
import { Link } from "react-router-dom";

type Props = {
  content: ContentType;
  onDelete: Function;
};

const ContentCrudCard = ({ content, onDelete }: Props) => {
  const handleDelete = (contentId: number) => {
    if (!window.confirm("Tem certeza que deseja deletar?")) {
      return;
    }

    const params: AxiosRequestConfig = {
      method: "DELETE",
      url: `/contents/${contentId}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        toast.success("Sucesso ao deletar conteúdo");
        onDelete();
      })
      .catch(() => {
        toast.error("Erro ao deletar conteúdo");
      });
  };

  return (
    <div className="content-crud-container base-card">
      <div className="content-crud-card">
        <div className="content-crud-info">
          <h3>{content.title}</h3>
          <h5>{content.description}</h5>
          {content.offer && (
            <ContentBadge
              title={content.offer.name}
              edition={content.offer.edition}
            />
          )}
        </div>
        <div className="content-crud-frame">
          <iframe
            className="embed-responsive-item"
            src={content.videoUri}
            allowFullScreen
            title={content.title}
          />
        </div>
      </div>
      <div className="content-card-buttons">
        <button
          className="btn btn-danger custom-button text-white"
          onClick={() => handleDelete(content.id)}
        >
          DELETAR
        </button>
        <Link to={`/admin/adminContent/${content.id}`}>
          <button className="btn btn-outline-info custom-button">EDITAR</button>
        </Link>
      </div>
    </div>
  );
};

export default ContentCrudCard;
