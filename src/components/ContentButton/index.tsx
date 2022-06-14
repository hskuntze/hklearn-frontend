import "./styles.css";
import { ContentType } from "types/ContentType";
import { ReactComponent as Seta } from "assets/images/Seta.svg";

type Props = {
  content: ContentType;
};

const ContentButton = ({ content }: Props) => {
  return (
    <div className="content-button-container">
      <button
        className="btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={"#" + content.title.replace(/\s/g, "").toString()}
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <div className="button-content-info-container">
          <h3>{content.title}</h3>
          <p>{content.description}</p>
        </div>
        <div className="dropdown-arrow">
          <Seta />
        </div>
      </button>
      <div
        className="collapse"
        id={content.title.replace(/\s/g, "").toString()}
      >
        <div className="embed-responsive embed-responsive-1by1 iframe-item">
          <iframe
            className="embed-responsive-item"
            src={content.videoUri}
            allowFullScreen
            title={content.title}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentButton;
