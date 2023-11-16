import http from "../utils/http-axios";
import authService from "./auth-service";

const getAll = () => {
  return http.get("usuarios", authService.getHeaderAuth());
};

const getById = (id) => {
  return http.get(`usuarios/${id}`, authService.getHeaderAuth());
};

const create = (usuario) => {
  return http.post("auth/criar-conta", usuario, authService.getHeaderAuth());
};

const edit = (id, usuario) => {
  return http.put(`usuarios/${id}`, usuario, authService.getHeaderAuth());
};

const deleteById = (id) => {
  return http.delete(`usuarios/${id}`, authService.getHeaderAuth());
}

export default {
  getAll,
  getById,
  edit,
  create,
  deleteById
};
