// JS code by Dagnis Skurbe, December 2019-January 2020
window.onload = contents;
let somethingIsOpen = false;

function contents() {
    setTimeout(function() {
        hideTheCurtain();
        launchPortfolio();
    }, 1100);
    // document.addEventListener("mouseleave", function(event) {
    //     showTheCurtain();
    // });
    // document.addEventListener("mouseover", function(event) {
    //     hideTheCurtain();
    // });
    walkTheInnerBlue();
}

// Paslēpj zilo priekškaru, kad nepieciešams
function hideTheCurtain() {
    const hideCurtain = document.getElementById('curtain');
    hideCurtain.style.top = "-99.8%";
}

// Parāda zilo priekškaru, kad nepieciešams
function showTheCurtain() {
    const hideDiv = document.getElementById('curtain');
    hideDiv.style.transitionDelay = ".2s";
    hideDiv.style.transitionDuration = "2s";
    hideDiv.style.top = "0%";
}

// Galvenais dokumenta "event listeners"
document.addEventListener("click", function(event) {
    // Navigācija starp bildēm turp -- uz next / no pēdējās uz sākumu -- uz last / atpakaļ -- uz previous
    if (event.target.classList.contains("next")) {
        moveImage(event, "forward");
    } else if (event.target.classList.contains("previous")) {
        moveImage(event, "back");
    } else if (event.target.classList.contains("last")) {
        moveToZero(event);
    }

    // Thumbnailu funkciju mainīšana, atkarībā no tā, kā uz tiem tiek klikšķināts
    if (event.target.classList.contains("item-inner") &&
        event.target.classList.contains("item-inner-active") === false) {
        let id = event.target.classList[1];
        let row = event.target.classList[2];
        moveToZero(event);
        closeExpanded();
        openExpanded(id, row);
        // moveScreenUp(event, wasOnParent);
    }
    if (event.target.parentElement.classList.contains("item-inner") &&
        event.target.parentElement.classList.contains("item-inner-active") === false) {
        let id = event.target.parentElement.classList[1];
        let row = event.target.parentElement.classList[2];
        moveToZero(event);
        closeExpanded();
        openExpanded(id, row);
        // moveScreenUp(event, wasOnParent);
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

function moveScreenUp(event, wasOnParent) {
    let pageY = event.pageY;
    let elementY = event.offsetY;
    let windowY = event.y;
    let newY = 0;

    if (wasOnParent === false) {
        newY = pageY - elementY - 10;
        
        window.scrollTo({
            top: newY,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        newY = pageY - event.layerY - 10;
        window.scrollTo({
            top: newY,
            left: 0,
            behavior: 'smooth'
        });
    }
}


// Vada zilā laukuma staigāšanu pa gridu (sekošanu pelei)
function walkTheInnerBlue() {
    let previousItemClass = '';
    let thisItemRow = 0;
    let thisItemCol = 0;
    let thisInnerItemClass = ''; 
    let thisInnerItem = {}; 
    let itemsAround = [];
    const previousItem = document.getElementsByClassName(previousItemClass)[0];

    document.addEventListener("mouseover", function(event) {
        if (event.target.classList.length > 0) {
            if (event.target.classList.contains('grid-item-inner')) {
                thisItemRow = event.target.classList[1].slice(4);
                thisItemCol = event.target.classList[2].slice(4);
                thisInnerItemClass = 'row-' + thisItemRow + '-col-' + thisItemCol;
                thisInnerItem = document.getElementsByClassName(thisInnerItemClass)[0];
                thisInnerItem.classList.add('inner-current');
    
                infectItemsAround(thisItemRow, thisItemCol, previousItemClass);
                previousItemClass = 'row-' + thisItemRow + '-col-' + thisItemCol;                    
            } else if (event.target.classList.contains('body') ||
                    event.target.parentElement.classList.contains('motto') ||
                    event.target.classList.contains('viewer-img') ||
                    event.target.classList.contains('item-inner-active')) {
                cleanUnnecessaryItems();
            }
        }
    });

}

// Visiem tiem lauciņiem, kas ir apkārt pašreizējam zilajam lauciņam, jau laicīgi nomaina
// klases uz nepieciešamajām, lai pareizi veidotos animācijas virziens
function infectItemsAround(r, c, previous) {
    let rowColClass = 'row-' + r + '-col-' + c;
    const previousItem = document.getElementsByClassName(previous)[0];
    const allOtherPrevious = document.getElementsByClassName('inner-previous');
    const thisItem = document.getElementsByClassName(rowColClass)[0];

    r = parseInt(r);
    c = parseInt(c);
    thisItem.classList.remove('inner-top', 'inner-bottom', 'inner-left', 'inner-right');
    infectThisItem(r - 1, c, 'inner-bottom');
    infectThisItem(r - 1, c + 1, 'inner-bottom');
    infectThisItem(r, c - 1, 'inner-right');
    infectThisItem(r, c + 1, 'inner-left');
    infectThisItem(r + 1, c - 1, 'inner-top');
    infectThisItem(r + 1, c, 'inner-top');
    infectThisItem(r + 1, c + 1, 'inner-top');
    infectThisItem(r - 1, c - 1, 'inner-bottom');
    cleanUnnecessaryItems(thisItem);
    
    while (allOtherPrevious.length > 0) {
        allOtherPrevious[0].classList.remove('inner-previous', 'transition-6');
    }
    if (previousItem) {
        previousItem.classList.add('transition-6', 'inner-previous');
    }
}

function infectThisItem(r, c, newClass)  {
    let rowColClass = 'row-' + r + '-col-' + c;
    const thisItem = document.getElementsByClassName(rowColClass)[0];
    
    if (thisItem) {       
        thisItem.classList.remove('inner-top', 'inner-bottom', 'inner-left', 'inner-right', 'transition-6', 'inner-previous');
        thisItem.classList.add(newClass);
    }
}

// Attīra visus nevajadzīgi iekrāsotos zilos lauciņus
function cleanUnnecessaryItems(thisItem) {
    const allItems = document.getElementsByClassName('item-inner');

    for (i = 0; i < allItems.length; i++) {
        if (allItems[i] !== thisItem &&
            allItems[i].classList.contains('inner-top') === false &&
            allItems[i].classList.contains('inner-bottom') === false &&
            allItems[i].classList.contains('inner-left') === false &&
            allItems[i].classList.contains('inner-right') === false &&
            allItems[i].classList.contains('item-inner-active') === false) {
            allItems[i].classList.remove('inner-previous');
            allItems[i].classList.add('inner-right');
        }
    }
}

let translateImageByThisAmount = 0;
let currentId = '';

function moveImage(event, direction) {
    const activeImages = document.getElementById(currentId + "-images");
    const singleImageWidth = activeImages.firstElementChild.offsetWidth;
    const translateAmount = singleImageWidth + 8;
    if (direction === "forward") {
        translateImageByThisAmount -= translateAmount;
        replaceAllOccurancesOfThisClass("previous", "next");
        event.target.classList.replace("next", "previous");
    } else if (direction === "back") {
        translateImageByThisAmount += translateAmount;
        replaceAllOccurancesOfThisClass("next", "previous");
        event.target.classList.replace("previous", "next");
    }
    activeImages.style.transform = "translateX(" + translateImageByThisAmount + "px)";
}

function moveToZero(event) {
    if (currentId) {
        const activeImages = document.getElementById(currentId + "-images");

        translateImageByThisAmount = 0;
        activeImages.style.transform = "translateX(0px)";
        replaceAllOccurancesOfThisClass("previous", "next");
    }
}

function replaceAllOccurancesOfThisClass(classOne, classTwo) {
    const allClassOneItems = document.getElementsByClassName(classOne);

    while (allClassOneItems.length > 0) {
        allClassOneItems[0].classList.replace(classOne, classTwo);
    }
}

function openExpanded(id) {
    let buttonThatExpanded = document.getElementsByClassName(id)[0];
    let expandableDiv = document.getElementsByClassName(id)[1];
    currentId = id;
    cleanUnnecessaryItems();

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
    cleanUnnecessaryItems();
    
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
    
    translateImageByThisAmount = 0;
    somethingIsOpen = false;
}
