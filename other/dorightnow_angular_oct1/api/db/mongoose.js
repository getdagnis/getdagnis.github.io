// šis fails uzturēs koncekcijas loģiku ar MongoDB datubāzi

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
  console.log(" Pieslēgums MongoDB bija veiksmīgs :)");
}).catch((e) => {
  console.log("Kļūda pieslēdzoties MongoDB! :( ");
  console.log(e);
})

module.exports = {
  mongoose
};
