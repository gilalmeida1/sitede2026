document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do tema
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    const themeToggle = document.getElementById('theme-toggle');
    const logoImg = document.querySelector('.logo-img');

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 'Ativar tema claro');
        }
        if (logoImg) {
            logoImg.src = 'assets/imagens/logo-light.png';
        }
    } else {
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('aria-label', 'Ativar tema escuro');
        }
        if (logoImg) {
            logoImg.src = 'assets/imagens/logo-dark.png';
        }
    }

    // Aplicar cores do tema aos links e setas
    const applyThemeStyles = () => {
        const isDark = document.body.classList.contains('dark-mode');
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.style.color = isDark ? '#ffffff' : '#333';
        });
        document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
            arrow.style.color = isDark ? '#ffffff' : '#333';
        });
    };
    applyThemeStyles();

    // Loader
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const hideLoader = () => loaderWrapper?.classList.add('hidden');
    setTimeout(hideLoader, 2000);
    window.addEventListener('load', hideLoader);

    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('blur-background');
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        });
    }

    // Fechar menu mobile ao clicar em links
    document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && menuToggle) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
                document.body.classList.remove('blur-background');
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            }
        });
    });

    // Dropdown
    const initializeDropdowns = () => {
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.removeEventListener('click', handleDropdownClick); // Remove listeners antigos
            toggle.addEventListener('click', handleDropdownClick);
        });
    };

    const handleDropdownClick = (e) => {
        e.preventDefault();
        const dropdown = e.currentTarget.parentElement;
        const isActive = dropdown.classList.contains('active');
        
        // Fechar todos os dropdowns
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        
        // Abrir o dropdown clicado, se não estava ativo
        if (!isActive) {
            dropdown.classList.add('active');
        }
    };

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', e => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        }
    });

    // Inicializar dropdowns
    initializeDropdowns();

    // Toggle tema
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('aria-label', isDarkMode ? 'Ativar tema claro' : 'Ativar tema escuro');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            if (logoImg) {
                logoImg.src = isDarkMode ? 'assets/imagens/logo-light.png' : 'assets/imagens/logo-dark.png';
            }
            applyThemeStyles();
        });
    }

    // Botão voltar ao topo
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        });
    }

    // Animação de cards
    const animateCards = () => {
        const cards = document.querySelectorAll('.feature-card, .project-card, .testimonial-card');
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 200);
            }
        });
    };
    animateCards();
    window.addEventListener('scroll', animateCards);

    // Galeria Aleatória
    const galleryImages = [
        { src: 'assets/imagens/galeria1.jpg', alt: 'Ilustração 1', link: 'galeria.html' },
        { src: 'assets/imagens/galeria2.jpg', alt: 'Ilustração 2', link: 'galeria.html' },
        { src: 'assets/imagens/galeria3.jpg', alt: 'Ilustração 3', link: 'galeria.html' },
        { src: 'assets/imagens/galeria4.jpg', alt: 'Ilustração 4', link: 'galeria.html' },
        { src: 'assets/imagens/image1.jpg', alt: 'Ilustração 5', link: 'galeria.html' },
        { src: 'assets/imagens/image2.jpg', alt: 'Ilustração 6', link: 'galeria.html' },
        { src: 'assets/imagens/image3.jpg', alt: 'Ilustração 7', link: 'galeria.html' },
        { src: 'assets/imagens/image4.jpg', alt: 'Ilustração 8', link: 'galeria.html' },
        { src: 'assets/imagens/image5.jpg', alt: 'Ilustração 9', link: 'galeria.html' },
        { src: 'assets/imagens/image6.jpg', alt: 'Ilustração 10', link: 'galeria.html' },
        { src: 'assets/imagens/image7.jpg', alt: 'Ilustração 11', link: 'galeria.html' },
        { src: 'assets/imagens/image8.jpg', alt: 'Ilustração 12', link: 'galeria.html' },
        { src: 'assets/imagens/image9.jpg', alt: 'Ilustração 13', link: 'galeria.html' },
        { src: 'assets/imagens/image10.jpg', alt: 'Ilustração 14', link: 'galeria.html' }
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const randomImages = shuffleArray([...galleryImages]).slice(0, 6);
    const galleryContainer = document.getElementById('random-gallery');
    
    if (galleryContainer) {
        randomImages.forEach(image => {
            const galleryItem = document.createElement('a');
            galleryItem.href = image.link;
            galleryItem.className = 'gallery-item';
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.onerror = () => { img.src = 'assets/imagens/placeholder.jpg'; };
            galleryItem.appendChild(img);
            galleryContainer.appendChild(galleryItem);
        });
    }
});document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do tema
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    const themeToggle = document.getElementById('theme-toggle');
    const logoImg = document.querySelector('.logo-img');

    // Aplica tema salvo
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 'Ativar tema claro');
        }
        if (logoImg) {
            logoImg.src = 'assets/imagens/logo-light.png';
        }
    } else {
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('aria-label', 'Ativar tema escuro');
        }
        if (logoImg) {
            logoImg.src = 'assets/imagens/logo-dark.png';
        }
    }

    // Aplicar cores do tema aos links e setas
    const applyThemeStyles = () => {
        const isDark = document.body.classList.contains('dark-mode');
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.style.color = isDark ? '#ffffff' : '#333';
        });
        document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
            arrow.style.color = isDark ? '#ffffff' : '#333';
        });
    };
    applyThemeStyles();

    // Loader
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const hideLoader = () => {
        if (loaderWrapper) {
            loaderWrapper.classList.add('hidden');
        }
    };
    setTimeout(hideLoader, 2000);
    window.addEventListener('load', hideLoader);

    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('blur-background');
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        });
    }

    // Fechar menu mobile ao clicar em links
    document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', (e) => {
            if (navLinks && menuToggle) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
                document.body.classList.remove('blur-background');
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            }
        });
    });

    // Dropdown
    const initializeDropdowns = () => {
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.removeEventListener('click', handleDropdownClick); // Remove listeners antigos
            toggle.addEventListener('click', handleDropdownClick);
        });
    };

    const handleDropdownClick = (e) => {
        e.preventDefault();
        const dropdown = e.currentTarget.parentElement;
        const isActive = dropdown.classList.contains('active');

        // Fechar todos os dropdowns
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));

        // Abrir o dropdown clicado, se não estava ativo
        if (!isActive) {
            dropdown.classList.add('active');
        }
    };

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', e => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        }
    });

    // Inicializar dropdowns
    initializeDropdowns();

    // Toggle tema
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('aria-label', isDarkMode ? 'Ativar tema claro' : 'Ativar tema escuro');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            if (logoImg) {
                logoImg.src = isDarkMode ? 'assets/imagens/logo-light.png' : 'assets/imagens/logo-dark.png';
            }
            applyThemeStyles();
        });
    }

    // Botão voltar ao topo
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        });
    }

    // Animação de cards e itens da galeria
    const animateItems = () => {
        const items = document.querySelectorAll('.feature-card, .project-card, .testimonial-card, .gallery-item');
        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200);
            }
        });
    };
    animateItems();
    window.addEventListener('scroll', animateItems);

    // Galeria Aleatória (para index.html)
    const galleryImages = [
        { src: 'assets/imagens/galeria1.jpg', alt: 'Ilustração 1', caption: 'Ilustração 1' },
        { src: 'assets/imagens/galeria2.jpg', alt: 'Ilustração 2', caption: 'Ilustração 2' },
        { src: 'assets/imagens/galeria3.jpg', alt: 'Ilustração 3', caption: 'Ilustração 3' },
        { src: 'assets/imagens/galeria4.jpg', alt: 'Ilustração 4', caption: 'Ilustração 4' },
        { src: 'assets/imagens/image1.jpg', alt: 'Ilustração 5', caption: 'Ilustração 5' },
        { src: 'assets/imagens/image2.jpg', alt: 'Ilustração 6', caption: 'Ilustração 6' },
        { src: 'assets/imagens/image3.jpg', alt: 'Ilustração 7', caption: 'Ilustração 7' },
        { src: 'assets/imagens/image4.jpg', alt: 'Ilustração 8', caption: 'Ilustração 8' },
        { src: 'assets/imagens/image5.jpg', alt: 'Ilustração 9', caption: 'Ilustração 9' },
        { src: 'assets/imagens/image6.jpg', alt: 'Ilustração 10', caption: 'Ilustração 10' },
        { src: 'assets/imagens/image7.jpg', alt: 'Ilustração 11', caption: 'Ilustração 11' },
        { src: 'assets/imagens/image8.jpg', alt: 'Ilustração 12', caption: 'Ilustração 12' },
        { src: 'assets/imagens/image9.jpg', alt: 'Ilustração 13', caption: 'Ilustração 13' },
        { src: 'assets/imagens/image10.jpg', alt: 'Ilustração 14', caption: 'Ilustração 14' }
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Carrega galeria dinâmica no index.html
    const galleryContainer = document.getElementById('random-gallery');
    if (galleryContainer) {
        const randomImages = shuffleArray([...galleryImages]).slice(0, 6);
        galleryContainer.innerHTML = ''; // Limpa o container
        randomImages.forEach(image => {
            const galleryItem = document.createElement('a');
            galleryItem.href = 'galeria.html';
            galleryItem.className = 'gallery-item';
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.onerror = () => { img.src = 'assets/imagens/placeholder.jpg'; };
            galleryItem.appendChild(img);
            galleryContainer.appendChild(galleryItem);
        });
    }

    // Inicializa Fancybox para galeria.html
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind('[data-fancybox="gallery"]', {
            Image: { zoom: false, maxWidth: 1200, maxHeight: 600 }
        });
    }
});