let allObjects = [];

function launchPortfolio() {
    let thisObj = {};
    let newContents = '';

    getObjects();

    for (i = 0; i < allObjects.length; i++) {
        thisObj = allObjects[i];
        let thisIndex = 0; // let thisIndex = i / 100 * 8;
        let thisCol = '';
        let thisRowFormula = 0;
        let thisRow = '';
        let indexFormula = .2 + i / 100 * 1.5;
        let rowAndCol = '';
        let whichInnerSide = '';
        let thisImgNumb = 0;
        let j = 2;
        let firstImageDiv = `<div class="viewer-img ${thisObj.key}-1"></div>`;
        let otherImageDiv = '';
        let otherImageDivs = '';
        
        // GENERATES THE GRID OF ALL THE THUMBNAILS
        if (i % 4 === 0) { 
            thisIndex = indexFormula;
            thisCol = 'col-1';
            whichInnerSide = 'inner-right';
        } else if (i % 4 === 1) {
            thisIndex = indexFormula + .15;
            thisCol = 'col-2';
            whichInnerSide = 'inner-left';
        } else if (i % 4 === 2) {
            thisIndex = indexFormula + .3;
            thisCol = 'col-3';
            whichInnerSide = 'inner-right';
        } else if (i % 4 === 3) {
            thisIndex = indexFormula + .45;
            thisCol = 'col-4';
            whichInnerSide = 'inner-left';
        };
        thisRowFormula = (i - (i % 4)) / 4 + 1;
        thisRow = 'row-' + thisRowFormula;
        rowAndCol = thisRow + '-' + thisCol;

        // GENERATES ALL THE IMAGES IN THE IMAGE VIEWER (images themselves defined in portfolio.css)
        while (j <= thisObj.images) {
           otherImageDiv = '<div class="viewer-img next ' + thisObj.key + '-' + j + '"></div>';
           otherImageDivs = otherImageDivs.concat(otherImageDiv);
           j++;
        }
        
        // TEMPLATE FOR BOTH THE THUMBNAIL AND THE IMAGE VIEWER UNDERNEATH
        templateHTML = `
        <div class="grid-item" id="grid-item-${thisObj.key}">
            <div class="grid-item-inner ${thisRow} ${thisCol} itemBounce" style="animation-delay: ${thisIndex}s">
                <img class="thumb" src="img/thumbs/${thisObj.key}.svg" alt="${thisObj.name + ", " + thisObj.work}" />
                <div class="item-inner ${thisObj.key} ${thisRow} ${thisCol} ${rowAndCol} ${whichInnerSide}"> <!-- !!! IMPORTANT: 2nd CLASS MUST BE 'KEY' AND 3rd 'ROW-x' (used by openExpanded function) -->
                        <img src="img/arr-bl-dwn.svg" height="50px" />
                        <h3>${thisObj.name}</h3>
                        <h4>${thisObj.title}</h4>
                        <h4>${thisObj.work}</h4>
                </div>
            </div>            
        </div>
        <div class="expanded ${thisObj.key} expand-row-1 scale-0 hidden">
            <div class="viewer" id="${thisObj.key}-viewer">
                <div class="images" id="${thisObj.key}-images">
                    ${firstImageDiv}
                    ${otherImageDivs}
                    <div class="viewer-img last"></div>
                </div>
            </div>
            <div class="expanded-bottom">
                    <h2>${thisObj.name + ", " + thisObj.title}<span>${thisObj.work + ", " + thisObj.year}</span></h2>
                    <p>${thisObj.description}</p>
            </div>
        </div>         
        `;
        
        newContents = newContents + templateHTML;
        
    }

    const contentDiv = document.getElementById('contents');
    contentDiv.innerHTML = newContents;
}

function getObjects() {
    allObjects = [
        {
            key: 'mars',
            name: "Mission to Mars 2049",
            title: "Board Game",
            work: "Invented & Published",
            year: "2016",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'dinamo',
            name: "Dinamo Riga",
            title: "Ice Hockey Club",
            work: "Logo & Jerseys",
            year: "2008",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 3
        },
        {
            key: 'liepaja',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 1
        },
        {
            key: 'centrs',
            name: "Sporta Centrs",
            title: "Online Sports News",
            work: "Logo",
            year: "2009",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'zivtina',
            name: "Zelta Zivtiņa",
            title: "Mobile Pay-To-Go Card",
            work: "Logo Refresh",
            year: "2005",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'made',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'open',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'makslai',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'reformu',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'binders',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'sporta',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'basket',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'sponsor',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'positivus',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'summer',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'creative',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'haemo',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'api',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'lapas',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        },
        {
            key: 'maritec',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `,
            images: 8
        }
    ]
}