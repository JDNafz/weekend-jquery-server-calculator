const express = require('express');
// const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
// app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: true }));
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));



let previousCalcs = [];

//POST Routes go here
app.post('/calc', (req,res) => {
  calculate(req.body)
  previousCalcs.push(req.body);

  res.sendStatus(201); // send back "Submitted"
});

function calculate(){
  
}


// GET  Routes go here
app.get('/guess', (req, res) => {
  res.send(previousCalcs);
});



app.listen(PORT, () => {
  console.log ('Beep Boop I\'m on', PORT)
})
 