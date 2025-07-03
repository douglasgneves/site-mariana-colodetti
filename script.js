// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA PARA ANIMAÇÃO AO ROLAR A PÁGINA ---
    // Esta função torna a experiência mais fluida e profissional.
    // Os elementos aparecem suavemente na tela em vez de estarem todos lá de uma vez.
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('is-visible');
    }

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } 
            // Opcional: descomente a linha abaixo se quiser que a animação aconteça toda vez que o elemento sai e entra na tela
            // else { hideScrollElement(el); }
        })
    }

    // Adiciona os event listeners
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Chama a função uma vez no carregamento para animar elementos já visíveis
    handleScrollAnimation();


    // --- LÓGICA PARA ROLAGEM SUAVE DOS LINKS DO MENU ---
    // Melhora a navegação interna da página.
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão de "pulo"

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Rola suavemente até a seção alvo
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // -80 para compensar a altura do header fixo
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- LÓGICA PARA MENU MOBILE ---
    // Seleciona elementos do menu mobile
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const mainNavLinks = document.querySelectorAll('.main-nav a'); // Seleciona todos os links do menu

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            // Alterna a classe no menu para mostrar/esconder
            mainNav.classList.toggle('nav-open');
            
            // Alterna a classe no próprio botão para a animação do ícone
            mobileNavToggle.classList.toggle('nav-open');

            // Impede ou permite o scroll do body
            if (mainNav.classList.contains('nav-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Fecha o menu mobile quando um link é clicado
    mainNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('nav-open')) {
                mainNav.classList.remove('nav-open');
                mobileNavToggle.classList.remove('nav-open');
                document.body.style.overflow = 'auto';
            }
        });
    });

});