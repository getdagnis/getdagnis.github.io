window.onload = init;

function init() {
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight;
}

function checkOverflown() {
    getDivs = document.getElementsByClassName("grid-item");
    console.log(getDivs);
    for (i=0;i<getDivs.length;i++) {
        if (isOverflown(getDivs[i]) == true) {
            getDivs[i].classList.add("double-item");
            getDivs[i].style.height = "978px";
            getDivs[i].removeAttribute("onclick");
            console.log("change made");
        }
    }
    getDoubleDivs = document.getElementsByClassName("double-item");
    for (i=0;i<getDoubleDivs.length;i++) {
        if (isOverflown(getDoubleDivs[i]) == true) {
            getDoubleDivs[i].style.height = "1495px";
            getDoubleDivs[i].classList.replace("double-item","triple-item");
            console.log("triple change made");
        }
    }
}

function showDiv(thisId) {
    document.getElementById(thisId).style.display = "block";
    let newHref = "javascript:closeTable('" + thisId + "');";
    document.getElementsByClassName(thisId)[0].setAttribute('href', newHref);
}

function closeTable() {
    document.getElementById('table').style.display = "none";
    let newHref = "javascript:showDiv('table');";
    document.getElementsByClassName('table')[0].setAttribute('href', newHref);
}

function makeDouble(myName) {
    otherItems = document.getElementsByClassName('double-item');
        for (i=0;i<otherItems.length;i++) {
            otherItems[i].classList.remove('double-item');
            thisId = otherItems[i].id;
            changeLink = "javascript:makeDouble('" + thisId + "');";
            thisItem.setAttribute('onclick', changeLink);
        }   
    thisItem = document.getElementById(myName);
    thisItem.classList.add('double-item');
    thisItem.style.height = "975px";
    changeLink = "javascript:makeSingle('" + myName + "');";
    thisItem.setAttribute('onclick', changeLink);
    expandImg = document.getElementsByClassName("expand-img")[0];
    expandImg.classList.replace("expand-img","reduce-img");
}

function makeSingle(myName) {
    thisItem = document.getElementById(myName);
    thisItem.classList.remove('double-item');
    thisItem.style.height = "460px";
    changeLink = "javascript:makeDouble('" + myName + "');";
    thisItem.setAttribute('onclick', changeLink);
    expandImg = document.getElementsByClassName("reduce-img")[0];
    expandImg.classList.replace("reduce-img","expand-img");
}