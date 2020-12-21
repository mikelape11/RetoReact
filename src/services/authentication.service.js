import axios from "axios";

const login = (username, password) => {
  //http request
  return axios
    .post(process.env.REACT_APP_DB + "users/login", {
      username: username,
      password: password,
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      if (res.status === 401 || res.status === 403) {
        return "User or password incorrrect";
      }
    })
    .catch(() => {
      return { error: "User or password incorrrect!" };
    });
};

export const authenticationService = {
  login,
};
