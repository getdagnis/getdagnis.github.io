const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

// mongoose modeļi no models direktorijas
const { List, Task } = require('./db/models');

// ielādējam middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// CORS on ExpressJS galviņa, lai nemestu Access Blocked erroru
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

  res.header(
      'Access-Control-Expose-Headers',
      'x-access-token, x-refresh-token'
  );

  next();
});

// route handlers
// list routes
app.get('/lists', (req, res) => {
  // dabūjam masīvu ar visām listēm
  List.find({}).then((lists) => {
    res.send(lists);
  }).catch((e) => {
    res.send(e);
  });
})

app.post('/lists', (req, res) => {
  // izveidojam jaunu listes ierakstu un atgriežam lietotājam atpakaļ sarakstu (ar id) caur JSON
  let title = req.body.title;

  let newList = new List({
    title
  });
  newList.save().then((listDoc) => {
    res.send(listDoc);
  });
})

app.patch('/lists/:id', (req, res) => {
  // updeitojam izvēlēto sarakstu ar atjaunoto JSON saturu
  List.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: req.body
  }).then(() => {
    res.send({ 'message': 'veiksmīgi izlabots'});
  })
})

app.delete('/lists/:id', (req, res) => {
  // izdzēšam izvēlēto
  List.findOneAndRemove({
    _id: req.params.id
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  })
})

// iegūstam visus uzdevumus no izvēlētā saraksta
app.get('/lists/:listId/tasks', (req, res) => {
  // visi taski no izvēlētās listes (pēc listId)
  Task.find({
      _listId: req.params.listId
  }).then((tasks) => {
      res.send(tasks);
  })
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOne({
    _id: req.params.taskId,
    _listId: req.params.listId
  }).then((task) => {
    res.send(task);
  })
});

// izveidojam uzdevumu izvēlētajā listē
app.post('/lists/:listId/tasks', (req, res) => {
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId
  });
  newTask.save().then((newTaskDoc) => {
    res.send(newTaskDoc);
  });
})

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOneAndUpdate({
    _id: req.params.taskId,
    _listId: req.params.listId
  }, {
    $set: req.body
  }).then(() => {
    res.send({ 'message': 'veiksmīgi izlabots'});
  })
});

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId
  }).then((removedTaskDoc) => {
    res.send(removedTaskDoc);
  })
});


app.listen(3333, () => {
  console.log("Listening to 3333");
})


// const express = require ('express');
// const app = express();

// // route handlers
// // list routes
// app.get('/lists', (req, res) => {
//   res.send("Sveika, pasaule!");
// })

// app.listen(3300, () => {
//   console.log("Listening to 3300");
// })
