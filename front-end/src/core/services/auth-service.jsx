import http from "../utils/http-axios";
import { jwtDecode } from "jwt-decode";

const logar = (auth) => {
  return http.post("auth/login", auth);
};

const getToken = () => {
  return localStorage.getItem("TOKEN");
}

const getTokenDecoded = () => {
  const user = jwtDecode(getToken());

  return  {
    nome: user['sub'],
    role: user['role']
  };
}

const getHeaderAuth = () => {
  return { headers: {
      'Authorization': `Bearer ${getToken()}` 
    }
  };
}

export default {
  logar,
  getToken,
  getHeaderAuth,
  getTokenDecoded
};
