// 1. Função da Calculadora de Irrigação
function calcularAgua() {
    const consumoBase = parseFloat(document.getElementById('tipo-cultura').value);
    const hectares = parseFloat(document.getElementById('hectares').value);
    const resultadoBox = document.getElementById('resultado-calc');
    const txtResultado = document.getElementById('txt-resultado');

    if (isNaN(hectares) || hectares <= 0) {
        alert("Por favor, insira um valor válido de hectares.");
        return;
    }

    // Cálculo: Consumo base (litros/hectare) * quantidade de hectares
    const totalLitrosDia = consumoBase * hectares;

    // Formatação elegante dos números
    const totalFormatado = totalLitrosDia.toLocaleString('pt-BR');
    const hectarTexto = hectares === 1 ? "1 hectare" : `${hectares} hectares`;

    txtResultado.innerHTML = `Para cobrir a área de <strong>${hectarTexto}</strong>, sua estimativa de consumo diário é de <strong>${totalFormatado} Litros de água</strong> por dia.`;

    // Exibe o painel de resultados com animação simples
    resultadoBox.style.display = 'block';
}

// 2. Simulador Interativo do Dashboard (Gera números aleatórios realistas)
function atualizarClima() {
    // Temperaturas entre 18°C e 34°C
    const novaTemp = Math.floor(Math.random() * (34 - 18 + 1)) + 18;
    // Umidade entre 40% e 90%
    const novaUmi = Math.floor(Math.random() * (90 - 40 + 1)) + 40;

    // Arrays de qualidade do ar
    const qualidades = ["Excelente", "Boa", "Moderada"];
    const novaQualidade = qualidades[Math.floor(Math.random() * qualidades.length)];

    // Atualiza o DOM
    document.getElementById('temp-val').innerText = `${novaTemp}°C`;
    document.getElementById('umi-val').innerText = `${novaUmi}%`;
    document.getElementById('ar-val').innerText = novaQualidade;

    // Alerta visual de atualização rápida
    console.log("Dados do painel agrícola atualizados!");
}

// 3. Jogo/Quiz Interativo
function verificarResposta(isCorrect) {
    const feedback = document.getElementById('quiz-feedback');

    if (isCorrect) {
        feedback.innerHTML = "🌱 <strong>Correto!</strong> O Plantio Direto e as Curvas de Nível protegem a camada superficial do solo e guardam os nutrientes essenciais para o Agrinho!";
        feedback.style.color = "#d8f3dc"; // Verde Menta
    } else {
        feedback.innerHTML = "❌ <strong>Tente novamente!</strong> Essa ação pode degradar o solo e prejudicar o meio ambiente.";
        feedback.style.color = "#ff8585"; // Vermelho suave para erro
    }
}