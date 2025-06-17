var alertas = [];

function obterdados(idObra) {
    fetch(`/telemetria/tempo-real/${idObra}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idObra);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idObra} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados da obra p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idObra) {
    var temp = resposta[0].temperatura;

    var grauDeAviso = '';

    var limites = {
        muito_quente: 23,
        quente: 22,
        ideal: 20,
        frio: 10,
        muito_frio: 5
    };

    var classe_temperatura = 'cor-alerta';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, idObra, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, idObra, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(idObra);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, idObra, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, idObra, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (document.getElementById(`temp_obra_${idObra}`) != null) {
        document.getElementById(`temp_obra_${idObra}`).innerHTML = temp + "°C";
    }

    if (document.getElementById(`card_${idObra}`)) {
        card = document.getElementById(`card_${idObra}`)
        card.className = classe_temperatura;
    }
}

function exibirAlerta(temp, idObra, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idObra == idObra);

    if (indice >= 0) {
        alertas[indice] = { idObra, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idObra, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
}

function removerAlerta(idObra) {
    alertas = alertas.filter(item => item.idObra != idObra);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idObra, temp, grauDeAviso, grauDeAvisoCor }) {

    var descricao = JSON.parse(sessionStorage.OBRAS).find(item => item.id == idObra).descricao;
    return `
    <div class="mensagem-alarme">
        <div class="informacao">
            <div class="${grauDeAvisoCor}">&#12644;</div> 
            <h3>${descricao} está em estado de ${grauDeAviso}!</h3>
            <small>Temperatura capturada: ${temp}°C.</small>   
        </div>
        <div class="alarme-sino"></div>
    </div>
    `;
}

function exibirObras() {
        setInterval(() => {
        cadastrar(idObra);
    }, 1000);
    JSON.parse(sessionStorage.OBRAS).forEach(item => {
        document.getElementById("cardObras").innerHTML += `
                <div class="card-obra">
                    <div class="title-obra">
                        <h1>${item.descricao}</h1>
                    </div>
                    <div class="desc-obra">
                    <div class="temperatura">
                        <p id="temp_obra_${item.id}">-°C</p>
                    </div>
                    <div class="cor-alerta" id="card_${item.id}"></div>
                </div>
                </div>
                `
    });
}

function atualizacaoPeriodica() {
    JSON.parse(sessionStorage.OBRAS).forEach(item => {
        obterdados(item.id)
    });
    setTimeout(atualizacaoPeriodica, 5000);
}
