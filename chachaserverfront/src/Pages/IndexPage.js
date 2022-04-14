import React from "react";
import {useNavigate} from "react-router-dom";
import "../Styles/IndexPageStyle.css";

const IndexPage = () => {
    const navigate = useNavigate();
    const routeChangeLogin = () =>{ 
        let login = "/login";
        navigate(login);
    }

    const routeChangeRegister = () =>{ 
        let register = "/register";
        navigate(register);
    }


    return (
        <div class="nav">
        <input type="checkbox"/>
            <span></span>
            <span></span>
            <div class="menu">
            <li><button class = "buttonMenu" onClick={routeChangeLogin}> Se connecter </button></li>
            <li><button class = "buttonMenu" onClick={routeChangeRegister}> S'enregistrer </button></li>
            </div>
            <p> Welcome To ChachaSever ! </p>
        </div>
        );
};

export default IndexPage;
