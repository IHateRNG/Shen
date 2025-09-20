// Este é o seu único arquivo JavaScript.
// Todas as funções e lógicas foram unificadas aqui.

// ----------------------------------------------------
// LÓGICA DE TRADUÇÃO E CARROSSEL
// ----------------------------------------------------

async function setLanguage(lang) {
    try {
        localStorage.setItem('userLang', lang);
        const response = await fetch(`./src/data/translations/${lang}.json`);
        const translations = await response.json();

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translatedText = getNestedTranslation(translations, key);

            if (translatedText) {
                element.innerHTML = translatedText;
            }
        });

        // Chama a função do carrossel, passando os dados de tradução
        setupCarousel(translations);

        console.log(`Página traduzida para o idioma: ${lang}`);
    } catch (error) {
        console.error('Erro ao carregar ou aplicar traduções:', error);
    }
}

function getNestedTranslation(translations, key) {
    return key.split('.').reduce((obj, part) => obj && obj[part], translations);
}

function setupCarousel(translations) {
    const mainImage = document.getElementById('main-image');
    const descriptionText = document.getElementById('description-text');
    const thumbnails = document.querySelectorAll('.thumbnail');

    const initialThumbnail = document.querySelector('.thumbnail.active');
    if (initialThumbnail) {
        const initialImageSrc = initialThumbnail.getAttribute('data-image');
        const initialDescriptionKey = initialThumbnail.getAttribute('data-description');
        
        mainImage.src = initialImageSrc;
        const translatedDescription = getNestedTranslation(translations, initialDescriptionKey);
        descriptionText.innerHTML = translatedDescription; // AQUI ESTÁ A MUDANÇA
    }

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (event) => {
            thumbnails.forEach(thumb => {
                thumb.classList.remove('active');
            });
            event.target.classList.add('active');
            const newImageSrc = event.target.getAttribute('data-image');
            const newDescriptionKey = event.target.getAttribute('data-description');
            
            mainImage.src = newImageSrc;
            const translatedDescription = getNestedTranslation(translations, newDescriptionKey);
            descriptionText.innerHTML = translatedDescription; // AQUI ESTÁ A MUDANÇA
        });
    });
}

// ----------------------------------------------------
// LÓGICA DE ATUALIZAÇÃO DE ESTATÍSTICAS
// ----------------------------------------------------

async function fetchStatsData() {
    try {
        const response = await fetch('/src/data/status/stats.json'); // Caminho unificado
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar os dados das estatísticas:', error);
        return null;
    }
}

async function updateAllStats(selectedSetId) {
    const statsData = await fetchStatsData();
    if (!statsData) return;

    const statsSet = statsData[selectedSetId];
    if (!statsSet) {
        console.error('Conjunto de status não encontrado:', selectedSetId);
        return;
    }
    
    for (const statId in statsSet) {
        if (statsSet.hasOwnProperty(statId)) {
            const statValue = statsSet[statId];
            const statElement = document.querySelector(`[data-stat-id="${statId}"]`);
            if (statElement) {
                statElement.textContent = statValue;
            }
        }
    }
}

// ----------------------------------------------------
// LÓGICA DO BOTÃO "VOLTAR AO TOPO"
// ----------------------------------------------------

const backToTopButton = document.getElementById('scrollToTopBtn');

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
};

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ----------------------------------------------------
// PONTO DE INÍCIO DA APLICAÇÃO (ÚNICO E CENTRALIZADO)
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa a tradução e o carrossel
    const langSelector = document.getElementById('lang-selector');
    const savedLang = localStorage.getItem('userLang') || 'pt-br';
    
    if (langSelector) {
        langSelector.value = savedLang;
        langSelector.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });
    }
    setLanguage(savedLang);

    // 2. Inicializa a atualização das estatísticas
    const statusSelector = document.getElementById('status-selector');
    
    if (statusSelector) {
        statusSelector.addEventListener('change', (event) => {
            updateAllStats(event.target.value);
        });
        updateAllStats(statusSelector.value);
    }
});