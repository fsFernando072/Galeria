var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT id, nome, cnpj, codigo FROM galeria`;

  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
};
