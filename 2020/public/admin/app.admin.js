
const sendFetchRequest = async (method, url, data, head) => {
    const res = await fetch(url, {
        method: method,
        body: data,
        headers: head ? { 'Content-Type': 'application/json' } : { }
    });
    return res.json();
};

launchAdmin(orderPortfolioByPositions);

function launchAdmin(nextFunction) {
    sendFetchRequest('GET', '/api/works/full')
        .then(resData => nextFunction(resData, true))
        .catch(err => console.error('Error:', err));
};

function adminMain(orderedPortfolio) {
    const admin = document.querySelector('admin');

    for (let i = 0; i < orderedPortfolio.length; i++) {
        let thisKey = orderedPortfolio[i].key;
        let thisObj = orderedPortfolio[i];
        let newDiv = document.createElement('div');
        let isNotShown = (thisObj.show == 'false') ? 'is-not-shown' : '';

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
                        <img class="thumb-img" src="../img/thumbs/${thisObj.key}.svg" width="200px" />
                    </div>
                </div>
            </div>
        `;
        adminExtras(thisObj); // ADDS EXTRAS, SUCH AS IMAGES & WARNINGS
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
        fetchUpdateText(event.target);
    }
});

document.addEventListener("click", function(event) {
    if (event.target.classList.contains('client-top')) {
        let thisClient = event.target.classList[0];
        let elementToExpandClass = thisClient + '-client-expandable';
        let elementToExpand = document.getElementsByClassName(elementToExpandClass)[0];
        elementToExpand.classList.toggle('not-expanded');
        event.target.classList.toggle('client-top-expanded');
        imageDropListener();
    } else if (event.target.parentElement.classList.contains('client-top')) {
        let thisClient = event.target.parentElement.classList[0];
        let elementToExpandClass = thisClient + '-client-expandable';
        let elementToExpand = document.getElementsByClassName(elementToExpandClass)[0];

        imageDropListener();
        elementToExpand.classList.toggle('not-expanded');
    } 
});

// document.addEventListener('dragover', function(event) {
//     console.log('dragover noticed');
//     if (event.target.classList.contains('drop-image')) {
//         imageDropListener();
//     }
// })

function orderPortfolioByPositions(fetchData, launchAdmin) {
    fullPortfolio = fetchData;
    let orderedPortfolio = [];
    let orderedArray = [];
    let elementToAddToArray = '';
    let indexInArray = '';
    let desiredLength = fullPortfolio.length;

    for (let x = 0; x < fullPortfolio.length; x++) {
        indexInArray = fullPortfolio.findIndex(obj => {
            return obj.position == x;
        });
        if (indexInArray > -1) {
            elementToAddToArray = fullPortfolio[indexInArray];
            orderedArray.push(elementToAddToArray);
        }
    }

    orderedPortfolio = orderedArray;
    fullPortfolio = orderedPortfolio;

    if (orderedPortfolio.length !== desiredLength) {
        console.warn('Warning:', desiredLength - orderedPortfolio.length, 'projects missing after sorting');
    } else if (launchAdmin === true) {
        adminMain(orderedPortfolio);
    } else {
        return orderedPortfolio;
    }
}

function adminExtras(thisObj) {
    let thisClientExpandClass = thisObj.key + '-client-expandable';
    const clientExpand = document.getElementsByClassName(thisClientExpandClass)[0];
    const thisClientTop = document.getElementsByClassName(`${thisObj.key}-client-top`)[0];

    // ALL IMAGES TO CHOOSE FROM & IMAGE DROP
    if (thisObj.allimages.length < 1) {
        // console.log(thisObj.key, 'has no images');
        clientExpand.insertAdjacentHTML('beforeend', `
            <div id="${thisObj.key}-drop-image" class="${thisObj.key} drop-image"></div>
            <input id="${thisObj.key}-0-input" type="file" class="img-upload">
            `);
    } else {
        clientExpand.insertAdjacentHTML('beforeend', `
        <div id="${thisObj.key}-drop-image" class="${thisObj.key} drop-image drop-image-small"></div>
        <input id="${thisObj.key}-0-input" type="file" class="img-upload">
        `);
        for (let j = 0; j < thisObj.allimages.length; j++) {
            clientExpand.insertAdjacentHTML('beforeend', `
            <div class="${thisObj.key} img-${j} ${thisObj.key}-${j} allimages admin-image"
                style="background: url('../works/${thisObj.key}/${thisObj.allimages[j]}')
                center center / cover no-repeat;"  draggable="false">
                <input id="${thisObj.key}-${j}-input" type="file" class="img-upload">
            </div>
            `
            )
        };
    }


    // SMALL IMAGE THUMBNAILS IN ADMIN MAIN VIEW
    if (thisObj.allimages.length < 1) {
        thisClientTop.insertAdjacentHTML('beforeend', `<span class="${thisObj.key}-no-images no-images">No Images</span>`);
    } else {
        for (let k = 0; k < thisObj.allimages.length; k++) {
            thisClientTop.insertAdjacentHTML('beforeend', `
            <img class="${thisObj.key} img-${k} ${thisObj.key}-${k} small-round-image"
                src="../works/${thisObj.key}/${thisObj.allimages[k]}" draggable="false" />
            `);
        }
    }

    // TEXT & IMAGE WARNINGS
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
    document.execCommand('selectAll', false, null);
    thisElement.addEventListener('keydown', function(thisKeyEvent) {
        if (thisKeyEvent.keyCode === 13) {
            makeAllUneditable();
            thisElement.classList.add('edit-after');
            thisElement.classList.remove('edit-mode');
            if (event.target.classList.contains('position')) {
                moveProjectToNewPosition(event);
                updatePositions();
            } else {
                updateArrayValues(thisKeyEvent.target);
                fetchUpdateText(thisKeyEvent.target)
            }
        } else if (thisKeyEvent.keyCode === 27) {
            makeAllUneditable();
            thisElement.classList.add('edit-after');
            thisElement.classList.remove('edit-mode');  
            thisElement.innerHTML = originalContent;
        }
    });
}

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
    console.log('drag start!');
    dragAndDrop(event.target);
})

document.addEventListener("dragover", function(event) {
    if (event.target.classList.contains('drop-image')) {
        imageDropListener();
    }
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
    setTimeout(() => {
        (dragElement.classList.contains('thumb-img')) ? alert('Congratulations! Curiosity bonus unlocked') : updatePositions();
    }, 1000);
}

function moveProjectToNewPosition(event) {
    const allProjects = document.querySelectorAll('.project');
    let elementIndex = event.target.parentElement.classList[2];
    let element = document.getElementsByClassName(elementIndex)[0];
    let parent = element.parentElement;
    let targetIndex = Number(event.target.innerHTML) + 1;
    let target = document.getElementsByClassName(targetIndex)[0];

    parent.insertBefore(element, target);
    element.classList.add('drop-anim');
    setTimeout(() => {
        element.classList.remove('drop-anim');
    }, 1000);
}

function imageDropListener() {
    let allImageDropzones = document.getElementsByClassName('drop-image');
    for (dropImage of allImageDropzones) {
        dropImage.addEventListener('dragover', imageDragOver);
        dropImage.addEventListener('dragleave', imageDragLeave);
        dropImage.addEventListener('drop', imageDragDrop);
    }
}

function imageDragOver(event) {
    event.preventDefault();
    this.classList.add('dragover');
}

function imageDragLeave(event) {
    console.log('drag LEAVE!');
    this.classList.remove('dragover');
}

function imageDragDrop(event) {
    let key = event.target.classList[0];
    let files = event.dataTransfer.files;

    event.preventDefault();
    this.classList.remove('dragover');
    uploadImages(files, key);
}

function updatePositions() {
    const allProjects = document.querySelectorAll('.project');
    let newPortfolio = orderPortfolioByPositions(fullPortfolio);
    let projectKey = '';
    let oldPosition = 0;
    let newPosition = 0;

    for (project of allProjects) {
        projectKey = project.classList[0];
        oldPosition = project.classList[2];
        if (oldPosition != newPosition) {
            newPortfolio[oldPosition].position = newPosition;
        }
        newPosition++;
    }

    newPortfolio = orderPortfolioByPositions(newPortfolio);
    rewriteEverything(newPortfolio);
}

function updateArrayValues(eventTarget) {
    let element = eventTarget;        
    let key = element.classList[0];
    let parent = element.parentElement;
    let position = parent.classList[2];
    let property = element.classList[1];
    let value = element.innerHTML;
    
    fullPortfolio[position][property] = value;
}

function uploadImages(files, key) {
    const formData = new FormData();
    const url = '/api/works/images/' + key;
    console.log(files);

    for (const file of files) {
        formData.append("myImages", file);
    }

    for (const [key, value] of formData) {
        console.log('Key', key);
        console.log('Value', value);
    }
    
    const fetchUpload = async (method, url, data) => {
        const res = await fetch(url, {
            method: method,
            body: data,
            head: { 'Content-Type': 'multipart/form-data' }
        });
        return res.json();
    };

    fetchUpload('POST', url, formData );
}

function rewriteEverything(newPortfolio) {
    const admin = document.querySelector('admin');
    const head = true;

    admin.innerHTML = "";
    adminMain(newPortfolio);
    sendFetchRequest('POST', '/api/works/update', JSON.stringify(newPortfolio), head);
}

function fetchUpdateText(eventTarget) {
    let element = eventTarget;        
    let key = element.classList[0];
    let parent = element.parentElement;
    let position = parent.classList[2];
    let property = element.classList[1];
    let value = element.innerHTML;
    let post_url = `../api/works/${position}/${key}/${property}/${value}`;

    sendFetchRequest('POST', post_url);
}


// FAKE OFFLINE ADMIN
// function saveEditsToLocalStorage(event) {
//     let thisElement = event.target;        
//     let thisObjKey = thisElement.classList[0];
//     let thisPropertyName = thisElement.classList[1];
//     let newValue = thisElement.innerHTML;

//     fullPortfolio[thisObjKey][thisPropertyName] = newValue;
//     localStorage.setItem("portfolio", JSON.stringify(fullPortfolio));
// }
