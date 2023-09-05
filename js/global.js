import { deleteCombo } from "./combos.js";
import { deleteNew } from "./novedades.js";
import { altaUsuario, bajaUsuario, cambiarStatus } from './admin.js'

// const baseUrl = "https://test.backchakruk.quinto.site/"
const baseUrl = "http://149.50.131.196:8080/chakruk-0.0.1-SNAPSHOT/"
// const baseUrl = "http://localhost:8080/";

const navLink = document.getElementById("navSelected"); // --> Colorea el nav correspondiente a la seccion



if (navLink) {
  navLink.style.color = "#D251FF";
}
// --> Resetea el estado de comentario seleccionado cada vez que se cambia de seccion
const navItems = document.getElementsByClassName("header__navbarItem");
for (let i = 0; i < navItems.length; i++) {
  navItems[i].onclick = () => {
    sessionStorage.setItem("chacrukCommentId", -1);
  };
}
// <-------------------------------------------

// --> Verifica el sessionStorage y proteccion de rutas
if (sessionStorage.getItem("chacrukToken") === null) {
  sessionStorage.setItem("chacrukToken", " ");
  console.log("token undefined");
}

// <-------------------------------------------

const body = document.getElementsByTagName("body");
const header = document.querySelector("header");
const login = document.querySelector(".header__loginButton");
const loginForm = document.querySelector(".header__loginForm");
const loginUser = document.querySelector(".header__loginUser");
const loginRegist = document.querySelector(".header__regist");
const msj = document.querySelector(".msjDiv");

const loginMsj = document.querySelector(".header__loginFormMsj");

// --> Oculta el header automaticamente
let scrollValue = window.scrollY;

function setHeader() {
  if (window.scrollY > scrollValue + 100) {
    header.style.height = "0rem";
    scrollValue = window.scrollY;
  } else if (window.scrollY < scrollValue - 100) {
    header.style.height = "auto";
    scrollValue = window.scrollY;
  }
}

window.addEventListener("scroll", () => {
  setHeader();
});


// <-------------------------------------------

// --> Abre el modal del login
login.onclick = () => {
  console.log("click");
  document.getElementById("navSelected").style.color = "";
  document.getElementById("loginSelected").style.color = "#D251FF";
  loginUser.style.height = "0rem";
  if (!JSON.parse(sessionStorage.getItem("ChakrukLogin"))) {
    loginUser.style.transitionDelay = "0s";
    loginRegist.style.transitionDelay = "0.5s";
    loginForm.style.display = "flex";
    setTimeout(() => {
      loginUser.style.height = "18rem";
    }, 5);
  }
};
// <-------------------------------------------

// --> Cierra el modal del login
const LoginClose = document.getElementsByClassName("header__close");
for (let i = 0; i < LoginClose.length; i++) {
  LoginClose[i].onclick = () => {
    loginUser.style.transitionDelay = "0s";
    loginRegist.style.transitionDelay = "0s";
    loginUser.style.height = "0";
    loginRegist.style.height = "0";
    setTimeout(() => {
      loginForm.style.display = "none";
    }, 500);
  };
}
// <-------------------------------------------

const user = document.querySelector("#name");

// --> Verificacion de contraseñas
function check() {
  document.querySelector("#passReg").value = document
    .querySelector("#passReg")
    .value.split(" ")[0];
  document.querySelector("#repass").value = document
    .querySelector("#repass")
    .value.split(" ")[0];

  const pass = document.querySelector("#passReg").value;
  const repass = document.querySelector("#repass").value;

  const passIn = document.getElementsByClassName("header__registPassIn");

  if (pass !== "" && pass.length >= 8) {
    passIn[0].style.borderColor = "green"; //Verde
    document.querySelector("#createBtn").disabled = true;
  } else if (pass.length <= 2) {
    passIn[0].style.borderColor = "#FF0000";
  } else if (pass.length > 2 && pass.length <= 4) {
    passIn[0].style.borderColor = "#FF6F47";
  } else if (pass.length > 4 && pass.length <= 7) {
    passIn[0].style.borderColor = "#FFD700";
  }

  if (passIn[0].style.borderColor === "green") {
    if (repass === pass) {
      passIn[1].style.borderColor = "green"; //Verde
      document.querySelector("#createBtn").disabled = false;
    }
    if (repass.length <= 2 && repass !== pass) {
      passIn[1].style.borderColor = "#FF0000";
    }
    if (repass.length > 2 && repass.length <= 4) {
      passIn[1].style.borderColor = "#FF6F47";
    }
    if (repass.length > 4 && repass.length <= 7) {
      passIn[1].style.borderColor = "#FFD700";
    }
  }
}

