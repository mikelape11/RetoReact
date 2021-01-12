//import axios from "axios";

const login = (username, password) => {
  /*const json = JSON.stringify({
    usuario: username,
    password: password,
  })
  //http request
  return axios
    .post("http://localhost:8080/usuarios/login", {
      json
    },{
    headers: {
      'Content-Type': 'application/json'
    }})
    .then((res) => {//Da error 500 en la llamada
      console.log(res)
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
  return fetch("http://localhost:8080/usuarios/login",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:
      JSON.stringify({
          usuario: username,
          password: password,//Ahora se puede arreglar esto, con el CrossOrigin
    }),
  })
  .then(result => result.json())
  .then(res =>{
      console.log(res)
      return res;
    })
  .catch(error => console.error('Error:', error))
};

export const authenticationService = {
  login,
};