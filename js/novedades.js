import { getUser, message } from './global.js'

let add = false

const baseUrl = "/apiredirect/"
// const baseUrl = "http://149.50.131.196:8080/chakruk-0.0.1-SNAPSHOT/"
// const baseUrl = "http://localhost:8080/"


// --> Obtencion de Novedades del servidor
async function getNew() {
    // console.log('GET');

    await fetch(baseUrl + 'news', {
        method: "GET",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        }
    })
        .then((response) => {
            response.json()
                .then((data) => {
                    loadData(data)
                    getUser()
                })
                .catch((err) => {
                    console.log(err);
                })
        });
}
// <-------------------------------------------

// --> Muestra en pantalla el formulario para crear una nueva novedad
if (document.getElementById('addNovedad')) {
    document.getElementById('addNovedad').onclick = () => { makeForm() }
}

function makeForm() {
    console.log('form');

    if (add === false) {
        add = true

        const form = document.querySelector('.novedadForm')
        const novedad = document.createElement('div')
        novedad.className = 'novedadForm__novedad'
        novedad.id = 'novedad0'

        form.appendChild(novedad)

        const novedadDiv = document.createElement('div')
        novedadDiv.className = 'novedadForm__novedadDiv'
        novedad.appendChild(novedadDiv)

        const imgDiv = document.createElement('div')
        imgDiv.className = 'novedadForm__imgDiv'
        novedadDiv.appendChild(imgDiv)

        const img = document.createElement('img')
        img.src = './../img/no-photo.png'
        imgDiv.appendChild(img)

        const editImg = document.createElement('input')
        editImg.type = 'file'
        editImg.id = 'addImg'
        editImg.className = 'editImg'
        editImg.innerHTML = 'SELECCIONAR IMAGEN'
        editImg.onchange = () => {
            console.log(editImg.files);
            img.src = URL.createObjectURL(editImg.files[0])
        }
        imgDiv.appendChild(editImg)

        const editTitle = document.createElement('input')
        editTitle.id = 'addTitle'
        editTitle.className = 'editTitle'
        editTitle.placeholder = 'Titulo de Novedad'
        novedadDiv.appendChild(editTitle)

        const editDesc = document.createElement('textarea')
        editDesc.id = 'addDesc'
        editDesc.className = 'editDesc'
        novedadDiv.appendChild(editDesc)

        const editFecha = document.createElement('input')
        editFecha.className = 'editFecha addDato'
        editFecha.placeholder = 'Fecha'
        novedad.appendChild(editFecha)

        const editLugar = document.createElement('input')
        editLugar.className = 'editLugar addDato'
        editLugar.placeholder = 'Lugar'
        novedad.appendChild(editLugar)

        const editUbicacion = document.createElement('input')
        editUbicacion.className = 'editUbicacion addDato'
        editUbicacion.placeholder = 'Ubicacion(gmaps)'
        editUbicacion.style.left = 'calc(48% + 4rem)'
        editUbicacion.style.width = '30%'
        novedad.appendChild(editUbicacion)

        const editHorario = document.createElement('input')
        editHorario.className = 'editHorario addDato'
        editHorario.placeholder = 'Horario'
        novedad.appendChild(editHorario)

        const editTwich = document.createElement('input')
        editTwich.className = 'editTwich addDato'
        editTwich.placeholder = 'Twich'
        novedad.appendChild(editTwich)

        const editCosto = document.createElement('input')
        editCosto.className = 'editCosto addDato'
        editCosto.placeholder = 'Costo'
        novedad.appendChild(editCosto)

        const save = document.createElement('button')
        save.innerHTML = 'CARGAR NOVEDAD'
        console.log(editImg.files.length);
        save.onclick = () => {
            let n = {
                title: editTitle.value,
                body: editDesc.value.split('\n'),
                date: editFecha.value,
                place: editLugar.value,
                location: editUbicacion.value,
                time: editHorario.value,
                price: editCosto.value,
                twich: editTwich.value
            }

            if (editDesc.value === '') {
                n.body = ''
            } else {
                n.body = editDesc.value.split('\n')
            }


            let image;
            if (editImg.files.length === 0) {
                image = ''
            } else {
                image = editImg.files[0]
            }



            if (n.title === '' || n.image === '' || n.body === '' || n.date === '' || n.place === '' || n.location === '' || n.time === '' || n.price === '') {
                message('error.uncomplete', 'keepOpen')
            } else {
                addNews(n, image)
            }
        }

        novedad.appendChild(save)

    }
}
// <-------------------------------------------

