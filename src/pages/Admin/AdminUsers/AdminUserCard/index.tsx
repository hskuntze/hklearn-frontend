import { UserType } from "types/UserType";
import { Role } from "util/auth";
import RoleBadge from "./RoleBadge";
import "./styles.css";

type Props = {
  user: UserType;
};

const AdminUserCard = ({ user }: Props) => {
  const parseRole = (role: Role) => {
    const textByRole = {
      ROLE_VISITOR: "Visitante",
      ROLE_STUDENT: "Estudante",
      ROLE_INSTRUCTOR: "Professor",
      ROLE_ADMIN: "Administrador",
    };
    return textByRole[role];
  };

  return (
    <div className="admin-user-card-container base-card">
      <h1>{user.name}</h1>
      <h4>{user.email}</h4>
      <div className="user-roles-container">
        {user.roles.map((r) => (
          <RoleBadge role={parseRole(r.authority as Role)} />
        ))}
      </div>
    </div>
  );
};

export default AdminUserCard;