const passReg = document.querySelector("#passReg");
passReg.oninput = () => check();

const repassReg = document.querySelector("#repass");
repassReg.oninput = () => check();
// <-------------------------------------------


// --> Inicio de sesion
async function loginSession() {
  // let user = JSON.parse(localStorage.getItem("Usuario"))

  let u = {
    username: document.querySelector("#user").value,
    password: document.querySelector("#pass").value,
  };

  await fetch(baseUrl + "auth/login", {
    method: "POST",
    modo: "*cors",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    },
    body: JSON.stringify(u),
  }).then((response) => {
    if (response.status !== 200) {
      invalidLogin();
    } else {
      response.json().then((data) => {
        console.log(data.jwt);
        console.log("Logeado exitosamente");
        sessionStorage.setItem("chacrukToken", "Bearer " + data.jwt);
      });

      loginUser.style.transitionDelay = "0s";
      loginUser.style.height = "0";
      setTimeout(() => {
        loginForm.style.display = "none";
        getUser();
      }, 500);
    }
  });
}

document.querySelector("#loginBtn").onclick = () => {
  loginSession();
};
// <-------------------------------------------

const img = document.querySelector("#header__avatar");
let imgPath = "";

// --> Ir al registro
function toRegist() {
  loginUser.style.height = "0";
  loginRegist.style.height = "35rem";

  if (screen.width < 1100) {
    loginRegist.style.height = "45rem";
  }

  if (window.location.pathname.slice(0, 6) === "/index") {
    imgPath = "img/";
  } else {
    imgPath = "../img/";
  }

  img.src = imgPath + "rey-animal.png";
}

document.querySelector("#registBtn").onclick = () => {
  toRegist();
};
// <-------------------------------------------

// --> Seleccion de avatar
function selectOnchange(reg) {
  const avatar = document.querySelector("#imgSelect").value;
  const color = document.querySelector("#imgColor").value;

  if (reg) {
    img.src = imgPath + avatar + "-" + color + ".png";
  } else {
    return avatar + "-" + color + ".png";
  }
}

document.querySelector("#imgSelect").onchange = (e) => {
  e.preventDefault();
  selectOnchange(true);
};
document.querySelector("#imgColor").onchange = (e) => {
  e.preventDefault();
  selectOnchange(true);
};
// <-------------------------------------------

const email = document.querySelector("#email");


// --> Validar  email de usuario
function checkEmail() {
  const expresion = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.(com)$/;

  const valid = expresion.test(email.value);
  console.log(valid);
  if (valid) {
    email.style.borderColor = "green";
  } else {
    document.querySelector("#createBtn").disabled = true;
    email.style.borderColor = "red";
  }
}
email.oninput = () => checkEmail();
/// <------------------------------------------


// --> Registro de cuenta
async function regist() {
  console.log("regist");

  let u = {
    user: document.querySelector("#username").value,
    name: document.querySelector("#name").value,
    lastName: document.querySelector("#LastName").value,
    email: email.value,
    password: passReg.value,
    photo: selectOnchange(false),
  };

  if (
    u.user === "" ||
    u.name === "" ||
    u.lastName === "" ||
    (u.email === "" && u.password)
  ) {
    message("error.uncomplete", "keepOpen");
    return;
  }

  for (let i = 0; i < u.name.length; i++) {
    if (!u.name[i].match(/[a-z,A-Z,\u00D1,\u00F1]/g)) {
      message("error.invalidCaracter", "keepOpen");
    }
  }

  for (let i = 0; i < u.lastName.length; i++) {
    if (!u.lastName[i].match(/[a-z,A-Z,\u00D1,\u00F1]/g)) {
      message("error.invalidCaracter", "keepOpen");
    }
  }

  await fetch(baseUrl + "auth/register", {
    method: "POST",
    modo: "*cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    },
    body: JSON.stringify(u),
  }).then((response) => {
    console.log(response);

    if (response.status === 201) {
      console.log("Registro exitoso.");
      message("valid.reg", "closeall");
      loginRegist.style.transitionDelay = "0s";
      loginRegist.style.height = "0";
    } else {
      response.text().then((data) => {
        console.log(data);
        if (data.includes("The Email already exist")) {
          message("exists.email", "keepOpen");
        } else if (data.includes("The user already exist")) {
          message("exists.user", "keepOpen");
        } else {
          message("error.regist");
        }
      });
    }
  });
}

