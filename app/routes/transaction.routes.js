module.exports = app => {
  const transactionController = require("../controllers/transaction.controller.js");
  var router = require("express").Router();

  router.post("/api/buy", transactionController.buy);
  router.post("/api/sell", transactionController.sell);

  app.use('/', router);
};