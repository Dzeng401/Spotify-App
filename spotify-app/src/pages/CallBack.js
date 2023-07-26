import "../css/callback.css"
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {getRequestToken, GetSpotifyInfo} from "../api/spotifyapi.js"

const CallBack = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const code = queryParameters.get("code");
    const state = queryParameters.get("state");
    const navigate = useNavigate();

    useEffect(() => {
        if (!code || !state) {
            navigate("/auth");
        }
        getRequestToken(code)
        .then(result => {
            result.json().then(data => {
            const accessToken = data.access_token;
            const refreshToken = data.refresh_token;
            GetSpotifyInfo(accessToken)
            .then(userInfo => {
                const spotifyEmail = userInfo.data.email;
                const spotifyUserName = userInfo.data.display_name;
                const newStuff = {
                    username: localStorage.getItem("username"),
                    password: localStorage.getItem("password"),
                    refreshToken: refreshToken,
                    spotifyUser: spotifyUserName,
                    spotifyEmail: spotifyEmail
                };
                fetch("http://localhost:8080/auth/signup", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(newStuff)
                })
                .then(response => {
                    if (response.status === 401) {
                        navigate("/auth");
                    }
                    else {
                        response.json().then(finalUserReturn => {
                            localStorage.setItem("userInfo", JSON.stringify({username: finalUserReturn.newUser.username, refresh_token: finalUserReturn.newUser.refreshToken, currentDate: new Date()}));
                            localStorage.setItem("access-token", accessToken);
                            navigate("/");
                        });
                    }
            });
            });
        });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className = "callback">
            <h1>Redirecting you shortly...</h1>
        </div>
    );
}

export default CallBack;