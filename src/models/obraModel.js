var database = require("../database/config");

function buscarObrasPorGaleria(GaleriaId) {

  var instrucaoSql = `SELECT * FROM obra WHERE fk_Galeria = ${GaleriaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(GaleriaId, descricao) {
  
  var instrucaoSql = `INSERT INTO (descricao, fk_Galeria) obra VALUES (${descricao}, ${GaleriaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarObrasPorGaleria,
  cadastrar
}
