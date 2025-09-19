// A função de carregar os dados do JSON continua a mesma
async function fetchStatsData() {
    try {
        const response = await fetch('./src/data/stats.json');
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar os dados das estatísticas:', error);
        return null;
    }
}

// A nova e melhorada função de atualização
async function updateAllStats(selectedSetId) {
    const statsData = await fetchStatsData();
    if (!statsData) return;

    const statsSet = statsData[selectedSetId];
    if (!statsSet) {
        console.error('Conjunto de status não encontrado:', selectedSetId);
        return;
    }
    
    // Itera sobre as estatísticas do conjunto e atualiza os valores existentes
    for (const statId in statsSet) {
        if (statsSet.hasOwnProperty(statId)) {
            const statValue = statsSet[statId];
            
            // Encontra o elemento com o data-stat-id correspondente e atualiza o texto
            const statElement = document.querySelector(`[data-stat-id="${statId}"]`);
            if (statElement) {
                statElement.textContent = statValue;
            }
        }
    }
}

// O event listener permanece o mesmo
document.addEventListener('DOMContentLoaded', () => {
    const statusSelector = document.getElementById('status-selector');
    if (statusSelector) {
        statusSelector.addEventListener('change', (event) => {
            const selectedSet = event.target.value;
            updateAllStats(selectedSet);
        });

        // Exibe o primeiro conjunto de status ao carregar a página
        updateAllStats(statusSelector.value);
    }
});

// A função de carregar os dados do JSON continua a mesma
async function fetchStatsData() {
    try {
        const response = await fetch('/src/data/status/stats.json');
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar os dados das estatísticas:', error);
        return null;
    }
}

// A nova e melhorada função de atualização
async function updateAllStats(selectedSetId) {
    const statsData = await fetchStatsData();
    if (!statsData) return;

    const statsSet = statsData[selectedSetId];
    if (!statsSet) {
        console.error('Conjunto de status não encontrado:', selectedSetId);
        return;
    }
    
    // Itera sobre as estatísticas do conjunto e atualiza os valores existentes
    for (const statId in statsSet) {
        if (statsSet.hasOwnProperty(statId)) {
            const statValue = statsSet[statId];
            
            // Encontra o elemento com o data-stat-id correspondente e atualiza o texto
            const statElement = document.querySelector(`[data-stat-id="${statId}"]`);
            if (statElement) {
                statElement.textContent = statValue;
            }
        }
    }
}

// O event listener permanece o mesmo
document.addEventListener('DOMContentLoaded', () => {
    const statusSelector = document.getElementById('status-selector');
    if (statusSelector) {
        statusSelector.addEventListener('change', (event) => {
            const selectedSet = event.target.value;
            updateAllStats(selectedSet);
        });

        // Exibe o primeiro conjunto de status ao carregar a página
        updateAllStats(statusSelector.value);
    }
});