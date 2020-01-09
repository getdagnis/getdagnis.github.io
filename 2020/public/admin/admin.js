// JS code by Dagnis Skurbe, December 2019-January 2020


let xhr = new XMLHttpRequest();
xhr.open("GET", "/api/works/full", true);
xhr.send();

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
            sendXhrPostRequest(thisKeyEvent);
            makeAllUneditable();
        };
    });
    // thisElement.parentElement.replaceChild(newElement, thisElement);
}


function sendXhrPostRequest(event) {
    let thisElement = event.target;        
    let thisObjKey = thisElement.classList[1];
    let thisPropertyName = thisElement.classList[2];
    let newValue = thisElement.innerHTML;
    let thisParent = thisElement.parentElement;
    let position = thisParent.classList[2];
    
    let postLink = `../api/works/${position}/${thisObjKey}/${thisPropertyName}/${newValue}`;
    xhr.open("POST", postLink, true);
    xhr.send();
    console.log(xhr.responseText);
}

function saveEditsToLocalStorage(event) {
    let thisElement = event.target;        
    let thisObjKey = thisElement.classList[1];
    let thisPropertyName = thisElement.classList[2];
    let newValue = thisElement.innerHTML;

    allObjects[thisObjKey][thisPropertyName] = newValue;
    localStorage.setItem("portfolio", JSON.stringify(allObjects));
}

function saveEditsToJson(event) {
    let thisElement = event.target;        
    let thisObjKey = thisElement.classList[1];
    let thisPropertyName = thisElement.classList[2];
    let newValue = thisElement.innerHTML;

    allObjects[thisObjKey][thisPropertyName] = newValue;

}

function changeThisImage(event) {
    makeAllUneditable();
    let thisImgName = event.target.classList[3];
    let thisImgInputName = thisImgName + '-input';
    let thisImgDiv = document.getElementsByClassName(thisImgName)[0];
    let thisImgInput = document.getElementById(thisImgInputName);
    let thisKey = thisImgDiv.classList[1];
    let thisImgPlaceInArray = thisImgDiv.classList[2];

    thisImgInput.click();
    thisImgInput.addEventListener('change', function(dialogEvent) {
        let newUrl = thisImgInput.files[0].name;
        thisImgDiv.style = `background: url('works/${thisKey}/${newUrl}') center center / cover no-repeat;`;
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