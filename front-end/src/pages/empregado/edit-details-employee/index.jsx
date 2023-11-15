import * as Yup from "yup";
import "./index.css";
import React, { useState, useEffect, useCallback } from "react";
import EmployeeService from "../../../core/services/employee-service";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import CurrencyInput from "react-currency-input-field";
import { defaultToastDefinitions } from "../../../core/utils/definitions";
registerLocale("ptBR", ptBR);

export default function EditAndDetailsEmployee() {
  const [empregado, setEmpregado] = useState({
    nome: null,
    salario: null,
    cargo: null
  });

  const intialData = (empregado) => {
    return {
      nome: empregado.nome || "",
      cargo: empregado.cargo,
      salario: empregado.salario || ""
    };
  }

  const { id, edit } = useParams();
  const formik = useFormik({
    initialValues: intialData(empregado),
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      salario: Yup.number().required("Salário obrigatório"),
      cargo: Yup.string().required("Cargo obrigatório")
    }),
    onSubmit: (values) => {
      editEmpregado(values);
    }
  });

  let navigate = useNavigate();

  const empregadoCallback = useCallback((empregado) => {
    setEmpregado(empregado);
  }, []);

  const editEmpregado = async (empregado) => {
    await EmployeeService.edit(id, empregado)
      .then(() => {
          toast.success('Alterado com sucesso!', defaultToastDefinitions());          
      })
      .catch((err) => {
        toast.error('Não foi possível realizar a operação!', defaultToastDefinitions());
      });
  };

  const getUserById = useCallback(async () => {
    await EmployeeService.getById(id).then((resultado) => {
      empregadoCallback(resultado.data.data);
    });
  }, [id, empregadoCallback]);

  useEffect(() => {
    getUserById();
  }, []);

  const back = () => {
    navigate("/empregados");
  };

  return (
    <section className="details-section">
      <div className="edit-details">
      <div className="go-back">
        <button className="back" onClick={back}>
          <FontAwesomeIcon className="icon-arrow" icon={faArrowLeft} />
          Voltar
        </button>
      </div>
      <div className="img-perfil">
        <div
          className="avatar-img"
          style={{ backgroundImage: `url("https://cdn-icons-png.flaticon.com/512/912/912214.png")` }}
        ></div>
        <p className="user-name">{empregado.nome}</p>
      </div>
      <form className="info-users-details" onSubmit={formik.handleSubmit}>
        <div className="details-user">
          <label htmlFor="cargo">Cargo</label>
          <input
            id="cargo"
            name="cargo"
            placeholder="Cargo"
            disabled={edit !== "true"}
            type="text"
            onBlur={(e) => formik.setFieldTouched("cargo", e)}
            onChange={formik.handleChange}
            value={formik.values.cargo}
            className="input-details"
          />
          {formik.touched.cargo && formik.errors.cargo && (
            <span className="text-red-400">{formik.errors.cargo}</span>
          )}
        </div>
        <div className="details-user">
          <label htmlFor="salario">Salário</label>
          <CurrencyInput
            id="salario"
            name="salario"
            disabled={edit !== "true"}
            prefix="R$"
            placeholder="Informe um valor"
            onBlur={(e) => formik.setFieldTouched("salario", e)}
            decimalsLimit={2}
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
        {exibirSalvar(edit)}
      </form>
      </div>
    </section>
  );
}

function exibirSalvar(edit) {
  if (edit === "true") {
    return (
      <button className="submit" type="submit">
        Salvar
      </button>
    );
  } else {
    return <></>;
  }
}
