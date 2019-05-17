const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

/* GET home page. */
router.get('/', function(req, res, next) {
  fetch.default('https://api.mercadolibre.com/sites')
      .then(response => {
        return response.text();
      },null)

      .then(data =>  {
        let sites = JSON.parse(data);
        res.render('index', { title: 'Tendencias', sites: sites });
        res.end();
      }, null);

});




router.post('/', function(req, res, next) {
  let category_id = req.body.category_id;
  let columns = req.body.columns;
  let option = req.body.option;
  let rows = req.body.rows;
  let site = req.body.site_id;

  if (site == 'MPT'){
    res.render('error', {message:'No se pueden buscar trends en Portugal'})
  }
  let trendendurl = site;
  if(category_id != ""){
    trendendurl += '/' + category_id;
  }
  fetch.default('https://api.mercadolibre.com/trends/' + trendendurl)
      .then(response => {
        return response.text();
      },null)
      .then(data =>  {
        return JSON.parse(data);
      }, null)
      .then( trendds => {
        let trendnames = [];
        for (let i = 0; i < trendds.length; i++){
          trendnames[i] = trendds[i].keyword;
        }
        res.render('trends', { trendds: trendnames });
        res.end();
      });
});

module.exports = router;
