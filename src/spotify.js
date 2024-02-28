export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "3d9415b5cd834a2280123e8142c1aa1b";
const redirectUri = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://spotiy-clone.vercel.app/"
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
  ];
  
  export const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
  
        return initial;
      }, {});
  };
  
  export const accessUrl =`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;