document.querySelector("#createBtn").onclick = (e) => {
  e.preventDefault();
  regist();
};
// <-------------------------------------------

var userData;

// --> Obtiene los datos del usuario logueado
async function getUser() {
  await fetch(baseUrl + "auth/me", {
    method: "GET",
    modo: "*cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
      Authorization: sessionStorage.getItem("chacrukToken"),
    },
  }).then((response) => {
    if (response.status === 200) {
      response.json().then((data) => {
        userData = data;
        login.innerHTML = data.user;
        sessionStorage.setItem("chakrukUser", data.user);


        if (data.role.toLowerCase() === "user") {
          login.href = "./../pages/perfil.html";
        }

        if (data.role.toLowerCase() === "admin") {
          login.href = "./../pages/admin.html";
          const adminBtn = document.getElementsByClassName("admin");

          for (let i = 0; i < adminBtn.length; i++) {
            adminBtn[i].style.display = "block";
          }

        } else {
          const userBtn = document.getElementsByClassName("del" + data.user);
          for (let i = 0; i < userBtn.length; i++) {
            userBtn[i].style.display = "block";
          }
        }


        if (document.querySelector(".newComment") !== null) {
          document.querySelector(".newComment").style.display = "block";
        }
      });
    } else {
      login.innerHTML = "Log In";
      login.href = "#";
    }
  });
}
// <-------------------------------------------

// --> Mensaje de login incorrecto
function invalidLogin() {
  loginMsj.innerHTML = "Usuario y/o contraseña incorrectos.";
  loginMsj.style.display = "block";
  loginMsj.style.color = "red";
}
// <-------------------------------------------

