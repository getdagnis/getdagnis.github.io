const express = require('express');
const app = express();
const events = require('events');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        const incomingPath = req.path;
        let key = incomingPath.split('/')[4];
        let uploadPath = './public/uploads/' + key;
        console.log(file);
        console.log(uploadPath);
        callback(null, '.public/uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

let fullPortfolio = JSON.parse(fs.readFileSync('./public/portfolio_full.json'));
const uploadedImageKeys = fs.readdirSync('./public/works/');
uploadedImageKeys.shift();
let uploadedImages = {};

const allImagesObject = function() {
    let newDir = '';
    let thisIndex = 0;
    let extension = '.jpg';

    for (imageKey of uploadedImageKeys) {
        thisIndex = fullPortfolio.findIndex(obj => {
            return obj.key == imageKey;
        });
        if (thisIndex > -1) { 
            newDir = './public/works/' + imageKey;
            let fileList = fs.readdirSync(newDir);
            let thisKeyImages = fileList.filter(function(file){
                return file.indexOf(extension) !== -1;
            });
            fullPortfolio[thisIndex]["images"] = thisKeyImages;
        } else {
            console.warn('No such object key found while scanning for images!');
        }
    }
    
    fs.writeFileSync('./public/portfolio_full.json', JSON.stringify(fullPortfolio, null, 2));
}

allImagesObject();

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
    let month = (thisDate.getMonth() + 1);
    if (String(month).length < 2) {
        month = '0' + month;
    }
    let date = thisDate.getDate();
    if (String(date).length < 2) {
        date = '0' + date;
    }
    let dateToAdd = thisDate.getFullYear() + '-' + month + '-' + date;
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

app.get('/api/works/full', function(req, res){
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
        res.send("Such key not found");
    }
});

app.post('/api/works/images/:key/', upload.any('image'), function(req, res) {
    const key = req.params.key;

    console.log(req.params.key, 'images received', req.body);
    res.send(`${key} images received: ${JSON.stringify(req.file)}`);
})

app.get('/api/works/images/:key/', function(req, res) {
    const key = req.params.key;
    allImagesObject();

    res.send(allImages[key]);
})

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
    const keyName = req.params.key;
    const imageFolders = fs.readdirSync('./public/works/');
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
    fs.readFileSync('./public/portfolio_full.json', JSON.parse(fullPortfolio));
    // TODO JĀPĀRRAKSTA NO IEPRIEKŠĒJĀS FUNKCIJAS TIKAI ALLIMAGES DAĻA
    fs.writeFileSync('./public/portfolio_full.json', JSON.stringify(thumbsArray, null, 2));
}