// --> Muestra las novedades en pantalla
function loadData(novedades) {
    let novedadesSec = document.querySelector('.novedades')

    for (let i = 0; i < novedades.length; i++) {
        const novedad = document.createElement('div')
        novedad.className = 'novedades__novedad'
        novedad.id = 'novedad' + i.toString()

        const novedadDiv = document.createElement('div')
        novedadDiv.className = 'novedades__novedadDiv'


        const imgDiv = document.createElement('div')
        imgDiv.className = 'novedades__imgDiv'

        const img = document.createElement('img')
        img.id = 'img-' + novedades[i].id.toString()
        img.src = 'data:image/jpg;base64,' + novedades[i].image.content

        const editImg = document.createElement('input')
        editImg.type = 'file'
        editImg.id = 'addImg'

        editImg.className = 'editNovedad' + i.toString()
        editImg.innerHTML = 'SELECCIONAR IMAGEN'
        editImg.onchange = () => {
            img.src = URL.createObjectURL(editImg.files[0])
        }

        if (novedadesSec) {
            novedadesSec.appendChild(novedad)
            novedad.appendChild(novedadDiv)
            imgDiv.appendChild(img)
            imgDiv.appendChild(editImg)
            novedadDiv.appendChild(imgDiv)
        }

        const h2 = document.createElement('h2')
        h2.innerHTML = novedades[i].title
        novedadDiv.appendChild(h2)
        const editTitle = document.createElement('input')
        editTitle.id = 'ti-' + i.toString()
        editTitle.className = 'editNovedad' + i.toString()
        editTitle.value = h2.innerHTML
        novedadDiv.appendChild(editTitle)

        for (let j = 0; j < novedades[i].body.length; j++) {
            const p = document.createElement('p')
            p.innerHTML = novedades[i].body[j]
            p.className = 'pa-' + i.toString()
            novedadDiv.appendChild(p)
        }

        const editDesc = document.createElement('textarea')
        editDesc.id = 'de-' + i.toString()
        editDesc.className = 'editNovedad' + i.toString()
        novedadDiv.appendChild(editDesc)
        function descValue() {
            console.log(editDesc.scrollHeight);

            let text = ''
            const par = document.getElementsByClassName('pa-' + i.toString())
            console.log(par);
            for (let j = 0; j < par.length; j++) {
                if (j === par.length - 1) {
                    text = text + par[j].innerHTML
                } else {
                    text = text + par[j].innerHTML + '\n'
                }
            }

            console.log(text);
            return text
        }

        const divFecha = document.createElement('div')
        divFecha.className = 'divDato'
        novedad.appendChild(divFecha)
        const fecha = document.createElement('p')
        fecha.id = 'fe-' + + i.toString()
        fecha.innerHTML = '<span>Fecha: </span>' + novedades[i].date
        divFecha.appendChild(fecha)
        const editFecha = document.createElement('input')
        editFecha.className = 'editNovedad' + i.toString()
        editFecha.value = fecha.innerHTML.slice(20)
        divFecha.appendChild(editFecha)

        const divLugar = document.createElement('div')
        divLugar.className = 'divDato'
        novedad.appendChild(divLugar)
        const lugar = document.createElement('p')
        lugar.id = 'lu-' + i.toString()
        lugar.innerHTML = '<span>Lugar: </span>' + novedades[i].place + '  '
        divLugar.appendChild(lugar)
        const editLugar = document.createElement('input')
        editLugar.className = 'editNovedad' + i.toString()
        editLugar.value = lugar.innerHTML.slice(20)
        divLugar.appendChild(editLugar)

        const ubicacion = document.createElement('a')
        ubicacion.id = 'ub-' + i.toString()
        ubicacion.innerHTML = '    Ver Mapa'
        ubicacion.href = novedades[i].location
        ubicacion.target = '_blank';
        lugar.appendChild(ubicacion)
        const editUbicacion = document.createElement('input')
        editUbicacion.className = 'editNovedad' + i.toString()
        editUbicacion.value = ubicacion.href
        // editUbicacion.style.left = 'calc(48% + 4rem)'
        editUbicacion.style.width = '80%'
        divLugar.appendChild(editUbicacion)

        const divHorario = document.createElement('div')
        divHorario.className = 'divDato'
        novedad.appendChild(divHorario)
        const horario = document.createElement('p')
        horario.id = 'ho-' + i.toString()
        horario.innerHTML = '<span>Horario: </span>' + novedades[i].time
        divHorario.appendChild(horario)
        const editHorario = document.createElement('input')
        editHorario.className = 'editNovedad' + i.toString()
        editHorario.value = horario.innerHTML.slice(22)
        divHorario.appendChild(editHorario)

        const divCosto = document.createElement('div')
        divCosto.className = 'divDato'
        novedad.appendChild(divCosto)
        const costo = document.createElement('p')
        costo.id = 'co-' + i.toString()
        costo.innerHTML = '<span>Costo: </span>' + novedades[i].price
        divCosto.appendChild(costo)
        const editCosto = document.createElement('input')
        editCosto.className = 'editNovedad' + i.toString()
        editCosto.value = costo.innerHTML.slice(20)
        divCosto.appendChild(editCosto)
        const divTwitch = document.createElement('div')
        divTwitch.className = 'divDato'
        divTwitch.style.marginTop = '1rem'
        novedad.appendChild(divTwitch)
        const editTwitch = document.createElement('input')
        editTwitch.value = novedades[i].twich
        editTwitch.className = 'editNovedad' + i.toString()
        divTwitch.appendChild(editTwitch)

        const btn = document.createElement('div')
        btn.className = 'btn'
        const button = document.createElement('button')
        btn.appendChild(button)
        button.onclick = () => {
            const href = novedades[i].twich
            window.open(href, "_blank");
        }
        const span = document.createElement('span')
        span.innerHTML = 'VER EN TWITCH'
        button.appendChild(span)

        let cl = ['top', 'left', 'bottom', 'right']
        for (let j = 0; j < cl.length; j++) {
            const div = document.createElement('div')
            div.className = cl[j]
            button.appendChild(div)
        }
        novedad.appendChild(btn)

        const editNovedad = document.createElement('button')
        editNovedad.id = 'edit' + i.toString()
        editNovedad.className = 'admin edit'
        editNovedad.innerHTML = 'EDITAR'
        editNovedad.onclick = () => {
            const el = document.getElementsByClassName('editNovedad' + i.toString())
            console.log(el);

            for (let j = 0; j < el.length; j++) {
                console.log(el[j]);
                el[j].style.display = 'block'
            }

            editDesc.value = descValue()
            editDesc.style.height = '0'
            editDesc.style.height = editDesc.scrollHeight + 'px'

            const parrafos = document.getElementsByClassName('pa-' + i.toString())

            for (let j = 0; j < parrafos.length; j++) {
                console.log(el[j]);
                parrafos[j].innerHTML = ''
            }
        };

        const delNovedad = document.createElement('button')
        delNovedad.id = 'dc-' + i.toString()
        delNovedad.className = 'admin delNovedad'
        delNovedad.innerHTML = 'ELIMINAR'
        delNovedad.onclick = () => {
            document.getElementById('msjBtnCancel').style.display = 'block'
            message('confirm.delete', '', novedades[i].id, img.id.slice(4), 'new');
        }

        const save = document.createElement('button')
        save.id = 'sa-' + i.toString()
        save.className = 'editNovedad' + i.toString()
        save.innerHTML = 'GUARDAR'
        save.onclick = () => {
            const n = {
                title: editTitle.value,
                body: editDesc.value.split('\n'),
                date: editFecha.value,
                place: editLugar.value,
                location: editUbicacion.value,
                time: editHorario.value,
                price: editCosto.value,
                twich: editTwitch.value
            }

            if (editDesc.value === '') {
                n.body = ''
            } else {
                n.body = editDesc.value.split('\n')
            }


            let image;
            if (editImg.files.length === 0) {
                image = ''

            } else {
                image = editImg.files[0]

            }

            if (n.title === '' || n.image === '' || n.body === '' || n.date === '' || n.place === '' || n.location === '' || n.time === '' || n.price === '') {
                message('error.uncomplete', 'keepOpen')
            } else {
                const hidde = document.getElementsByClassName('editNovedad' + i.toString())

                for (let j = 0; j < hidde.length; j++) {
                    hidde[j].style.display = 'none'
                }

                updateNovedades(novedades[i].id, n, image)
            }
        }

        novedad.appendChild(editNovedad)
        novedad.appendChild(delNovedad)
        novedad.appendChild(save)

        const hidde = document.getElementsByClassName('editNovedad' + i.toString())

        for (let j = 0; j < hidde.length; j++) {
            hidde[j].style.display = 'none'
        }
    }
}
// <-------------------------------------------

