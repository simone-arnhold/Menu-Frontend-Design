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
const allergeniInfoButtons = document.querySelectorAll(".allergeni-info")

// toggle mode
function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

// Detect user's preference for light or dark mode
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}


// navbar
navCategorieButton.addEventListener("click", (event) => {
    html.classList.toggle("no-overflow")
    body.classList.toggle("no-overflow")
    contenitoreSito.classList.toggle("no-overflow")
    navCategorieButton.classList.toggle("open")
    navCategorie.classList.toggle("open")
    navCategorieHeader.classList.toggle("open")
    fadeinLogo.classList.toggle("fadein")
})


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
// TODO leggi lista allergeni da elemento es.allergeni_items["i_000001"] = { "allergeni": { "0": 32, "1": 33, "2": 35 } };
// e attiva/disattiva allergeni in base a quali elementi sono presenti in lista
allergeniInfoButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        overlayAllergeni.classList.toggle("show")
        overlayContenuto.classList.toggle("fadeIn")
    })
});

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

function apriSottocategoria(evt, IDsottocategoria) {
    // faccio una lista di tutti i link delle sottocategorie
    sottocategorie = document.getElementsByClassName("nav-sottocategoria")
    Array.from(sottocategorie).forEach(sottocategoria => {
        sottocategoria.classList.remove("selezionato")
    })
    // faccio una lista di tutti i sottocategoria-pannello
    sottocategoriaPannelli = document.getElementsByClassName("sottocategoria-pannello")
    Array.from(sottocategoriaPannelli).forEach(pannello => {
        pannello.classList.remove("selezionato")
    })
    // aggiungo classe "selezionato" al link
    evt.currentTarget.classList.add("selezionato")
    // aggiungo classe "selezionato" a sottocategoria-pannello
    document.getElementById(IDsottocategoria).classList.add("selezionato")
}


// ---- JSON UNIMPLEMENTED TESTS ----

// read JSON via fetch
// fetch("menu-data-example.json")
//     .then(response => response.json())
//     .then(data => {
//         var jsonData = data;
//         console.log(data);
//     })

// const categorie = jsonData["piatti"].map(item => item["categoria-id"])
// console.log(categorie)

