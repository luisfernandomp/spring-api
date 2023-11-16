import http from "../utils/http-axios";
import authService from "./auth-service";

const getAll = () => {
  return http.get("carros", authService.getHeaderAuth());
};

const getById = (id) => {
  return http.get(`carros/${id}`, authService.getHeaderAuth());
};

const create = (carro) => {
  return http.post("carros", carro, authService.getHeaderAuth());
};

const edit = (id, carro) => {
  return http.put(`carros/${id}`, carro, authService.getHeaderAuth());
};

const deleteById = (id) => {
  return http.delete(`carros/${id}`, authService.getHeaderAuth());
}

const getAllByEmpregadoId = (id) => {
  return http.get(`carros/empregado/${id}`, authService.getHeaderAuth());
}

export default {
  getAll,
  getById,
  edit,
  create,
  deleteById,
  getAllByEmpregadoId
};
