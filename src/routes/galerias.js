var express = require("express");
var router = express.Router();

var GaleriaController = require("../controllers/GaleriaController");

router.get("/listar", function (req, res) {
  GaleriaController.listar(req, res);
});

module.exports = router;