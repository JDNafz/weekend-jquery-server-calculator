const express = require('express');
// const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));



let allCalcs = [];
let calcCount = 0;


app.post('/calc', (req,res) => {
  req.body['result'] = calcToPerform(req.body);
  req.body['calcCount'] = calcCount;
  calcCount ++;
  allCalcs.push(req.body);
  res.sendStatus(201); // send back "Submitted"
});


function calcToPerform(info){
  if (info.calc == '+'){
    return Number(info.number1) + Number(info.number2)
  }
  if (info.calc == '-'){
    return info.number1 - info.number2
  }
  if (info.calc == '/'){
    return info.number1 / info.number2
  }
  if (info.calc == 'x'){
    return info.number1 * info.number2
  }
}; // end calc to perform

// GET  Routes go here
app.get('/calc', (req, res) => {
  res.send(allCalcs);
});



app.listen(PORT, () => {
  console.log ('Beep Boop I\'m on', PORT)
})
 