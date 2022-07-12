import ContentLoader from "react-content-loader";
import "./styles.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <ContentLoader
        speed={1}
        width={420}
        height={90}
        viewBox="0 0 420 90"
        backgroundColor="#F25E3D"
        foregroundColor="#F2F2F2"
      >
        <rect x="0" y="0" rx="10" ry="10" width="420" height="80" />
      </ContentLoader>
    </div>
  );
};

export default Loader;
