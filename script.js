const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = "☀";
    } else {
        themeBtn.innerHTML = "🌙";
    }

});

function calcularImpacto() {

    const agua = Number(document.getElementById("agua").value);
    const arvores = Number(document.getElementById("arvores").value);
    const reciclagem = Number(document.getElementById("reciclagem").value);

    const resultado = document.getElementById("resultado");

    let pontos = 0;

    pontos += agua * 0.05;
    pontos += arvores * 10;
    pontos += reciclagem * 2;

    let nivel = "";
    let mensagem = "";

    if (pontos < 50) {

        nivel = "Impacto Sustentável Inicial 🌱";

        mensagem =
            "Você já possui hábitos positivos, mas ainda pode melhorar seu impacto ambiental reduzindo desperdícios e aumentando práticas sustentáveis.";

    } else if (pontos < 120) {

        nivel = "Impacto Sustentável Muito Bom 🌿";

        mensagem =
            "Parabéns! Suas atitudes ajudam significativamente o meio ambiente e incentivam práticas conscientes.";

    } else {

        nivel = "Impacto Sustentável Excelente 🌎";

        mensagem =
            "Você demonstra forte compromisso com o planeta e contribui diretamente para um futuro mais sustentável.";

    }

    resultado.innerHTML = `
    <strong>${nivel}</strong><br><br>
    Pontuação sustentável: <strong>${pontos.toFixed(0)}</strong><br><br>
    ${mensagem}
  `;

}

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    counter.innerText = "0";

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;

        const increment = target / 100;

        if (current < target) {

            counter.innerText = `${Math.ceil(current + increment)}`;

            setTimeout(updateCounter, 20);

        } else {

            counter.innerText = target;

        }

    };

    updateCounter();

});