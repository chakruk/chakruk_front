
const navbar = document.getElementsByClassName("info__navbarTitle")
const navbarMini = document.getElementsByClassName('info__descripciones__title')
const desc = document.getElementsByClassName("info__desc")
let prev = 0
let openMini

// --> Selecciona por defecto el primet item
navbar[prev].style.backgroundColor = "rgba(32, 32, 32, 0.93)"
if (screen.width > 1024) {
    desc[prev].style.height = "45rem"
}





// for(let i = 0; i < navbarMini.length; i++){
//     navbarMini[i].onclick = () => { select(i) }
//     console.log("Me estoy ejecutando");

//     if(screen.width <= 1024){
//         navbarMini[i].style.display = 'flex'
//     } else {
//         navbarMini[i].style.display = 'none'
//     }
// }


// <-------------------------------------------

// --> Funcion de seleccion de pestaña
const select = (i) => {
    if (screen.width > 1024) {
        if (i !== prev) {
            navbar[i].style.backgroundColor = "rgba(32, 32, 32)"
            desc[prev].style.zIndex = 1
            desc[i].style.zIndex = 4
            desc[i].style.backgroundColor = "rgba(32, 32, 32)"
            desc[i].style.height = "45rem"
            navbar[prev].style.backgroundColor = "black"

            setTimeout(() => {
                desc[prev].style.height = "0"
                navbar[prev].style.backgroundColor = "black"
                desc[prev].scroll(0, 0)
                prev = i
            }, 200);
        }
    } else {
        if (openMini === i) {
            navbarMini[i].style.backgroundColor = 'rgb(0, 0, 0)'
            desc[i].style.height = '0'
            document.getElementById('info__descripciones__title' + i.toString()).style.transform = 'rotate(90deg)'
            openMini = ''
        } else {
            navbarMini[i].style.backgroundColor = 'rgb(179, 179, 179)'
            desc[prev].style.height = '0'
            desc[i].style.height = 'auto'
            console.log(navbarMini[i].lastChild);
            document.getElementById('info__descripciones__title' + i.toString()).style.transform = 'rotate(-90deg)'
            openMini = i
        }

    }
}

// Aqui estoy llamando al codigo por cada vez que actualizo la pagina 
// for(let i = 0; i < navbar.length; i++){
//     navbar[i].onclick = () => { select(i) }
//     console.log('====================================');
//     console.log("Me estoy ejecutando");
//     console.log('====================================');
// }

// for(let i = 0; i < navbarMini.length; i++){
//     navbarMini[i].onclick = () => { select(i) }
//     console.log("Me estoy ejecutando");

//     if(screen.width <= 1024){
//         navbarMini[i].style.display = 'flex'
//     } else {
//         navbarMini[i].style.display = 'none'
//     }
// }

// <-------------------------------------------
