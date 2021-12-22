const resultado = document.querySelector('#resultado');

const formulario = document.querySelector('#formulario');

const contenedorForm = document.querySelector('.container-form');


window.onload = function () {
    formulario.addEventListener('submit', validarFormulario);
}


function validarFormulario(e) {

    e.preventDefault();
    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        mostrarAlerta('Escribe una categoría de búsqueda');
        return;
    }

    buscarGifs();
}


function mostrarAlerta(mensaje) {

    const existeAlerta = document.querySelector('.alerta');

    if (!existeAlerta) {

        const alerta = document.createElement('p');
        alerta.classList.add('alerta', 'p-3', 'm-4',  'bg-danger','text-white', 'text-center', 'rounded');
        alerta.innerHTML = `
            <strong class="text-center">Error: </strong>
            <span class="text-center">${mensaje}</span>
        `

        contenedorForm.appendChild(alerta);

        setTimeout(() => {
            alerta.remove(); 
        }
        , 3000);

    }
}


function buscarGifs() {

    const termino  = document.querySelector('#termino').value;
    const API_KEY = 'xzE0PbdLlWw09AjaE2Z10SxEMrAJB5x9';
    const registrosPorPagina = 25;

    const url = `https://api.giphy.com/v1/gifs/search?q=${termino}&api_key=${API_KEY}&limit=${registrosPorPagina}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarGifs(data.data);
        })
}

function mostrarGifs(gifs){

    //Limpiar resultado
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    //Mostrar gifs

    gifs.forEach(gif => {

        const { title, images } = gif;

        const { url } = images.downsized_medium;

        const item = document.createElement('div');
        item.classList.add('card', 'card-gif', 'my-2');

        item.innerHTML = `
            <img src="${url}" alt="${title}" class="card-img-top">
            <div class="card-body">
                <p class="card-text">${title}</p>
            </div>
        `;

        resultado.appendChild(item);
    });
    
}


