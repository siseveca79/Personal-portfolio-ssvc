document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        'HTML', 'CSS', 'JavaScript', 'Node.js', 'Express',
        'MongoDB', 'PostgreSQL', 'Git'
    ];

    const cardsContainer = document.querySelector('.cards');

    cards.forEach(tech => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('draggable', 'true');
        card.textContent = tech;
        cardsContainer.appendChild(card);
    });

    const draggables = document.querySelectorAll('.card');
    const container = document.querySelector('.cards');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    container.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientX);
        const dragging = document.querySelector('.dragging');
        if (afterElement == null) {
            container.appendChild(dragging);
        } else {
            container.insertBefore(dragging, afterElement);
        }
    });

    function getDragAfterElement(container, x) {
        const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    const darkModeSwitch = document.getElementById('darkModeSwitch');

    darkModeSwitch.addEventListener('change', () => {
        const isDarkMode = darkModeSwitch.checked;
        updateColorMode(isDarkMode);
    });
    function updateColorMode(isDarkMode) {
        document.body.classList.toggle('dark-mode', isDarkMode);
    
        const elementsToToggle = document.querySelectorAll('.neo-color');
        elementsToToggle.forEach(element => {
            if (isDarkMode) {
                element.classList.add('dark-mode-text');
            } else {
                element.classList.remove('dark-mode-text');
            }
        });
    
        // Toggle styles for the contact form
        const contactForm = document.querySelector('.contact-form');
        if (isDarkMode) {
            contactForm.classList.add('dark-mode');
        } else {
            contactForm.classList.remove('dark-mode');
        }
    }
    






    const username = 'siseveca79'; // Cambia esto por tu nombre de usuario de GitHub
    const reposContainer = document.getElementById('github-repos');
    const paginationContainer = document.getElementById('pagination-container');
    
    const perPage = 5;
    let currentPage = 1;
    
    function displayRepositories(repos) {
        reposContainer.innerHTML = '';
    
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        const currentRepos = repos.slice(startIndex, endIndex);
    
        currentRepos.forEach(repo => {
            const repoLink = document.createElement('a');
            repoLink.classList.add('repo-link');
            repoLink.href = repo.html_url;
            repoLink.target = '_blank';
            repoLink.textContent = repo.name;
    
            const repoDesc = document.createElement('p');
            repoDesc.classList.add('repo-desc');
            repoDesc.textContent = repo.description || 'No description provided.';
    
            const repoCard = document.createElement('div');
            repoCard.classList.add('repo-card');
            repoCard.appendChild(repoLink);
            repoCard.appendChild(repoDesc);
    
            reposContainer.appendChild(repoCard);
        });
    
        renderPagination(repos.length);
    }
    
    function renderPagination(totalRepos) {
        paginationContainer.innerHTML = '';
    
        const totalPages = Math.ceil(totalRepos / perPage);
    
        const maxVisiblePages = 5; // Número máximo de páginas visibles antes de usar puntos suspensivos
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
        if (totalPages > maxVisiblePages) {
            // Si hay muchas páginas, mostramos puntos suspensivos y ajustamos startPage y endPage
            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
    
            if (startPage > 1) {
                // Agregar enlace a la primera página
                const firstPageLink = createPageLink(1, '1');
                paginationContainer.appendChild(firstPageLink);
    
                // Agregar puntos suspensivos antes del primer número de página visible
                if (startPage > 2) {
                    const dotsElement = document.createElement('span');
                    dotsElement.textContent = '...';
                    paginationContainer.appendChild(dotsElement);
                }
            }
        }
    
        for (let i = startPage; i <= endPage; i++) {
            const pageLink = createPageLink(i, `${i}`);
            paginationContainer.appendChild(pageLink);
        }
    
        if (totalPages > maxVisiblePages && endPage < totalPages) {
            // Agregar puntos suspensivos después del último número de página visible
            if (endPage < totalPages - 1) {
                const dotsElement = document.createElement('span');
                dotsElement.textContent = '...';
                paginationContainer.appendChild(dotsElement);
            }
    
            // Agregar enlace a la última página
            const lastPageLink = createPageLink(totalPages, `${totalPages}`);
            paginationContainer.appendChild(lastPageLink);
        }
    }
    
    function createPageLink(pageNumber, text) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = text;
        pageLink.classList.add('page-link');
        if (pageNumber === currentPage) {
            pageLink.classList.add('active');
        }
    
        pageLink.addEventListener('click', () => {
            currentPage = pageNumber;
            fetchRepos();
        });
    
        return pageLink;
    }
    
    function fetchRepos() {
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(repos => {
                displayRepositories(repos);
            })
            .catch(error => {
                console.error('Error fetching GitHub repositories:', error);
                reposContainer.textContent = 'Failed to fetch repositories.';
            });
    }
    
    fetchRepos();

    






    const coursesList = [

        {
            title: 'Curso Avanzado de JavaScript y Node',
            description: 'Domina JavaScript moderno, incluyendo ES6 y frameworks populares como express.',
            platform: 'Desafio Latam',
            link: 'https://desafiolatam.com/full-stack-javascript-b/'
        },

     
    ];

    const coursesContainer = document.getElementById('courses-list');

coursesList.forEach(course => {
    const courseLink = document.createElement('a');
    courseLink.classList.add('course-link');
    courseLink.href = course.link;
    courseLink.target = '_blank';
    courseLink.textContent = course.title;

    const courseDesc = document.createElement('p');
    courseDesc.textContent = course.description;

    const coursePlatform = document.createElement('p');
    coursePlatform.classList.add('course-platform');
    coursePlatform.textContent = `Platform: ${course.platform}`;

    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    courseCard.appendChild(courseLink);
    courseCard.appendChild(courseDesc);
    courseCard.appendChild(coursePlatform);

    coursesContainer.appendChild(courseCard);
});


const text = "Hay muchos libros, pero pocos tan claros..."; // El texto que quieres mostrar
const typingElement = document.getElementById('typing-text');
let index = 0;

function type() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100); // Ajusta la velocidad aquí (en milisegundos)
    } else {
        // Después de terminar de escribir, espera 30 segundos y vuelve a empezar
        setTimeout(() => {
            index = 0;
            typingElement.textContent = '';
            type();
        }, 5000); 
    }
}

type();

});
