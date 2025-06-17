var express = require("express");
var router = express.Router();

var galeriaController = require("../controllers/galeriaController");

router.get("/listar", function (req, res) {
  galeriaController.listar(req, res);
});

module.exports = router;