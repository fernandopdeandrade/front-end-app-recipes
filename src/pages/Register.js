import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import recipesLogo from "../images/recipesLogo.png";
import { fetchCreateUser } from "../services/fetchRecipes";
import "../styles/Register.css";

function Register() {
  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [messageLogin, setMessageLogin] = useState("");
  const [classMessage, setClassMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailValidation = formEmail.match(emailRegex);
  const PASSWORD_LIMIT = 5;
  const passwordValidation = password.length > PASSWORD_LIMIT;
  const NAME_LIMIT = 3;
  const nameValidation = name.length > NAME_LIMIT;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const clearInputs = () => {
    setFormEmail("");
    setPassword("");
    setName("");
  };

  const registerUser = async () => {
    const body = {
      username: name,
      email: formEmail,
      password,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetchCreateUser(
      "https://api-recipes-delta.vercel.app/register",
      options
    );
    if (response.status === 409) {
      setMessageLogin("Esse usuário já existe");
      setClassMessage("error");
    }
    if (response.status === 201) {
      setMessageLogin("Usuário cadastrado com sucesso");
      setClassMessage("success");
      clearInputs();
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="login-form">
      <img className="recipes_logo" src={recipesLogo} alt="Logo" />
      <div className="formRegister">
        <h1>Cadastro</h1>
        {!nameValidation && <b>Nome deve ter 4 ou mais caracteres</b>}
        <input
          type="text"
          data-testid="user-name-input"
          placeholder="Nome..."
          onChange={(event) => setName(event.target.value)}
        />
        {!emailValidation && <b>Formato do email - user@email.com</b>}
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email..."
          onChange={(event) => setFormEmail(event.target.value)}
        />
        {!passwordValidation && <b>Senha deve ter 6 ou mais caracteres</b>}
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
          disabled={!(emailValidation && passwordValidation && nameValidation)}
          onClick={registerUser}
        >
          Cadastrar
        </button>
        <Link className="link" to="/">
          Retornar para login
        </Link>
      </div>
      {messageLogin.length > 0 ? (
        <span className={classMessage}>{messageLogin}</span>
      ) : (
        <span className="span-message">Preencha todos os campos</span>
      )}
    </div>
  );
}

export default Register;
