import React from 'react';
import {useState, useEffect} from 'react'
import "../css/Auth.css"
import {spotifyRedirect} from "../api/spotifyapi.js"
import {useNavigate} from "react-router-dom"
import {userAuth} from "../authorization/userAuth.js"
 
const Auth = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(true);
    const [password, setPassword] = useState("");
    const [username, setuserName] = useState("");

    useEffect(() => {
        userAuth().then(result => {
            if (result === "valid") {
                navigate("/");
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loginHandler = async(event) => {
        event.preventDefault();
        const user = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        if (user.status === 200) {
            user.json().then(data => {
                localStorage.setItem("userInfo", JSON.stringify({username: data.newUser.username, refresh_token: data.newUser.refreshToken, currentDate: new Date()}));
                navigate("/");
            })
        }
    }

    const signupHandler = (event) => {
        event.preventDefault();
        navigate("/callback");
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        spotifyRedirect();
    }
    return(
        <div style = {{
            backgroundColor: '#D6F6D5',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1 style = {{fontSize: '50px'}}>Spotify Currently Playing</h1>
            <div style = {{
                width: '50%',
                height: '50%',
                backgroundColor: 'white',
                borderRadius: '10px',
                textAlign: 'center'
            }}>
                {auth && <h1 className = "auth-title">Log In</h1>}
                {auth && <input className = "signup-username" placeholder = "Enter username here" onChange = {(event) => setuserName(event.target.value)}></input>}
                {auth && <input className = "signup-password" placeholder = "Enter password here" onChange = {(event) => setPassword(event.target.value)}></input>}
                {auth && <button className = "login-button" onClick = {loginHandler}>Login</button>}
                {auth && <p>Need an account?</p>}
                {auth && <span style = {{color: 'blue'}} onClick = {() => {setAuth(false)}}>Sign In</span>}
                
                {!auth && <h1 className = "auth-title">Log In</h1>}
                {!auth && <input className = "signup-username" placeholder = "Enter username here" onChange = {(event) => {setuserName(event.target.value)}}></input>}
                {!auth && <input className = "signup-password" placeholder = "Enter password here" onChange = {(event) => setPassword(event.target.value)}></input>}
                {!auth && <button className = "login-button" onClick = {signupHandler}>Sign In</button>}
                {!auth && <p>Already have an account?</p>}
                {!auth && <span style = {{color: 'blue'}} onClick = {() => {setAuth(true)}}>Log In</span>}
            </div>
        </div>
    );
};

export default Auth;


