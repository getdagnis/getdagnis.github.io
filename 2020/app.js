const express = require('express');
const app = express();
const events = require('events');
const fs = require('fs');
const path = require('path');

// const imageFolders = fs.readdirSync('./public/works/');
let portfolio = JSON.parse(fs.readFileSync('./public/portfolio.json'));
let fullPortfolio = JSON.parse(fs.readFileSync('./public/portfolio_full.json'));

app.get('/', function(req,res){ 
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', function(req,res){ 
    res.sendFile(__dirname + '/public/admin.html');
    let readMyJson = fs.readFileSync('./public/portfolio_full.json', 'utf-8');
    console.log('---------------- ADMIN launched! -----------------');
    // ENABLE JSON BACKUPS ON ADMIN LAUNCH
    let thisDate = new Date;
    let dateToAdd = thisDate.getFullYear() + '-' + (thisDate.getMonth() + 1) + '-' + thisDate.getDate();
    let newJsonBackupName = 'portfolio-full-' + dateToAdd + '.json';
    let newJsonBackupFullPath = './backups/json-backups/' + newJsonBackupName;
    let jsonBackups = fs.readdirSync('./backups/json-backups/');
    if (jsonBackups.includes(newJsonBackupName) === false) {
        fs.writeFileSync(newJsonBackupFullPath, readMyJson);
        console.log('----------- new .json backup created -------------');
        jsonBackups = fs.readdirSync('./backups/json-backups/');
        console.log(jsonBackups);
    } else {
        console.log('---------- .json backup already exists -----------');
    }
});

app.get('/api/works/full', function(req,res){
    res.send(fullPortfolio);
});

app.post('/api/works/:pos/:key/:type/:body', function(req,res){ 
    let thisKey = [req.params.key];
    let thisIndex = fullPortfolio.findIndex(obj => {
        return obj.position == [req.params.pos];
    });
    if (thisIndex > -1) {
        fullPortfolio[thisIndex][req.params.type] = req.params.body;
        fs.writeFileSync('./public/portfolio_full.json', JSON.stringify(fullPortfolio, null, 2));
        res.send(fullPortfolio);
    } else {
        res.send("couldn't find this key");
    }
});

app.get('/api/allimages/:key', function(req,res){ 
    let keyName = req.params.key;
    let imageFolders = fs.readdirSync('./public/works/');
    let thisKeyImages = [];
    if (imageFolders.includes(keyName)) {
        thisKeyImages = fs.readdirSync('./public/works/' + keyName)
    }
    res.send(thisKeyImages);
});

app.get('/admin/new-json', function(req,res){ 
    let previousPortfolio = fullPortfolio;
    createNewFullJson();
    fullPortfolio = JSON.parse(fs.readFileSync('./public/portfolio_full.json'));
    res.send(`<h3>new json created:</h3> ${JSON.stringify(fullPortfolio)}
    <h3>previous json:</h3> ${JSON.stringify(previousPortfolio)}`);
    // res.send('temporarily disabled');
});

function createNewFullJson() {
    let thumbs = fs.readdirSync('./public/img/thumbs/');
    let thumbsObject = {};
    let thumbsArray = [];
    let newClientName = '';
    let imageFolders = fs.readdirSync('./public/works/');
    let thisKeyImages = [];
    thumbs.shift();
    for (i = 0; i < thumbs.length; i++) {
        let prefixNumber = [i] + '_';
        if (i < 10) {
            prefixNumber = '0' + prefixNumber;
        }
        thumbs[i] = thumbs[i].slice(0, -4);
        thisKey = thumbs[i];
        if (imageFolders.includes(thisKey)) {
            thisKeyImages = fs.readdirSync('./public/works/' + thisKey)
        }
        newClientName = prefixNumber + thisKey;
        thisObject = { 
            key: thisKey,
            name: thisKey + ' name',
            title: thisKey + ' - what it is',
            work: thisKey + ' - what was done',
            year: thisKey + ' year',
            description: thisKey + ' description',
            images: [],
            allimages: thisKeyImages,
            position: i,
            show: 'true'
        }
        thumbsArray.push(thisObject);
        thisKeyImages = [];
    }
    fs.writeFileSync('./public/portfolio_full.json', JSON.stringify(thumbsArray, null, 2));
}

function updateAllimagesToJson() {
    fs.readFileSync('./public/portfolio_full.json', JSON.parss(fullPortfolio));
    // TODO JĀPĀRRAKSTA NO IEPRIEKŠĒJĀS FUNKCIJAS TIKAI ALLIMAGES DAĻA
    fs.writeFileSync('./public/portfolio_full.json', JSON.stringify(thumbsArray, null, 2));
}






app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Server is alive & kicking on http://localhost:' + port);
});








// app.get('/api/works/keys/', function(req,res){ 
//     let keys = Object.keys(portfolio);
//     let keysHTML = '';
//     for (let i = 0; i < keys.length; i++) {
//         keysHTML = keysHTML + `<li><a href="/api/works/${keys[i]}">${keys[i]}</a></li>`
//     }
//     res.send(keysHTML);
// });

// app.get('/api/works/:key/', function(req,res){ 
//     res.send(portfolio[req.params.key]);
// });

// app.get('/api/works/:key/:type', function(req,res){ 
//     res.send(portfolio[req.params.key][req.params.type]);
// });

// app.get('/api/works/:key/images/:index', function(req,res){ 
//     res.send(portfolio[req.params.key]['images'][req.params.index]);
// });


// thumbsObject[newClientName] = { 
//     key: thisKey,
//     name: thisKey + ' name',
//     title: thisKey + ' - what it is',
//     work: thisKey + ' - what was done',
//     year: thisKey + ' year',
//     description: thisKey + ' description',
//     images: [],
//     allimages: thisKeyImages,
//     position: i,
//     show: 'true'
//  }



//     app.get('/api/works', function(req,res){ 
//     res.send(portfolio);
// });