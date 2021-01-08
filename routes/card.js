const express = require('express');

const router = express.Router();
const Entry = require('../models/entry.js');
const Comment = require('../models/comment.js');

router.get('/:id', async (req, res) => {
  // console.log('---------------------->>>>>>>', req.params.id);
  const entry = await Entry.findById(req.params.id);
  const comments = await Comment.find({ entry: entry._id });
  return res.render('card_tea', { entry, comments });
});

// router.get('/:id/edit', (req, res) => {
//   res.render('edit', { layout: false });
// });

// router.patch('/:id', async (req, res) => {
//   // console.log('---------------------->>>>>>>', req.params.id);
//   const { title, description, location } = req.body;
//   const entry = await Entry.findOneAndUpdate({ _id: req.params.id }, { title, description, location });
//   // res.render('edit', { layout: false });
//   res.end();
//   // const comments = await Comment.find({ entry: entry._id });
//   // return res.render('card_tea', { entry, comments });
// });

module.exports = router;
