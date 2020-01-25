
let allObjects = [];

let xhr = new XMLHttpRequest();

// const fetchResponse = fetch('http://localhost:8080/api/works/full')
//     .then(res => res.json())
//     .then(data => adminMain(data));

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200 && this.responseURL == 'http://localhost:8080/api/works/full') {
        allObjects = JSON.parse(xhr.responseText);
        adminMain(allObjects);
        // FAKE ADMIN SOURCE
        // localStorage.setItem("portfolio", xhr.responseText);
        // allObjects = JSON.parse(localStorage.getItem("portfolio"));
    } else if (this.readyState == 4 && this.status == 200) {
        setTimeout(() => {
            location.reload();
        }, 500);
    }
};
xhr.onerror = function() {
    console.error('XHR error happened');
}
xhr.open("GET", "/api/works/full", true);
xhr.send();

function adminMain(allObjects) {
    const admin = document.querySelector('admin');
    let orderedArray = [];
    let elementToAddToArray = '';
    let indexInArray = '';
    let desiredLength = allObjects.length;

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
    if (allObjects.length < desiredLength) {
        console.warn('Warning:', desiredLength - allObjects.length, 'projects missing after sorting');
    }

    for (let i = 0; i < allObjects.length; i++) {
        let thisKey = allObjects[i].key;
        let thisObj = allObjects[i];
        let newDiv = document.createElement('div');
        let isNotShown = '';
        if (thisObj.show == "false") {
            isNotShown = 'is-not-shown';
        }

        admin.insertAdjacentElement('beforeend', newDiv);
        newDiv.classList.add(thisKey, 'dropzone', i);
        newDiv.setAttribute('draggable', true);
        newDiv.innerHTML = `
            <div class="${thisObj.key} project ${i}">
                <div class="${thisObj.key} client-top ${thisObj.key}-client-top ${isNotShown}">
                    <span class="h6">${thisObj.key}</span>
                </div>
                <div class="${thisObj.key} client-expandable ${i} not-expanded ${thisObj.key}-client-expandable">
                    <div class="${thisObj.key} expandable-left ${i}">
                        <h2 class="${thisObj.key} name edit-ready edit-after">${thisObj.name}</h2>
                        <h4 class="${thisObj.key} title edit-ready edit-after">${thisObj.title}</h4>
                        <h4 class="${thisObj.key} work edit-ready edit-after">${thisObj.work}</h4>
                        <h4 class="${thisObj.key} year edit-ready edit-after">${thisObj.year}</h4>
                        <h5 class="${thisObj.key} description edit-ready edit-after">${thisObj.description}</h5>
                        <h5 class="thisKey position ${i}">Position: <span class="${thisObj.key} position ${i} ${thisObj.key}-edit-position
                        position-span edit-ready edit-after">${thisObj.position}</span>
                        </h5>
                        <h5 class="thisKey show ${i}">Show: 
                            <span class="${thisObj.key} show show-edit edit-after ${thisObj.show}">${thisObj.show}</span>
                        </h5>
                    </div>
                    <div class="expandable-right">
                        <img src="../img/thumbs/${thisObj.key}.svg" width="200px" />
                    </div>
                </div>
            </div>
        `;
        minorTweeks(thisObj);
    }
    admin.insertAdjacentHTML('afterbegin', '<div class="save-btn"></div>');
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
        sendXhrPostRequest(event.target);
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

    // ALL IMAGES TO CHOOSE FROM
    for (let j = 0; j < thisObj.allimages.length; j++) {
        clientExpand.insertAdjacentHTML('beforeend', `
        <img class="${thisObj.key} img-${j} ${thisObj.key}-${j} allimages" src="../works/${thisObj.key}/${thisObj.allimages[j]}" />
        <input id="${thisObj.key}-${j}-input" type="file" class="img-upload">
        `);
    }

    // SMALL IMAGE THUMBNAILS IN ADMIN MAIN VIEW
    if (thisObj.allimages.length < 1) {
        thisClientTop.insertAdjacentHTML('beforeend', `<span class="${thisObj.key}-no-images no-images">No Images</span>`);
    } else {
        for (let k = 0; k < thisObj.allimages.length; k++) {
            thisClientTop.insertAdjacentHTML('beforeend', `
            <img class="${thisObj.key} img-${k} ${thisObj.key}-${k} small-round-image" src="../works/${thisObj.key}/${thisObj.allimages[k]}" />
            `);
        }
    }

    // WARNINGS
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
                moveProjectToNewPosition(event);
                rewriteAllPositions(event);
            } else {
                sendXhrPostRequest(thisKeyEvent.target);
                // saveEditsToLocalStorage(thisKeyEvent);
            }
        } else if (thisKeyEvent.keyCode === 27) {
            makeAllUneditable();
            thisElement.classList.add('edit-after');
            thisElement.classList.remove('edit-mode');  
            thisElement.innerHTML = originalContent;
        }
    });
}

