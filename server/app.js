import express from 'express';
import bodyParser from 'body-parser';
import { reqBodyValidator, idValidator, nextId } from './errorHandling.js';
import cors from 'cors';
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

let items = [
  {id:'1', item:'Osaka knife', description:'high Quality Knife', price:'700', location:'Stockholm', contact:'0722899332', category:'kitchenware', imageUrl:'https://res-console.cloudinary.com/dz2vr4bag/thumbnails/v1/image/upload/v1636562116/SXRlbXMvbTBmeHBrcXppZXV6MW9sYThrdHI=/preview'},
  {id:'2', item:'Yamaha Engine', description:'two boat Yamah engines in a great shape', price:'3000', location:'Eskilstuna', contact:'073443323', category:'cars/parts', imageUrl:'https://res-console.cloudinary.com/dz2vr4bag/thumbnails/v1/image/upload/v1636562138/SXRlbXMvcjF5ZWs0eHRmdXJyY3NjYmxycWw=/preview'}
];

app.get('/api/items', (req, res) => {
  res.send(items);
});

app.get('/api/items/:category', (req, res) => {
  const { category } = req.params;
  const item = items.filter(item => item.category === category);
  res.send(item);
})

app.post('/api/items', (req,res) => {
  res.setHeader('content-type', 'application/json');
  reqBodyValidator(req);
  const newItem = {
    id: nextId(items).toString(),
    item: req.body.item,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    contact: req.body.contact,
    imageUrl: req.body.imageUrl,
    category: req.body.category
  };
  items = [...items, newItem];
  res.status(201);
  res.send(newItem);
});

app.put('/api/items/:id', (req, res) => {
  res.setHeader('content-type', 'application/json');
  const { id } = req.params;
  idValidator(id, items);
  const editedItem = {
      id: id,
      item: req.body.item,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      contact: req.body.contact,
      imageUrl: req.body.imageUrl,
      category: req.body.category
  }
  items = items.map(item => item.id === id? editedItem : item );
  res.status(204);
  res.end();
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  idValidator(id, items);
  items = items.filter(item => item.id !== id);
  res.status(204);
  res.end()
});


app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).send({ status: err.status, message: err.message });
  } else {
    next();
  }
});

export default app;