var telemetriaModel = require("../models/telemetriaModel");

function buscarUltimasTelemetria(req, res) {

    const limite_linhas = 7;

    var idObra = req.params.idObra;

    console.log(`Recuperando as ultimas ${limite_linhas} telemetria`);

    telemetriaModel.buscarUltimaTelemetria(idObra, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a ultima telemetria.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarTelemetriaEmTempoReal(req, res) {

    var idObra = req.params.idObra;

    console.log(`Recuperando telemetrias em tempo real`);

    telemetriaModel.buscarTelemetriaEmTempoReal(idObra).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a ultima telemetria.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
    var temperatura = req.body.temperatura;
    var luminosidade = req.body.luminosidade;
    var idObra = req.body.idObra;

    telemetriaModel.cadastrar(temperatura, luminosidade, idObra)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    buscarUltimasTelemetria,
    buscarTelemetriaEmTempoReal,
    cadastrar

}