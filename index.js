const express = require('express');
  morgan = require('morgan'),
  fs = require('fs'), //import built in node modules fs and path
  path = require('path');
  
const app = express();
  
//create a write stream (in append mode)
 //a 'log.txt' file is created in root directory 
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.text'), {flags: 'a'})

//setup the logger
app.use(morgan('common', {stream: accessLogStream}));

//connects the static public folder
app.use(express.static('public'));

let myFlix = [
  {
    title: '2001: A Space Odyssey',
    year: '1968'
  },
  {
    title: 'The Terminator',
    year: '1984'
  },  
  {
    title: 'Planet of the Apes',
    year: '1968'
  },  
  {
    title: 'Alien',
    year: '1979'
  },  
  {
    title: 'Blade Runner',
    year: '1982'
  },  
  {
    title: 'Terminator 2: Judgement Day',
    year: '1991'
  },  
  {
    title: 'The Matrix',
    year: '1999'
  },  
  {
    title: 'Back to the Future',
    year: '1985'
  },  
  {
    title: 'Aliens',
    year: '1986'
  },  
  {
    title: 'Interstellar',
    year: '2014'
  }

];

app.get('/', (req, res) => {
  res.send('Welcome to MyFlix Movie App!');
});

app.get('/movies', (req, res) => {
  res.json(myFlix);
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

//error handling in express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});