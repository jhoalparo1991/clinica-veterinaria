import { Database } from "./database.js";

const db = new Database();
let database = db.crearDB();

// Fields

let mascota = document.querySelector("#mascota");
let propietario = document.querySelector("#propietario");
let telefono = document.querySelector("#telefono");
let fecha = document.querySelector("#fecha");
let hora = document.querySelector("#hora");
let sintomas = document.querySelector("#sintomas");
let btnSave = document.querySelector("#btn-save");
let noCitas = document.querySelector("#no-citas");
// form
let formulario = document.querySelector("#formulario");
let citasDiv = document.querySelector(".citas");
// variables
let citaObj = {
  id: Date.now(),
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

let citas = [];

// events

document.addEventListener("DOMContentLoaded", () => {
  mostrarMensajeEnCitas();
});

mascota.addEventListener("change", (e) => obtenerDatos(e));

propietario.addEventListener("change", (e) => obtenerDatos(e));

telefono.addEventListener("change", (e) => obtenerDatos(e));

fecha.addEventListener("change", (e) => obtenerDatos(e));

hora.addEventListener("change", (e) => obtenerDatos(e));

sintomas.addEventListener("change", (e) => obtenerDatos(e));

btnSave.addEventListener("click", (e) => guardarCita(e));

// functions

function mostrarMensajeEnCitas() {
  noCitas.textContent = "";
  if (citas.length <= 0) {
    noCitas.textContent = "No hay citas, comienza creando una";
  } else {
    noCitas.textContent = "Citas pendiente";
  }
}

function guardarCita(e) {
  e.preventDefault();

  if (
    citaObj.mascota.length <= 0
    //  ||
    // citaObj.propietario.length <= 0 ||
    // citaObj.telefono.length <= 0 ||
    // citaObj.fecha.length <= 0 ||
    // citaObj.hora.length <= 0 ||
    // citaObj.sintomas.length <= 0
  ) {
    mensajes("Todos los campos son necesarios", "error");
    return;
  }

  citas = [citaObj];

  guardarIndexDB(citas);
}

function obtenerDatos(e) {
  e.preventDefault();
  citaObj[e.target.name] = e.target.value;
}

function mensajes(mensaje, tipo) {
  let p = document.createElement("p");
  p.textContent = mensaje;

  if (tipo == "error") {
    p.classList.add("alert", "alert-danger");
  } else if (tipo == "success") {
    p.classList.remove("alert-danger");
    p.classList.add("alert", "alert-success");
  }

  let cardLeft = document.querySelector(".card-left");
  cardLeft.insertBefore(p, document.querySelector("#formulario"));

  setTimeout(() => {
    p.remove();
  }, 3000);
}

function mostrarCitas(citas) {
  limpiarHtml();
  citas.forEach((cita) => {
    let ul = document.createElement("ul");
    ul.classList.add("nav");
    let { id, mascota, propietario, telefono, fecha, hora, sintomas } = cita;
    ul.innerHTML = `
    <li><span class="datos">Codigo : </span>${id}<span></span></li>
    <li><span class="datos">Mascota : </span>${mascota}<span></span></li>
    <li><span class="datos">Propietario : </span> <span>${propietario}</span></li>
    <li><span class="datos">Telefono : </span> <span>${telefono}</span></li>
    <li><span class="datos">Fecha : </span> <span>${fecha}</span></li>
    <li><span class="datos">Hora : </span> <span>${hora}</span></li>
    <li><span class="datos">Sintomas : </span> <span>${sintomas}</span></li>
    <div class="group-button">
    <button class="btn btn-sm btn-danger" data-id=${id}>Borrar</button>
    <button class="btn btn-sm btn-warning">Editar </button>
    </div>
    `;

    citasDiv.appendChild(ul);
  });
}

function limpiarHtml() {
  while (citasDiv.firstChild) {
    citasDiv.removeChild(citasDiv.firstChild);
  }
}

function guardarIndexDB(data) {
  let db = database.result;
  let trans = db;
  console.log(trans);
  let transaccion = trans.transaction("citas", "readwrite");
  transaccion.onerror = function (e) {
    console.log("Error al insertar las citas, ", e.target.result.errorMessage);
  };

  transaccion.oncomplete = function (e) {
    mostrarCitas(data);
    mostrarMensajeEnCitas();
    formulario.reset();
    //   citaObj.id = Date.now();
    console.log(data);
  };

  transaccion.add(data);
}
