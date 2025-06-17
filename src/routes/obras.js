var express = require("express");
var router = express.Router();

var obraController = require("../controllers/obraController");

router.get("/:galeriaId", function (req, res) {
  obraController.buscarObrasPorGaleria(req, res);
});

router.post("/cadastrar", function (req, res) {
  obraController.cadastrar(req, res);
})

module.exports = router;