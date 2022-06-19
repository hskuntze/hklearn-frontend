import "./styles.css";

type Props = {
  role: string;
};

const RoleBadge = ({ role }: Props) => {
  return (
    <div className="role-badge">
      <p>{role}</p>
    </div>
  );
};

export default RoleBadge;
