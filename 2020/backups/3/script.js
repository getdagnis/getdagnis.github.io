// JS code by Dagnis Skurbe, November 2019

window.onload = contents;

function contents() {
    setTimeout(function() {
        hideHidingDiv();
        getContents();
    }, 1000);
    document.addEventListener("mouseleave", function(event) {
        showHidingDiv();
    });
    document.addEventListener("mouseover", function(event) {
        hideHidingDiv();
    });
}

function hideHidingDiv() {
    const hideDiv = document.getElementById('hide');
    hideDiv.style.top = "-99.9%";
}

function showHidingDiv() {
    const hideDiv = document.getElementById('hide');
    hideDiv.style.transitionDelay = ".4s";
    hideDiv.style.transitionDuration = "2s";
    hideDiv.style.background = "rgba(69, 247, 217, 0.95)"
    hideDiv.style.top = "0%";
}


let somethingIsOpen = false;

document.addEventListener("click", function(event) {
    // Navigācija starp bildēm turp -- uz next / no pēdējās uz sākumu -- uz last / atpakaļ -- uz previous
    if (event.target.classList.contains("next")) {
        moveImage(event);
    }
    if (event.target.classList.contains("last")) {
        moveToZero(event);
    }

    // Thumbnailu funkciju mainīšana, atkarībā no tā, kā uz tiem tiek klikšķināts
    if (event.target.classList.contains("item-inner") &&
    event.target.classList.contains("item-inner-active") === false) {
        let id = event.target.classList[1];
        let row = event.target.classList[2];
        closeExpanded();
        openExpanded(id, row);
        moveToZero(event);
    }
    if (event.target.parentElement.classList.contains("item-inner") &&
        event.target.parentElement.classList.contains("item-inner-active") === false) {
        let id = event.target.parentElement.classList[1];
        let row = event.target.parentElement.classList[2];
        closeExpanded();
        openExpanded(id, row);
        moveToZero(event);
    }
    if (event.target.classList.contains("item-inner-active")) {
        somethingIsOpen = true;
        moveToZero(event);
        closeExpanded();
    }
    if (event.target.parentElement.classList.contains("item-inner-active")) {
        somethingIsOpen = true;
        moveToZero(event);
        closeExpanded();
    }
    if (event.target.classList.contains('button')) {
        contents();
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
    let buttonThatExpanded = document.getElementsByClassName(id)[0];
    let expandableDiv = document.getElementsByClassName(id)[1];
    currentId = id;

    expandableDiv.classList.replace('hidden', 'is-expanded');
    setTimeout(function(){ 
        expandableDiv.classList.replace('scale-0', 'scale-100');
        buttonThatExpanded.classList.add('item-inner-active');
    }, 10);
};

function closeExpanded() {
    let allExpanded = document.getElementsByClassName('is-expanded');
    let allYellowButtons = document.getElementsByClassName('item-inner-active');
    let allScale100 = document.getElementsByClassName('scale-100');
    
    while (allScale100.length > 0) {
        allScale100[0].classList.replace('scale-100', 'scale-0');
    }
    while (allYellowButtons.length > 0) {
        allYellowButtons[0].classList.remove('item-inner-active');
    }
    if (somethingIsOpen === true) {
        setTimeout(function(){
            while (allExpanded.length > 0) {
                allExpanded[0].classList.replace('is-expanded', 'hidden');
            }
        }, 400);
    } else {
        while (allExpanded.length > 0) {
            allExpanded[0].classList.replace('is-expanded', 'hidden');
        }
    }
    
    translateAmount = 0;
    somethingIsOpen = false;
}

// By Dagnis Skurbe, November 2019



// window.addEventListener("mousemove", function (event) {
//     if (event.screenX > 1100) {
//         console.log('ALISE');
//     } else if (event.screenX < 400) {
//         console.log('MAMMA');
//     } else if (event.screenX > 600 && event.screenX < 900) {
//         console.log('TĒTIS');
//     }})