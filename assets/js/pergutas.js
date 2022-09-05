let idQuizz = 12157;
let alternativas = [];
let estruturaQuizz;
let perguntas;
let numeroAcertos = 0;
let numeroDePerguntas = 0;
let perguntaRespondida = 0;
// let textoPontuacaco = 0;

/**
 * Responsavel por trocar de tela entre todos os quizzes e o quiz em especifico
 */

function carregarQuiz(el) {
  let tela1 = document.querySelector(".container");
  let abriuQuizz = document.querySelector(".respostas-quizz");
  tela1.classList.add("escondido");
  abriuQuizz.classList.remove("escondido");
  abriuQuizz.scrollIntoView();
  //idQuizz = el.id;

  const promessa = axios.get(
    `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`
  );
  promessa.then(montarQuiz);
  promessa.catch((e) => console.log(e));
}

// Embaralhar alternativas
function comparador() {
  return Math.random() - 0.5;
}

function renderizarAlternativas() {
  let a = "";
  for (let i = 0; i < alternativas.length; i++) {
    a += `
              <div class="alternativa ${alternativas[i].isCorrectAnswer}" onclick="selecionarResposta(this)">
                  <div>
                      <img src="${alternativas[i].image}">
                  </div>
                  <div class="legenda">${alternativas[i].text}</div>
              </div>
         `;
  }

  return a;
}

//Monta o Quadro de Perguntas e respostas
function montarQuadro(ordemPergunta) {
  perguntas = estruturaQuizz.questoes;

  tituloPergunta = perguntas[ordemPergunta].title;
  alternativas = perguntas[ordemPergunta].answers;
  let corPergunta = perguntas[ordemPergunta].color;

  alternativas.sort(comparador); //embaralha as alternativas

  const quadrosRespostas = document.querySelector(".questoes");
  quadrosRespostas.innerHTML += `
        <div class="quadro-respostas">
            <div class="cabecalho-quadro-respostas" style="background-color: ${corPergunta}">
                ${tituloPergunta}
            </div>
            <div class="repostas">
                 ${renderizarAlternativas()}
             </div>
        </div>
        `;
}

function montarQuiz(quizzArray) {
  itensQuizz = quizzArray.data;
  estruturaQuizz = {
    imagemTitulo: itensQuizz.image,
    titulo: itensQuizz.title,
    level: itensQuizz.levels,
    questoes: itensQuizz.questions,
  };
  // console.log(itensQuizz);

  //Construção do cabeçalho com imagem e texto
  const textoCabecalho = document.querySelector(".cabecalho-quizz .texto-janela-quizz");
  textoCabecalho.innerHTML = estruturaQuizz.titulo;
  const imgCabecalho = document.querySelector(".cabecalho-quizz img");
  imgCabecalho.src = estruturaQuizz.imagemTitulo;

  //Construção do quadro de perguntas e respostas
  numeroDePerguntas = estruturaQuizz.questoes.length;
  for (let i = 0; i < numeroDePerguntas; i++) {
    montarQuadro(i);
  }
}

