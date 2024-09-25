let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1

function exibirTextoNaTela(tag, texto) {
    campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial () {
    exibirTextoNaTela('h1', `Jogo do Fredones`);
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    chute = Number(chute); // Converte o valor para número
    console.log(chute == numeroSecreto ? 'acertou' : 'você errou, tente de novo!');

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns, você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela ('p',`${mensagemTentativas}`);
        document.getElementById ('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroSecreto > chute) {
            exibirTextoNaTela('p', 'Você errou! O número secreto é maior.');
        } else {
            exibirTextoNaTela('p', 'Você errou! O número secreto é menor.');
        }
        tentativas++;
        limparCampo ();
    }
}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)  ) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector ('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

