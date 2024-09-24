import axios from "axios";

const setAuthToken = () => {
  let token = "";

  try {
    token = JSON.parse(localStorage.getItem("persist:root"));
    token = JSON.parse(token.authentication);
    token = token.auth;
  } catch (error) { }

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["clientId"] = ``;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