//Quando o usuário selecionar uma resposta está função será chamada
function selecionarResposta(resposta) {
  resposta.classList.add("item-selecionado"); //adiciona a classe no item selecionado como resposta

  perguntaRespondida++; // Controla quantas perguntas foram respondidas
  resposta.classList.add("item-selecionado"); //adiciona a classe no item selecionado como resposta

  if (resposta.classList.contains("true")) {
    resposta.classList.add("correto");
    numeroAcertos++;
  } else {
    resposta.classList.add("errado");
  }

  let testeResposta = "";
  const divRespostas = resposta.parentNode; //Seleciona toda a div que pertence a resposta

  // console.log('divRespostaNext')
  // console.log(divRespostas.parentNode.nextElementSibling)

  // Rolagem para proxima pergunta
  setTimeout(() => {
    if (divRespostas.parentNode.nextElementSibling) {
      divRespostas.parentNode.nextElementSibling.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, 2000);

  //percorrore por todos os filhos da divResposta
  for (let i = 0; i < alternativas.length; i++) {
    testeResposta = divRespostas.children[i]; //recebe o filho da iteração

    testeResposta.setAttribute("onclick", " ");
    //Se o filho não tiver a classe ele item-selecionado ele recebe a classe esbranquicado
    if (!testeResposta.classList.contains("item-selecionado")) {
      testeResposta.children[0].classList.add("esbranquicado");
    }
  }
  if (perguntaRespondida === numeroDePerguntas) {
    resultadoDoQuizz(numeroAcertos, numeroDePerguntas, estruturaQuizz.level);
  }
}

// Exibir Resultado do quiz
function resultadoDoQuizz(numeroAcertos, numeroDePerguntas, level) {
  let valorPontuacao = Math.round((numeroAcertos / numeroDePerguntas) * 100); //Calcula e aproxima o valor para número interiro
  let tituloPontuacaco; // Titulo associado a pontuação recebido da API
  let textoPontuacaco; // Texto associado a pontuação recebido da API

  level.sort(compare); // Organiza em ordem decrescente os nives de pontuação

  for (let i = 0; i < level.length; i++) {
    // Percorre o objeto da pountuação
    if (valorPontuacao >= level[i].minValue) {
      //Se o resultado for >= que o minimo desejado para o nivel
      tituloPontuacaco = level[i].title; // Recebe o titulo da pontuação
      imagemPountuacao = level[i].image; //Recebe o nivel da pontuação
      textoPontuacaco = level[i].text; // Recebe o texto da pontuação
      break; // Interrompe o for, pois não precisa mais percorrer os níveis inferiores
    }
  }

  // Chama a função que irá exibir a tela de resultado
  // precisa enviar o valorPontuacao, titulo, imagem e texto
  exibirResultado(
    valorPontuacao,
    tituloPontuacaco,
    imagemPountuacao,
    textoPontuacaco
  );
}

// Organiza o objeto level em ordem decrescente
function compare(a, b) {
  if (a.minValue > b.minValue) return -1;
  if (a.nome > b.nome) return 1;
  return 0;
}

//Função que exibe a tela de resultado do Quizz
//
function exibirResultado(
  valorPontuacao,
  tituloPontuacao,
  imagemPountuacao,
  textoPontuacaco
) {
  // Retira a classe escondido para exibir a tela de resultado
  const divResultado = document.querySelector(".quadro-geral-resultado");
  divResultado.classList.remove("escondido");

  // Exibe o titulo do resultado
  const divTituloResultado = document.querySelector(".titulo-resultado");
  divTituloResultado.innerHTML = `${valorPontuacao}%: ${tituloPontuacao}`;

  // Exibe a imagem do resultado
  const divCorpoResultadoImg = document.querySelector(".corpo-resultado img");
  divCorpoResultadoImg.src = imagemPountuacao;

  // Exibe o texto do resultado
  const divDrescicacoResposta = document.querySelector(".descricao-resposta");
  divDrescicacoResposta.innerHTML = textoPontuacaco;

  const botoes = document.querySelector(".fim-do-quizz");
  botoes.classList.remove("escondido");

  setTimeout(() => {botoes.scrollIntoView({ behavior: "smooth"})
    
  }, 2000);
  
}

//Função para recarregar o quizz

function recarregarQuizz() {
  let abriuQuizz = document.querySelector(".questoes");
  abriuQuizz.innerHTML = "";

  const promessa = axios.get(
    `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`
  );
  promessa.then(montarQuiz);
  promessa.catch((e) => console.log(e));

  const divResultado = document.querySelector(".quadro-geral-resultado");
  divResultado.classList.add("escondido");

  const botoes = document.querySelector(".fim-do-quizz");
  botoes.classList.add("escondido");

  //renderizarAlternativas();
  const topo = document.querySelector(".questoes");

  topo.scrollIntoView(false);
  perguntaRespondida = 0;
  numeroAcertos = 0;
}
