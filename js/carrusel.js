const elemCar = [
    {
        id: 'yjSjt7mCLW0',
        img: 'previaLike10.png'
    },
    {
        id: "zi2lwjdtQbc",
        img: 'previaAtlantida.png'
    },
    {
        id: "xd7LXDsnqpI",
        img: 'previaHistoria3Minutos.png'
    },
    {
        id: "vfnf2I3ifak",
        img: 'previaLike10.png'
    },
    {
        id: "DjEKzA_vFHA",
        img: 'previaVideoTorneo.png'
    }
]

// --> Creacion del carrusel
for(let i = 0; i < elemCar.length; i++){
    const div = document.createElement("div")
    div.className = "carrusel__element"
    div.id = "img" + i

    const element = document.createElement("img")
    element.src = './../img/' + elemCar[i].img

    const btn = document.createElement('button')
    btn.onclick = () => {openVideo(elemCar[i].id)}
    btn.innerHTML = '▶'
    btn.className = 'play'
    btn.id = 'btn' + i

    document.querySelector(".carrusel__main").appendChild(div)
    div.appendChild(element)
    div.appendChild(btn)

    const navDiv = document.createElement('div')
    navDiv.className = 'carrusel__navbar__navDiv'
    const navImg = document.createElement('img')
    navImg.src = './../img/' + elemCar[i].img
    const filterDiv = document.createElement('div')
    filterDiv.id = 'filter' + i
    filterDiv.className = 'carrusel__navbar__filterDiv'
    filterDiv.onclick = () => { selectMin(i) }

    document.querySelector('.carrusel__navbar__min').appendChild(navDiv)
    navDiv.appendChild(navImg)
    navDiv.appendChild(filterDiv)
}
// <-------------------------------------------

// --> Animacion del Carrusel
const imgArray = document.getElementsByClassName("carrusel__element")
document.getElementById('filter' + 0).style.border = '1px solid white'

for(let i = 1; i < imgArray.length; i++){
    // console.log(imgArray[i]);
    imgArray[i].style.width = "0"
    document.getElementById('filter' + i).style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    document.getElementById('filter' + i.toString()).style.border = 'none'
}

let countCarr = 0
const carrLeft = document.querySelector("#left")
carrLeft.onclick = () => left()
const carrRigth = document.querySelector("#right")
carrRigth.onclick = () => right()

function left() {
    // console.log("left");    
    document.getElementById("img" + countCarr.toString()).style.width = "0"
    document.getElementById("btn" + countCarr.toString()).style.display = "none"

    document.getElementById('filter' + countCarr.toString()).style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    document.getElementById('filter' + countCarr.toString()).style.border = 'none'

    if(countCarr === 0){
        countCarr = imgArray.length
    }
    document.getElementById("img" + (countCarr - 1).toString()).style.width = "auto"
    document.getElementById("btn" + (countCarr - 1).toString()).style.display = "block"
    document.getElementById('filter' + (countCarr - 1).toString()).style.backgroundColor = 'rgba(0, 0, 0, 0)'
    document.getElementById('filter' + (countCarr - 1).toString()).style.border = '1px solid white'
    countCarr--
}

function right() {
    // console.log("right");
    document.getElementById("img" + countCarr.toString()).style.width = "0"
    document.getElementById("btn" + countCarr.toString()).style.display = "none"

    document.getElementById('filter' + countCarr.toString()).style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    document.getElementById('filter' + countCarr.toString()).style.border = 'none'
    if(countCarr === imgArray.length - 1){
        countCarr = -1
    }
    document.getElementById("img" + (countCarr + 1).toString()).style.width = "auto"
    document.getElementById("btn" + (countCarr + 1).toString()).style.display = "block"
    document.getElementById('filter' + (countCarr + 1).toString()).style.backgroundColor = 'rgba(0, 0, 0, 0)'
    document.getElementById('filter' + (countCarr + 1).toString()).style.border = '1px solid white'
    countCarr++
}

function selectMin(id) {
    for(let i = 0; i < imgArray.length; i++){
        // console.log(imgArray[i]);
        imgArray[i].style.width = "0"
        document.getElementById("btn" + i).style.display = "none"
        document.getElementById('filter' + i).style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        document.getElementById('filter' + i.toString()).style.border = 'none'
    }

    document.getElementById("img" + id.toString()).style.width = "auto"
    document.getElementById("btn" + id.toString()).style.display = "block"
    document.getElementById('filter' + id.toString()).style.backgroundColor = 'rgba(0, 0, 0, 0)'
    document.getElementById('filter' + id.toString()).style.border = '1px solid white'
    countCarr = id
}
// <-------------------------------------------

// --> Apertura de video en pantalla completa
function openVideo(id) {
    window.scrollTo(0,0);
    document.querySelector('.header').style.height = '0rem'

    const videoDiv = document.createElement('div')
    videoDiv.className = 'videoDiv'

    const video = document.createElement('iframe')
    video.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&mute=0'
    video.allow = 'autoplay'

    const closeVid = document.createElement('button')
    closeVid.className = 'videoDiv__closeVid'
    closeVid.innerHTML = 'X'
    closeVid.onclick = () => {
        document.body.removeChild(videoDiv)
    }
    
    document.body.appendChild(videoDiv)
    videoDiv.appendChild(video)
    videoDiv.appendChild(closeVid)

    setTimeout(() => {
        video.muted = 0
    }, 10);
}
// <-------------------------------------------