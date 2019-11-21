function getContents() {

    let allObjects = [];
    let thisObj = {};
    let newContents = '';

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
            `
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
            `
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
            `
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
            `
        },
        {
            key: 'satori',
            name: "BK Liepāja",
            title: "Basketball Club",
            work: "Full Identity",
            year: "2018",
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie tellus dolor, et efficitur purus congue ac.
                Nulla congue orci et accumsan pellentesque. Pellentesque placerat pretium neque non ullamcorper.
                Sed a elit enim. Etiam tortor leo, vestibulum at metus vel, posuere placerat sapien.
            `
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
            `
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
            `
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
            `
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
            `
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
            `
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
            `
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
            `
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
            `
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
            `
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
            `
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
            `
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
            `
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
            `
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
            `
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
            `
        }
    ]

    for (i = 0; i < allObjects.length; i++) {
        thisObj = allObjects[i];
        templateHTML = `
        <div class="grid-item">
            <img class="thumb" src="img/thumbs/${thisObj.key}.svg" alt="${thisObj.name + ", " + thisObj.work}" />
            <div class="item-inner ${thisObj.key} row-1">
                    <img src="img/arr-bl-dwn.svg" height="50px" />
                    <h3>${thisObj.name}</h3>
                    <h4>${thisObj.title}</h4>
                    <h4>${thisObj.work}</h4>
            </div>
        </div>
        <div class="expanded ${thisObj.key} expand-row-1 scale-0 hidden">
            <div class="viewer" id="${thisObj.key}-viewer">
                <div class="images" id="${thisObj.key}-images">
                    <div class="viewer-img ${thisObj.key}-1"></div>
                    <div class="viewer-img next ${thisObj.key}-2"></div>
                    <div class="viewer-img next ${thisObj.key}-3"></div>
                    <div class="viewer-img next ${thisObj.key}-4"></div>
                    <div class="viewer-img next ${thisObj.key}-5"></div>
                    <div class="viewer-img next ${thisObj.key}-6"></div>
                    <div class="viewer-img next ${thisObj.key}-7"></div>
                    <div class="viewer-img last"></div>
                </div>
            </div>
            <div class="expanded-bottom">
                    <h2>${thisObj.name + ", " + thisObj.title}<span>${thisObj.work + ", " + thisObj.year}</span></h2>
                    <p>
                        ${thisObj.description}
                    </p>
            </div>
        </div>         
        `;
        
        newContents = newContents + templateHTML;
        
    }

    const contentDiv = document.getElementById('contents');
    contentDiv.innerHTML = newContents;
}