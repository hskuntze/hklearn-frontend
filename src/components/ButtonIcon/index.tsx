import "./styles.css";
import { ReactComponent as Seta } from "assets/images/caret-right-fill.svg";

type Props = {
  text: string;
};

const ButtonIcon = ({ text }: Props) => {
  return (
    <div className="button-container">
      <button className="btn btn-primary">
        <h6 className="text-uppercase">{text}</h6>
      </button>
      <div className="button-icon bg-primary">
        <Seta />
      </div>
    </div>
  );
};
export default ButtonIcon;
