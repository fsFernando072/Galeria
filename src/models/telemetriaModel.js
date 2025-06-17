var database = require("../database/config");

function buscarUltimaTelemetria(idObra, limite_linhas) {

    var instrucaoSql = `SELECT 
        luminosidade, 
        lm35_temperatura temperatura,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    FROM telemetria
                    WHERE fk_obra = ${idObra}
                    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTelemetriaEmTempoReal(idObra) {

    var instrucaoSql = `SELECT 
        luminosidade, 
        lm35_temperatura temperatura,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_obra 
                        FROM telemetria WHERE fk_obra = ${idObra} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimaTelemetria,
    buscarTelemetriaEmTempoReal
}
