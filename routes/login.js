const express = require('express')
const router = express.Router()
const { authorization } = require('../service/auth')

router.get('/', (req, res, next) => {
  if (req.session.authorization) {
    return res.redirect('/admin');
  }

  res.render('pages/login', { title: 'SigIn page', msglogin: req.flash('login')[0] })
})

router.post('/', (req, res, next) => {
  try {
    authorization(req.body)
    req.session.authorization = true
  } catch (error) {
    req.flash('login', error.message)
  }

  res.redirect('/login')
})

module.exports = router
