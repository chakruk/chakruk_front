
import { getUser, message } from './global.js'

let add = false

// const baseUrl = "http://149.50.131.196:8080/chakruk-0.0.1-SNAPSHOT/"
const baseUrl = "/apiredirect/"
// const baseUrl = "http://localhost:8080/"


// --> Obtencion de los combos del servidor
async function getCombos() {

    await fetch(baseUrl + 'combos', {
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
                    if (window.location.href.split('#combo')[1] === undefined) {
                        loadData(data)
                        getUser()
                    } else {
                        getOneCombo([window.location.href.split('#combo')[1]])
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        });
}
// <-------------------------------------------

// --> Muestra los combos en pantalla
function loadData(combos) {
    const compras = document.querySelector('.compras')

    for (let i = 0; i < combos.length; i++) {

        // Creo combo que debe append a compras
        const combo = document.createElement('div')
        combo.className = 'compras__combo'
        combo.id = 'combo' + combos[i].id.toString()

        // Creo img-des-precio que debe apend a combo
        const imgDiv = document.createElement('div')
        imgDiv.className = 'compras__imgDiv'
        const descDiv = document.createElement('div')
        descDiv.className = 'compras__descDiv'
        const priceDiv = document.createElement('div')
        priceDiv.className = 'compras__priceDiv'


        const name = document.createElement('h2')
        name.innerHTML = combos[i].name
        name.id = 'ti-' + combos[i].id.toString()

        const editName = document.createElement('input')
        editName.value = name.innerHTML
        editName.id = 'edti-' + combos[i].id.toString()
        editName.className = 'editName editCombo' + combos[i].id.toString()

        const img = document.createElement('img')
        img.id = 'img-' + combos[i].id.toString()
        img.src = 'data:image/jpg;base64,' + combos[i].image.content

        const changeImg = document.createElement('input')
        changeImg.type = 'file'
        changeImg.id = 'chImg-' + combos[i].id.toString()
        changeImg.className = 'editCombo' + combos[i].id.toString()
        changeImg.innerHTML = 'CAMBIAR IMAGEN'
        changeImg.onchange = () => {
            img.src = URL.createObjectURL(changeImg.files[0])
        }


        if (compras) {

            imgDiv.appendChild(name)
            imgDiv.appendChild(editName)
            imgDiv.appendChild(img)
            imgDiv.appendChild(changeImg)



            combo.appendChild(imgDiv)
            combo.appendChild(descDiv)
            combo.appendChild(priceDiv)
            compras.appendChild(combo)
        }


        const title = document.createElement('h4')
        title.innerHTML = 'Contenido:'
        const list = document.createElement('ul')
        list.id = 'ul-' + combos[i].id.toString()
        const editDesc = document.createElement('textarea')
        editDesc.id = 'ta-' + combos[i].id.toString()
        editDesc.className = 'editCombo' + combos[i].id.toString()

        const editCompra = document.createElement('textarea')
        editCompra.style.width = 'min(18rem)'
        editCompra.style.height = '2.6rem'
        editCompra.style.paddingLeft = '1.5rem'
        editCompra.className = 'editCombo' + combos[i].id.toString()
        console.log(combos[i].link);
        editCompra.placeholder ="link mercado pago"
        editCompra.value = combos[i].link

        function descValue() {
            let text = ''
            const lis = document.getElementsByClassName('li-' + combos[i].id.toString())
            for (let j = 0; j < lis.length; j++) {
                if (j === lis.length - 1) {
                    text = text + lis[j].innerHTML
                } else {
                    text = text + lis[j].innerHTML + '\n'
                }
            }

            return text
        }

        const saveCombo = document.createElement('button')
        saveCombo.id = 'sv-' + combos[i].id.toString()
        saveCombo.innerHTML = 'GUARDAR'
        saveCombo.style.width = '100px'
        saveCombo.style.height = '20px'
        saveCombo.className = 'editCombo' + combos[i].id.toString()
        saveCombo.onclick = () => {
            let com = {
                name: '',
                description: '',
                price: '',
                link: ''
            }

            com.name = editName.value
            if (editDesc.value === '') {
                com.description = ''
            } else {
                com.description = editDesc.value.split('\n')
            }

            com.price = editPrice.value
            com.link = editCompra.value

            let image;
            if (changeImg.files.length === 0) {
                image = ''
            } else {
                image = changeImg.files[0]
            }

            if (com.name === '' || com.description.length === 0 || com.price === '') {
                message('error.uncomplete', 'keepOpen')
            } else {
                updateCombos(combos[i].id, com, image)
            }
        }

        descDiv.appendChild(title)
        descDiv.appendChild(list)
        descDiv.appendChild(editDesc)
        descDiv.appendChild(editCompra)
        descDiv.appendChild(saveCombo)



        for (let j = 0; j < combos[i].description.length; j++) {
            const item = document.createElement('li')
            item.innerHTML = combos[i].description[j]
            item.className = 'li-' + combos[i].id.toString()

            list.appendChild(item)
        }

        const editCombo = document.createElement('button')
        editCombo.id = 'edit' + combos[i].id.toString()
        editCombo.className = 'admin edit'
        editCombo.innerHTML = 'EDITAR'
        editCombo.style.width = '100px'
        editCombo.style.height = '20px'
        editCombo.style.position = 'relative'

        editCombo.onclick = () => {
            const el = document.getElementsByClassName('editCombo' + combos[i].id.toString())

            for (let j = 0; j < el.length; j++) {
                el[j].style.display = 'block'
            }

            document.getElementById('pr-' + combos[i].id.toString()).innerHTML = '_'
            editDesc.value = descValue()
        };

        const delCombo = document.createElement('button')
        delCombo.id = 'dc-' + combos[i].id.toString()
        delCombo.className = 'admin delCombo'
        delCombo.innerHTML = 'ELIMINAR'
        delCombo.style.width = '100px'
        delCombo.style.height = '20px'
        delCombo.style.position = 'relative'
        delCombo.onclick = () => {
            document.getElementById('msjBtnCancel').style.display = 'block'
            message('confirm.delete', '', delCombo.id.slice(3), img.id.slice(4), 'combo')
        }

        const price = document.createElement('h2')
        price.id = 'pr-' + combos[i].id.toString()
        price.innerHTML = '$ ' + combos[i].price.toString() + ',-'

        if (combos[i].price.toString()[0] === '&') {
            price.innerHTML = combos[i].price.toString().slice(1)
            price.style.fontSize = '1rem'
        }

        const editPrice = document.createElement('input')
        editPrice.value = price.innerHTML.slice(1, -2)
        editPrice.id = 'ep-' + combos[i].id.toString()
        editPrice.className = 'editCombo' + combos[i].id.toString()



        const btn = document.createElement('div')
        btn.className = 'btn'
        const button = document.createElement('button')
        button.onclick = () => {
            const href = combos[i].link
            window.open(href, "_blank");
        }
        btn.appendChild(button)
        const span = document.createElement('span')
        span.innerHTML = 'COMPRAR'
        button.appendChild(span)

        let cl = ['top', 'left', 'bottom', 'right']
        for (let j = 0; j < cl.length; j++) {
            const div = document.createElement('div')
            div.className = cl[j]
            button.appendChild(div)
        }

        priceDiv.appendChild(editCombo)
        priceDiv.appendChild(delCombo)
        priceDiv.appendChild(saveCombo)
        priceDiv.appendChild(editPrice)
        priceDiv.appendChild(price)
        priceDiv.appendChild(btn)

        const hidde = document.getElementsByClassName('editCombo' + combos[i].id.toString())

        for (let j = 0; j < hidde.length; j++) {
            hidde[j].style.display = 'none'
        }
    }
}
// <-------------------------------------------

// --> Actualizacion de combos creados
function updateCombos(id, com, image) {
    console.log(com);
    let c = {
        name: com.name,
        description: com.description,
        price: com.price,
        link: com.link
    }
    fetch(baseUrl + 'combos/' + id, {
        method: "PUT",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        },
        body: JSON.stringify(c)
    })
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then((data) => {
                        loadComboImage(id, image)
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

// --> Eliminacion de combo dado
function deleteCombo(id, imgId) {
    fetch(baseUrl + 'combos/' + id, {
        method: "DELETE",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        }
    })
        .then((response) => {
            if (response.status === 200) {
                if (deleteComboImage(imgId)) {
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

// --> Obtencion de un combo dado
async function getOneCombo(id) {
    let d = []

    await fetch(baseUrl + 'combos/' + id, {
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
                    d.push(data)
                    loadData(d)
                })
                .catch((err) => {
                    console.log(err);
                })
        });
}
// <-------------------------------------------

// --> Muestra en pantalla el formulario para la creacion de un combo nuevo
function makeForm() {
    if (add === false) {
        add = true

        const form = document.querySelector('.comboForm')

        const combo = document.createElement('div')
        combo.className = 'comboForm__combo'

        form.appendChild(combo)

        const imgDiv = document.createElement('div')
        imgDiv.className = 'comboForm__imgDiv'
        const descDiv = document.createElement('div')
        descDiv.className = 'comboForm__descDiv'
        const priceDiv = document.createElement('div')
        priceDiv.className = 'comboForm__priceDiv'

        combo.appendChild(imgDiv)
        combo.appendChild(descDiv)
        combo.appendChild(priceDiv)

        const editName = document.createElement('input')
        editName.placeholder = 'Nombre del Combo'
        editName.id = 'addName'
        editName.className = 'editName'
        const img = document.createElement('img')
        img.id = 'addImgShow'
        img.src = '#'
        const changeImg = document.createElement('input')
        changeImg.type = 'file'
        changeImg.id = 'addImg'
        changeImg.className = 'editImg'
        changeImg.innerHTML = 'SELECCIONAR IMAGEN'
        changeImg.onchange = () => {
            img.src = URL.createObjectURL(changeImg.files[0])
        }

        imgDiv.appendChild(editName)
        imgDiv.appendChild(img)
        imgDiv.appendChild(changeImg)

        const title = document.createElement('h4')
        title.innerHTML = 'Contenido:'
        const editDesc = document.createElement('textarea')
        editDesc.id = 'addDesc'
        editDesc.placeholder = 'Ingrese el contenido del combo'

        const saveCombo = document.createElement('button')
        saveCombo.id = 'addSv'
        saveCombo.innerHTML = 'GUARDAR'
        saveCombo.style.width = '100px'
        saveCombo.style.height = '20px'

        descDiv.appendChild(title)
        descDiv.appendChild(editDesc)
        descDiv.appendChild(saveCombo)

        const editPrice = document.createElement('input')
        editPrice.placeholder = 'Precio'
        editPrice.id = 'addPr'


        const editLink = document.createElement('input')
        editLink.placeholder = 'Link Producto'
        editLink.id = 'addLink'
        priceDiv.appendChild(editPrice)
        priceDiv.appendChild(editLink)

        saveCombo.onclick = () => {
            let c = {
                name: editName.value,
                description: editDesc.value.split('\n'),
                price: parseFloat(editPrice.value),
                link: editLink.value
            }
            let image


            if (editDesc.value === '') {
                c.description = ''
            } else {
                c.description = editDesc.value.split('\n')
            }

            if (changeImg.files.length === 0) {
                image = ''
            } else {
                image = changeImg.files[0]
            }

            if (c.name === '' || c.description.length === 0 || c.price === '' || c.image === '') {
                message('error.uncomplete', 'keepOpen')
            } else {
                newCombo(c, image)
            }
        }
    }
}
// <-------------------------------------------

const addCombo = document.getElementById('addCombo')
if (addCombo !== null) {
    addCombo.onclick = () => {
        makeForm()
    }
}

// --> Envio de combo nuevo al servidor
async function newCombo(combo, image) {
    await fetch(baseUrl + 'combos', {
        method: "POST",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        },
        body: JSON.stringify(combo)
    })
        .then((response) => {
            if (response.status === 201) {
                response.json()
                    .then((data) => {
                        if (loadComboImage(data.id, image)) {
                            message('valid.create', '')
                        } else {
                            message('error.create', 'keepOpen')
                        }
                    })
            } else {
                message('error.create', 'keepOpen')
            }
        });
}
// <-------------------------------------------


async function loadComboImage(id, image) {
    if (image) {
        let formData = new FormData()
        const blobImg = new Blob([image], { type: image.type })

        formData.append('image', blobImg)

        await fetch(baseUrl + 'combos/image/' + id, {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                if (response.status === 200) {
                    return true
                } else {
                    return false
                }
            })
    }
}

async function deleteComboImage(id) {
    await fetch(baseUrl + 'combos/image/' + id, {
        method: 'DELETE',
        modo: "*cors",
    })
        .then((response) => {
            if (response.status === 201) {
                return true
            } else {
                return false
            }
        })
}
getCombos()

export { deleteCombo }
