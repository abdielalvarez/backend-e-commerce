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
    '/candies',
    async (req, res, next) => {
      const storeCandys = await candyService.getCandies()
      res.status(200).json({
        data: storeCandys,
        message: 'candies listed'
      });
    });

  router.get(
    '/candiesByFilter/:category/:filter',
    async (req, res, next) => {
      const { category, filter } = req.params;
      const storeCandys = await candyService.getCandiesByFilter(category, filter)
      res.status(200).json({
        data: storeCandys,
        message: 'candies filtered'
      });
    });

  router.get(
    '/candiesBySearch/:search?',
    async (req, res, next) => {
      const { search } = req.params;
      const storeCandys = await candyService.getCandiesBySearch(search)
      res.status(200).json({
        data: storeCandys,
        message: 'candies searched'
      });
    });
    
  router.get(
    '/candy/:id',
    async (req, res, next) => {
      const { id } = req.params
      const storeCandy = await candyService.getCandyDescription(id)
      res.status(200).json({
        data: storeCandy,
        message: 'candy description received'
      });
    });
      
  router.post(
    '/',
    async function (req, res, next) {
      const { body: piece } = req;
      const candy = await candyService.createCandy({ ...piece });
      res.status(201).json({
        data: candy,
        message: 'candy created'
      })
    });

  router.put(
    '/:candyId',
    async (req, res, next) => {
      const { candyId } = req.params
      const { body: candy } = req
      const storeCandies = await candyService.updateCandyById( candyId, { ...candy })
      res.status(200).json({
        data: storeCandies,
        message: 'candy updated'
      });
    });

  router.patch(
    '/:candyId',
    async (req, res, next) => {
      const { candyId } = req.params
      const { body: candy } = req
      const storeCandies = await candyService.patchCandyById( candyId, { ...candy })
      res.status(200).json({
        data: storeCandies,
        message: 'candy patched'
      });
    });

  router.delete(
    '/candies/:id',
    async (req, res, next) => {
      const { id } = req.params
      const storeCandy = await candyService.deleteCandyById(id)    
      res.status(200).json({
        data: storeCandy,
        message: 'candy deleted'
      });
    });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;