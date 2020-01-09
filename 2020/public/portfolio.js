// JS code by Dagnis Skurbe, December 2019-January 2020

let allObjects = {};

// if (localStorage.getItem("portfolio") != null) {
//     allObjects = JSON.parse(localStorage.getItem("portfolio"));
//     console.log('Reading from localStorage:');
//     console.log(allObjects);
// } else {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            allObjects = JSON.parse(xhttp.responseText);
            // localStorage.setItem("portfolio", xhttp.responseText);
            // console.log(JSON.parse(localStorage.getItem("portfolio")));  
        }
    };
    xhttp.open("GET", "/api/works/full", true);
    xhttp.send();
// }

function launchPortfolio() {
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


    let visibleObjects = allObjects.filter(object => {
        return object.show == "true";
    })
    let objectKeys = Object.keys(visibleObjects);
    let thisObj = {};
    let newContents = '';

    for (i = 0; i < objectKeys.length; i++) {
        let thisObjKey = objectKeys[i];
        thisObj = visibleObjects[thisObjKey];
        let thisCol = '';
        let thisRowFormula = 0;
        let thisRow = '';
        let rowAndCol = '';
        let whichInnerSide = '';
        let animationDelay = 0; 
        let animationDelayFormula = .2 + i / 100 * 1.5;
        let thisImageDiv = '';
        let allImageDivs = '';
        let expandRow = '';
        let expandRowExtension = '';
        
        // GENERATES THE GRID OF ALL THE THUMBNAILS
        if (i % 4 === 0) { 
            animationDelay = animationDelayFormula;
            thisCol = 'col-1';
            whichInnerSide = 'inner-right';
            expandRowExtension = 'a';
        } else if (i % 4 === 1) {
            animationDelay = animationDelayFormula + .15;
            thisCol = 'col-2';
            whichInnerSide = 'inner-left';
            expandRowExtension = 'a';
        } else if (i % 4 === 2) {
            animationDelay = animationDelayFormula + .3;
            thisCol = 'col-3';
            whichInnerSide = 'inner-right';
            expandRowExtension = 'b';
        } else if (i % 4 === 3) {
            animationDelay = animationDelayFormula + .45;
            thisCol = 'col-4';
            whichInnerSide = 'inner-left';
            expandRowExtension = 'b';
        };
        thisRowFormula = (i - (i % 4)) / 4 + 1;
        thisRow = 'row-' + thisRowFormula;
        rowAndCol = thisRow + '-' + thisCol;

        // GENERATES ALL THE IMAGES IN THE IMAGE VIEWER
        let j = 0;

        if (thisObj.images.length > 0) {
            while (j < thisObj.images.length) {
                let thisImgName = thisObj.key + '-' + j;
                let firstOrNext = 'first';
                (j > 0) ? firstOrNext = 'next' : 'first';

                thisImageDiv = `<div class="viewer-img ${thisObj.key} ${j} ${thisImgName} ${firstOrNext}"
                style="background: url('works/${thisObj.key}/${thisObj.images[j]}') center center / cover no-repeat;">
                <input id="${thisImgName}-input" type="file" class="img-upload">
                </div>`;
                allImageDivs = allImageDivs.concat(thisImageDiv);
                j++;
            }
        } 

        // WHICH ROW TO EXPAND (differs in 2 and 4 column versions)
        expandRow = 'row-' + thisRowFormula + expandRowExtension;

        // TEMPLATE FOR BOTH THE THUMBNAIL AND THE IMAGE VIEWER.
        // WARNING: ITEM-INNER (AND GRID-ITEM-INNER) FIRST FOUR (AND THREE) CLASSES ARE USED BY SCRIPTS.JS AND ADMIN.JS IN THIS ORDER!
        templateHTML = `
        <div class="grid-item" id="grid-item-${thisObj.key}">
            <div class="grid-item-inner ${thisRow} ${thisCol} itemBounce" style="animation-delay: ${animationDelay}s">
                <img class="thumb" src="img/thumbs/${thisObj.key}.svg" alt="${thisObj.name + ", " + thisObj.work}" />
                <div class="item-inner ${thisObj.key} ${thisRow} ${thisCol} ${rowAndCol} ${whichInnerSide}">
                        <img src="img/arr-bl-dwn.svg" height="50px" />
                        <h3>${thisObj.name}</h3>
                        <h4>${thisObj.title}</h4>
                        <h4>${thisObj.work}</h4>
                </div>
            </div>            
        </div>
        <div class="expanded ${thisObj.key} expand-${expandRow} scale-0 hidden">
            <div class="viewer" id="${thisObj.key}-viewer">
                <div class="images" id="${thisObj.key}-images">
                    ${allImageDivs}
                    <div class="viewer-img last"></div>
                </div>
            </div>
            <div class="expanded-bottom ${thisObj.key} ${thisObjKey} ">
                    <h2 class="${thisObj.key}-name ${thisObj.key} name edit-ready">${thisObj.name}</h2>
                    <span class="${thisObj.key}-title ${thisObj.key} title edit-ready">${thisObj.title}</span>
                    <img src="img/arrow.svg" height="12px" /><span class="${thisObj.key}-work ${thisObj.key} work edit-ready">${thisObj.work}</span> 
                    (<span class="${thisObj.key}-year ${thisObj.key} year edit-ready">${thisObj.year}</span>)
                    <p class="${thisObj.key}-description ${thisObj.key} description edit-ready">${thisObj.description}</p>
            </div>
        </div>         
        `;
        
        newContents = newContents + templateHTML;

    }

    const contentDiv = document.getElementById('contents');
    contentDiv.innerHTML = newContents;
}