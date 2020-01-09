
let allObjects = [];

let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200 && this.responseURL == 'http://localhost:8080/api/works/full') {
        allObjects = JSON.parse(xhr.responseText);
        adminMain(allObjects);
        // FAKE ADMIN SOURCE
        // localStorage.setItem("portfolio", xhr.responseText);
        // allObjects = JSON.parse(localStorage.getItem("portfolio"));
    }
};
xhr.onerror = function() {
    console.log('error');
}
xhr.open("GET", "/api/works/full", true);
xhr.send();

function adminMain(allObjects) {
    const admin = document.querySelector('admin');
    let orderedArray = [];
    let elementToAddToArray = '';
    let indexInArray = '';

    for (let x = 0; x < allObjects.length; x++) {
        indexInArray = allObjects.findIndex(obj => {
            return obj.position == x;
        });
        if (indexInArray > -1) {
            elementToAddToArray = allObjects[indexInArray];
            orderedArray.push(elementToAddToArray);
        }
    }

    allObjects = orderedArray;

    for (let i = 0; i < allObjects.length; i++) {
        let thisKey = allObjects[i].key;
        let thisObj = allObjects[i];
        let newDiv = document.createElement('div');
        let isNotShown = '';
        if (thisObj.show == "false") {
            isNotShown = 'is-not-shown';
        }

        admin.insertAdjacentElement('beforeend', newDiv);
        newDiv.classList.add(thisKey, 'project', i);
        newDiv.setAttribute('draggable', true);
        newDiv.innerHTML = `
            <div class="dropzone ${i}"></div>
            <div class="${thisObj.key} client-top ${thisObj.key}-client-top ${isNotShown}"><span class="h6">${thisObj.key}</span></div>
            <div class="${thisObj.key} client-expandable ${i} not-expanded ${thisObj.key}-client-expandable">
            <div class="${thisObj.key} expandable-left ${i}">
                <h2 class="${thisObj.key} name edit-ready edit-after">${thisObj.name}</h2>
                <h4 class="${thisObj.key} title edit-ready edit-after">${thisObj.title}</h4>
                <h4 class="${thisObj.key} work edit-ready edit-after">${thisObj.work}</h4>
                <h4 class="${thisObj.key} year edit-ready edit-after">${thisObj.year}</h4>
                <h5 class="${thisObj.key} description edit-ready edit-after">${thisObj.description}</h5>
                <h5 class="thisKey position ${i}">Position: <span class="${thisObj.key} position edit-ready edit-after">${thisObj.position}</span></h5>
                <h5 class="thisKey show ${i}">Show: <span class="${thisObj.key} show show-edit edit-after ${thisObj.show}">${thisObj.show}</span></h5>
            </div>
            <div class="expandable-right">
                <img src="../img/thumbs/${thisObj.key}.svg" width="200px"></img>
            </div>
            </div>
        `;
        minorTweeks(thisObj);
    }
}

document.addEventListener("dblclick", function(event) {
    if (event.altKey === false && event.target.classList.contains('edit-ready')) {
        makeTextEditable(event);
    }
    if (event.target.classList.contains('edit-img')) {
        changeThisImage(event);
    }
    if (event.target.classList.contains('show-edit')) {
        if (event.target.innerHTML === 'true') {
            event.target.innerHTML = 'false';
            event.target.classList.replace('true', 'false');
        } else {
            event.target.innerHTML = 'true';
            event.target.classList.replace('false', 'true');
        }
        sendXhrPostRequest(event);
    }
});


document.addEventListener("click", function(event) {
    if (event.target.classList.contains('client-top')) {
        let thisClient = event.target.classList[0];
        let elementToExpandClass = thisClient + '-client-expandable';
        let elementToExpand = document.getElementsByClassName(elementToExpandClass)[0];

        elementToExpand.classList.toggle('not-expanded');
    } else if (event.target.parentElement.classList.contains('client-top')) {
        let thisClient = event.target.parentElement.classList[0];
        let elementToExpandClass = thisClient + '-client-expandable';
        let elementToExpand = document.getElementsByClassName(elementToExpandClass)[0];

        elementToExpand.classList.toggle('not-expanded');
    } 
});

