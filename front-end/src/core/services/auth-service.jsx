import http from "../utils/http-axios";

const logar = (auth) => {
  return http.post("auth/login", auth);
};

const getToken = () => {
  return localStorage.getItem("TOKEN");
}

const isAuthenticated = () => {

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
  getHeaderAuth
};
