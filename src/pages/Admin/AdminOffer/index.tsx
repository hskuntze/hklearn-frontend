import { Route, Routes } from "react-router-dom";
import Form from "./Form";
import List from "./List";

const AdminOffer = () => {
  return (
    <Routes>
      <Route path="" element={<List />} />
      <Route path=":offerId" element={<Form />} />
    </Routes>
  );
};

export default AdminOffer;
