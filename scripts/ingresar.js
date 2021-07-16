window.onload = () => {
    const form = document.forms.formLogin;
    

    form.addEventListener("submit", e => {
        const email = form.email.value;
        const password = form.contrasenia.value;
        e.preventDefault();

        console.log(form);
        console.log(email);
        console.log(password);

        const url = "https://ctd-todo-api.herokuapp.com/v1";
        fetch( `${url}/users/login` , {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            } ,
            body: JSON.stringify({
                email,
                password
            })
          }).then(function (response){
            return response.json();
          }).then(function (data) {
            localStorage.setItem('token', data.jwt);
            location.href = "./lista-tareas.html";
          }).catch(function (err) {
            console.log(err);
          });
    })

}