function minorTweeks(thisObj) {
    let thisClientExpandClass = thisObj.key + '-client-expandable';
    const clientExpand = document.getElementsByClassName(thisClientExpandClass)[0];
    const thisClientTop = document.getElementsByClassName(`${thisObj.key}-client-top`)[0];

    for (let j = 0; j < thisObj.allimages.length; j++) {
        clientExpand.insertAdjacentHTML('beforeend', `
        <img class="${thisObj.key} ${j} ${thisObj.key}-${j} allimages" src="../works/${thisObj.key}/${thisObj.allimages[j]}"></img>
        <input id="${thisObj.key}-${j}-input" type="file" class="img-upload">
        `);
    }
    if (thisObj.allimages.length < 1) {
        thisClientTop.insertAdjacentHTML('beforeend', `<span class="${thisObj.key}-no-images no-images">No Images</span>`);
    } else {
        for (let k = 0; k < thisObj.allimages.length; k++) {
            thisClientTop.insertAdjacentHTML('beforeend', `
            <img class="${thisObj.key} ${k} ${thisObj.key}-${k} small-round-image" src="../works/${thisObj.key}/${thisObj.allimages[k]}"></img>
            `);
        }
    }
    if (thisObj.name !== thisObj.key + ' name' &&
        thisObj.title !== thisObj.key + ' - what it is' &&
        thisObj.work !== thisObj.key + ' - what was done' &&
        thisObj.year !== thisObj.key + ' year' &&
        thisObj.description !== thisObj.key + ' description') {
        thisClientTop.insertAdjacentHTML('beforeend', `<span class="texts-ok">Texts Ok</span>`);
    }
}

function makeTextEditable(event) {
    const thisElement = event.target;
    const originalContent = thisElement.innerHTML;

    makeAllUneditable();
    thisElement.contentEditable = "true";
    thisElement.focus();
    thisElement.classList.remove('edit-after');
    thisElement.classList.add('edit-mode');
    document.execCommand('selectAll',false,null);
    document.addEventListener('keydown', function(thisKeyEvent) {
        if (thisKeyEvent.keyCode === 13) {
            makeAllUneditable();
            thisElement.classList.add('edit-after');
            thisElement.classList.remove('edit-mode');
            if (event.target.classList.contains('position')) {
                rewriteAllPositions(event.target);
            }
            sendXhrPostRequest(thisKeyEvent);
            // saveEditsToLocalStorage(thisKeyEvent);
        } else if (thisKeyEvent.keyCode === 27) {
            makeAllUneditable();
            thisElement.classList.add('edit-after');
            thisElement.classList.remove('edit-mode');  
            thisElement.innerHTML = originalContent;
        }
    });
}

function rewriteAllPositions(thisElement) {
    let allProjects = document.querySelectorAll('.project');
    let project = '';
    for (let i = 0; i < allProjects.length; i++) {
        project = allProjects[i];
        console.log(project);
        // console.log(project.classList[2]);
    }
}

function sendXhrPostRequest(event) {
    let thisElement = event.target;        
    let thisObjKey = thisElement.classList[0];
    let thisPropertyName = thisElement.classList[1];
    let newValue = thisElement.innerHTML;
    let thisParent = thisElement.parentElement;
    let position = thisParent.classList[2];
    
    let postLink = `../api/works/${position}/${thisObjKey}/${thisPropertyName}/${newValue}`;
    xhr.open("POST", postLink, true);
    xhr.send();
}

// FAKE ADMIN
// function saveEditsToLocalStorage(event) {
//     let thisElement = event.target;        
//     let thisObjKey = thisElement.classList[0];
//     let thisPropertyName = thisElement.classList[1];
//     let newValue = thisElement.innerHTML;

//     allObjects[thisObjKey][thisPropertyName] = newValue;
//     localStorage.setItem("portfolio", JSON.stringify(allObjects));
// }

function changeThisImage(event) {
    makeAllUneditable();
    let thisImgName = event.target.classList[2];
    let thisImgInputName = thisImgName + '-input';
    let thisImg = document.getElementsByClassName(thisImgName)[0];
    let thisImgInput = document.getElementById(thisImgInputName);
    let thisKey = thisImg.classList[0];
    let thisImgPlaceInArray = thisImg.classList[1];

    thisImgInput.click();
    thisImgInput.addEventListener('change', function(dialogEvent) {
        let newUrl = thisImgInput.files[0].name;
        thisImg.src = `../works/${thisObj.key}/${newUrl}`;
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
let element = '';
document.addEventListener("dragstart", function(event) {
    dragAndDrop(event.target);
})

function dragAndDrop(thisClient) {
    let allDropzones = document.getElementsByClassName('dropzone');
    element = thisClient;
    console.log('drag and drop started', element.classList[0]);
    for (dropzone of allDropzones) {
        dropzone.addEventListener('dragover', dragOver);
        dropzone.addEventListener('dragleave', dragLeave);
        dropzone.addEventListener('drop', dragDrop);
    }
}

function dragOver(event) {
    event.preventDefault();
    this.classList.add('dragover');
}

function dragLeave() {
    this.classList.remove('dragover');
}

function dragDrop(event) {
    let target = this;
    let parent = this.parentElement;
    let allProjects = document.querySelectorAll('.project');
    console.log('drop happened', element, 'and', target);
    parent.insertBefore(element, target);
    this.classList.remove('dragover');
    element.classList.add('drop-anim');
    setTimeout(() => {
        element.classList.remove('drop-anim');
    }, 1000);
}