
let idQuizz = 1;
let alternativas = [];
let estruturaQuizz;
let perguntas;
const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
promessa.then(montarQuiz)

// Embaralhar alternativas
function comparador() {
    return Math.random() - 0.5;
}

function distrubuirAlternativas() {
    return `
    <div class="repostas">
        <div class="alternativa" onclick="selecionarResposta(this)">
            <div>
                <img src="${alternativas[0].image}">
            </div>
            <div class="legenda">${alternativas[0].text}</div>
        </div>
        <div class="alternativa" onclick="selecionarResposta(this)">
            <div>
                <img src="${alternativas[1].image}">
            </div>
            <div class="legenda">${alternativas[1].text}</div>
        </div>
        <div class="alternativa" onclick="selecionarResposta(this)">
            <div>
                <img src="${alternativas[2].image}">
            </div>
            <div class="legenda">${alternativas[2].text}</div>
        </div>
        <div class="alternativa" onclick="selecionarResposta(this)">
            <div>
                <img src="${alternativas[3].image}">
            </div>
            <div class="legenda">${alternativas[3].text}</div>
        </div>
       
    </div>
    `
}

function montarPerguntas(ordemPergunta) {
    perguntas = estruturaQuizz.questoes

    tituloPergunta = perguntas[ordemPergunta].title
    alternativas = perguntas[ordemPergunta].answers
    let corPergunta = perguntas[ordemPergunta].color

    alternativas.sort(comparador); //embaralha as alternativas

    const quadrosRespostas = document.querySelector('.respostas-quizz')
    quadrosRespostas.innerHTML += `
        <div class="quadro-respostas">
            <div class="cabecalho-quadro-respostas" style="background-color: ${corPergunta}">
                ${tituloPergunta}
            </div>
            ${distrubuirAlternativas()}
        </div>
        `

}

function montarQuiz(quizzArray) {
    itensQuizz = quizzArray.data;
    estruturaQuizz = {
        imagemTitulo: itensQuizz.image,
        titulo: itensQuizz.title,
        level: itensQuizz.levels,
        questoes: itensQuizz.questions
        //     alternativasQuizz: itensQuizz.questions
    }

    //Construção do cabeçalho com imagem e texto

    const textoCabecalho = document.querySelector('.cabecalho-quizz .texto-janela-quizz')
    textoCabecalho.innerHTML = estruturaQuizz.titulo;

    const imgCabecalho = document.querySelector('.cabecalho-quizz img')
    imgCabecalho.src = estruturaQuizz.imagemTitulo

    //Construção do quadro de perguntas e respostas

    const numeroDePerguntas = estruturaQuizz.questoes.length

    for (let i = 0; i < numeroDePerguntas; i++) {
        montarPerguntas(i)
    }

}

//Quando o usuário selecionar uma resposta está função será chamada
function selecionarResposta(resposta) {

    resposta.classList.add('item-selecionado'); //adiciona a classe no item selecionado como resposta
    
    const divRespostas = resposta.parentNode; //Seleciona toda a div que pertence a resposta

    let testeResposta = divRespostas.children[0];

    // testeResposta.setAttribute("onclick", " ")
    // testeResposta.onclick = " "       



    //percorrore por todos os filhos da divResposta
    for (let i = 0; i < 4; i++) {
        let testeResposta = divRespostas.children[i]; //recebe o filho da iteração
        testeResposta.onclick = " "

        //Se o filho não tiver a classe ele item-selecionado ele recebe a classe esbranquicado
        if (!testeResposta.classList.contains('item-selecionado')) {
            testeResposta.children[0].classList.add('esbranquicado');
        }

    }
}