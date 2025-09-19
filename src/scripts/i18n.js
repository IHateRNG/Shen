// Função genérica para carregar e aplicar as traduções
async function setLanguage(lang) {
  try {
    // Guarda o idioma selecionado no localStorage
    localStorage.setItem('userLang', lang);

    const response = await fetch(`./src/data/translations/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translatedText = getNestedTranslation(translations, key);

      if (translatedText) {
        element.textContent = translatedText;
      }
    });

    console.log(`Página traduzida para o idioma: ${lang}`);
  } catch (error) {
    console.error('Erro ao carregar ou aplicar traduções:', error);
  }
}

// Função auxiliar para acessar chaves aninhadas no JSON (ex: "header.title")
function getNestedTranslation(translations, key) {
  return key.split('.').reduce((obj, part) => obj && obj[part], translations);
}


// --- Exemplo de como usar a função ---

// 1. Carrega o idioma padrão ou o idioma salvo no localStorage
document.addEventListener('DOMContentLoaded', () => {
  // Pega o idioma salvo, ou 'pt-br' como padrão
  const savedLang = localStorage.getItem('userLang') || 'pt-br';
  setLanguage(savedLang);

  // Atualiza o valor do seletor para refletir o idioma carregado
  const langSelector = document.getElementById('lang-selector');
  if (langSelector) {
    langSelector.value = savedLang;
  }
});

// 2. Adiciona um ouvinte de evento para o seletor de idioma
const langSelector = document.getElementById('lang-selector');

if (langSelector) {
  langSelector.addEventListener('change', (event) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);
  });
}

