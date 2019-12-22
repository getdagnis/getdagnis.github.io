// JS code by Dagnis Skurbe, December 2019-January 2020

document.addEventListener("auxclick", function(event) {
    if (event.altKey === false && event.target.classList.contains('edit-ready')) {
        makeTextEditable(event);
    }
    if (event.target.classList.contains('viewer-img') && event.target.classList.contains('next') === false) {
        changeThisImage(event);
    }
});

function makeTextEditable(event) {
    const thisElement = event.target;
    const originalContent = thisElement.innerHTML;

    makeAllUneditable();
    thisElement.contentEditable = "true";
    thisElement.focus();
    thisElement.classList.add('edit-mode');
    document.execCommand('selectAll',false,null);
    document.addEventListener('keydown', function(thisKeyEvent) {
        if (thisKeyEvent.keyCode === 13) {
            saveEditsToLocalStorage(thisKeyEvent);
            makeAllUneditable();
        };
    });
    // thisElement.parentElement.replaceChild(newElement, thisElement);
}

function saveEditsToLocalStorage(event) {
    let thisElement = event.target;        
    let thisObjKey = thisElement.classList[1];
    let thisPropertyName = thisElement.classList[2];
    let newValue = thisElement.innerHTML;

    allObjects[thisObjKey][thisPropertyName] = newValue;
    localStorage.setItem("portfolio", JSON.stringify(allObjects));
}

function changeThisImage(event) {
    makeAllUneditable();
    const imgInput = document.querySelector('.img-upload');
    const thisImgDiv = event.target;
    let thisKey = thisImgDiv.classList[1];
    let thisImgPlaceInArray = thisImgDiv.classList[2];
    console.log(thisKey + '-' + thisImgPlaceInArray);

    imgInput.click();
    imgInput.addEventListener('change', function(dialogEvent) {
        let newUrl = imgInput.files[0].name;
        thisImgDiv.style.backgroundImage = `url("works/${thisKey}/${newUrl}")`;
    });
}

function makeAllUneditable() {
    const allEditables = document.getElementsByClassName('edit-ready');
    let otherEditables = document.getElementsByClassName('edit-mode');

    while (otherEditables.length > 0) {
        otherEditables[0].classList.remove('edit-mode');
    }
    for (let i = 0; i < allEditables.length; i++) {
        if (allEditables[i].isContentEditable == true) {
            allEditables[i].contentEditable = "false";
        }
    }
}