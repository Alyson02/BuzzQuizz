const quizz = {
  title: "",
  image: "",
  questions: [
    {
      title: "",
      color: "",
      answers: [],
    },
  ],
  levels: [
    {
      title: "",
      image: "",
      text: "",
      minValue: 0,
    },
  ],
};

let numLeveis = 0;
let numPerguntas = 0;

/**
 * Responsável por mudar para tela de criação de quizz e criação do quizz
 */
async function criarQuizz() {
  const telaQuizzes = document.querySelector(".container");
  telaQuizzes.classList.add("escondido");

  const formInicial = document.querySelector(".formulario-inicial");
  formInicial.classList.remove("escondido");

  const btnIrParaPerguntas = formInicial.querySelector("button");
  btnIrParaPerguntas.addEventListener("click", (e) => {
    //previnindo o botao recarregar a pagina

    e.preventDefault();

    //pega inputs do html

    const inputTitulo = document.querySelector("#titulo");
    const inputImagem = document.querySelector("#imagem");
    const inputQtdPerguntas = document.querySelector("#qtd-perguntas");
    const inputQtdNiveis = document.querySelector("#qtd-niveis");

    //valida informações

    let error = false;

    console.log(inputQtdNiveis);

    if (!inputTitulo.checkValidity() || inputTitulo.value == "") {
      error = true;
    } else if (
      !inputImagem.value.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      )
    ) {
      error = true;
    } else if (
      !inputQtdPerguntas.checkValidity() ||
      inputQtdPerguntas.value == ""
    ) {
      error = true;
    } else if (!inputQtdNiveis.checkValidity() || inputQtdNiveis.value == "") {
      error = true;
      console.log("ben");
    }

    if (error) {
      alert("Dados incorretos!");
      return;
    } else {
      quizz.title = inputTitulo.value;
      quizz.image = inputImagem.value;
      numLeveis = inputQtdNiveis.value;
      numPerguntas = inputQtdPerguntas.value;

      formInicial.classList.add("escondido");
      criarPerguntas();
    }
  });
}

function criarPerguntas() {
  const formPerguntas = document.querySelector(".formulario-perguntas");
  formPerguntas.classList.remove("escondido");

    
}

function abrirPergunta(idPergunta, btn) {
    console.log(`#pergunta${idPergunta} > div:last-child`)
    let pergunta = document.querySelector(`#pergunta${idPergunta} > div:last-child`);
    pergunta.classList.remove("escondido")

    btn.classList.add("escondido");
}
