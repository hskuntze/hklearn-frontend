import Denied from 'components/Denied';
import { Navigate, useLocation } from 'react-router-dom';
import { hasAnyRoles, isAuthenticated, Role } from 'util/auth';

const PrivateRoute = ({children, roles}:{children:JSX.Element; roles: Array<Role>;}) => {
  let location = useLocation();
  
  const hasRoles = hasAnyRoles(roles);

  if(!isAuthenticated()){
    return <Navigate replace to="/auth" state={{from: location}} />;
  }

  if(isAuthenticated() && !hasRoles){
    return <Denied />;
  }

  return children;
};

export default PrivateRoute;
