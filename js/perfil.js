import { message } from "./global.js"

const baseUrl = "https://test.backchakruk.quinto.site/"
// const baseUrl = "http://localhost:8080/"  //==> ingresar baseUrl personal


const perfilUserName = document.getElementById('perfilUsername')
const perfilName = document.getElementById('perfilName')
const perfilLastName = document.getElementById('perfilLastname')
const perfilEmail = document.getElementById('perfilEmail')

// --> Setea los datos del usuario en pantalla
async function getUser() {
    await fetch(baseUrl + 'auth/me', {
        method: "GET",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem('chacrukToken')
        }
    })
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then((data) => {
                        setUser(data)
                    })
            } else {
                console.log('Error al cargar el usuario');
            }
        });
}

const avatarImg = document.querySelector('#avatar')

function setUser(user) {
    perfilUserName.innerHTML = user.user
    perfilName.innerHTML = user.name
    perfilLastName.innerHTML = user.lastName
    perfilEmail.innerHTML = user.email
    avatarImg.src = './../img/' + user.photo
    if (user.photo !== null) {
        document.getElementById('perfilImgSelect').value = user.photo.split('-')[0]
        document.getElementById('perfilImgColor').value = user.photo.split('-')[1].split('.')[0]
    }
}

getUser()
// // <-------------------------------------------


// --> Habilita o deshabilita las notificaciones
const notificaciones = document.querySelector('.perfil__notificaciones')
notificaciones.onclick = () => { changeIcon() }

function changeIcon() {
    console.log('changeicon');
    const notifIcon = document.querySelector('#notifIcon')

    console.log(notifIcon.src);

    if (notifIcon.alt === 'Notif_On') {
        notifIcon.src = './../img/notificacionOff.png'
        notifIcon.alt = 'Notif_Off'
    } else {
        notifIcon.src = './../img/notificacionOn.png'
        notifIcon.alt = 'Notif_On'
    }

    ////añadir envio de notificacion al servidor//////
}
// // <-------------------------------------------


// --> Cambio modo perfil o edicion
const datos = document.getElementsByClassName('dato')
const editdatos = document.getElementsByClassName('editDato')
const perfil = document.querySelector('.perfil__perfil')
perfil.onclick = () => { toPerfil() }

function toPerfil() {
    document.querySelector('#perfilIcon').src = './../img/perfilOn.png'
    document.querySelector('#editIcon').src = './../img/editOff.png'
    document.querySelector('#miPerfil').style.color = '#D251FF'
    document.querySelector('#editPerfil').style.color = 'white'
    document.querySelector('.perfil__btns').style.height = '0'
    document.querySelector('.perfil__imgSel').style.display = 'none'

    console.log(datos);

    for (let i = 0; i < editdatos.length; i++) {
        datos[i].style.display = 'block'
        editdatos[i].style.display = 'none'
    }
}

const edit = document.querySelector('.perfil__edit')
edit.onclick = () => { editar() }

function editar() {
    perfil.onclick = () => { null }
    document.querySelector('#perfilIcon').src = './../img/perfilOff.png'
    document.querySelector('#editIcon').src = './../img/editOn.png'
    document.querySelector('#miPerfil').style.color = 'white'
    document.querySelector('#editPerfil').style.color = '#D251FF'
    document.querySelector('.perfil__btns').style.height = 'auto'
    document.querySelector('.perfil__imgSel').style.display = 'flex'

    document.getElementById('perfilUsernameInput').value = perfilUserName.innerHTML
    document.getElementById('perfilNameInput').value = perfilName.innerHTML
    document.getElementById('perfilLastnameInput').value = perfilLastName.innerHTML

    for (let i = 0; i < datos.length - 1; i++) {
        datos[i].style.display = 'none'
        editdatos[i].style.display = 'block'
    }
}
// // <-------------------------------------------


// --> Guardado de los datos modificados
const save = document.getElementById('savePerfil')
save.onclick = () => { saveData() }

