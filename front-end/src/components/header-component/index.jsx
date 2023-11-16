import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import authService from "../../core/services/auth-service";
import { useEffect, useState } from "react";

export default function HeaderComponent() {
  const [usuario, setUsuario] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    auth();
  }, []);

  const auth = () => {
    const usuario = authService.getTokenDecoded();
    setUsuario(usuario);
  }
  
  return (
    <header>
      <div className="name-company">
        <img
          src="../../assets/images/logo.png"
          alt="Logo da empresa"
          className="logo"
        />
      </div>
      <div className="menu-lista">
        <ul>
          <li onClick={() => navigate("empregados")}>Empregados</li>
          <li onClick={() => navigate("paises")}>Países</li>
          { usuario.role === "ADMIN" &&
            (<li onClick={() => navigate("usuarios")}>Usuários</li>) }
        </ul>
      </div>
      <div className="email-usuario">
          <div style={{ marginRight: '8px' }}><FontAwesomeIcon icon={faCircleUser} /></div>
          <span>{usuario.nome}</span>
        </div>
      <div className="menu">
        <FontAwesomeIcon icon={faBars} />
      </div>
    </header>
  );
}
