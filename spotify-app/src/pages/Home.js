import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {userAuth} from "../authorization/userAuth.js";
import "../css/Home.css"
import Navbar from "../components/Navbar.js"
import {logout} from "../api/logout.js"
import {getSpotifySongs, refreshSpotifyToken} from "../api/spotifyapi.js"
import SpotifyChart from "../components/SpotifyChart.js"

const Home = () => {
    const navigate = useNavigate();
    const [displayData, setDisplayData] = useState([]);
    
    useEffect(() => {
        userAuth().then(status => {
            if (status === "error") {
                localStorage.setItem("userInfo", "");
                logout();
                navigate("/auth");
            }
        })
        setTimeout(() => {
            localStorage.setItem("userInfo", "");
            logout();
            navigate("/auth");
        }, "1200000000");
        
        if (localStorage.getItem("access-token") !== null && localStorage.getItem("access-token") !== "") {
            const access_token = localStorage.getItem("access-token");
            getSpotifySongs(access_token).then(response => {
                if (response !== "error") {
                    setDisplayData(response);
                }
            });
        }
    }, [navigate]);

    const refreshSpotify = async() => {
        const response = await refreshSpotifyToken(JSON.parse(localStorage.getItem("userInfo")).refresh_token);
        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem("access-token", data.access_token);
            getSpotifySongs(data.access_token).then(response => {
                if (response !== "error") {
                    setDisplayData(response);
                }
            });
        }
    }

    return(
        <div>
            <Navbar/>
            <div className = "home-body">
                {displayData.length === 0 && <button className = "refresh-button" onClick = {refreshSpotify}>Need to refresh token. Please refresh to get new access token.</button>}
                {displayData.length !== 0 && <h1 className = "artist-blurb">Top 10 Artists Of 2023</h1>}
                {displayData.length !== 0 && <SpotifyChart artists = {displayData.data.items}/>}
            </div>
           
        </div>
    );
}

export default Home;