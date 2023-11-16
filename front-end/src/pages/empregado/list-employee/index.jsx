import "./index.css";
import FilterComponent from "../../../components/filter-component";
import EmployeeService from "../../../core/services/employee-service";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPenToSquare, faTrash, faGear } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { defaultToastDefinitions } from "../../../core/utils/definitions";
import { useFormik } from "formik";
import * as Yup from "yup";
import carroService from "../../../core/services/carro-service";

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

  const navigate = useNavigate();
  const [showModalCarro, setShowModalCarro] = useState(false);
  const [carros, setCarros] = useState([]);
  const [carroEdit, setCarroEdit] = useState(null);
  const initialData = () => {
    return {
      modelo: "",
      marca: "",
      ano: 0,
      categoria: "",
      empregado_id: 0
    }
  }
  const [empregadoId, setEmpregadoId] = useState(0);

  const formik = useFormik({
    initialValues: initialData(),
    validationSchema: Yup.object().shape({
      modelo: Yup.string().required("Campo obrigatório"),
      marca: Yup.string().required("Campo obrigatório"),
      ano: Yup.number().required("Cargo obrigatório"),
      categoria: Yup.string().required("Campo obrigatório"),
      empregado_id: Yup.string().required("Campo obrigatório"),
    }),
    onSubmit: (values) => {
      if(!carroEdit) createCarro(values, resetForm);
      else alterarCarro(values);
    }
  });

  const resetForm = () => {
    formik.resetForm();
  }

  const createCarro = async (values) => {
    await carroService.create(values)
      .then(() => { 
        toast.success('Carro criado com sucesso!', defaultToastDefinitions());
        getAllByEmpregado(values.empregado_id);
        resetForm();
      })
      .catch(() => toast.error('Não foi possível realizar a operação!', defaultToastDefinitions()));
  }

  const alterarCarro = async (values) => {
    await carroService.edit(values.id, values)
      .then(() => { 
        toast.success('Carro alterado com sucesso!', defaultToastDefinitions());
        getAllByEmpregado(values.empregado_id);
        resetForm();
      })
      .catch((err) => toast.error('Não foi possível realizar a operação!', defaultToastDefinitions()));
  }

  const alterarFormParaEdicao = (carro) => {
    setCarroEdit(carro);
    formik.setFieldValue("id", carro.id);
    formik.setFieldValue("modelo", carro.modelo);
    formik.setFieldValue("marca", carro.marca);
    formik.setFieldValue("ano", carro.ano);
    formik.setFieldValue("categoria", carro.categoria);
    formik.setFieldValue("empregado_id", carro.empregado.id);    
  }

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

  const formikErros = (property) => {
    if (formik.touched[property] && formik.errors[property])
      return <span className="text-red-400">{formik.errors[property]}</span>;
    return <></>;
  }

  const getAllByEmpregado = async (id) => {
    setCarroEdit(null);
    resetForm();
    formik.setFieldValue("empregado_id", id); 
    setShowModalCarro(true);
    await carroService.getAllByEmpregadoId(id).then((resultado) => {
      setCarros(resultado.data.data);
    }).catch(() => {
      toast.error('Ocorreu um erro na Api!', defaultToastDefinitions());
    })
  }

  const handleCloseModalCarro = () => {
    setShowModalCarro(false);
    resetForm();
  }

  const dataEmpty = () => {
    if(carros.length == 0) 
        return <div className="not-found"> Nenhum carro encontrado </div>;
    return <></>;
  }

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
      <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Gerenciamento de Empregados</h1>
            </div>
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
          <th scope="col">Pais</th>
          <th scope="col"></th>
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
            <td>{e.pais?.nome}</td>
            <td className="edit" onClick={() => editUser(e.id)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </td>
            <td className="delete" onClick={() => handleShow(e.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </td>
            <td>
              <FontAwesomeIcon icon={faGear} onClick={() => getAllByEmpregado(e.id)} />
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


      <Modal size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered 
        show={showModalCarro} onHide={() => setShowModalCarro(false)} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Carro</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#f7f7f7'}}>
        <form className="container info-users-details" onSubmit={formik.handleSubmit}>
            <div className="details-user">
                <label htmlFor="nome">Modelo</label>
                <input
                id="modelo"
                name="modelo"
                type="text"
                placeholder="modelo"
                onChange={formik.handleChange}
                onBlur={(e) => formik.setFieldTouched("modelo", e)}
                value={formik.values.modelo}
                className="input-details"
                />
                {formikErros('modelo')}
            </div>
            <div className="details-user">
                <label htmlFor="email">Marca</label>
                <input
                id="marca"
                name="marca"
                type="text"
                placeholder="marca"
                onChange={formik.handleChange}
                onBlur={(e) => formik.setFieldTouched("marca", e)}
                value={formik.values.marca}
                className="input-details"
                />
                {formikErros('marca')}
            </div>
            <div className="details-user">
                <label htmlFor="email">Ano</label>
                <input
                id="ano"
                name="ano"
                type="number"
                placeholder="ano"
                onChange={formik.handleChange}
                onBlur={(e) => formik.setFieldTouched("ano", e)}
                value={formik.values.ano}
                className="input-details"
                />
                {formikErros('ano')}
            </div>
            <div className="details-user">
                <label htmlFor="email">Categoria</label>
                <input
                id="categoria"
                name="categoria"
                type="text"
                placeholder="categoria"
                onChange={formik.handleChange}
                onBlur={(e) => formik.setFieldTouched("categoria", e)}
                value={formik.values.categoria}
                className="input-details"
                />
                {formikErros('categoria')}
            </div>
            <button className="submit" type="submit">
                { carroEdit != null ? 'Atualizar' : 'Cadastrar' }
            </button>
        </form>

        <div className="container">
            { carros.length > 0 && (
            <table className="table table-hover table-users">
            <thead>
              <tr>
              <th scope="col">#</th>
              <th scope="col">Modelo</th>
              <th scope="col">Marca</th>
              <th scope="col">Ano</th>
              <th scope="col">Categoria</th> 
              <th scope="col" style={{ textAlign: 'center' }}>Excluir</th>
              <th scope="col" style={{ textAlign: 'center' }}>Editar</th>
            </tr>
          </thead>
          <tbody>
            {carros.map((c) => {
            return (
              <tr key={c.id}>
                <th scope="row">{c.id}</th>
                <td className="">{c.modelo}</td>
                <td>{c.marca}</td>
                <td>{c.ano}</td>
                <td>{c.categoria}</td>
                <td style={{ textAlign: 'center' }}>
                <FontAwesomeIcon icon={faTrash} />
                </td>
                <td className="edit" style={{ textAlign: 'center' }} onClick={() => alterarFormParaEdicao(c)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </td>
              </tr>
            ); })  }
          </tbody>
            </table> )}
          
          { dataEmpty() }
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleCloseModalCarro()}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
