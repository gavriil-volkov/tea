const express = require('express');

const router = express.Router();
const Entry = require('../models/entry.js');

router.get('/', async (req, res) => {
  const entrys = await Entry.find();
  // console.log(entrys);
  res.json(entrys);
});








router.get('/:id/edit', async (req, res, next) => {
  const entry = await Entry.findById(req.params.id);
  res.render('edit', { entry });
});




router.get('/:id', async (req, res, next) => {
  const entry = await Entry.findById(req.params.id);
  // let condition = true;
  // console.log(req.session.user, "!!!!!!!!>>>>>>>>>>>>>>>>>>>>>>", entry.user);
  // if(req.session.user === entry.user) {
  //   let condition = true;

  //   return res.render('entries/show', { entry, condition });
  // }
  // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  res.render('edit', { entry });
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.body;
  const entry = await Entry.findById(id);
  entry.title = req.body.title;
  entry.description = req.body.description;
  // entry.location = req.body.location;
  // entry.coordinates = req.body.coordinates;
  await entry.save();

  res.end();
});




module.exports = router;
