// let idQuizz= 1;
// console.log(idQuizz);
let alternativas = [];
let estruturaQuizz;
let perguntas;
let numeroAcertos = 0;
let numeroDePerguntas = 0;
let perguntaRespondida = 0;
let pontuacao = 0;

/**
 * Responsavel por trocar de tela entre todos os quizzes e o quiz em especifico
 */

function carregarQuiz(el) {
  let tela1 = document.querySelector(".container");
  let abriuQuizz = document.querySelector(".respostas-quizz");
  tela1.classList.add("escondido");
  abriuQuizz.classList.remove("escondido");
  abriuQuizz.scrollIntoView();
  // idQuizz = el.id;

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

function montarQuadro(ordemPergunta) {
  perguntas = estruturaQuizz.questoes;

  tituloPergunta = perguntas[ordemPergunta].title;
  alternativas = perguntas[ordemPergunta].answers;
  let corPergunta = perguntas[ordemPergunta].color;

  alternativas.sort(comparador); //embaralha as alternativas

  const quadrosRespostas = document.querySelector(".questoes");
  quadrosRespostas.innerHTML += /*html*/ `
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
    //     alternativasQuizz: itensQuizz.questions
  };
  console.log(itensQuizz);
  //Construção do cabeçalho com imagem e texto

  const textoCabecalho = document.querySelector(
    ".cabecalho-quizz .texto-janela-quizz"
  );
  textoCabecalho.innerHTML = estruturaQuizz.titulo;

  const imgCabecalho = document.querySelector(".cabecalho-quizz img");
  imgCabecalho.src = estruturaQuizz.imagemTitulo;

  //Construção do quadro de perguntas e respostas

    numeroDePerguntas = estruturaQuizz.questoes.length

    for (let i = 0; i < numeroDePerguntas; i++) {
        montarQuadro(i)
    }
}

//Quando o usuário selecionar uma resposta está função será chamada
function selecionarResposta(resposta) {
  resposta.classList.add("item-selecionado"); //adiciona a classe no item selecionado como resposta

    perguntaRespondida++ // Controla quantas perguntas foram respondidas
    resposta.classList.add('item-selecionado'); //adiciona a classe no item selecionado como resposta

    if(resposta.classList.contains('true')){
        resposta.classList.add('correto')
        numeroAcertos++
    }

  if (resposta.classList.contains("true")) {
    resposta.classList.add("correto");
    numeroAcertos++;
  } else {
    resposta.classList.add("errado");
  }

  let testeResposta = "";
  const divRespostas = resposta.parentNode.parentNode; //Seleciona toda a div que pertence a resposta

  setTimeout(() => {
    divRespostas.nextElementSibling.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, 2000);
  //divRespostas.scrollIntoView(true)

    //percorrore por todos os filhos da divResposta
    for (let i = 0; i < alternativas.length; i++) {
        testeResposta = divRespostas.children[i] //recebe o filho da iteração

        testeResposta.setAttribute("onclick", " ")

    //Se o filho não tiver a classe ele item-selecionado ele recebe a classe esbranquicado
    if (!testeResposta.classList.contains("item-selecionado")) {
      testeResposta.children[0].classList.add("esbranquicado");
    }
  }

  if (perguntaRespondida === numeroDePerguntas) {
    resultadoDoQuizz(numeroAcertos, numeroDePerguntas, estruturaQuizz.level);
  }
}

function resultadoDoQuizz(numeroAcertos, numeroDePerguntas, level){
    let resultado = Math.round((numeroAcertos/numeroDePerguntas)*100)
    
    console.log('resultado: ' + resultado)
    level.sort(compare);
    console.log(level)

    for (let i=0; i<level.length; i++){
        if (resultado >= level[i].minValue){
            console.log('seu nível é: ')
            pontuacao = level[i].title
            break;
        }
    }
  console.log(pontuacao)
} 

function compare(a,b) {
  if (a.minValue > b.minValue)
     return -1;
  if (a.nome > b.nome)
    return 1;  
  return 0;
}