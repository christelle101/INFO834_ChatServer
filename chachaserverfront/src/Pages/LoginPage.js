import React from 'react';
import makeToast from '../Toaster';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const LoginPage = (props) => {

    const navigate = useNavigate();

    const usernameRef = React.createRef();
    const passwordRef = React.createRef();

    const loginUser = () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        //To show confirmation of registration
        axios.post("http://localhost:3000/user/login", {
            username,
            password,
        })
        .then((response) => {
            makeToast("success", response.data.message);
            localStorage.setItem("CC_Token", response.data.token);
            navigate("/dashboard");
            props.setupSocket(); //props.setupSocket
            console.log("coucou");
        })
        .catch((err) => {
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
        <div className="cardHeader"> Login </div>
            <div className="cardBody"> 
                <div className="inputGroup">
                    <label htmlFor = "username"> Username </label>
                    <input 
                        type = "username" 
                        name="username" 
                        id="username" 
                        placeholder="nom d'utilisateur"
                        ref = {usernameRef}
                    />
                </div> 
                <div className="inputGroup">
                    <label htmlFor = "password"> Mot de passe </label>
                    <input 
                        type = "password" 
                        name="password" 
                        id="password" 
                        placeholder="Saisissez le ici"
                        ref = {passwordRef}
                    />
                </div>
                <button onClick={loginUser}> Se connecter </button>  
                <button className = "Retour" onClick={() => {navigate("/")}}> Retour </button>
            </div>
    </div>

    );
};

export default LoginPage;
