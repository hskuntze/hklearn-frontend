import "./styles.css";

type Props = {
  title: string;
  edition: string;
};

const ContentBadge = ({ title, edition }: Props) => {
  return (
    <div className="badge-content">
      <h4>
        {title} {edition}
      </h4>
    </div>
  );
};

export default ContentBadge;
