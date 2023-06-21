import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import { FilterContextState } from "../context/InfoContext";
import useDataInfos from "../hooks/useDataInfos";
import recipesLogo from "../images/recipesLogo.png";
import restaurante from "../images/restaurante.png";
import "../styles/Login.css";

function Login() {
  const history = useHistory();

  const { role } = useContext(FilterContextState) || {};

  const { loginUser, errorLogin, setErrorLogin, isLoading } =
    useDataInfos() || {};

  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageLogin, setMessageLogin] = useState("");

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailValidation = formEmail.match(emailRegex);
  const PASSWORD_LIMIT = 5;
  const passwordValidation = password.length > PASSWORD_LIMIT;

  const saveSubmition = async () => {
    loginUser(formEmail, password);
  };

  useEffect(() => {
    if (errorLogin === "Invalid email or password") {
      setErrorLogin("Email ou senha inválidos");

      setTimeout(() => {
        setErrorLogin("");
      }, 3000);
    }

    if (errorLogin === "Invalid email or password 1") {
      setErrorLogin("Usuário não encontrado no banco de dados");

      setTimeout(() => {
        setErrorLogin("");
      }, 3000);
    }

    if (role === "admin" || role === "user") {
      history.push("/meals");
    }
    if (role === "") {
      setMessageLogin("Preencha todos os campos!");
    }
  }, [role, history, errorLogin, setErrorLogin, setMessageLogin]);

  if (isLoading) return <Loading />;

  return (
    <div className="login-form">
      <img className="recipes_logo" src={recipesLogo} alt="Logo" />
      <img src={restaurante} alt="tomate" className="login_image" />
      <div className="formLogin">
        <h1>Login</h1>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email..."
          onChange={(event) => setFormEmail(event.target.value)}
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password..."
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className="login_button"
          type="button"
          data-testid="login-submit-btn"
          disabled={!(emailValidation && passwordValidation)}
          onClick={saveSubmition}
        >
          Entrar
        </button>
        <Link className="link" to="/register">
          Ainda não tem conta?
        </Link>
      </div>
      {errorLogin.length > 0 ? (
        <span className="span-error-login">{errorLogin}</span>
      ) : (
        <span className="span-message">{messageLogin}</span>
      )}
    </div>
  );
}

export default Login;
