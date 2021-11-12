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
  {
    "id": "1",
    "item": "Walkman",
    "description": "vintage, still works fine",
    "price": "700",
    "location": "Stockholm",
    "contact": "0722899332",
    "category": "gaming",
    "imageUrl": "https://res.cloudinary.com/dz2vr4bag/image/upload/v1636706161/Items/chejnkcaoh5ijmzvc462.png"
},
{
    "id": "2",
    "item": "Rims",
    "description": "20\" in great shape",
    "price": "3000",
    "location": "Stockholm",
    "contact": "0723423233",
    "imageUrl": "https://res.cloudinary.com/dz2vr4bag/image/upload/v1636704982/Items/gkqomwxhsuo1rcr2pzco.jpg",
    "category": "parts"
},
{
    "id": "3",
    "item": "wirless Headphones",
    "description": "Samsung e20, good as new",
    "price": "1000",
    "location": "Uppsala",
    "contact": "072342332",
    "imageUrl": "https://res.cloudinary.com/dz2vr4bag/image/upload/v1636705240/Items/un5vztmziw98awanew3n.jpg",
    "category": "electronics"
},
{
  "id": "4",
  "item": "mini fridge",
  "description": "phillips, call me for more info",
  "price": "400",
  "location": "Eskilstuna",
  "contact": "0722322",
  "imageUrl": "https://res.cloudinary.com/dz2vr4bag/image/upload/v1636705512/Items/pjbfwf5wrwtavty86uvb.jpg",
  "category": "electronics"
},
{
  "id": "5",
  "item": "Marshall Speaker",
  "description": "in good condition",
  "price": "700",
  "location": "Nykoping",
  "contact": "07342322",
  "imageUrl": "https://res.cloudinary.com/dz2vr4bag/image/upload/v1636706345/Items/gnwzazqwjralc8st5jd1.jpg",
  "category": "electronics"
},
{
  "id": "6",
  "item": "Mechanical Keyboard",
  "description": "Keychron k6, used like new",
  "price": "900",
  "location": "Eskilstuna",
  "contact": "073243322",
  "imageUrl": "https://res.cloudinary.com/dz2vr4bag/image/upload/v1636705860/Items/joyfs5nyicpijhefaznm.jpg",
  "category": "electronics"
},
{
  "id": "7",
  "item": "ps4 controller",
  "description": "in great condition",
  "price": "300",
  "location": "Stockholm",
  "contact": "072334322",
  "imageUrl": "https://res.cloudinary.com/dz2vr4bag/image/upload/v1636705974/Items/gkdiemwuixt8rmwnjnbe.jpg",
  "category": "gaming"
},
{
  "id": "8",
  "item": "GTA 5",
  "description": "works...",
  "price": "400",
  "location": "Umeo",
  "contact": "07323332",
  "imageUrl": "https://res.cloudinary.com/dz2vr4bag/image/upload/v1636706062/Items/cgz9smhohqlphdzaekdt.jpg",
  "category": "gaming"
}
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