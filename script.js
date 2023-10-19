const html = document.querySelector("html")
const body = document.querySelector("body")
const contenitoreSito = document.querySelector(".contenitore-sito")
const navCategorieButton = document.querySelector(".nav-categorie-btn")
const navCategorie = document.querySelector("#nav-categorie")
const overlayAllergeni = document.querySelector(".overlay-allergeni")
const overlayContenuto = document.querySelector(".overlay-contenuto")
const overlayCloseButton = document.querySelector(".overlay-close-btn")
const allergeniInfoButtons = document.querySelectorAll(".allergeni-info")


// navbar
navCategorieButton.addEventListener("click", () => {
    body.classList.toggle("no-overflow")
    body.classList.toggle("no-overflow")
    contenitoreSito.classList.toggle("no-overflow")
    navCategorieButton.classList.toggle("open")
    navCategorie.classList.toggle("open")
})

// open allergeni menu
// TODO leggi lista allergeni da elemento es.allergeni_items["i_000001"] = { "allergeni": { "0": 32, "1": 33, "2": 35 } };
// e attiva/disattiva allergeni in base a quali elementi sono presenti in lista
allergeniInfoButtons.forEach(button => {
    button.addEventListener("click", () => {
        overlayAllergeni.classList.toggle("show")
        overlayContenuto.classList.toggle("fadeIn")
    })
});


// close allergeni overlay on button click
overlayCloseButton.addEventListener("click", () => {
    // stopPropagation() prevents event from triggering twice from the below function
    event.stopPropagation()
    overlayAllergeni.classList.toggle("show")
    overlayContenuto.classList.toggle("fadeIn")
})
// close when clicked on overlay
overlayAllergeni.addEventListener("click", () => {
    overlayAllergeni.classList.toggle("show")
    overlayContenuto.classList.toggle("fadeIn")
})