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

    // if (error) {
    //   alert("Dados incorretos!");
    //   return;
    // } else {
    quizz.title = inputTitulo.value;
    quizz.image = inputImagem.value;
    numLeveis = inputQtdNiveis.value;
    numPerguntas = inputQtdPerguntas.value;

    formInicial.classList.add("escondido");
    criarPerguntas();
    //}
  });
}

function criarPerguntas() {
  const formPerguntas = document.querySelector(".formulario-perguntas");
  formPerguntas.classList.remove("escondido");

  const perguntas = formPerguntas.querySelector("#perguntas");

  for (let i = 1; i <= numPerguntas; i++) {
    if (i == 1) {
      perguntas.innerHTML += /*html*/ `
        <form id="pergunta${i}" class="pergunta">
          <fieldset class="perguntaHeader">
            <legend>Pergunta ${i}</legend>
            <input
              id="titulo-pergunta${i}"
              type="text"
              minlength="20"
              placeholder="Texto da pergunta"
            />
            <label for="cor-pergunta1">Cor de fundo da pergunta</label>
            <input
              id="cor-pergunta${i}"
              type="color"
              placeholder="Cor de fundo da pergunta"
            />
          </fieldset>

          <fieldset id="resposta-correta">
            <legend>Resposta correta</legend>
            <input
              id="resposta-correta"
              type="text"
              placeholder="Resposta correta"
              minlength="20"
            />
            <input
              id="url-resposta-correta"
              type="text"
              placeholder="URL da imagem"
            />
          </fieldset>

          <fieldset id="respostas-incorretas">
            <legend>Respostas incorretas</legend>
            <fieldset>
              <input
                id="resposta-incorreta1"
                type="text"
                placeholder="Resposta incorreta 1"
               
              />
              <input
                id="url-resposta-incorreta1"
                type="text"
                placeholder="URL da imagem 1"
              />
            </fieldset>
            <fieldset>
              <input
                id="resposta-incorreta2"
                type="text"
                placeholder="Resposta incorreta 2"
            
              />
              <input
                id="url-resposta-incorreta2"
                type="text"
                placeholder="URL da imagem 2"
              />
            </fieldset>
            <fieldset>
              <input
                id="resposta-incorreta3"
                type="text"
                placeholder="Resposta incorreta 3"
               
              />
              <input
                id="url-resposta-incorreta3"
                type="text"
                placeholder="URL da imagem 3"
              />
            </fieldset>
          </fieldset>
        </form>
      `;
    } else {
      perguntas.innerHTML += /*html*/ `
        <form id="pergunta${i}" class="pergunta">
          <div class="form-encolhido">
            <legend>Pergunta ${i}</legend>
            <svg
              onclick="abrirPergunta(${i}, this)"
              viewBox="0 0 26 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.1594 15.4969L19.6038 14.0594C19.8295 13.8348 20.2222 13.992 20.2222 14.3155V20.8471C20.2222 22.0375 19.2517 23.0034 18.0556 23.0034H2.16667C0.970486 23.0034 0 22.0375 0 20.8471V5.03462C0 3.84419 0.970486 2.87837 2.16667 2.87837H14.5122C14.8326 2.87837 14.9951 3.2647 14.7694 3.4938L13.325 4.9313C13.2573 4.99868 13.167 5.03462 13.0677 5.03462H2.16667V20.8471H18.0556V15.7485C18.0556 15.6542 18.0917 15.5643 18.1594 15.4969ZM25.2281 6.43169L13.3747 18.2282L9.2941 18.6774C8.11146 18.8077 7.10486 17.8149 7.23576 16.629L7.68715 12.568L19.5406 0.771533C20.5743 -0.257178 22.2444 -0.257178 23.2736 0.771533L25.2236 2.71216C26.2573 3.74087 26.2573 5.40747 25.2281 6.43169V6.43169ZM20.7684 7.81978L18.1458 5.20981L9.75903 13.5608L9.42951 16.4942L12.3771 16.1663L20.7684 7.81978ZM23.6934 4.2395L21.7434 2.29888C21.5583 2.1147 21.2559 2.1147 21.0753 2.29888L19.6806 3.68696L22.3031 6.29692L23.6979 4.90884C23.8785 4.72017 23.8785 4.42368 23.6934 4.2395V4.2395Z"
                fill="black"
              />
            </svg>
          </div>
          <div class="escondido">
            <fieldset class="perguntaHeader">
              <input
                id="titulo-pergunta${i}"
                minlength="20"
                type="text"
                placeholder="Texto da pergunta"
              />
              <label for="cor-pergunta${i}">Cor de fundo da pergunta</label>
              <input
                id="cor-pergunta${i}"
                type="color"
                placeholder="Cor de fundo da pergunta"
              />
            </fieldset>

            <fieldset id="resposta-correta">
              <legend>Resposta correta</legend>
              <input
                id="resposta-correta${i}"
                type="text"
                placeholder="Resposta correta"
              />
              <input
                id="url-resposta-correta${i}"
                type="text"
                placeholder="URL da imagem"
              />
            </fieldset>

            <fieldset id="respostas-incorretas">
              <legend>Respostas incorretas</legend>
              <fieldset>
                <input
                  id="resposta-incorreta${i}-1"
                  type="text"
                  placeholder="Resposta incorreta 1"
                  
                />
                <input
                  id="url-resposta-incorreta${i}-1"
                  type="text"
                  placeholder="URL da imagem 1"
                />
              </fieldset>
              <fieldset>
                <input
                  id="resposta-incorreta${i}-2"
                  type="text"
                  placeholder="Resposta incorreta 2"
                  
                />
                <input
                  id="url-resposta-incorreta${i}-2"
                  type="text"
                  placeholder="URL da imagem 2"
                />
              </fieldset>
              <fieldset>
                <input
                  id="resposta-incorreta${i}-3"
                  type="text"
                  placeholder="Resposta incorreta 3"
                  
                />
                <input
                  id="url-resposta-incorreta${i}-3"
                  type="text"
                  placeholder="URL da imagem 3"
                />
              </fieldset>
            </fieldset>
          </div>
        </form>
      `;
    }
  }

  const btnCriarPerguntas = formPerguntas.querySelector("button");
  btnCriarPerguntas.addEventListener("click", (e) => {
    e.preventDefault();
    adicionarPerguntas(Array.from(perguntas.children));
    formPerguntas.classList.add("escondido")
    criarLevels();
  });
}

