window.onload = () => {

  cargarTareas();

  const tareaForm = document.forms.generarTarea;
 
  tareaForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const tarea = tareaForm.nuevaTarea.value;
    agregarTarea(tarea);
    console.log(tarea);
  })  
  
}

comprobarToken();
setInterval(() => {
  comprobarToken();
},100000)


function comprobarToken(){
  const token = localStorage.getItem("token");
  if (!token){
    location.href = "./login.html";
  }
}

function cargarTareas(){
  const url = "https://ctd-todo-api.herokuapp.com/v1";
  const token = localStorage.getItem("token");

  fetch( `${url}/tasks`, 
  {
    headers: {
    "accept" : "application/json",
    "authorization" : token
    }
  }
  ).then(function (response){
        return response.json();
      }).then(function (data) {
        crearTareas(data);
      }).catch(function (err) {
        console.log(err);
      });
}

function crearTareas(tareas) {
  //console.log(tareas);
  tareas.forEach(tarea => {
    //console.log(tarea);
    if (tarea.completed){
      renderizarTarea(tarea, "tareas-terminadas")
    }else{
      //console.log(tarea)
      renderizarTarea(tarea, "tareas-pendientes")
    }    
  })
}

function agregarTarea(tarea){

  const url = "https://ctd-todo-api.herokuapp.com/v1";
  const token = localStorage.getItem("token");

  fetch( `${url}/tasks` , {
    method: 'POST',
    headers: {
      "accept" : "application/json",
      "authorization" : token,
      "Content-Type" : "application/json"
    } ,
    body: JSON.stringify({
        "description" : tarea,
        "completed" : false
    })
  }).then(function (response){
    return response.json();
  }).then(function (data) {
    renderizarTarea(data, "tareas-pendientes")
  }).catch(function (err) {
    console.log(err);
  });
}

function tareaRealizada (id, completed){
  const url = "https://ctd-todo-api.herokuapp.com/v1";
  const token = localStorage.getItem("token");

  fetch( `${url}/tasks/${id}` , {
    method: 'PUT',
    headers: {
      "accept" : "application/json",
      "authorization" : token,
      "Content-Type" : "application/json"
    } ,
    body: JSON.stringify({
        "completed" : !completed
    })
  }).then(function (response){
    return response.json();
  }).then(function (data) {
    //console.log("agregar tarea" + data)
    console.log(data)
    document.querySelector(`ul.tareas-pendientes`).innerHTML = '';
    document.querySelector(`ul.tareas-terminadas`).innerHTML = '';
    cargarTareas();
    //renderizarTarea(data, "tareas-pendientes")
  }).catch(function (err) {
    console.log(err);
  });

  //location.reload()

  console.log(id);
}

function removerTarea(id){
  console.log("remover tarea");
  const url = "https://ctd-todo-api.herokuapp.com/v1";
  const token = localStorage.getItem("token");

  fetch( `${url}/tasks/${id}` , {
    method: 'DELETE',
    headers: {
      "accept" : "application/json",
      "authorization" : token,
    }
  }).then(function (response){
    return response.json();
  }).then(function (data) {
    //console.log("agregar tarea" + data)
    console.log(data)
    document.querySelector(`ul.tareas-pendientes`).innerHTML = '';
    document.querySelector(`ul.tareas-terminadas`).innerHTML = '';
    cargarTareas();
    //renderizarTarea(data, "tareas-pendientes")
  }).catch(function (err) {
    console.log(err);
  });


}


function renderizarTarea(tarea, tipoTarea) {
  console.log(tarea);
  //console.log(tarea.description)
  const template = `
    <li class="tarea">
      <div class="not-done" onclick="tareaRealizada(${tarea.id} , ${tarea.completed})"></div>
      <div class="descripcion">
        <p class="nombre">${tarea.description}</p>
        <p class="timestamp">Creado el: ${tarea.createdAt}</p>
      </div>
      <div class="remove" onclick="removerTarea(${tarea.id})"></div>
    </li>
  `;
//

  //console.log(template)
  const contenedorTareas = document.querySelector(`ul.${tipoTarea}`);
  contenedorTareas.innerHTML += template;
}

// function agregarTarea() {
//   const nuevaTarea = { nombre: 'tarea1', fecha: '18/06/89', estado: false };
//   const nombreNuevaTarea = prompt('ingrese el nombre de la tarea;');

//   nuevaTarea.nombre = nombreNuevaTarea;
//   renderizarTarea(nuevaTarea);
// }



// 1 - representar los datos (tareas) en JavaScript
// 2 - Hacer un template para representar las tareas
//    2.1 - Tomar el codigo HTML que se repite y lo traermos a JavaScript
//    2.2 - Verificar dónde incluiríamos nuestro template
//    2.3 - Incluir el template en nuestro contenedor 
// 3 - Representar una de las tareas de JavaScript en nuestro template
// 4 - Hacer que se renderize el template por cada tarea
// 5 - Refactorizacion y buenas practicas
//    5.1 - ver si se puede separar en funciones mas claras
//    5.2 - ordenar código
