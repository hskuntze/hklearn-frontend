import { Route, Routes } from "react-router-dom";
import List from "./List";

const AdminUsers = () => {
  return (
    <Routes>
      <Route path="" element={<List />} />
    </Routes>
  );
};

export default AdminUsers;
