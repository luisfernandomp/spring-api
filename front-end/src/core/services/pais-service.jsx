import http from "../utils/http-axios";
import authService from "./auth-service";

const getAll = () => {
  return http.get("paises", authService.getHeaderAuth());
};

const getById = (id) => {
  return http.get(`paises/${id}`, authService.getHeaderAuth());
};

const create = (pais) => {
  return http.post("paises", pais, authService.getHeaderAuth());
};

const edit = (id, pais) => {
  return http.put(`paises/${id}`, pais, authService.getHeaderAuth());
};

const deleteById = (id) => {
  return http.delete(`paises/${id}`, authService.getHeaderAuth());
}

export default {
  getAll,
  getById,
  edit,
  create,
  deleteById
};
