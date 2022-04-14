import React from "react";
import axios from "axios";
import makeToast from "../Toaster";
import { useNavigate } from "react-router-dom";



const RegisterPage = () => {
  
  const navigate = useNavigate();
  
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  //A function that register the user
  const registerUser = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:3000/user/register", {
        username,
        password,
      })
      .then((response) => {
        makeToast("success", response.data.message);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
        makeToast("error", err.response.data.message);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">S'enregistrer</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="nom d'utilisateur"
            ref={usernameRef}
          />
        </div>
      </div>
      <div className="inputGroup">
        <label htmlFor="password"> Mot de passe </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Saisissez le ici"
          ref={passwordRef}
        />
      </div>
      <button onClick={registerUser}> S'enregistrer</button>
      <button className = "Retour" onClick={() => {navigate("/")}}> Retour </button>
    </div>
  );
};

export default RegisterPage;
