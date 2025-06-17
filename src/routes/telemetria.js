var express = require("express");
var router = express.Router();

var telemetriaController = require("../controllers/telemetriaController");

router.get("/ultimas/:idObra", function (req, res) {
    telemetriaController.buscarUltimaTelemetria(req, res);
});

router.get("/tempo-real/:idObra", function (req, res) {
    telemetriaController.buscarTelemetriaEmTempoReal(req, res);
})

router.post("/cadastrar", function (req, res) {
    telemetriaController.cadastrar(req, res);
})

module.exports = router;