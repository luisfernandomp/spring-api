import http from "../utils/http-axios";
import authService from "./auth-service";

const listar = () => {
  return http.get("empregados", authService.getHeaderAuth());
};

const getById = (id) => {
  return http.get(`empregados/${id}`, authService.getHeaderAuth());
};

const create = (empregado) => {
  return http.post("empregados", empregado, authService.getHeaderAuth());
};

const edit = (id, empregado) => {
  return http.put(`empregados/${id}`, empregado, authService.getHeaderAuth());
};

const deleteUser = (id) => {
  return http.delete(`empregados/${id}`, authService.getHeaderAuth());
}

const getByNome = (q) => {
  let config = {
    headers: {'Authorization': 'Bearer ' + authService.getToken()},
    params: {
      q: q
    }
  }

  return http.get(`empregados/filtros`, config);
}


export default {
  listar,
  getById,
  edit,
  create,
  deleteUser,
  getByNome
};
