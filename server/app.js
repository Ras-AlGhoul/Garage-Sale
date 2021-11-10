import express from 'express';
const app = express();
const port = process.env.PORT || 4000;
import nodeFetch from 'node-fetch';

const fetchData = async (path) => {
  const response = await nodeFetch(path);
  const data = await response.json();
  console.log(data);
  return data;
};

app.get('/', (req, res) => {
  res.send('Hello world');
})
app.listen(port, () => {
  console.log(`app is running on ${port}`);
});