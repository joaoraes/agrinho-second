/**
 * AGRO FORTE - FUTURO SUSTENTÁVEL
 * JavaScript: Interatividade, Quiz Dinâmico, Animações e Dados Reais
 */

// ========================
// 1. QUIZ INTERATIVO SOBRE SUSTENTABILIDADE
// ========================
const quizData = [
    {
        question: "🌱 Qual prática agropecuária sequestra mais carbono no solo?",
        options: ["Plantio Direto + Integração Lavoura Floresta", "Monocultura intensiva", "Queimada controlada", "Aração profunda"],
        correct: 0,
        feedback: "✅ Correto! O Sistema ILPF (Integração Lavoura-Pecuária-Floresta) sequestra até 5 toneladas de CO₂/ha/ano, melhora a biodiversidade e a saúde do solo."
    },
    {
        question: "💧 Qual a porcentagem de economia de água no sistema de plantio direto com cobertura de solo?",
        options: ["10%", "Até 44%", "72%", "Menos de 5%"],
        correct: 1,
        feedback: "🌊 Exato! Estudos da Embrapa apontam redução média de 44% no uso de água devido à infiltração eficiente e menor evaporação."
    },
    {
        question: "🐞 O que são bioinsumos na agricultura sustentável?",
        options: ["Agrotóxicos sintéticos de alta eficiência", "Organismos vivos ou extratos naturais que promovem crescimento e defendem pragas", "Fertilizantes de origem química", "Transgênicos"],
        correct: 1,
        feedback: "🍃 Isso mesmo! Bioinsumos incluem fungos, bactérias e extratos vegetais que substituem defensivos químicos, melhoram o solo e reduzem custos."
    },
    {
        question: "⚡ Qual tecnologia reduz emissões na pecuária e gera energia renovável?",
        options: ["Biodigestores para biogás", "Desmatamento de pastagens", "Uso excessivo de ureia", "Irrigação por aspersão"],
        correct: 0,
        feedback: "🔥 Biodigestores transformam dejetos animais em biogás, reduzindo metano (potente GEE) e gerando energia limpa para o campo!"
    },
    {
        question: "📊 Quantas toneladas de CO₂eq o agro brasileiro sequestra por ano com boas práticas?",
        options: ["500 mil ton", "1,2 bilhão de toneladas", "100 milhões de ton", "15 milhões de ton"],
        correct: 1,
        feedback: "🌎 Dados reais da FAO/Embrapa: o Brasil sequestra cerca de 1,2 bilhão de toneladas de CO₂ equivalente por ano com sistemas sustentáveis!"
    }
];

let currentQuestionIndex = 0;
let quizActive = true;
let quizAnswered = false;
let quizCompleted = false;

// Elementos do DOM do Quiz
const questionEl = document.getElementById('questionText');
const optionsDiv = document.getElementById('optionsDiv');
const feedbackMsg = document.getElementById('feedbackMsg');
const resetBtn = document.getElementById('resetQuizBtn');

// Função para renderizar pergunta atual
function renderQuestion() {
    if (!quizActive || currentQuestionIndex >= quizData.length) {
        // Quiz finalizado
        if (currentQuestionIndex >= quizData.length && !quizCompleted) {
            quizCompleted = true;
            questionEl.innerText = "🎉🌍 Parabéns! Você é um defensor do agro sustentável!";
            optionsDiv.innerHTML = `
                <div style="background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 2rem; width: 100%;">
                    <i class="fas fa-trophy" style="font-size: 2rem; color: gold;"></i>
                    <p style="margin-top: 1rem;">Você completou o quiz e agora conhece práticas que unem produção e meio ambiente.</p>
                    <p><strong>Compartilhe esse conhecimento!</strong></p>
                </div>
            `;
            feedbackMsg.innerHTML = '<i class="fas fa-seedling"></i> Agro Forte, Futuro Sustentável: cada resposta certa é um passo para um planeta mais verde. Refaça o quiz para fixar ainda mais!';
            return;
        }
        return;
    }

    const q = quizData[currentQuestionIndex];
    questionEl.innerText = q.question;
    optionsDiv.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const optionBtn = document.createElement('div');
        optionBtn.className = 'quiz-opt';
        optionBtn.innerHTML = `<i class="fas fa-leaf" style="font-size: 0.8rem; margin-right: 8px;"></i> ${opt}`;
        optionBtn.addEventListener('click', () => {
            if (quizAnswered) {
                feedbackMsg.innerHTML = "⚠️ Você já respondeu esta pergunta! Clique em 'Refazer Quiz' para começar novamente.";
                return;
            }
            checkAnswer(idx, q.correct, q.feedback);
        });
        optionsDiv.appendChild(optionBtn);
    });

    feedbackMsg.innerHTML = '🌿 Escolha uma alternativa para aprender mais sobre sustentabilidade no agro.';
    quizAnswered = false;
}

