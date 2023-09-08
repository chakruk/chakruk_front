import { message } from "./../js/global.js";

// const baseUrl = "http://149.50.131.196:8080/chakruk-0.0.1-SNAPSHOT/"
const baseUrl = "/apiredirect/"
// const baseUrl = "http://localhost:8080/"  //==> ingresar baseUrl personal

// Función para DAR DE BAJA un usuario
const bajaUsuario = async (id) => {
  console.log("BAJA", id);
  await fetch(baseUrl + 'users/' + id, {
    method: "DELETE",
    modo: "no-cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Accept": "*/*",
      "Authorization": sessionStorage.getItem('chacrukToken')
    },
  }).then((response) => {

    console.log("RESPUESTA", response);
    if (response.status === 200) {
      message('valid.update.user', '')
    } else {
      message('error.update', '')
    }
  })
    .catch((err) => {
      console.log(err);
    })
};

// Función para DAR DE ALTA un usuario
const altaUsuario = async (id) => {
  await fetch(baseUrl + 'users/' + id, {
    method: "PUT",
    modo: "no-cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Accept": "*/*",
      "Authorization": sessionStorage.getItem('chacrukToken')
    },
  }).then((response) => {

    console.log("RESPUESTA", response);
    if (response.status === 200) {
      message('valid.update', '')
    } else {
      message('error.update', '')
    }
  })
    .catch((err) => {
      console.log(err);
    })
};


const cambiarStatus = async (id) => {
  await fetch(baseUrl + 'users/superUser/' + id, {
    method: "PUT",
    modo: "no-cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Accept": "*/*",
      "Authorization": sessionStorage.getItem('chacrukToken')
    },
  }).then((response) => {

    if (response.status === 200) {
      message('valid.update', '')
    } else {
      message('error.update', '')
    }
  })
    .catch((err) => {
      console.log(err);
    })
}

// Función para crear una fila de la tabla de usuarios
const crearFilaUsuario = (usuario) => {
  const fila = document.createElement("tr");
  const nombre = document.createElement("td");
  nombre.style.color = 'yellow'
  nombre.style.textTransform = 'uppercase'
  nombre.innerText = usuario.name;
  const email = document.createElement("td");
  email.innerText = usuario.email;
  const estatus = document.createElement("td");
  const rol = document.createElement("td");

  const BtncambiarEstatus = document.createElement("button");
  const BtncambiarRol = document.createElement("button");
  BtncambiarEstatus.style.cursor = 'pointer'
  BtncambiarEstatus.style.border = 'none'
  BtncambiarEstatus.style.width = 'auto'
  BtncambiarEstatus.style.height = '20px'

  BtncambiarRol.style.cursor = 'pointer'
  BtncambiarRol.style.border = 'none'
  BtncambiarRol.style.width = 'auto'
  BtncambiarRol.style.height = '20px'

  console.log(usuario.deleted);

  if (usuario) {
    if (usuario.deleted) {
      BtncambiarEstatus.innerText = " dar alta"
      BtncambiarEstatus.style.backgroundColor = 'red'
      BtncambiarEstatus.onclick = () => {
        document.getElementById('msjBtnCancel').style.display = 'block'
        message("confirm.alta.user", "", usuario.id, "", "usuarioAlta");
      };

    } else {
      BtncambiarEstatus.innerText = "dar baja";
      BtncambiarEstatus.onclick = () => {
        document.getElementById('msjBtnCancel').style.display = 'block'
        message("confirm.baja.user", "", usuario.id, "", "usuarioBaja");
      };
    }
  }


  if (usuario) {
    if (usuario.role.id === 1) {
      BtncambiarRol.innerText = "Es Admin"
      BtncambiarRol.style.border = 'none'
      BtncambiarRol.style.background = 'transparent'
      BtncambiarRol.style.color = 'yellow'
      BtncambiarRol.style.cursor = 'default'
      BtncambiarRol.disabled = 'true'

    } else {
      BtncambiarRol.innerText = "Es Usuario";
      BtncambiarRol.onclick = () => {
        document.getElementById('msjBtnCancel').style.display = 'block'
        message("confirm.status.admin", "", usuario.id, "", "statusAdmin");
      }
    }
  }

  estatus.appendChild(BtncambiarEstatus);
  rol.appendChild(BtncambiarRol);
  fila.appendChild(nombre);
  fila.appendChild(email);
  fila.appendChild(estatus);
  fila.appendChild(rol);

  return fila;
};

// Función para mostrar la lista de usuarios en la tabla

const mostrarUsuarios = (data) => {
  const $tabla = document.getElementById("tabla_usuarios");
  const $tbody = $tabla.querySelector("tbody")
  data.forEach(usuario => {
    // if (usuario.role.id !== 1) {
    // document.getElementById("listar_usuarios").disabled = true;
    const fila = crearFilaUsuario(usuario);
    $tbody.appendChild(fila);
    // }
  });
};


// Función para obtener la lista de usuarios del servidor
const obtenerUsuarios = async () => {
  limpiarTabla();
  try {
    const resp = await fetch(baseUrl + 'users', {
      method: "GET",
      modo: "*cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Accept": "*/*",
        "Authorization": sessionStorage.getItem('chacrukToken')
      }
    })

    if (!resp.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await resp.json();
    return data;

  } catch (error) {
    console.error(error);
  }
};


// Event listener para el botón de Obtener Usuarios
const $redirect = document.getElementById("obtener-usuarios")

if ($redirect) {
  $redirect.addEventListener("click", () => {
    let mySession = sessionStorage.getItem('chacrukToken');
    mySession = window.open('/pages/listusuarios.html?data=' + encodeURIComponent(mySession), '_blank')
  });
}

const $btnListar = document.getElementById("listar_usuarios")
if ($btnListar) {
  $btnListar.addEventListener("click", () => {
    const resp = obtenerUsuarios()
    resp.then((data) => {
      mostrarUsuarios(data);
    })
  });
}


const $filterUsuario = document.getElementById("filter_user");

if ($filterUsuario) {
  const usuarios = obtenerUsuarios();

  $filterUsuario.addEventListener('change', (e) => {
    const name = e.target.value;
    if (name.length > 0) {
      usuarios.then((data) => {
        const user = data.filter((usuario) => usuario.user === name)
        if (user.length > 0) {
          limpiarTabla();
          mostrarUsuarios(user)
        }
      })
    } else {
      limpiarTabla()
    }
  })
}

function limpiarTabla() {
  const $tabla = document.getElementById("tabla_usuarios");
  const $tbody = $tabla.querySelector("tbody")
  while ($tbody.firstChild) {
    $tbody.removeChild($tbody.firstChild);
  }
}


// --> Cierre de sesion
document.querySelector("#closeSession")?.addEventListener("click", () => {
  console.log('sesion cerrada');
  sessionStorage.setItem("chacrukToken", '')
  window.location.href = './../index.html'
})

export { altaUsuario, bajaUsuario, cambiarStatus };
