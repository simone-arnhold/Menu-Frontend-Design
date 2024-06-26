const html = document.querySelector("html")
const body = document.querySelector("body")
const contenitoreSito = document.querySelector(".contenitore-sito")
const navCategorieButton = document.querySelector(".nav-categorie-btn")
const navCategorie = document.querySelector("#nav-categorie")
const navCategorieHeader = document.querySelector(".nav-categorie-header")
const fadeinLogo = document.querySelector(".fadein-logo")
const overlayAllergeni = document.querySelector(".overlay-allergeni")
const overlayContenuto = document.querySelector(".overlay-contenuto")
const overlayCloseButton = document.querySelector(".overlay-close-btn")
var allergeniInfoButtons = document.querySelectorAll(".allergeni-info")


// toggle mode
function toggleMode() {
    document.body.classList.toggle('dark-mode')
}

// Detect user's preference for light or dark mode
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode')
}


// navbar
function toggleMenu() {
    // html.classList.toggle("no-overflow")
    // body.classList.toggle("no-overflow")
    // contenitoreSito.classList.toggle("no-overflow")
    navCategorieButton.classList.toggle("open")
    navCategorie.classList.toggle("open")
    navCategorieHeader.classList.toggle("open")
    fadeinLogo.classList.toggle("fadein")
}

navCategorieButton.addEventListener("click", toggleMenu)

function apriCategoria(evt, IDcategoria) {
    const categorieUL = document.querySelector("#nav-categorie-ul")
    let categorie = categorieUL.querySelectorAll('li > a')
    // rimuovi vecchia selezione
    Array.from(categorie).forEach(categoria => {
        categoria.classList.remove("selezionato")
    })
    // aggiungi nuova selezione di categoria
    evt.currentTarget.classList.add("selezionato")
    // rimuovi html delle sottocategorie e dei pannelli
    let sottocategorie = document.getElementsByClassName("nav-sottocategoria")
    let sottocategoriaPannelli = document.getElementsByClassName("sottocategoria-pannello")
    Array.from(sottocategorie).forEach(sottocategoria => sottocategoria.remove())
    Array.from(sottocategoriaPannelli).forEach(element => element.remove())

    // trova nome del file html della categoria da importare
    nomeHTML = "categorie/" + IDcategoria + ".html"
    // console.log(nomeHTML)

    // inserisci dati di categorie e sottocategorie
    const xhr = new XMLHttpRequest()
    xhr.open('GET', nomeHTML, true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // richiesta completata
            const content = xhr.responseText

            // aggiungo le nuove pills di navigazione delle sottocategorie
            const startNavSottocategorie = content.indexOf('<nav class="nav nav-pills nav-justified tabbable" id="tab-personalizzato" role="tablist">') + '<nav class="nav nav-pills nav-justified tabbable" id="tab-personalizzato" role="tablist">'.length
            const endNavSottocategorie = content.indexOf('</nav>', startNavSottocategorie)
            const navSottocategorie = content.substring(startNavSottocategorie, endNavSottocategorie)
            document.querySelector(".nav-pills").innerHTML = navSottocategorie
            // console.log(navSottocategorie)

            // aggiungo i contenuti dei piatti
            const startContenuto = content.indexOf('</nav>')
            // const endContenuto = content.indexOf('</div>', startContenuto)
            const endContenuto = content.length
            const contenuto = content.substring(startContenuto, endContenuto)
            document.querySelector(".contenitore-piatti").innerHTML = contenuto
            // attiva bottoni degli allergeni
            attivaAllergeni()
            // attiva overlay zoom delle immagini
            abilitaZoomImmagini()
            // accordion vini ricarica
            accordionVini()
            // seleziona di default prima opzione

            // chiudi menu
            toggleMenu()
        } else if (xhr.status === 404) {
            console.log('404 Not Found: Non è presente una pagina html della categoria selezionata.',)
        }
    }
    xhr.send()
}

