const express = require('express');
const app = express();
const events = require('events');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

let fullPortfolio = JSON.parse(fs.readFileSync('./public/portfolio_full.json'));

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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
    fullPortfolio = JSON.parse(fs.readFileSync('./public/portfolio_full.json'));
    res.send(fullPortfolio);
});

app.post('/api/works/:pos/:key/:type/:body', function(req,res){ 
    let thisKey = req.params.key;
    let thisIndex = fullPortfolio.findIndex(obj => {
        return obj.key == thisKey;
    });
    if (thisIndex > -1) {
        fullPortfolio[thisIndex][req.params.type] = req.params.body;
        fs.writeFileSync('./public/portfolio_full.json', JSON.stringify(fullPortfolio, null, 2));
        res.send(fullPortfolio);
    } else {
        res.send("Couldn't find changed object key");
    }
});

app.post('/api/works/update/', function(req, res) {
    const newPortfolio = req.body;
    fullPortfolio = newPortfolio;
    if (newPortfolio.length === fullPortfolio.length) {
        fs.writeFile('./public/portfolio_full.json', JSON.stringify(newPortfolio, null, 2), (err) => {
            if (err) throw err; 
            console.log('new portfolio written ok |', 'length:', newPortfolio.length, '| required length:', fullPortfolio.length);
        });
        res.status(200).send(newPortfolio);
    }
    else if (newPortfolio.length !== fullPortfolio.length) {
        res.status(204).send('Positions array length error');
        console.error('new portfolio length error |', 'length:', newPortfolio.length, '| required length:', fullPortfolio.length);
    }
    else {
        res.status(400).send('Undefined error');
        console.error('undefined |', 'length:', newPortfolio.length, '| required length:', fullPortfolio.length);
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
    existingJson = JSON.parse(fs.readFileSync('./public/portfolio_full.json'));
    if (existingJson.length > 0) {
        res.send('<h2>New JSON creation impossible. Json already exists:</h2>' + JSON.stringify(existingJson));
        console.warn('New JSON creation impossible. Json already exists');
    } else {
        JSON.parse(fs.readFileSync('./public/portfolio_full.json'))
        createNewFullJson();
        res.send(`<h3>new json created:</h3> ${JSON.stringify(fullPortfolio)}
        <h3>previous json:</h3> ${JSON.stringify(previousPortfolio)}`);
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Server is alive & kicking on http://localhost:' + port);
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



