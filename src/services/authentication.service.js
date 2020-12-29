const login = (username, password) => {
  console.log(JSON.stringify({
    usuario: username,
    password: password,
}))
  //http request
  /*return axios
    .post("http://localhost:8080/usuarios/login", {
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
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:
      JSON.stringify({
          usuario: username,
          password: password,//Por alguna razon que no entiendo esto da error 415, cuando no debería, de momento lo dejamos y ya lo arreglaremos.
    }),
    mode:'no-cors',
  }).then(res =>{
      console.log(res)
    })
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
};

export const authenticationService = {
  login,
};