function adicionarPerguntas(paiPerguntas) {
  const subistituir = Array.from(document.querySelectorAll(".qualquercoisa"));
  let perguntas = [];
  let error = false;

  console.log(paiPerguntas);

  paiPerguntas.forEach((pergunta) => {
    let respostas = [];
    const paiRespostaCorreta = pergunta.querySelector("#resposta-correta");
    const inputTextoRespostaCorreta = paiRespostaCorreta.querySelector("input");
    const inputImagemRespostaCorreta = paiRespostaCorreta.querySelector("input:last-child");

    error = verificarResposta(inputTextoRespostaCorreta, inputImagemRespostaCorreta);

    if (error) return
    else{
      respostas.push({
        text: inputTextoRespostaCorreta.value,
        image: inputImagemRespostaCorreta.value,
        isCorrectAnswer: true
      })
    }
    
    console.log(error, "validação da pergunta correta");

    const paiRespostasIncorretas = pergunta.querySelector(
      "#respostas-incorretas"
    );
    const respostasIncorretas = Array.from(
      paiRespostasIncorretas.querySelectorAll("fieldset")
    );
    console.log(respostasIncorretas);
    
    let i = 1;
    respostasIncorretas.forEach((respostaIncorreta) => {
      const inputTexto = respostaIncorreta.querySelector("input");
      const inputImagem = respostaIncorreta.querySelector("input:last-child");

      error = verificarResposta(inputTexto, inputImagem);
      console.log(i)
      if(error && i < 2) return

      if(inputTexto.value != "" && inputImagem.value != ""){
        respostas.push({
          text: inputTexto.value,
          image: inputImagem.value,
          isCorrectAnswer: false,
        });
      }else{
        error = false
      }
      i++
    });

    const paiInformacoesPergunta = pergunta.querySelector(".perguntaHeader");
    const inputTituloPergunta  = paiInformacoesPergunta.querySelector("input");
    const inputCorPergunta = paiInformacoesPergunta.querySelector("input:last-child");

    console.log(!inputTituloPergunta.checkValidity())

    if(!inputTituloPergunta.checkValidity() || inputTituloPergunta.value == ""){
      console.log("Entrou na validação")
      error = true
      return
    }

    perguntas.push({
      title: inputTituloPergunta.value,
      color: inputCorPergunta.value,
      answers: respostas,
    });
  });

  console.log(perguntas);
  if (error) {
    alert("Dados inválidos");
  } else {
    quizz.questions.push();
  }
}

function criarLevels(){
  const formNiveis = document.querySelector(".formulario-niveis");
  formNiveis.classList.remove("escondido")
}

function abrirPergunta(idPergunta, btn) {
  console.log(`#pergunta${idPergunta} > div:last-child`);
  let pergunta = document.querySelector(
    `#pergunta${idPergunta} > div:last-child`
  );
  pergunta.classList.remove("escondido");

  btn.classList.add("escondido");
}

function verificarResposta(inputTexto, inputImagem) {
  if (inputTexto.value == "") {
    return true
  } else if (
    !inputImagem.value.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
  ) {
    return true
  }
  return false
}