function moveProjectToNewPosition(event) {
    const allProjects = document.querySelectorAll('.project');
    let elementIndex = event.target.parentElement.classList[2];
    let element = document.getElementsByClassName(elementIndex)[0];
    let parent = element.parentElement;
    let targetIndex = Number(event.target.innerHTML);
    let target = document.getElementsByClassName(targetIndex)[0];

    parent.insertBefore(element, target);
    element.classList.add('drop-anim');
    setTimeout(() => {
        element.classList.remove('drop-anim');
    }, 1000);
}

function rewriteAllPositions(event) {
    const admin = document.querySelector('admin');
    admin.innerHTML = "";
    allObjects = allObjects.reverse();
    console.log('admin deleted');
    console.log(allObjects);
    adminMain(allObjects);
    'admin repoluted'
    // const allProjects = document.querySelectorAll('.project');
    // const jsonBtn = document.querySelector('.save-btn');
    // let positions = [];
    // let oldPosition = 0;
    // let newPosition = 0;

    // for (project of allProjects) {
    //     oldPosition = Number(project.classList[2]);
    //     positions.push({
    //         "old": oldPosition, // TODO Pārrakstīt uz PROJEkTA KEY !!!!!!
    //         "new": newPosition
    //     });
    //     newPosition++;
    // }
    // updateLocationClasses(positions);
    // jsonBtn.style.display = "block";
    // jsonBtn.addEventListener('click', function() {
    //     sendXhrPUTrequest(positions);
    // });
}

function updateLocationClasses(positions) {
    let oldClassName = '';
    let newClassName = '';
    let position = 0;
    let element = 0;
    let classElements = [];
    let reversedArray = [];
    let allChanged = [];
    let changed = '';

    for (let i = positions.length - 1; i > -1; i--) {
        position = positions[i];
        oldClassName = String(position.old);
        newClassName = String(position.new);

        if (oldClassName !== newClassName) {
            classElements = document.getElementsByClassName(oldClassName);
            for (let j = classElements.length - 1; j > -1; j--) {
                element = classElements[j];
                if (element.classList.contains('changed') == false) {
                    element.classList.remove(oldClassName);
                    element.classList.add(newClassName);
                    element.classList.add('changed');
                }
                classElements = document.getElementsByClassName(oldClassName);
            }
        }
    }
    setTimeout(() => {
        allChanged = document.getElementsByClassName('changed');
        for (k = 0; k < allChanged.length; k++) {
            changed = allChanged[k];
            changed.classList.remove('changed');
        }
    }, 1000);
}

function sendXhrPOSTrequest(eventTarget) {
    let thisElement = eventTarget;        
    let thisObjKey = thisElement.classList[0];
    let thisParent = thisElement.parentElement;
    let position = thisParent.classList[2];
    let thisPropertyName = thisElement.classList[1];
    let newValue = thisElement.innerHTML;
    let post_url = `../api/works/${position}/${thisObjKey}/${thisPropertyName}/${newValue}`;

    xhr.open("POST", post_url, true);
    xhr.send();
}

function sendXhrPUTrequest(positions) {
    let put_url = `../api/works/update/${JSON.stringify(positions)}`;
    xhr.open("PUT", put_url, true);
    xhr.send(positions);
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
let dragElement = '';
document.addEventListener("dragstart", function(event) {
    dragAndDrop(event.target);
})

function dragAndDrop(thisClient) {
    let allDropzones = document.getElementsByClassName('dropzone');
    dragElement = thisClient;
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
    parent.insertBefore(dragElement, target);
    this.classList.remove('dragover');
    dragElement.classList.add('drop-anim');
    setTimeout(() => {
        dragElement.classList.remove('drop-anim');
    }, 1000);
    rewriteAllPositions(event);
}