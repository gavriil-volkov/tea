const express = require('express')
const router = express.Router();
const User = require('../models/user.js')

router.get('/sign', (req, res, next) => {
  res.render('user/sign');
});
router.post('/sign', async (req, res) => {
  const { name, email, psw, } = req.body;
  try {
    const user = new User({ name, email, psw });
    await user.save();
  } catch (err) {
    return res.render('user/sign', { message1: 'Пользователь с таким именем или почтой уже зарегестрирован' });
  }
  res.render('user/login', {message: 'Вы успешно зарегистрированы'});
});

router.get('/login', (req, res, next) => {
  res.render('user/login');
});

router.post('/login', async (req, res) => {
  const { psw, email } = req.body;
  let user;
  user = await User.findOne({ email });
  if (!user) {
    return res.render('user/login', {message1: 'Профиль не найден'})
  }
  if (user.psw !== psw) {
    return res.render('user/login', {message1: 'Неверный пароль'})
  }
  req.session.user = user.name;
  req.session.admin = user.admin;
  res.redirect('/');
})

router.get('/logout', (req,res)=> {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
