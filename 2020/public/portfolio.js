// Vanilla JS by Dagnis Skurbe, December 2019-January 2020

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
}

function portfolioMain(orderedPortfolio) {
    let visibleObjects = orderedPortfolio.filter(object => {
        return object.show == "true";
    });
    let objectKeys = Object.keys(visibleObjects);
    let thisObj = {};
    let newContents = '';
    console.log(visibleObjects);

    for (i = 0; i < objectKeys.length; i++) {
        let thisObjKey = objectKeys[i];
        thisObj = visibleObjects[thisObjKey];
        let thisCol = '';
        let thisRowFormula = null;
        let thisRow = '';
        let rowAndCol = '';
        let whichInnerSide = '';
        let animationDelay = null; 
        let animationDelayFormula = 0.2 + i / 100 * 1.5;
        let expandRow = '';
        let expandRowExtension = '';
        
        // GENERATES THE GRID OF ALL THE THUMBNAILS
        if (i % 4 === 0) { 
            animationDelay = animationDelayFormula;
            thisCol = 'col-1';
            whichInnerSide = 'inner-right';
            expandRowExtension = 'a';
        } else if (i % 4 === 1) {
            animationDelay = animationDelayFormula + 0.15;
            thisCol = 'col-2';
            whichInnerSide = 'inner-left';
            expandRowExtension = 'a';
        } else if (i % 4 === 2) {
            animationDelay = animationDelayFormula + 0.3;
            thisCol = 'col-3';
            whichInnerSide = 'inner-right';
            expandRowExtension = 'b';
        } else if (i % 4 === 3) {
            animationDelay = animationDelayFormula + 0.45;
            thisCol = 'col-4';
            whichInnerSide = 'inner-left';
            expandRowExtension = 'b';
        }
        thisRowFormula = (i - (i % 4)) / 4 + 1;
        thisRow = 'row-' + thisRowFormula;
        rowAndCol = thisRow + '-' + thisCol;

        // GENERATES ALL THE IMAGES IN THE IMAGE VIEWER
        let thisImageDiv = '';
        let allImageDivs = `
            <div class="viewer-img first" style="background: url('works/${thisObj.key}/${thisObj.images[0]}') no-repeat center;
            background-size: cover;">
                <div class="viewer-description">
                    <div class="description-left">
                        <div class="description-top">
                            <h2 class="${thisObj.key}-name ${thisObj.key} name edit-ready">${thisObj.name}</h2>
                            <h3 class="${thisObj.key}-title ${thisObj.key} title edit-ready">${thisObj.title}</h3>
                            <h3 class="${thisObj.key}-work ${thisObj.key} work edit-ready">${thisObj.work}</h3>
                            <h3 class="${thisObj.key}-year ${thisObj.key} year edit-ready">${thisObj.year}</h3>
                        </div>
                        <div class="description-bottom">
                            <p class="${thisObj.key}-description ${thisObj.key} description edit-ready">${thisObj.description}</p>
                        </div>
                    </div>
                    <div class="description-right">
                        <img class="thumb descr-thumb" src="img/thumbs/${thisObj.key}.svg" alt="${thisObj.name + ", " + thisObj.work}" />
                    </div>
                    <div class="arrow-to-right"></div>
                </div>
            </div>`;
        let j = 0;

        if (thisObj.images.length > 0) {
            while (j < thisObj.images.length) {
                let thisImgName = thisObj.key + '-' + j;

                thisImageDiv = `<div class="viewer-img ${thisObj.key} ${j} ${thisImgName} next"
                style="background: url('works/${thisObj.key}/${thisObj.images[j]}') center center / cover no-repeat;">
                <input id="${thisImgName}-input" type="file" class="img-upload">
                </div>`;
                allImageDivs = allImageDivs.concat(thisImageDiv);
                j++;
            }
        } 

        // WHICH ROW TO EXPAND (differs in 2 and 4 column versions)
        expandRow = 'row-' + thisRowFormula + expandRowExtension;

        // TEMPLATE FOR BOTH THE THUMBNAIL AND THE IMAGE VIEWER HOLDER.
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
                <div class="images ${thisObj.images.length}" id="${thisObj.key}-images">
                    ${allImageDivs}
                    <div class="viewer-img last"></div>
                </div>
            </div>
        </div>         
        `;
        
        newContents = newContents + templateHTML;

    }

    const contentDiv = document.getElementById('contents');
    contentDiv.innerHTML = newContents;
}

function orderPortfolioByPositions(fetchData, startPortfolio) {
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
    } else if (startPortfolio === true) {
        portfolioMain(orderedPortfolio);
    } else {
        return orderedPortfolio;
    }
}