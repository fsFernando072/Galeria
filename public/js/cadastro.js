
let listaGaleriasCadastradas = [];

function cadastrar() {
  // aguardar();

  var nomeVar = nome_input.value;
  var emailVar = email_input.value;
  var senhaVar = senha_input.value;
  var codigoVar = codigo_input.value;
  var idGaleriaVincular


  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    codigoVar == ""
  ) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "(Mensagem de erro para todos os campos em branco)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  for (let i = 0; i < listaGaleriasCadastradas.length; i++) {
    if (listaGaleriasCadastradas[i].codigo == codigoVar) {
      idGaleriaVincular = listaGaleriasCadastradas[i].id
      console.log("Código de ativação válido.");
      break;
    } else {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML = "(Mensagem de erro para código inválido)";
      finalizarAguardar();
    }
  }


  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({

      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      idGaleriaVincularServer: idGaleriaVincular
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        cardErro.style.display = "block";

        mensagem_erro.innerHTML =
          "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

        setTimeout(() => {
          window.location = "login.html";
        }, "2000");

        limparFormulario();
        finalizarAguardar();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar();
    });

  return false;
}

function listar() {
  fetch("/galerias/listar", {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((galerias) => {
        galerias.forEach((galeria) => {
          listaGaleriasCadastradas.push(galeria);

          console.log("listaGaleriasCadastradas")
          console.log(listaGaleriasCadastradas[0].codigo)
        });
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function sumirMensagem() {
  cardErro.style.display = "none";
}