
function selecionarResposta(resposta){
    resposta.classList.add('item-selecionado');
   
    const divRespostas = resposta.parentNode;
    
    for(let i = 0; i<4; i++){
        let testeResposta = divRespostas.children[i]
        console.log(!testeResposta.classList.contains('item-selecionado'))
        if (!testeResposta.classList.contains('item-selecionado')) {
            testeResposta.children[0].classList.add('esbranquicado')            
        }
    
    }

    

}