import {CILENT_ID, CILENT_SECRET, REDIRECT_URI} from "../context/spotifyContext.js"
import {Buffer} from 'buffer'
import axios from "axios";

export const spotifyRedirect = () => {
    const stateNumber = "34fFs29kd09";
	const scopes =
		"user-read-private user-read-email playlist-read-private user-top-read user-read-currently-playing";
	const authorizeSpotifyURL = `https://accounts.spotify.com/authorize?client_id=${CILENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}
	&scope=${scopes}&state=${stateNumber}`;
    window.location.href = authorizeSpotifyURL;
}

export const getRequestToken = async(code) => {
	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': "Basic " + Buffer.from(`${CILENT_ID}:${CILENT_SECRET}`).toString("base64")
		},
		body: new URLSearchParams({
			'grant_type': 'authorization_code',
			'code': code,
			'redirect_uri': REDIRECT_URI,
			'client_secret': CILENT_SECRET,
			'client_id': CILENT_ID
		}),
		json: true
	});
	return response;
}

export const GetSpotifyInfo = async(accessToken) => {
	const res = await axios({
		url: "https://api.spotify.com/v1/me",
		headers: {
		  Authorization: `Bearer ${accessToken}`,
		  Accept: "application/json",
		},
	  }).catch(error => {
		  throw error;
	  });
	return res;
	// const auth = `Bearer ${accessToken}`;
	// const response = await fetch("https://api.spotify.com/v1/me", {
	// 	method: "GET",
	// 	header: {
	// 		"Authorization": auth,
	// 	}
	// });
	// const data = await response.json();
	// return data;
}

export const getSpotifySongs = async(access_token) => {
	const res = await axios({
		url: "https://api.spotify.com/v1/me/top/artists",
		headers: {
			Authorization: `Bearer ${access_token}`,
		  	Accept: "application/json",
		}
	}).catch(error => {
		return "error";
	})
	return res;
}

export const refreshSpotifyToken = async(refreshToken) => {
	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': "Basic " + Buffer.from(`${CILENT_ID}:${CILENT_SECRET}`).toString("base64")
		},
		body: new URLSearchParams({
			'grant_type': 'refresh_token',
			'refresh_token': refreshToken,
			'client_secret': CILENT_SECRET,
			'client_id': CILENT_ID
		}),
		json: true
	});
	return response;
}

export const getCurrentlyPlaying = async(access_token) => {
	const res = await axios({
		url: "https://api.spotify.com/v1/me/player/currently-playing",
		headers: {
			Authorization: `Bearer ${access_token}`,
		  	Accept: "application/json",
		}
	}).catch(error => {
		return "error";
	})
	return res;
}