async function saveData() {
    let avatar = document.querySelector('#perfilImgSelect').value + '-' + document.querySelector('#perfilImgColor').value + '.png'

    let user = {}

    user.user = document.querySelector('#perfilUsernameInput').value
    user.name = document.querySelector('#perfilNameInput').value
    user.lastName = document.querySelector('#perfilLastnameInput').value
    user.photo = avatar

    console.log(user);

    await fetch(baseUrl + 'auth', {
        method: "PUT",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem('chacrukToken')
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            console.log(response)
            if (response.status === 201) {
                response.json()
                    .then((data) => {
                        console.log(data);
                        setUser(data)
                    })
                document.querySelector('#perfilUsernameInput').value = ''
                document.querySelector('#perfilNameInput').value = ''
                document.querySelector('#perfilLastnameInput').value = ''

                perfil.onclick = () => { toPerfil() }
                toPerfil()
            } else {
                response.text()
                    .then((data) => {
                        console.log(data)
                        if (data.includes('The user already exist')) {
                            console.log('usuario existente')
                            message('exists.user', 'keepOpen')
                        }
                    })

                console.log('Error al cargar el usuario');
            }
        });
}
// // <-------------------------------------------


// --> Seleccion de avatar
function selectOnchange() {
    const avatar = document.querySelector('#perfilImgSelect').value
    const color = document.querySelector('#perfilImgColor').value

    if (avatar === '' || color === '') {
        avatarImg.src = './../img/no-photo.png'
    } else {
        avatarImg.src = './../img/' + avatar + '-' + color + '.png'
    }
}

document.querySelector('#perfilImgSelect').onchange = (e) => {
    e.preventDefault()
    selectOnchange()
}
document.querySelector('#perfilImgColor').onchange = (e) => {
    e.preventDefault()
    selectOnchange()
}
// // <------------------------------------------- 


const changePass = document.getElementById('changePass')
const savePass = document.querySelector('#savePass')

// --> Verificacion de contraseñas
function check() {
    const pass = document.querySelector("#newPass").value
    const repass = document.querySelector("#reNewPass").value

    const passIn = document.getElementsByClassName("perfilPassCheck")

    if (pass === repass && pass !== "" && repass !== "") {
        for (let i = 0; i < 2; i++) {
            passIn[i].style.borderColor = "#008000ff"
        }

        savePass.disabled = false

    } else {
        for (let i = 0; i < 2; i++) {
            passIn[i].style.borderColor = "red"
        }
        savePass.disabled = true
    }
}

const newPass = document.querySelector("#newPass")
newPass.oninput = () => check()

const reNewPass = document.querySelector("#reNewPass")
reNewPass.oninput = () => check()
// // <-------------------------------------------


// --> Apertura de la ventana para cambiar la password
changePass.onclick = () => {
    document.querySelector('.perfil__changePassDiv').style.display = 'flex'
}
// // <-------------------------------------------


// --> Cerrar la ventana para cambiar la password
document.querySelector('.perfil__changePassClose').onclick = () => {
    document.querySelector('.perfil__changePassDiv').style.display = 'none'
}
// // <-------------------------------------------


// --> Funcion que envia el cambio de password
savePass.onclick = (e) => {
    e.preventDefault()
    updatePass()
}

async function updatePass() {
    console.log("pass update");

    const passUpdate = {
        oldPass: document.querySelector('#oldPass').value,
        newPass: document.querySelector("#newPass").value,
        confirmNewPass: document.querySelector("#reNewPass").value
    }

    await fetch(baseUrl + 'auth/reset/password', {
        method: "POST",
        modo: "no-cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem('chacrukToken')
        },
        body: JSON.stringify(passUpdate)
    })
        .then((response) => {
            console.log(response)
            if (response.status === 200) {
                response.text()
                    .then((data) => {
                        console.log(data);
                        if (data.includes('The password was changed successfully!')) {
                            message('valid.pass', '')
                            document.querySelector('#oldPass').value = ''
                            document.querySelector("#newPass").value = ''
                            document.querySelector("#reNewPass").value = ''
                            document.querySelector('.perfil__changePassDiv').style.display = 'none'
                        }
                    })
            } else {
                response.text()
                    .then((data) => {
                        console.log(data)
                        if (data.includes('The password is incorrect')) {
                            message('error.pass', '')
                        }
                    })
            }
        });
}
// // <-------------------------------------------


// --> Cierre de sesion
document.querySelector("#closeSession").onclick = () => { closeSession() }

function closeSession() {
    console.log('sesion cerrada');
    sessionStorage.setItem("chacrukToken", '')
    window.location.href = './../index.html'
}
// // <-------------------------------------------


