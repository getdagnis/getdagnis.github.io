// JS code by Dagnis Skurbe, December 2019-January 2020
window.onload = letsBegin;

function letsBegin() {
    setTimeout(function() {
        hideTheCurtain();
        walkTheInnerBlue();
    }, 1100);
    document.addEventListener("mouseleave", function(event) {
        showTheCurtain();
    });
    document.addEventListener("mouseover", function(event) {
        hideTheCurtain();
    });
}

// Paslēpj zilo priekškaru, kad nepieciešams
function hideTheCurtain() {
    const curtain = document.getElementById('curtain');
    curtain.style.top = "-99.8%";
}

// Parāda zilo priekškaru, kad nepieciešams
function showTheCurtain() {
    const curtain = document.getElementById('curtain');
    curtain.style.transitionDelay = ".2s";
    curtain.style.transitionDuration = "2s";
    curtain.style.top = "0%";
}
// Galvenais dokumenta "event listeners"
var somethingIsOpenGlobal = false;

document.addEventListener("click", function(event) {
    // Navigācija starp bildēm turp -- uz next / no pēdējās uz sākumu -- uz last / atpakaļ -- uz previous
    if (event.target.classList.contains("next")) {
        moveImage(event, "forward");
    } else if (event.target.classList.contains("previous")) {
        moveImage(event, "back");
    } else if (event.target.classList.contains("last")) {
        moveViewerToFirstImage(event);
    }

    // Thumbnailu funkciju mainīšana, atkarībā no tā, kā uz tiem tiek klikšķināts
    if (event.target.classList.contains("item-inner") &&
        event.target.classList.contains("item-inner-active") === false) {
        let id = event.target.classList[1];
        let row = event.target.classList[2];
        moveViewerToFirstImage(event);
        closeExpandedImageViewer();
        openExpandedImageViewer(id, row);
        // moveScreenUp(event, wasOnParent);
    }
    if (event.target.parentElement.classList.contains("item-inner") &&
        event.target.parentElement.classList.contains("item-inner-active") === false) {
        let id = event.target.parentElement.classList[1];
        let row = event.target.parentElement.classList[2];
        moveViewerToFirstImage(event);
        closeExpandedImageViewer();
        openExpandedImageViewer(id, row);
        // moveScreenUp(event, wasOnParent);
    }
    if (event.target.classList.contains("item-inner-active")) {
        somethingIsOpenGlobal = true;
        moveViewerToFirstImage(event);
        closeExpandedImageViewer();
    }
    if (event.target.parentElement.classList.contains("item-inner-active")) {
        somethingIsOpenGlobal = true;
        moveViewerToFirstImage(event);
        closeExpandedImageViewer();
    }
    if (event.target.classList.contains('button')) {
        contents();
    }
});

// Vada zilā laukuma staigāšanu pa gridu (sekošanu pelei)
function walkTheInnerBlue() {
    const items = document.getElementsByClassName('grid-item-inner');
    const contents = document.querySelector('#contents');
    const viewers = document.getElementsByClassName('viewer');
    let previousItemClass = '';
    let thisItemRow = 0;
    let thisItemCol = 0;
    let thisInnerItemClass = ''; 
    let thisInnerItem = {}; 
    let itemsAround = [];
    const previousItem = document.getElementsByClassName(previousItemClass)[0];

    for (item of items) {
        item.addEventListener('mouseenter', function() {
            thisItemRow = event.target.classList[1].slice(4);
            thisItemCol = event.target.classList[2].slice(4);
            thisInnerItemClass = 'row-' + thisItemRow + '-col-' + thisItemCol;
            thisInnerItem = document.getElementsByClassName(thisInnerItemClass)[0];
            thisInnerItem.classList.add('inner-current');

            infectItemsAround(thisItemRow, thisItemCol, previousItemClass);
            previousItemClass = 'row-' + thisItemRow + '-col-' + thisItemCol;
        });
    }
    for (viewer of viewers) {
        viewer.addEventListener('mouseenter', function() {
            cleanUnnecessaryBlues(thisItemCol);
        });
    }
    contents.addEventListener('mouseleave', function() {
        cleanUnnecessaryBlues(thisItemCol);
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
        thisItem.classList.remove('inner-top', 'inner-bottom', 'inner-left', 'inner-right', 'transition-6', 'inner-previous', 'inner-current');
        thisItem.classList.add(newClass);
    }
}

// Attīra visus nevajadzīgi iekrāsotos zilos lauciņus
function cleanUnnecessaryBlues(thisItemCol) {
    const items = document.getElementsByClassName('item-inner');
    const innerCurrent = document.querySelector('.inner-current');
    let direction = '';

    switch(thisItemCol) {
        case '4': direction = 'inner-left'; break;
        case '3': direction = 'inner-right'; break;
        case '2': direction = 'inner-right'; break;
        case '1': direction = 'inner-left'; break;
        default: direction = 'inner-left';
    }

    if (innerCurrent) {
        innerCurrent.classList.add('transition-6', direction);
    }

    for (item of items) {
        item.classList.remove('inner-previous');
        item.classList.remove('inner-current');
    }
}

// TODO pārnest šos no globāla scope atsevišķās funkcijās
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

function moveViewerToFirstImage(event) {
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

function openExpandedImageViewer(id) {
    const buttonThatExpanded = document.getElementsByClassName(id)[0];
    const expandableDiv = document.getElementsByClassName(id)[1];
    const imageViewerClass = id + '-images';
    const thisImageViewer = document.getElementById(imageViewerClass);
    const numberOfImages = Number(thisImageViewer.classList[1]) + 1;
    const viewerWidth = 908 * numberOfImages;

    thisImageViewer.style.width = viewerWidth + 'px';
    currentId = id;
    expandableDiv.classList.replace('hidden', 'is-expanded');
    cleanUnnecessaryBlues();

    setTimeout(function(){ 
        expandableDiv.classList.replace('scale-0', 'scale-100');
        buttonThatExpanded.classList.add('item-inner-active');
    }, 10);
};

function closeExpandedImageViewer() {
    let allExpanded = document.getElementsByClassName('is-expanded');
    let allYellowButtons = document.getElementsByClassName('item-inner-active');
    let allScale100 = document.getElementsByClassName('scale-100');
    cleanUnnecessaryBlues();
    
    while (allScale100.length > 0) {
        allScale100[0].classList.replace('scale-100', 'scale-0');
    }
    while (allYellowButtons.length > 0) {
        allYellowButtons[0].classList.remove('item-inner-active');
    }
    if (somethingIsOpenGlobal === true) {
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
    somethingIsOpenGlobal = false;
}
