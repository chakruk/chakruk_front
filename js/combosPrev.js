

// const baseUrl = "https://test.backchakruk.quinto.site/"
const baseUrl = "http://149.50.131.196:8080/chakruk-0.0.1-SNAPSHOT/"
// const baseUrl = "http://localhost:8080/"

// --> Obtencion de combos
async function getCombos() {

    if (window.location.href.split('#')[1] !== undefined) {
        document.getElementById(window.location.href.split('#')[1]).scrollIntoView({ block: 'center' })
    }

    // loadData(combos)
    await fetch(baseUrl + 'combos', {
        method: "GET",
        modo: "*cors",
        credentials: 'same-origin',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        }
    }).then((response) => {
        response.json()
            .then((data) => {
                if (data.length !== 0) {
                    loadData(data)
                }
            })
            .catch((err) => {
                console.error(err)
            })
    });
}
// <-------------------------------------------

// --> Muestra previa de combos en pantalla
function loadData(combos) {
    const combosDiv = document.querySelector(".combosPrev__combos")

    for (let i = 0; i < combos.length; i++) {
        let margin

        if (combos.length === 0 || i > 4) {
            break
        }

        if (combos.length < 3) {
            margin = "10rem"
        } else if (combos.length < 4) {
            switch (i) {
                case 0:
                    margin = "5rem"
                    break
                case 1:
                    margin = "10rem"
                    break
                case 2:
                    margin = "5rem"
                    break
                default:
                    break
            }
        } else if (combos.length < 5) {
            switch (i) {
                case 0:
                    margin = "5rem"
                    break
                case 1:
                    margin = "10rem"
                    break
                case 2:
                    margin = "10rem"
                    break
                case 3:
                    margin = "5rem"
                    break
                default:
                    break
            }
        } else {
            switch (i) {
                case 0:
                    margin = "0rem"
                    break
                case 1:
                    margin = "5rem"
                    break
                case 2:
                    margin = "10rem"
                    break
                case 3:
                    margin = "5rem"
                    break
                case 4:
                    margin = "0rem"
                    break
                default:
                    break
            }
        }


        if (screen.width < 1100) {
            margin = "0rem" 
        }


        const combo = document.createElement("div")
        combo.onclick = () => {
            window.location.href = './pages/preventa.html#combo' + combos[i].id.toString()
        }
        const combo2 = document.createElement("div")
        combo.className = "combosPrev__comboSmall"
        combo.style.marginLeft = margin
        combo2.className = "combosPrev__comboSmall2"

        combo.appendChild(combo2)
        combosDiv.appendChild(combo)

        const header = document.createElement("div")
        header.className = "combosPrev__header"

        combo2.appendChild(header)

        const h2 = document.createElement("h2")
        h2.innerHTML = "Combo " + combos[i].id.toString()
        const h4 = document.createElement("h4")
        h4.innerHTML = combos[i].name.split('(')[0]

        header.appendChild(h2)
        header.appendChild(h4)

        const desc = document.createElement("div")
        desc.className = "combosPrev__desc"

        combo2.appendChild(desc)

        let content = [0, ""]

        for (let j = 0; j < combos[i].description.length; j++) {
            const p = document.createElement("p")

            content[1] = combos[i].description[j]

            if (content[0] === 5) {
                content[1] = "Más..."
                p.innerHTML = content[1]
                desc.appendChild(p)
                break
            }

            p.innerHTML = content[1]
            content[0] = content[0] + 1

            desc.appendChild(p)
        }
    }
}
// <-------------------------------------------

getCombos()

document.getElementById('recompensa_btn').onclick = () => {
    window.location.href = './pages/preventa.html'
}