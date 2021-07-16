window.onload = () => {
  class DatosUsuario {
    constructor() {
      this.firstName = null;
      this.lastName = null;
      this.password = null;
      this.email = null;
    }
  
    setFirstName(firstname) {
      this.firstName = firstname;
    }

    setLastName(lastname) {
      this.lastName = lastname;
    }
  
    setPassword(password) {
      this.password = password;
    }

    setEmail(email) {
      this.email = email;
    }
  }

  const formLogin = document.forms.formLogin;

  const nombre = formLogin.nombre;
  const contrasenia = formLogin.contrasenia;
  const repetirContrasenia = formLogin.repetirContrasenia;
  const email = formLogin.email;

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreValido = validarNombre(nombre.value);
    const contrValido = validarContrasenia(contrasenia.value, repetirContrasenia.value);
    const emailValido = validarEmail(email.value)

    if (nombreValido && contrValido && emailValido) {
      const datosUsuario = new DatosUsuario();
      datosUsuario.setFirstName(nombre.value);
      datosUsuario.setLastName("DH");
      datosUsuario.setPassword(contrasenia.value);
      datosUsuario.setEmail(email.value);

      console.log(datosUsuario);
      console.log(JSON.stringify(datosUsuario));

      const url = "https://ctd-todo-api.herokuapp.com/v1";

      fetch( `${url}/users` , {
        method: 'POST', 
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(datosUsuario)
      }).then(function (response){
        return response.json();
      }).then(function (data) {
        localStorage.setItem('token', data.jwt);
        location.href = "./lista-tareas.html";
      }).catch(function (err) {
        console.log(err);
      });

      console.log(datosUsuario);

      //localStorage.setItem('token', JSON.stringify(datosUsuario));
      //location.href = './lista-tareas.html';
    }
  })


}

function validarNombre(valor) {
  const expresion = /[0-9]/;
  const test = expresion.test(valor);
  const logitudCorrecta = valor.length > 2;

  return !test && logitudCorrecta;
}

function validarContrasenia(contrasenia, repetirContrasenia) {
  const coincidentes = contrasenia == repetirContrasenia;
  const logitudCorrecta = contrasenia.length > 7;

  return coincidentes && logitudCorrecta;
}

function validarEmail(email) {
  const expresion = /[A-z]+@[A-z]+.[A-z]{3}/;
  const test = expresion.test(email);
  return test;
}

// [A-z]+@[A-z]+.[A-z]{3}(.[a-z]+)?