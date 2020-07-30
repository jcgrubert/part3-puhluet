const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express()
app.use(bodyParser.json());
app.use(cors());
var date = new Date();
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
morgan.token('poststring', function(req, res) {
  logString = new Object();
  logString.name=req.body.name;
  logString.number=req.body.number;
  if(JSON.stringify(logString)==='{}'){
    return ' ';}
  else{
    return JSON.stringify(req.body);}
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :poststring'));

var notes= [{
  persons: [
    {
      "name": "243234trrs",
      "number": "afw3224",
      "id": 5
    },
    {
      "name": "lol",
      "number": "when",
      "id": 7
    },
    {
      "name": "ass",
      "number": "ww",
      "id": 8
    },
    {
      "name": "asss",
      "number": "ssss",
      "id": 9
    }, 
    {
      "name": "btt",
      "number": "ttt",
      "id": 10
    },
    {
      "name": "btttt",
      "number": "ttt",
      "id": 11
    },
    {
      "name": "sgsgs",
      "number": "sss",
      "id": 12
    },
    {
      "name": "sss",
      "number": "gg",
      "id": 13
    },
    {
      "name": "daadda",
      "number": "adsdsa",
      "id": 14
    }
  ] 
}]
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(notes[0].persons)
})

app.get('/info', (req, res) => {
  res.send('<div>Phonebook has info for' + Object.keys(notes[0].persons).length + 'and the time is'  + dateTime + ' now</div>')
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes[0].persons.find(note => note.id === id)
  //const note = notes[0].persons[0]
  console.log(note)
  if(note === undefined){response.send('<h1>THERE IS NO NOTE </h1>')}
  else{
  response.json(note)}
})

app.delete('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id)
  const note = notes[0].persons.find(note => note.id === id);


if(note === undefined){response.send('<h1>THERE IS NO NOTE WITH THAT ID </h1>')}
else{
  const newNotes=notes[0].persons.filter(function(item){
    return item.id !== id;
  });
  notes=newNotes;
  response.send('<h1>THAT NOTE GOT SQUASHED</h1>')}
}
)
app.put('/api/persons/:id', function (req, res) {
  const id = Number(req.params.id);
  const note = notes[0].persons.find(note => note.id === id);
  if(note === undefined){res.send('<h1>THERE IS NO NOTE WITH THAT ID </h1>')}
  else if(req.body.name===undefined){
    res.status(400);
    res.send('Error. no name')
  }
  else if(req.body.number===undefined){
    res.status(400);
    res.send('Error. no number')
  }
  else{
    var entry = new Object();
    entry.name = req.body.name;
    entry.number=req.body.number;
    entry.id=id;
  	//note.name=req.body.name;
  	//note.number=req.body.number;
  	const newNotes=notes[0].persons.filter(function(item){
    	return item.id !== id;});
  	newNotes.push(entry);
  	notes[0].persons=newNotes;
  	res.status(200);
  	res.send('Person updated.');
  }
})

app.post('/api/persons', (req, res) => {

  const nameDuplicate = notes[0].persons.find(note => note.name === req.body.name);
  if(req.body.name===undefined){
    res.status(400);
    res.send('Error. no name')
  }
  else if(req.body.number===undefined){
    res.status(400);
    res.send('Error. no number')
  }
  else if(nameDuplicate!==undefined){
    res.status(400);
    res.send('Error. Name is a duplicate')
  }
  else{
    const newID = Math.floor(Math.random() * Math.floor(10000));
    
    var entry = new Object();
    entry.name = req.body.name;
    entry.number=req.body.number;
    entry.id=newID;
    notes[0].persons.push(entry);
    res.send('Succéss' + entry.id)
  }


  
});
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