function apriSottocategoria(evt, IDsottocategoria) {
    // faccio una lista di tutti i link delle sottocategorie
    let sottocategorie = document.getElementsByClassName("nav-sottocategoria")
    Array.from(sottocategorie).forEach(sottocategoria => {
        sottocategoria.classList.remove("selezionato")
    })
    // faccio una lista di tutti i sottocategoria-pannello
    let sottocategoriaPannelli = document.getElementsByClassName("sottocategoria-pannello")
    Array.from(sottocategoriaPannelli).forEach(pannello => {
        pannello.classList.remove("selezionato")
    })
    // aggiungo classe "selezionato" al link
    evt.currentTarget.classList.add("selezionato")
    // aggiungo classe "selezionato" a sottocategoria-pannello
    document.getElementById(IDsottocategoria).classList.add("selezionato")
}

// sottocategorie menu
// enable scrollwheel
// const navJustified = document.querySelector(".nav-justified")
// navJustified.addEventListener("wheel", function (e) {
//     // e.preventDefault()
//     if (e.deltaY > 0) {
//         navJustified.scrollLeft += 100 //scroll right
//     } else {
//         navJustified.scrollLeft -= 100 //scroll left
//     }
// })

// open allergeni menu
// TODO leggi lista allergeni da elemento es.allergeni_items["i_000001"] = { "allergeni": { "0": 32, "1": 33, "2": 35 } }
// e attiva/disattiva allergeni in base a quali elementi sono presenti in lista
function attivaAllergeni() {
    // console.log("called attivaAllergeni()")
    // todo rivedi
    let allergeniInfoButtons = document.querySelectorAll(".allergeni-info")
    allergeniInfoButtons = document.querySelectorAll(".allergeni-info")
    allergeniInfoButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            overlayAllergeni.classList.toggle("show")
            overlayContenuto.classList.toggle("fadeIn")
        })
    })
}
attivaAllergeni()

// close allergeni overlay on button click
overlayCloseButton.addEventListener("click", (event) => {
    event.stopPropagation()
    overlayAllergeni.classList.toggle("show")
    overlayContenuto.classList.toggle("fadeIn")
})
// close when clicked on overlay
overlayAllergeni.addEventListener("click", (event) => {
    overlayAllergeni.classList.toggle("show")
    overlayContenuto.classList.toggle("fadeIn")
})

// accordion vini ---
function accordionVini() {
    acc = document.getElementsByClassName("accordion");
    Array.from(acc).forEach(function (accordion) {
        accordion.addEventListener("click", function () {
            this.classList.toggle("active")
            var panel = this.nextElementSibling
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px"
            }
        })
    })
}

// logica zoom immagine piatto quando cliccata
function abilitaZoomImmagini() {
    let immaginiPiatti = document.querySelectorAll(".contenuto-immagine")
    const overlayImmagineWrapper = document.querySelector(".overlay-immagine")
    const overlayImmagineTarget = document.querySelector(".overlay-immagine-zoom")

    immaginiPiatti.forEach(immagine => {
        immagine.addEventListener("click", function (event) {
            zoomImageURL = window.getComputedStyle(event.target, null).getPropertyValue("background-image")
            overlayImmagineTarget.style.backgroundImage = zoomImageURL
            overlayImmagineWrapper.classList.toggle("show")
        })
    })
    // disabilita l'overlay quando premuto in qualunque posto
    overlayImmagineWrapper.addEventListener("click", () => {
        overlayImmagineWrapper.classList.remove("show")
    })
}

// dropdown linguaggi mobile open/close
const dropbtn = document.querySelector(".dropbtn")
const dropdownContenuto = document.querySelector(".dropdown-contenuto")

dropbtn.addEventListener("click", () => {
    dropdownContenuto.classList.toggle("open")
})





// ---- JSON UNIMPLEMENTED TESTS ----

// read JSON via fetch
// fetch("menu-data-example.json")
//     .then(response => response.json())
//     .then(data => {
//         var jsonData = data
//         console.log(data)
//     })

// const categorie = jsonData["piatti"].map(item => item["categoria-id"])
// console.log(categorie)

