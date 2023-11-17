import "./index.css";
import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { defaultToastDefinitions } from "../../core/utils/definitions";
import { useFormik } from "formik";
import * as Yup from "yup";
import paisService from "../../core/services/pais-service";

export default function ListPaises() {
  const [paises, setPaises] = useState([]);
  const [paisEdit, setPaisEdit] = useState(null);
  const initialData = 
  {
    id: 0,
    nome: "",
    continente: "",
    populacao: 0
  }
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object().shape({
        id: Yup.number(),
        nome: Yup.string().required("Campo obrigatório"),
        continente: Yup.string().required("Campo obrigatório"),
        populacao: Yup.number().required("Campo obrigatório")
    }),
    onSubmit: (values, { resetForm }) => {
      if(!paisEdit) criarPais(values, resetForm);
      else editarPais(values?.id, values, resetForm);
    }
  });

  useEffect(() => {
    listar();
  }, []);

  const deletarPais = async (id) => {
      await paisService.deleteById(id).then(() => {
        toast.success("País excluído com sucesso", defaultToastDefinitions);
        listar();
      }).catch((error) => toast.error(error.response.data.data.erros[0]));
  }


  const criarPais = async (values, resetForm) => { 
    await paisService.create(values).then(() => {
      toast.success("País criado com sucesso", defaultToastDefinitions);
      resetForm();
      listar();
    }).catch(() => toast.error("Não foi possível concluir a solicitação"));
  }

  const editarPais = async (id, values, resetForm) => { 
    await paisService.edit(id, values).then(() => {
      toast.success("País alterado com sucesso", defaultToastDefinitions);
      formik.resetForm();
      setPaisEdit(null);
      listar();
    }).catch(() => toast.error("Não foi possível concluir a solicitação"));
  }
  
  const alterarFormParaEdicao = (pais) => {
    setPaisEdit(pais);
    formik.setFieldValue("id", pais.id);
    formik.setFieldValue("nome", pais.nome);
    formik.setFieldValue("continente", pais.continente);
    formik.setFieldValue("populacao", pais.populacao);
  }

  const listar = useCallback(async () => {
    await paisService.getAll().then((resultado) => {
      setPaises(resultado.data.data);
    });
  }, []);

  const formikErros = (property) => {
    if (formik.touched[property] && formik.errors[property])
      return <span className="text-red-400">{formik.errors[property]}</span>;
    return <></>;
  }

  const dataEmpty = () => {
    if(paises.length == 0) 
        return <div className="not-found"> Nenhum país encontrado </div>;
    return <></>;
  }

  return (
    <div className="container-list-employee">
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Gerenciamento de Países</h1>
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
                <label htmlFor="continente">Continente</label>
                <input
                id="continente"
                name="continente"
                type="text"
                placeholder="Continente"
                onChange={formik.handleChange}
                onBlur={(e) => formik.setFieldTouched("continente", e)}
                value={formik.values.continente}
                className="input-details"
                />
                {formikErros('continente')}
            </div>
            <div className="details-user">
                <label htmlFor="populacao">População</label>
                <input
                id="populacao"
                name="populacao"
                type="number"
                placeholder="População"
                onChange={formik.handleChange}
                onBlur={(e) => formik.setFieldTouched("populacao", e)}
                value={formik.values.populacao}
                className="input-details"
                />
                {formikErros('populacao')}
            </div>
            <button className="submit" type="submit">
                { paisEdit != null ? 'Atualizar' : 'Cadastrar' }
            </button>
        </form>

        <div className="container">
            { paises.length > 0 && (
            <table className="table table-hover table-users">
            <thead>
              <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Continente</th>
              <th scope="col">População</th>  
              <th scope="col" style={{ textAlign: 'center' }}>Editar</th>
              <th scope="col" style={{ textAlign: 'center' }}>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {paises.map((p) => {
            return (
              <tr key={p.id}>
                <th scope="row">{p.id}</th>
                <td>{p.nome}</td>
                <td>{p.continente}</td>
                <td>{p.populacao}</td>
                <td className="edit" style={{ textAlign: 'center' }} onClick={() => alterarFormParaEdicao(p)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </td>
                <td className="edit" style={{ textAlign: 'center' }} onClick={() => deletarPais(p.id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
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
