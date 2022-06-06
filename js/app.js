let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
//evitar que el boton recarge la pagina o haga cosas raras XD
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});
//validacion del formulario
let formValidation = () => {
  //se validan las entradas del formulario "ejercicio","dia/mes/año" 
  if (
    textInput.value === "" ||
    dateInput.value === "" ||
    textarea.value === ""
  ) {
    console.log("failure");
    msg.innerHTML = "La tarea no puede estar en blanco ";
    msgDate.innerHTML = "Se debe agregar fecha";
    msgText.innerHTML = "Se debe de agregar descripciòn  ";
  } else {
    console.log("success");
    msg.innerHTML = "";
    msgDate.innerHTML = "";
    msgText.innerHTML = "";
    // se acepta la data con la funcion y esto se utiliza 
    //para que modal se cirre automaticamente 
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];
//Funcion para subir info al localstorage
let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });
  //es muy importante convertirlo en json
  localStorage.setItem("Keydata", JSON.stringify(data));
  console.log(data);
  //se le llama a la funcion creartarea
  createTasks();
};
//Se crea funcion para hacer  tarea
let createTasks = () => {
  // se busca el div con id en el que se va agregar la tarea
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("Keydata", JSON.stringify(data));
  console.log(data);
};
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};
//IIFE NEW CONCEPT
(() => {
  data = JSON.parse(localStorage.getItem("Keydata")) || [];
  console.log(data);
  createTasks();
})();
