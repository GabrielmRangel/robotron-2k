const controle = document.querySelectorAll('[data-controle]');
const estatistica = document.querySelectorAll('[data-estatistica]');
const robo = document.querySelector('.robo');
let indice = 0;

const robos = ["amarelo", "azul", "branco", "preto", "rosa", "vermelho"];

document.addEventListener('keydown', (evento) => {
    const seta = evento.key;
    let cor = robos[indice];

    switch(seta){
        case "ArrowRight":
            indice = (indice + 1) % robos.length;
            cor = robos[indice];
        break;
        case "ArrowLeft":
            indice = (indice - 1 + robos.length) % robos.length;
            cor = robos[indice];
        break;
    }

    robo.src="img/robotron-" + cor + ".png" 
});

const pecas = {
    "bracos": {
        "forca": 29,
        "poder": 35,
        "energia": -21,
        "velocidade": -5
    },
    "blindagem": {
        "forca": 41,
        "poder": 20,
        "energia": 0,
        "velocidade": -20
    },
    "nucleos":{
        "forca": 0,
        "poder": 7,
        "energia": 48,
        "velocidade": -24
    },
    "pernas":{
        "forca": 27,
        "poder": 21,
        "energia": -32,
        "velocidade": 42
    },
    "foguetes":{
        "forca": 0,
        "poder": 28,
        "energia": 0,
        "velocidade": -2
    }
};

controle.forEach( (elemento) => {
    elemento.addEventListener('click', (evento) => {
        manipulaDados(evento.target.dataset.controle, evento.target.parentNode);
    });
});

function manipulaDados(tipoDeOperacao, paiDoAlvo){
    const contador = paiDoAlvo.querySelector('[data-contador]');
    const peca = paiDoAlvo.querySelector('[data-peca]');
    let validador = false;
    
    if(tipoDeOperacao === "-"){
        if(parseInt(contador.value) > 0){
            contador.value = parseInt(contador.value) - 1;

            validador = true;
        }
    } else {
        contador.value = parseInt(contador.value) + 1;
    }
    
    atualizaEstatisticas(peca.dataset.peca, tipoDeOperacao, validador);
}

function atualizaEstatisticas(peca, tipoDeOperacao, validador){
        estatistica.forEach( (elemento) => {
            if(tipoDeOperacao === "-"){
                if(validador){
                    elemento.textContent = parseInt(elemento.textContent) - pecas[peca][elemento.dataset.estatistica];
                }
            } else {
                elemento.textContent = parseInt(elemento.textContent) + pecas[peca][elemento.dataset.estatistica];
            }
        });
};