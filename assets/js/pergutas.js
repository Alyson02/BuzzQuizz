
let idQuizz = 1;
let alternativas = [];
let estruturaQuizz;
const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
promessa.then(montarQuiz)

function requisitarQuizz(){
}

function montarQuiz(quizzArray){
    itensQuizz = quizzArray.data;    
    console.log(itensQuizz)
    estruturaQuizz = {
         imagemTitulo: itensQuizz.image,
         titulo: itensQuizz.title,
         level: itensQuizz.levels,
         questoes: itensQuizz.questions
         
    //     color: itensQuizz.questions.color,
    //     alternativasQuizz: itensQuizz.questions
    }

    // console.log(estruturaQuizz.questoes.length);
    

   
    const textoCabecalho = document.querySelector('.cabecalho-quizz .texto-janela-quizz')
    // const imgCabecalho = document.querySelector('.cabecalho-quizz img')
    const imgCabecalho = document.querySelector('.cabecalho-quizz img')
    imgCabecalho.src = estruturaQuizz.imagemTitulo
    
    textoCabecalho.innerHTML = estruturaQuizz.titulo;
    // imgCabecalho.setAttribute("src", estruturaQuizz.imagemTitulo)
   
    const quadroResposta = document.querySelector('.quadro-respostas')
    const numeroDePerguntas = estruturaQuizz.questoes.length
    console.log('numero de perguntas: ' + numeroDePerguntas)
    console.log(quadroResposta)
    for(let i =0; i<numeroDePerguntas; i++){
        console.log(estruturaQuizz.questoes[i].title)
        quadroResposta.innerHTML += `<div class="cabecalho-quadro-respostas">
        ${estruturaQuizz.questoes[i].title}
      </div>`
    }   
    // for(let i =0; i<numeroDePerguntas; i++){
    //     quadroResposta.innerHTML += `
    //         <div class="cabecalho-quadro-respostas">
    //             Em qual animal Olho-Tonto Moody transfigurou Malfoy?
    //         </div>

    //         <div class="alternativa" onclick="selecionarResposta(this)">
    //             <div>
    //                 <img src="${estruturaQuizz.questoes.title}" alt="">
    //             </div>
    //                 <div class="legenda">Gatíneo</div>
    //         </div>
    //     `;
    // }


}

//Quando o usuário selecionar uma resposta está função será chamada
function selecionarResposta(resposta){
    resposta.classList.add('item-selecionado'); //adiciona a classe no item selecionado como resposta
   
    const divRespostas = resposta.parentNode; //Seleciona toda a div que pertence a resposta
    
    //percorrore por todos os filhos da divResposta
    for(let i = 0; i<4; i++){ 
        let testeResposta = divRespostas.children[i]; //recebe o filho da iteração
        console.log(!testeResposta.classList.contains('item-selecionado'));
        
        //Se o filho não tiver a classe ele item-selecionado ele recebe a classe esbranquicado
        if (!testeResposta.classList.contains('item-selecionado')) { 
            testeResposta.children[0].classList.add('esbranquicado');         
        }
    
    }
}