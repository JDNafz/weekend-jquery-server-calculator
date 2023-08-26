const express = require('express');
// const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
// app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: true }));
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));



let allCalcs = [];
let calcCount = 0;

//POST Routes go here Create Read Update Delete
//                                PUT   DELETE   
//                    POST   GET
app.post('/calc', (req,res) => {
  // console.log('calc recieved',req)
  req.body['result'] = calcToPerform(req.body);
  req.body['calcCount'] = calcCount;
  calcCount ++;
  allCalcs.push(req.body);
  res.sendStatus(201); // send back "Submitted"
});
// {
// number1: 1,
// number2: 1,
// calc: +,
// result: 2,
// calcCount: 0

// }



function calcToPerform(info){
  console.log(info);
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
  console.log('sending allCalcs')
  res.send(allCalcs);
});



app.listen(PORT, () => {
  console.log ('Beep Boop I\'m on', PORT)
})
 