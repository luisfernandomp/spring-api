import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListEmployee from "../../pages/empregado/list-employee";
import EditAndDetailsEmployee from "../../pages/empregado/edit-details-employee";
import NoPage from "../../pages/no-page";
import CreateEmployee from "../../pages/empregado/create-employee";
import Login from "../../pages/login";
import { HeaderLayout } from "../../components/header-layout";

const Rotas = (
  <BrowserRouter>
    
    <Routes>
      <Route index element={<Login />} />
      <Route element={ <HeaderLayout /> } >
        <Route
          path="/empregados"  
          element={<ListEmployee />} />
        <Route
          path="/details-employee/:id/:edit"
          element={<EditAndDetailsEmployee />}
        />
        <Route path="/create-employee" element={<CreateEmployee />} />
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);

export default Rotas;
