/* eslint-disable no-unused-vars */
const express = require('express');
const passport = require('passport');
const path = require('path');
const CandyService = require('../services/candies');
const receipt = '../assets/receipt.pdf';

const platziStore = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const candyService = new CandyService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get(
    '/candies', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const storeCandys = await candyService.getCandies()
    res.status(200).json(storeCandys);
  });

  router.get(
    '/candies/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const { id } = req.params
    const storeCandys = await candyService.getCandyById(id)
    res.status(200).json(storeCandys);
  });

  router.put(
    '/candies/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const { id } = req.params
    const { body: candy } = req
    const storeCandys = await candyService.updateCandyById({ id, ...candy })
    res.status(200).json(storeCandys);
  });

  router.delete('/candies/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const { id } = req.params
    const storeCandys = await candyService.deleteCandyById(id)
    res.status(200).json(storeCandys);
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;