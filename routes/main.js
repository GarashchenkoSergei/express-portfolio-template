const express = require('express')
const router = express.Router()
const { products, skills } = require('../data.json')
const { sendMail } = require('../service/send-mail')

router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills, msgemail: req.flash('mail')[0] })
})

router.post('/', (req, res, next) => {
  try {
    sendMail(req.body)
    req.flash('mail', 'Email has been sent')
  } catch (error) {
    req.flash('mail', error.message)
  }

  res.redirect('/#mail');
})

module.exports = router
