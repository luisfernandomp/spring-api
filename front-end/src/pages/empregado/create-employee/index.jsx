import * as Yup from "yup";
import "./index.css";
import React from "react";
import EmployeeService from "../../../core/services/employee-service";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import CurrencyInput from "react-currency-input-field";
registerLocale("ptBR", ptBR);
import  { defaultToastDefinitions } from "../../../core/utils/definitions"

export default function CreateEmployee() {
  const initialData = () => {
    return {
      nome: "",
      cargo: "",
      salario: ""
    }
  }

  const formik = useFormik({
    initialValues: initialData(),
    validationSchema: Yup.object().shape({
      salario: Yup.number().required("Salário obrigatório"),
      nome: Yup.string()
        .min(5, "Mínimo de 3 caracteres")
        .required("Nome obrigatório"),
      cargo: Yup.string()
        .min(5, "Mínimo de 3 caracteres")
        .required("Cargo obrigatório"),
    }),
    onSubmit: (values, { resetForm }) => {
      createEmpregado(values, resetForm);
    }
  });

  let navigate = useNavigate();

  const createEmpregado = async (empregado, resetForm) => {
    await EmployeeService.create(empregado)
      .then(() => {
        resetForm({ values: "" });
        toast.success('Cadastrado com sucesso!', defaultToastDefinitions());
      })
      .catch((err) => {
        toast.error('Não foi possível realizar a operação!', defaultToastDefinitions());
      });
  };

  const back = () => {
    navigate("/empregados");
  };

  return (
    <section className="details-section">
      <div className="details-create">
        <div className="go-back">
          <button className="back" onClick={back}>
            <FontAwesomeIcon className="icon-arrow" icon={faArrowLeft} />
            Voltar
          </button>
        </div>

        <form className="info-users-details" onSubmit={formik.handleSubmit}>
          <h1>Cadastrar funcionário</h1>
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
            {formik.touched.nome && formik.errors.nome && (
              <span className="text-red-400">{formik.errors.nome}</span>
            )}
          </div>
          <div className="details-user">
            <label htmlFor="salario">Salário</label>
            <CurrencyInput
              id="salario"
              name="salario"
              prefix="R$"
              placeholder="Informe um valor"
              decimalsLimit={2}
              onBlur={(e) => formik.setFieldTouched("salario", e)}
              value={formik.values.salario}
              onValueChange={(value) => {
                formik.setFieldValue("salario", value);
              }}
              className="input-details"
            />
            {formik.touched.salario && formik.errors.salario && (
              <span className="text-red-400">{formik.errors.salario}</span>
            )}
          </div>
          <div className="details-user">
            <label htmlFor="nome">Cargo</label>
            <input
              id="cargo"
              name="cargo"
              type="text"
              placeholder="Cargo"
              onChange={formik.handleChange}
              onBlur={(e) => formik.setFieldTouched("nome", e)}
              value={formik.values.cargo}
              className="input-details"
            />
            {formik.touched.cargo && formik.errors.cargo && (
              <span className="text-red-400">{formik.errors.cargo}</span>
            )}
          </div>

          <button className="submit" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </section>
  );
}