// --> Funcion que administra los mensajes de alerta
function message(type, close, id = null, imgId = null, elem = null) {
  msj.style.display = "flex";
  const msjTitle = document.querySelector("#msjTitle");
  const msjDesc = document.querySelector("#msjDesc");

  switch (type) {
    case "exists.email":
      msjTitle.innerHTML = "EMAIL EXISTENTE";
      msjDesc.innerHTML =
        "El email ingresado ya existe por favor utilice otra cuenta de email.";
      break;

    case "exists.user":
      msjTitle.innerHTML = "USUARIO EXISTENTE";
      msjDesc.innerHTML =
        "El usuario ingresado ya existe por favor elija otro distinto.";
      break;

    case "valid.reg":
      msjTitle.innerHTML = "¡USUARIO CREADO EXITOSAMENTE!";
      msjDesc.innerHTML =
        "Gracias por unirte a nuestra comunidad.\n Por favor, inicia sesión para acceder a mas contenido.";
      break;

    case "valid.create":
      msjTitle.innerHTML = "¡NUEVO ELEMENTO CREADO!";
      msjDesc.innerHTML = "El elemento ha sido creado exitosamente.";
      break;

    case "error.create":
      msjTitle.innerHTML = "¡ERROR AL CREAR NUEVO ELEMENTO!";
      msjDesc.innerHTML =
        "Ha surgido un problema y el elemento no a podido ser creado.\n Por favor, intentelo otra vez.";
      break;

    case "valid.update":
      msjTitle.innerHTML = "¡ELEMENTO ACTUALIZADO!";
      msjDesc.innerHTML = "El elemento ha sido actualizado exitosamente.";
      break;

    case "error.update":
      msjTitle.innerHTML = "ERROR AL ACTUALIZAR";
      msjDesc.innerHTML =
        "Ha surgido un problema y el contenido no a podido actualizarse.\n Por favor, intentelo otra vez.";
      break;

    case "valid.delete":
      msjTitle.innerHTML = "ELEMENTO ELIMINADO";
      msjDesc.innerHTML = "El elemento ha sido eliminado correctamente.";
      break;

    case "error.delete":
      msjTitle.innerHTML = "ERROR AL ELIMINAR";
      msjDesc.innerHTML =
        "Ha surgido un problema y el contenido no a podido ser eliminado.\n Por favor, intentelo otra vez.";
      break;

    case "error.pass":
      msjTitle.innerHTML = "CONTRASEÑA INCORRECTA";
      msjDesc.innerHTML =
        "La antigüa contraseña ingresada es incorrecta, por favor intentelo de nuevo.";
      break;

    case "valid.pass":
      msjTitle.innerHTML = "CONTRASEÑA ACTUALIZADA";
      msjDesc.innerHTML = "La contraseña a sido actualizada correctamente!";
      break;

    case "valid.comment":
      msjTitle.innerHTML = "COMENTARIO CREADO";
      msjDesc.innerHTML = "El comentario ha sido creado exitosamente";
      break;

    case "error.comment":
      msjTitle.innerHTML = "A OCURRIDO UN ERROR";
      msjDesc.innerHTML =
        "Ups! Hubo un error y no pudimos cargar tu comentario. Por favor intentalo de nuevo.";
      break;

    case "error.regist":
      msjTitle.innerHTML = "A OCURRIDO UN ERROR";
      msjDesc.innerHTML =
        "Ups! Hubo un error y no pudimos registrar tu cuenta. Por favor intentalo de nuevo.";
      break;

    case "error.uncomplete":
      msjTitle.innerHTML = "FORMULARIO INCOMPLETO";
      msjDesc.innerHTML = "Todos los campos deben ser completados";
      break;

    case "error.invalidCaracter":
      msjTitle.innerHTML = "CARACTERES INVALIDOS";
      msjDesc.innerHTML = "El nombre y apellido solo pueden contener letras";
      break;

    case "confirm.delete":
      msjTitle.innerHTML = "¿DESEA ELIMINAR EL COMBIO?";
      msjDesc.innerHTML =
        "Una vez eliminado no podra recuperarlo y tendra que crearlo nuevamente";
      break;

    case "confirm.baja.user":
      msjTitle.innerHTML = "¿DESEA DAR DE BAJA ESTE USUARIO?";
      msjDesc.innerHTML =
        "Una vez dado de baja podra darlo de alta si cumple las condiciones";
      break;
    case "confirm.alta.user":
      msjTitle.innerHTML = "¿DESEA DAR DE ALTA ESTE USUARIO?";
      msjDesc.innerHTML =
        "Una vez dado de alta podra darlo de baja si no cumple las condiciones";
      break;
    case "confirm.status.user":
      msjTitle.innerHTML = "¿DESEA CAMBIAR  ESTE ADMIN A USUARIO?";
      msjDesc.innerHTML =
        " podras seguir cambiando a admin si cumple las condiciones";
      break;
    case "confirm.status.admin":
      msjTitle.innerHTML = "¿DESEA CAMBIAR ESTE USUARIO A ADMIN?";
      msjDesc.innerHTML =
        "podras seguir cambiando a admin si cumple las condiciones";
      break;
    default:
      break;
  }

  const msjBtn = document.querySelector("#msjBtn");

  if (close === "closeall") {
    msjBtn.onclick = () => {
      msj.style.display = "none";
      setTimeout(() => {
        loginForm.style.display = "none";
      }, 500);
    };
  } else {
    msjBtn.onclick = () => {
      msj.style.display = "none";
      if (close !== "keepOpen") {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    };

    if (id === null) {
      document.getElementById("msjBtnCancel").style.display = "none";
    }
    if (
      document.getElementById("msjBtnCancel") &&
      document.getElementById("msjBtnCancel").style.display === "block"
    ) {
      msjBtn.onclick = () => {
        if (elem === "combo") {
          document.getElementById("msjBtnCancel").style.display = "none";
          msj.style.display = "none";
          deleteCombo(id, imgId);
          document
            .querySelector(".compras")
            .removeChild(document.getElementById("combo" + id.toString()));
        } else if (elem === "new") {
          document.getElementById("msjBtnCancel").style.display = "none";
          msj.style.display = "none";
          deleteNew(id, imgId);
          document
            .querySelector(".novedades")
            .removeChild(document.getElementById("novedad" + id.toString()));
        } else if (elem === "usuarioBaja") {
          document.getElementById("msjBtnCancel").style.display = "none";
          msj.style.display = "none";
          bajaUsuario(id);
        } else if (elem === "usuarioAlta") {
          document.getElementById("msjBtnCancel").style.display = "none";
          msj.style.display = "none";
          altaUsuario(id);
        } else if (elem === "statusUsuario") {
          document.getElementById("msjBtnCancel").style.display = "none";
          msj.style.display = "none";
          cambiarStatus(id);
        } else if (elem === "statusAdmin") {
          document.getElementById("msjBtnCancel").style.display = "none";
          msj.style.display = "none";
          cambiarStatus(id);
        }



        document.getElementById("msjBtnCancel").style.display === "none";
        msj.style.display = "none";
      };
      console.log('cancelar');

      document.getElementById("msjBtnCancel").onclick = () => {
        document.getElementById("msjBtnCancel").style.display === "none";
        msj.style.display = "none";
      };
    }
  }
}
// <-------------------------------------------

if (window.location.href.includes("index")) {
  getUser();
}

export { getUser, message, userData };
