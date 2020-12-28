const login = (username, password) => {
  //http request
  /*return axios
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
    });*/
    fetch("http://localhost:8080/usuarios/login",{
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body:
        JSON.stringify({
            'usuario': username,
            'password': password,
        }),
    }).then(res =>{
        console.log(res)
      })
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
};

export const authenticationService = {
  login,
};
