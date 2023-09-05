import React, { useState } from "react";
import MyInput from "../components/UI/MyInput";
import MyBtn from "../components/UI/MyBtn";
import Reg from "../components/Reg";
import { useParams } from "react-router-dom";
import Login from "../components/Login";

const Auth = () => {
    const {page} = useParams();

    return (
        <div className="auth">
            <div className="auth__container">
                {page === 'login' ? <Login/> : <Reg/>}                
            </div>
        </div>
    );
};

export default Auth;
