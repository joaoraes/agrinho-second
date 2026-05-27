// ========================================
// script.js - Agrinho | Interatividade Moderna
// Slider, Mobile Menu, Form, Scroll Spy, Animações
// ========================================

// Aguarda o DOM totalmente carregado
document.addEventListener('DOMContentLoaded', function () {

    // ---------- MENU MOBILE ----------
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
        });

        // Fecha o menu ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                navLinks.style.display = 'flex';
            } else {
                // Se estiver em mobile e o menu tiver sido aberto manualmente, manter? 
                // Melhor: se width < 900 e o menu foi escondido manualmente, não forçar show.
                // Mas para UX padrão, resetamos display baseado em estado não forçado
                if (navLinks.style.display !== 'flex') {
                    // Se foi escondido pelo toggle, mantém escondido? Vamos deixar natural.
                    // Porém ao redimensionar para desktop exibimos normalmente
                    navLinks.style.display = 'flex';
                }
            }
        });

        // Ajuste inicial
        if (window.innerWidth <= 900) {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
        }
    }

    // ---------- SLIDER (CARROSSEL DE IMAGENS) ----------
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    let currentIndex = 0;
    let slideInterval;

    // Se existir o slider no DOM
    if (slider && slides.length > 0 && prevBtn && nextBtn) {

        // Cria os dots (indicadores)
        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            slides.forEach((_, idx) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (idx === currentIndex) dot.classList.add('active-dot');
                dot.addEventListener('click', () => {
                    currentIndex = idx;
                    updateSlider();
                    resetInterval();
                });
                dotsContainer.appendChild(dot);
            });
        }

        // Atualiza a posição do slider e os dots ativos
        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            const allDots = document.querySelectorAll('.dot');
            allDots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('active-dot');
                } else {
                    dot.classList.remove('active-dot');
                }
            });
        }

        // Próximo slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }

        // Slide anterior
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }

        // Reseta o intervalo de rotação automática
        function resetInterval() {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000); // Troca a cada 6 segundos
        }

        // Eventos dos botões
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        // Inicialização
        createDots();
        updateSlider();
        resetInterval();

        // Pausa o auto-slide quando o mouse está sobre o slider (boa prática)
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                if (slideInterval) clearInterval(slideInterval);
            });
            sliderContainer.addEventListener('mouseleave', () => {
                resetInterval();
            });
        }
    }

    // ---------- FORMULÁRIO DE CONTATO INTERATIVO ----------
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const mensagem = document.getElementById('mensagem')?.value.trim();

            if (nome && email && email.includes('@')) {
                formMessage.innerHTML = '<span style="color:#2F7640;"><i class="fas fa-check-circle"></i> ✅ Mensagem enviada com sucesso! Agradecemos seu interesse no movimento Agrinho. Em breve retornaremos.</span>';
                contactForm.reset();
            } else {
                formMessage.innerHTML = '<span style="color:#d9534f;"><i class="fas fa-exclamation-triangle"></i> Por favor, preencha nome e um e-mail válido.</span>';
            }

            // Limpa a mensagem após 5 segundos
            setTimeout(() => {
                if (formMessage) formMessage.innerHTML = '';
            }, 5000);
        });
    }

    // ---------- SCROLL SPY (ATIVAR NAVEGAÇÃO ATIVA) ----------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    function activateCurrentSection() {
        let current = '';
        const scrollPosition = window.scrollY + 200; // offset para header fixo

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activateCurrentSection);
    window.addEventListener('load', activateCurrentSection);

    // ---------- ANIMAÇÃO SUAVE NOS LINKS (SMOOTH SCROLL) ----------
    document.querySelectorAll('.nav-item, .btn-primary, .btn-outline, .footer-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            if (hash && hash.startsWith('#')) {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    e.preventDefault();
                    const offsetTop = targetElement.offsetTop - 80; // Altura do header fixo
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    // Fechar menu mobile após clique
                    if (window.innerWidth <= 900 && navLinks) {
                        navLinks.style.display = 'none';
                    }
                }
            }
        });
    });

    // ---------- ADICIONA EFEITO DE HEADER SOMBRA NO SCROLL ----------
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
            header.style.background = 'rgba(10, 25, 12, 0.96)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(18, 35, 20, 0.92)';
        }
    });

    // ---------- CONTADOR ANIMADO (EXTRA: efeito visual ao entrar na seção Impacto) ----------
    // Para deixar mais interativo, ao rolar até a seção impacto os números podem ser contados (opcional)
    const numbers = document.querySelectorAll('.number');
    let animated = false;

    function animateNumbers() {
        if (animated) return;
        const impactSection = document.getElementById('impacto');
        if (impactSection) {
            const rect = impactSection.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
                animated = true;
                numbers.forEach(numEl => {
                    const finalText = numEl.innerText;
                    let finalNumber = parseInt(finalText.replace(/[^0-9.-]+/g, ''));
                    if (isNaN(finalNumber)) return;
                    let current = 0;
                    const increment = finalNumber / 50;
                    const updateNumber = () => {
                        current += increment;
                        if (current < finalNumber) {
                            if (finalText.includes('milhões')) {
                                numEl.innerText = Math.floor(current) + ' milhões';
                            } else if (finalText.includes('%')) {
                                numEl.innerText = Math.floor(current) + '%';
                            } else if (finalText.includes('-')) {
                                numEl.innerText = '-' + Math.floor(current);
                            } else {
                                numEl.innerText = Math.floor(current);
                            }
                            requestAnimationFrame(updateNumber);
                        } else {
                            numEl.innerText = finalText;
                        }
                    };
                    updateNumber();
                });
            }
        }
    }

    window.addEventListener('scroll', animateNumbers);
    window.addEventListener('load', animateNumbers);
});