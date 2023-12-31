import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListEmployee from "../../pages/empregado/list-employee";
import EditAndDetailsEmployee from "../../pages/empregado/edit-details-employee";
import NoPage from "../../pages/no-page";
import CreateEmployee from "../../pages/empregado/create-employee";
import Login from "../../pages/login";
import HeaderLayout from "../../components/header-layout";
import ListUsuarios from "../../pages/usuario/listar-usuarios";
import ListPaises from "../../pages/pais";

const Rotas = (
  <BrowserRouter>
    
    <Routes>
      <Route index element={<Login />} />
      <Route element={ <HeaderLayout /> } >
        <Route path="/paises" element={<ListPaises />} />
        <Route
          path="/empregados"  
          element={<ListEmployee />} />
        <Route
          path="/details-employee/:id/:edit"
          element={<EditAndDetailsEmployee />}
        />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/usuarios" element={<ListUsuarios />} />
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);

export default Rotas;
