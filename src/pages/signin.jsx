import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";


export const SignIn = () => {

    const navigate = useNavigate();

    const signInWithGoogle = () => {

        signInWithPopup(auth, provider).then((result) => {
            navigate("/home");
            localStorage.setItem("name", result.user.displayName);
        }).catch((error) => {
            console.log(error)
        })
    }

    return <div className="container">

        <div className="signin">
            <h1>Time Vault</h1>
            <button className="google" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>

        <div className="version">
            <h1>Version 1.0</h1>
        </div>
    </div>
}