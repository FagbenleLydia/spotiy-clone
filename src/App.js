import './App.css';
import Login from './Login';
import React, { useEffect, useState } from "react";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from './Player';
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();
 
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      dispatch ({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        }); 
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getMe().then((profile) => {
        dispatch({
          type: "SET_ME",
          profile: profile,
        });
      });

      spotify.getPlaylist("3lec3CzDPAxsZokPph5w87").then((response) =>
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      })
    ).catch((error)=>console.log(error));

    spotify.getMyTopArtists().then((response) =>
    dispatch({
      type: "SET_TOP_ARTISTS",
      top_artists: response,
    })
  );

  dispatch({
    type: "SET_SPOTIFY",
    spotify: spotify,
  });

  spotify.getMe().then((user) => {
    dispatch({
      type: "SET_USER",
      user,
    });
  });

    }

  }, []);

  return (
    <div className="app">
      {
        token ? (
          <Player spotify={spotify}/>
        ) : (
          <Login />
       )   
      }
     
    </div>
  );
};

export default App;
