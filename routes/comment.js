// const express = require('express');
// const router = express.Router();

// router.get('/:id', (req, res)=> {
//   res.render('comment');
// })
// module.exports = router;


const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Comment = require('../models/comment.js');

router.post('/', async (req, res)=> {
  const name = req.session.user
  const user = await User.findOne({name})
  res.send('ok');
  const comment = new Comment({author: user.name, body: req.body.comment, entry: req.body.entryId  })
  await comment.save();
  res.status(200).end()
})
module.exports = router;
