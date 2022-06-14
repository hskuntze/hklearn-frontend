import { Route, Routes } from "react-router-dom";
import Form from "./Form";
import List from "./List";

const AdminContent = () => {
  return (
    <Routes>
      <Route path="" element={<List />} />
      <Route path=":contentId" element={<Form />} />
    </Routes>
  );
};

export default AdminContent;