// --> Actualizacion de noveadades ya creadas
function updateNovedades(id, novedad, image) {
    fetch(baseUrl + 'news/' + id, {
        method: "PUT",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        },
        body: JSON.stringify(novedad)
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                response.json()
                    .then((data) => {
                        console.log(image);
                        loadNewImage(id, image)
                        message('valid.update', '')
                    })
            } else {
                message('error.update', '')
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
// <-------------------------------------------

// --> Eliminacion de novedad dada
function deleteNew(id, imgId) {
    fetch(baseUrl + 'news/' + id, {
        method: "DELETE",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        }
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                if (deleteNewImage(imgId)) {
                    message('valid.delete', '')
                } else {
                    message('error.delete', '')
                }
            } else {
                message('error.delete', '')
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
// <-------------------------------------------
async function deleteNewImage(id) {
    console.log(id);
    await fetch(baseUrl + 'news/image/' + id, {
        method: 'DELETE',
        modo: "*cors",
    })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                return true
            } else {
                return false
            }
        })
}
// --> Envio de nueva novedad al servidor
function addNews(novedad, image) {
    console.log("AddNew", novedad);
    console.log("AddNew", image);
    fetch(baseUrl + 'news', {
        method: "POST",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        },
        body: JSON.stringify(novedad)
    })
        .then((response) => {
            if (response.status === 201) {
                response.json()
                    .then((data) => {
                        console.log("NOVEDADES DATA", data);
                        if (loadNewImage(data.id, image)) {
                            message('valid.create', '')
                        } else {
                            message('error.create', 'keepOpen')
                        }
                    })
            } else {
                message('error.create', 'keepOpen')
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
// <-------------------------------------------

async function loadNewImage(id, image) {
    if (image) {

        let formData = new FormData()
        const blobImg = new Blob([image], { type: image.type })

        formData.append('image', blobImg)

        await fetch(baseUrl + 'news/image/' + id, {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                console.log(response);

                if (response.status === 200) {
                    return true
                } else {
                    return false
                }
            })
    }
}

getNew()

export { deleteNew }
