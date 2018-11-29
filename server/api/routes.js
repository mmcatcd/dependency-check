const express = require('express');
const router = express.Router();
const npmCrawler = require('../npmCrawler');

router.get('/crawl/:name', (req, res, next) => {
  const name = req.params.name;
  npmCrawler.crawl(name)
  .then((json) => {
    res.status(200).json({
      message: "Success for package: " + json.accepts
    });
  });
});

router.get('/get/:name', (req, res, next) => {
  npmCrawler.getPackage(req.params.name)
  .then((result) => {
    res.status(200).json({ package: result.package});
  });
});

module.exports = router;