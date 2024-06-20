function changeLanguage(language) {
    fetch(`${language}.json`)
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                element.textContent = translations[key];
            });
        })
        .catch(error => console.error('Error al cargar el archivo de traducción:', error));
}
