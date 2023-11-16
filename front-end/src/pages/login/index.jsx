import authService from "../../core/services/auth-service";
import * as Yup from "yup";
import "./index.css";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { defaultToastDefinitions } from "../../core/utils/definitions"

export default function Login() {
    let navigate = useNavigate();
    
    const initialData = () => {
        return {
          email: "",
          senha: ""
        }
      }

    const formik = useFormik({
        initialValues: initialData(),
        validationSchema: Yup.object().shape({
          email: Yup.string().email("Email inválido").required("Email obrigatório"),
          senha: Yup.string()
            .min(3, "Mínimo de 5 caracteres")
            .required("Senha obrigatória")
        }),
        onSubmit: (values, { resetForm }) => {
          logar(values, resetForm);
        }
      });

    const logar = (auth, resetForm) => {
        authService.logar(auth)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("TOKEN", response.data.data.token);
                resetForm({ values: "" });
                navigate("/empregados");
            })
            .catch((error) => toast.error('Usuário ou senha inválidos!', defaultToastDefinitions()));
    }

    return (
        <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                    <div className="card-body p-5 text-center">

                        <h3 className="mb-5">Logar</h3>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-outline mb-4">
                                <label className="form-label" forhtml="email">Email</label>
                                <input 
                                    id="email"
                                    name="email"
                                    type="email" 
                                    className="form-control form-control-lg"
                                    onChange={formik.handleChange}
                                    onBlur={(e) => formik.setFieldTouched("email", e)}
                                    value={formik.values.email} />
                                {formik.touched.email && formik.errors.email && (
                                    <span className="text-red-400">{formik.errors.email}</span>
                                )}
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label"  forhtml="typePasswordX-2">Senha</label>
                                <input 
                                    id="senha"
                                    name="senha" 
                                    type="password" 
                                    className="form-control form-control-lg"
                                    onChange={formik.handleChange}
                                    onBlur={(e) => formik.setFieldTouched("senha", e)}
                                    value={formik.values.senha} />
                                {formik.touched.senha && formik.errors.senha && (
                                    <span className="text-red-400">{formik.errors.senha}</span>
                                )}
                            </div>

                            <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                        </form>

                        </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    );
}