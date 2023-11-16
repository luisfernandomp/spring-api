import "./index.css";
import FilterComponent from "../../../components/filter-component";
import EmployeeService from "../../../core/services/employee-service";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { defaultToastDefinitions } from "../../../core/utils/definitions";

export default function ListEmployee() {
  const [users, setUsers] = useState([]);
  const [nameUser, setNameUser] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [idUser, setIdUser] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setIdUser(id);
    setShow(true);
  };

  let navigate = useNavigate();

  const handleExcluir = async () => {
    await EmployeeService.deleteUser(idUser).then(() => {
      toast.success('Excluído com sucesso!', defaultToastDefinitions());
        handleClose();
    }).catch(() => {
      toast.error('Não foi possível realizar a operação!', defaultToastDefinitions());
    })
  }

  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  function handleUserClick(id) {
    navigate(`/details-employee/${id}/false`);
  }

  function editUser(id) {
    navigate(`/details-employee/${id}/true`);
  }

  function newEmployee(event) {
    event.preventDefault();
    navigate(`/create-employee`);
  }
  
  const listar = useCallback(async () => {
    await EmployeeService.listar().then((resultado) => {
      setUsers(resultado.data.data);
    });
  }, []);

  useEffect(() => {
    listar();
  }, []);


  function undefinedOrNull(value){
    return value === null || value === undefined;
  }

  let usersFilter = users.filter((user) => {
    let userName = user.nome.toUpperCase();
    let filterName = nameUser.toUpperCase();
    let date = (new Date(user.dataCadastro)).setHours(0, 0, 0, 0);

    if(!undefinedOrNull(startDate) && !undefinedOrNull(endDate)){
      if (userName.includes(filterName) && (date >= startDate.setHours(0, 0, 0, 0)  && date <= endDate.setHours(0, 0, 0, 0))){
        return true;
      }
      else return false;
    }else{
      if (userName.includes(filterName)) return true;
      else return false;
    }
  });

  return (
    <div className="container-list-employee">
      <div className="jumbotron">
      </div>
      <div className="list-employee">
      <button className="new-employee" onClick={newEmployee}>
        <FontAwesomeIcon
          style={{ fontSize: "1.2em", fontWeight: 200 }}
          icon={faCirclePlus}
        />
        {"    "}
        Adicionar
      </button>
      <FilterComponent
        setUserName={setNameUser}
        startDate={startDate}
        endDate={endDate}
        handleChange={handleChange}
      />
      { usersFilter.length > 0 && (<table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Salário</th>
          <th scope="col">Cargo</th>
          <th scope="col"></th>
          <th scope="col"></th>    
        </tr>
      </thead>
      <tbody>
        {usersFilter.map((e) => {
        return (
          <tr key={e.id}>
            <th scope="row">{e.id}</th>
            <td>{e.nome}</td>
            <td>{e.salario}</td>
            <td>{e.cargo}</td>
            <td className="edit" onClick={() => editUser(e.id)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </td>
            <td className="delete" onClick={() => handleShow(e.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </td>
          </tr>
        ); })  }
      </tbody>
    </table> )}
      
      { usersFilter.length == 0 &&
       (<div className="not-found">
        Nenhum empregado encontrado
        </div>)}
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir funcionário</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja confirmar a exclusão desse funcionário?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Não
          </Button>
          <Button variant="danger" onClick={handleExcluir}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
