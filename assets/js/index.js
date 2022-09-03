// Variaveis globais
const urlBase = "https://mock-api.driven.com.br/api/v4/buzzquizz";

carregarQuizzes();

/**
 * Responsavel por carregar todos os quizzes
 * Resolvi usar ela assincrona pra não precisar criar outra função
 * Assim, é só colocar um await onde vai ter uma promise
 */
async function carregarQuizzes() {
  let quizzes = [];

  await axios
    .get(`${urlBase}/quizzes`)
    .then((r) => (quizzes = r.data))
    .catch((e) => console.log(e));

  const section = document.querySelector(".todos-quizzes");

  quizzes.forEach((quiz) => {
    section.innerHTML += `
    <div class="quizz" onclick="carregarQuiz(this)" id="${quiz.id}">
        <img src="${quiz.image}" />
        <div class="texto-quizz">${quiz.title}</div>
    </div>
    `;
  });
  
}

/**
 * Responsavel por trocar de tela entre todos os quizzes e o quiz em especifico 
 */
async function carregarQuiz(el){

  let quiz = [];
  await axios
    .get(`${urlBase}/quizzes/${el.id}`)
    .then((r) => (quiz = r.data))
    .catch((e) => console.log(e));
  console.log(quiz);

  let tela1 = document.querySelector('.container');
  let abriuQuizz = document.querySelector('.respostas-quizz');
  tela1.classList.add('escondido');
  abriuQuizz.classList.remove('escondido');
  abriuQuizz.scrollIntoView();

}

function reload(){
  window.location.reload();
}