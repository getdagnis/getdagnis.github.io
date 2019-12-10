// © Vanilla JS written by Dagnis Skurbe, November 2019

window.onload = init;

function init() {
}

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("next")) {
        moveImage(event);
    }
    if (event.target.classList.contains("active-item") || event.target.parentElement.classList.contains("active-item") || event.target.classList.contains("last")) {
        moveToZero(event);
    }
    if (event.target.classList.contains("item-inner")) {
        let id = event.target.classList[1];
        let row = event.target.classList[2];
        openExpanded(id, row);
    }
    if (event.target.parentElement.classList.contains("item-inner")) {
        let id = event.target.parentElement.classList[1];
        let row = event.target.parentElement.classList[2];
        openExpanded(id, row);
    }
});

let translateAmount = 0;
let currentId = '';

function moveImage(event) {
    const activeImages = document.getElementById(currentId + "-images");

    translateAmount -= 906;
    activeImages.style.transform = "translateX(" + translateAmount + "px)";
    replacePrevious();
    event.target.classList.replace("next", "previous");
}

function moveToZero(event) {
    const activeImages = document.getElementById(currentId + "-images");

    translateAmount = 0;
    activeImages.style.transform = "translateX(0px)";
    replacePrevious();
}

function replacePrevious() {
    const allPrevious = document.getElementsByClassName("previous");

    for (i = 0; i < allPrevious.length; i++) {
        allPrevious[i].classList.replace("previous", "next");
    }
}

function openExpanded(id) {
    let expandableDiv = document.getElementsByClassName(id)[1];
    currentId = id;

    closeExpanded();
    expandableDiv.classList.replace('hidden', 'is-expanded');
}

function closeExpanded() {
    let allExpanded = document.getElementsByClassName('is-expanded');
    if (allExpanded.length > 0) {
        allExpanded[0].classList.replace('is-expanded', 'hidden');
    }
    translateAmount = 0;
}

// © Vanilla JS written by Dagnis Skurbe, November 2019