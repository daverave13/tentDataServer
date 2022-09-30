const express = require('express');
const router = express.Router();
const fs = require('fs');



/* GET users listing. */
router.get('/', async function (req, res, next) {

  const today = new Date().toISOString().split('T')[0];
  let temp = new Date();
  const yesterday = new Date(temp.setDate(temp.getDate() - 1)).toISOString().split('T')[0];
  const todayData = await fs.readFileSync(`../tentDataLogger/loggedData/${today}`, 'utf8', (err, data) => {
    if (err) console.log(err);
  });
  const yesterdayData = await fs.readFileSync(`../tentDataLogger/loggedData/${yesterday}`, 'utf8', (err, data) => {
    if (err) console.log(err);
  });
  //console.log(JSON.parse('['+yesterdayData+']'))
  if (yesterdayData.length > 0) res.send(JSON.parse('['+yesterdayData+','+todayData+']'))
  else res.send(JSON.parse('['+todayData+']'))
});

module.exports = router;
