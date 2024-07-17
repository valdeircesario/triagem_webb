const btn = document.querySelector('#submitbtn');
const intensidadeField = document.getElementById('intensidade-field');

function toggleIntensidadeDisplay() {
    let dorSim = document.querySelector('input[name="dor"][value="sim"]').checked;
    if (dorSim) {
        intensidadeField.style.display = 'block';
    } else {
        intensidadeField.style.display = 'none';
    }
}

function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.target.click();
    }
}

document.querySelectorAll('input[name="dor"]').forEach(function(input) {
    input.addEventListener('click', toggleIntensidadeDisplay);
    input.addEventListener('keydown', handleKeyDown);
});

btn.addEventListener("click", function(event) {
    event.preventDefault();

    const dadosFormulario = {};

    dadosFormulario.especialidade = document.querySelector('#especialidades').value;
    dadosFormulario.hipertensao = document.querySelector('input[name="hipertensao"]:checked').value;
    dadosFormulario.diabetico = document.querySelector('input[name="diabetico"]:checked').value;
    dadosFormulario.febre = document.querySelector('input[name="febre"]:checked').value;
    dadosFormulario.dor = document.querySelector('input[name="dor"]:checked').value;

    if (dadosFormulario.dor === 'sim') {
        dadosFormulario.intensidade = document.querySelector('input[name="intensidade"]:checked').value;
    } else {
        dadosFormulario.intensidade = null;
    }

    dadosFormulario.peso = document.querySelector('#peso').value;

    console.log('Dados do formulário capturados:', dadosFormulario);

    const mediaPonderada = calcularMediaPonderada(dadosFormulario);
    console.log('Média Ponderada:', mediaPonderada);




});

function calcularMediaPonderada(dados) {
    // Definir valores e pesos conforme especificações
    const valores = {
        hipertensao: {
            sim: { valor: 3.5, peso: 1 },
            nao: { valor: 1.5, peso: 1 }
        },
        diabetico: {
            sim: { valor: 3.5, peso: 1 },
            nao: { valor: 1.5, peso: 1 }
        },
        febre: {
            sim: { valor: 3.5, peso: 1 },
            nao: { valor: 1.5, peso: 1 }
        },
        dor: {
            sim: {
                fraca: { valor: 1.5, peso: 1 },
                media: { valor: 3.5, peso: 1 },
                intensa: { valor: 4.5, peso: 1 }
            },
            nao: { valor: 0, peso: 1 }
        },
        peso: {
            maior100: { valor: 2.5, peso: 1 },
            menor15: { valor: 2.2, peso: 1 },
            padrao: { valor: 1.2, peso: 1 }
        }
    };

    // Calcular a média ponderada
    const mediaPonderada =
        (valores.hipertensao[dados.hipertensao].valor * valores.hipertensao[dados.hipertensao].peso +
            valores.diabetico[dados.diabetico].valor * valores.diabetico[dados.diabetico].peso +
            valores.febre[dados.febre].valor * valores.febre[dados.febre].peso +
            (dados.dor === 'sim' ?
                valores.dor[dados.dor][dados.intensidade].valor * valores.dor[dados.dor][dados.intensidade].peso :
                valores.dor[dados.dor].valor * valores.dor[dados.dor].peso) +
            valores.peso[dados.peso > 100 ? 'maior100' : dados.peso < 15 ? 'menor15' : 'padrao'].valor * valores.peso[dados.peso > 100 ? 'maior100' : dados.peso < 15 ? 'menor15' : 'padrao'].peso)
        / 5; // Dividido pelo total dos pesos

    return mediaPonderada;
}
