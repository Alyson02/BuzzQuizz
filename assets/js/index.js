// Variaveis globais
const urlBase = "https://mock-api.driven.com.br/api/v4/buzzquizz";
let tam;
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
    .then((s) => (tam = s.length))
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
  console.log(quizzes[0]);
}

function reload() {
  window.location.reload();
}
