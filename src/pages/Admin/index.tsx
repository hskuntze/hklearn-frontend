import PrivateRoute from "components/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import AdminContent from "./AdminContent";
import AdminOffer from "./AdminOffer";
import AdminUsers from "./AdminUsers";
import Navbar from "./Navbar";
import "./styles.css";

const Admin = () => {
  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-content">
        <Routes>
          <Route
            path="adminContent/*"
            element={
              <PrivateRoute roles={["ROLE_ADMIN"]}>
                <AdminContent />
              </PrivateRoute>
            }
          />
          <Route
            path="adminOffer/*"
            element={
              <PrivateRoute roles={["ROLE_ADMIN"]}>
                <AdminOffer />
              </PrivateRoute>
            }
          />
          <Route
            path="adminUsers/*"
            element={
              <PrivateRoute roles={["ROLE_ADMIN"]}>
                <AdminUsers />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
