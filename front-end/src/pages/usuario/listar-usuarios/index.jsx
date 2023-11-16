import "./index.css";
import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { defaultToastDefinitions } from "../../../core/utils/definitions";
import { useFormik } from "formik";
import * as Yup from "yup";
import usuarioService from "../../../core/services/usuario-service";

export default function ListUsuarios() {
  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState(null);
  const initialData = 
  {
    id: 0,
    nome: "",
    email: "",
    senha: "",
    ativo: false
  }
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object().shape({
        id: Yup.number(),
        nome: Yup.string().min(5, "Mínimo de 5 caracteres").required("Nome obrigatório"),
        ativo: Yup.boolean().required("Campo obrigatório"),
        role: Yup.string().required("Perfil obrigatório"),
        email: Yup.string().email("Email inválido").required("Cargo obrigatório"),
        senha: Yup.string().min(5, "Mínimo de 5 caracteres").required("Senha obrigatória")
    }),
    onSubmit: (values, { resetForm }) => {
      if(!userEdit) criarUsuario(values, resetForm);
      else editarUsuario(values?.id, values, resetForm);
    }
  });

  useEffect(() => {
    listar();
  }, []);

  const alterarUsuario = async (ativo, usuario) => {
    usuario.ativo = ativo;
    await usuarioService.edit(usuario.id, usuario).then(() => {
      toast.success("Usuário alterado com sucesso", defaultToastDefinitions);
      listar();
    }).catch(() => toast.error("Não foi possível concluir a solicitação"));
  }

  const criarUsuario = async (values, resetForm) => { 
    await usuarioService.create(values).then(() => {
      toast.success("Usuário criado com sucesso", defaultToastDefinitions);
      resetForm();
      listar();
    }).catch(() => toast.error("Não foi possível concluir a solicitação"));
  }

  const editarUsuario = async (id, values, resetForm) => { 
    await usuarioService.edit(id, values).then(() => {
      toast.success("Usuário alterado com sucesso", defaultToastDefinitions);
      resetForm();
      setUserEdit(null);
      listar();
    }).catch(() => toast.error("Não foi possível concluir a solicitação"));
  }
  
  const alterarFormParaEdicao = (usuario) => {
    setUserEdit(usuario);
    formik.setFieldValue("id", usuario.id);
    formik.setFieldValue("nome", usuario.nome);
    formik.setFieldValue("email", usuario.email);
    formik.setFieldValue("senha", usuario.email);
    formik.setFieldValue("ativo", usuario.ativo);
    formik.setFieldValue("role", usuario.role);
  }

  const listar = useCallback(async () => {
    await usuarioService.getAll().then((resultado) => {
      setUsers(resultado.data.data);
    });
  }, []);

  const formikErros = (property) => {
    if (formik.touched[property] && formik.errors[property])
      return <span className="text-red-400">{formik.errors[property]}</span>;
    return <></>;
  }

  const dataEmpty = () => {
    if(users.length == 0) 
        return <div className="not-found"> Nenhum usuário encontrado </div>;
    return <></>;
  }

  return (
    <div className="container-list-employee">
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Gerenciamento de Usuários</h1>
            </div>
        </div>
        <form className="container info-users-details" onSubmit={formik.handleSubmit}>
            <div className="details-user">
                <label htmlFor="nome">Nome</label>
                <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Nome"
                onChange={formik.handleChange}
                onBlur={(e) => formik.setFieldTouched("nome", e)}
                value={formik.values.nome}
                className="input-details"
                />
                {formikErros('nome')}
            </div>
            <div className="details-user">
                <label htmlFor="email">E-mail</label>
                <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={(e) => formik.setFieldTouched("email", e)}
                value={formik.values.email}
                className="input-details"
                />
                {formikErros('email')}
            </div>
            <div className="details-user">
                <label htmlFor="senha">Perfil</label>
                <select
                  onChange={formik.handleChange}
                  onBlur={(e) => formik.setFieldTouched("role", e)}
                  className="select-status"
                  value={formik.values.role}
                  name="role"
                  id="role"
                >
                  <option value="">Selecione um perfil</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">Comum</option>
                </select>
                {formikErros('role')}
            </div>
            <div className="details-user">
                <label htmlFor="senha">Senha</label>
                <input
                id="senha"
                name="senha"
                type="password"
                placeholder="Senha"
                onChange={formik.handleChange}
                onBlur={(e) => formik.setFieldTouched("senha", e)}
                value={formik.values.senha}
                className="input-details"
                />
                {formikErros('senha')}
            </div>
            { userEdit && (<div className="user-active">
                <label
                htmlFor="ativo"
                style={{ marginRight: "15px", width: "auto" }}>
                    Ativo
                </label>
                <input
                    id="ativo"
                    name="ativo"
                    type="checkbox"
                    onChange={formik.handleChange}
                    checked={formik.values.ativo} />
                {formikErros('ativo')}
            </div>) }
            <button className="submit" type="submit">
                { userEdit != null ? 'Atualizar' : 'Cadastrar' }
            </button>
        </form>

        <div className="container">
            { users.length > 0 && (
            <table className="table table-hover table-users">
            <thead>
              <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Perfil</th>  
              <th scope="col" style={{ textAlign: 'center' }}>Ativar/Desativar</th>
              <th scope="col" style={{ textAlign: 'center' }}>Editar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
            return (
              <tr key={u.id}>
                <th scope="row">{u.id}</th>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td style={{ textAlign: 'center' }}>
                  {
                    u.ativo ? 
                      (<button type="button" className="btn btn-danger" onClick={() => alterarUsuario(false, u)}>
                        Inativar
                        </button>) : 
                      (<button type="button" className="btn btn-success" onClick={() => alterarUsuario(true, u)}>
                        Ativar
                        </button>) 
                  }
                </td>
                <td className="edit" style={{ textAlign: 'center' }} onClick={() => alterarFormParaEdicao(u)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </td>
              </tr>
            ); })  }
          </tbody>
            </table> )}
          
          { dataEmpty() }
        </div>
    </div>
  );
}