// Função para verificar resposta
function checkAnswer(selected, correctIndex, feedbackText) {
    if (quizAnswered) return;
    quizAnswered = true;

    const isCorrect = (selected === correctIndex);
    const correctAnswerText = quizData[currentQuestionIndex].options[correctIndex];

    if (isCorrect) {
        feedbackMsg.innerHTML = `✅ ${feedbackText} <i class="fas fa-star" style="color: gold;"></i> <br><small>Resposta correta! +10 para o planeta.</small>`;
        // Efeito de confete simples (opcional)
        createConfetti();
    } else {
        feedbackMsg.innerHTML = `❌ Não foi dessa vez! A resposta correta é: <strong>"${correctAnswerText}"</strong>. <br> ${feedbackText.split('.')[0]}. Continue aprendendo! 🌱`;
    }

    // Avança para próxima pergunta após 2.5 segundos
    setTimeout(() => {
        if (currentQuestionIndex + 1 < quizData.length) {
            currentQuestionIndex++;
            renderQuestion();
        } else if (currentQuestionIndex + 1 === quizData.length) {
            currentQuestionIndex++;
            quizActive = false;
            renderQuestion(); // Mostra tela de conclusão
        } else {
            if (!quizActive) return;
            currentQuestionIndex++;
            quizActive = false;
            renderQuestion();
        }
    }, 2500);
}

// Função para resetar o quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    quizActive = true;
    quizAnswered = false;
    quizCompleted = false;
    renderQuestion();
    // Rolar suavemente até o quiz
    document.querySelector('.interactive-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Efeito visual simples de confete
function createConfetti() {
    // Cria pequenos elementos de confete visuais
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 60; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'absolute';
        conf.style.width = `${Math.random() * 8 + 4}px`;
        conf.style.height = `${Math.random() * 8 + 4}px`;
        conf.style.backgroundColor = `hsl(${Math.random() * 90 + 60}, 80%, 55%)`;
        conf.style.left = `${Math.random() * 100}%`;
        conf.style.top = `-20px`;
        conf.style.borderRadius = '2px';
        conf.style.opacity = '0.8';
        conf.style.animation = `fall ${Math.random() * 2 + 1.5}s linear forwards`;
        confettiContainer.appendChild(conf);

        setTimeout(() => conf.remove(), 2000);
    }

    setTimeout(() => confettiContainer.remove(), 2200);
}

// Adiciona keyframes de animação para confete
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

// Inicializar o quiz quando o DOM estiver pronto
if (resetBtn) {
    resetBtn.addEventListener('click', resetQuiz);
}

// ========================
// 2. HEADER SCROLL EFFECT (transparência e sombra)
// ========================
function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);
handleHeaderScroll(); // Chamada inicial

// ========================
// 3. SMOOTH SCROLL PARA LINKS INTERNOS
// ========================
document.querySelectorAll('.nav-links a, .btn[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Fechar menu mobile se existir (opcional)
            } else if (targetId === 'home' || targetId === '') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
});

// ========================
// 4. ANIMAÇÃO DE ENTRADA PARA CARDS (Intersection Observer)
// ========================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.stat-card, .practice-item, .data-point');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Aguardar o DOM carregar completamente para iniciar as animações
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o quiz
    if (questionEl && optionsDiv && feedbackMsg) {
        renderQuestion();
    }

    // Ativa animações de scroll
    animateOnScroll();

    // Atualizar ano no footer (opcional)
    const footer = document.querySelector('footer');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('2026', currentYear);
    }

    // Adicionar um pequeno delay para melhorar percepção
    console.log('🌿 Agro Forte - Site sustentável carregado com sucesso!');
});

// ========================
// 5. CONTADOR DE ESTATÍSTICAS (efeito dinâmico nos números)
// ========================
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(el => {
        const text = el.innerText;
        let rawNumber = text.replace(/[^0-9,.]/g, '').replace(',', '.');
        let isPercentage = text.includes('%');
        let isBillion = text.includes('bi');
        let isNegative = text.includes('-');

        let finalNumber = parseFloat(rawNumber);
        if (isNaN(finalNumber)) return;

        let suffix = '';
        if (isPercentage) suffix = '%';
        if (isBillion && !isPercentage) suffix = ' bi';

        let start = 0;
        const duration = 1500;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = finalNumber / steps;
        let current = 0;

        const counter = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                clearInterval(counter);
                current = finalNumber;
                el.innerText = (isNegative ? '-' : '') + Math.round(current).toLocaleString('pt-BR') + suffix;
            } else {
                el.innerText = (isNegative ? '-' : '') + Math.floor(current).toLocaleString('pt-BR') + suffix;
            }
        }, stepTime);

        // Armazenar o texto original para não perder formatação
        el.setAttribute('data-original', text);
    });
}

// Disparar animação de números quando os stats estiverem visíveis
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.disconnect(); // Executa apenas uma vez
        }
    });
}, { threshold: 0.3 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    statsObserver.observe(statsGrid);
}

// ========================
// 6. PREVENT DEFAULT PARA LINKS VAZIOS
// ========================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
});

// Exportar funções globais para debug (opcional)
window.agroQuizReset = resetQuiz;