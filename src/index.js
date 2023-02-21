// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { startDatabase } = require('./database/mongo');
const { insertAd, getAds, deleteAd, updateAd, getAdById } = require('./database/ads');

// defining the Express app
const app = express();

// // defining an array to work as the database (temporary solution)
// const ads = [
//   {title: 'Hello, world (again)!'}
// ];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// defining an endpoint to return all ads
app.get('/', async (req, res) => {
  res.send(await getAds());
});

app.post('/', async (req, res) => {
  const { title } = req.body
  const add = await insertAd({ title })

  res.send({ message: "Ad has been succefully post", add })
})

app.get('/:id', async (req, res) => {
  const ad = await getAdById(req.params.id)
  res.send(ad)
})

app.put('/:id', async (req, res) => {
  const newAdProperties = req.body
  const updatedAd = await updateAd(req.params.id, newAdProperties)

  res.send({ message: `Ad ${req.params.id} has succesfully updated`, ad: updatedAd })
})

app.delete('/:id', async (req, res) => {
  await deleteAd(req.params.id)

  res.send(`Ad ${req.params.id} has been succesfully deleted`)
})



startDatabase().then(async () => {
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});