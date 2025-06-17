var galeriaModel = require("../models/galeriaModel");

function listar(req, res) {
  galeriaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}


module.exports = {
  listar,
};
