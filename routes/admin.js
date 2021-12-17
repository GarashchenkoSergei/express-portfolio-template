const express = require('express')
const router = express.Router()
const { skills } = require('../data.json')
const { updateSkills } = require('../service/skills')
const { updateProducts } = require('../service/products')

router.get('/', (req, res, next) => {
  if (!req.session.authorization) {
    return res.redirect('/login');
  }

  res.render('pages/admin', { 
    title: 'Admin page',
    skills,
    msgskill: req.flash('skills')[0],
    msgfile: req.flash('products')[0]
  })
})

router.post('/skills', (req, res, next) => {
  try {
    updateSkills(req.body)
  } catch (error) {
    req.flash('skills', error.message)
  } 

  res.redirect('/admin');
})

router.post('/upload', (req, res, next) => {
  try {
    updateProducts(req, res, next)
  } catch (error) {
    req.flash('products', error.message)
  }

  res.redirect('/admin');
})

module.exports = router
