const resultado = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');

const formulario = document.querySelector('#formulario');

const contenedorForm = document.querySelector('.container-form');

const registrosPorPagina = 40;

let totalPaginas;
let iterador;
let paginaActual = 1;


window.onload = function () {
    formulario.addEventListener('submit', validarFormulario);
}


function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda  = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        mostrarAlerta('Escribe un término de búsqueda');
        return;
    }

    buscarImagenes();


}

function mostrarAlerta(mensaje){

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

function buscarImagenes() {

    const termino  = document.querySelector('#termino').value;

    const key = '24427618-6289700480caf6befe5882dd8';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}&page=${paginaActual}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            totalPaginas = calcularPaginas(data.totalHits);
            console.log(totalPaginas);
            mostrarImagenes(data.hits);
        })

}

//Este generador registra la cantidad de elementos de acuerdo a las páginas

function *crearPaginador(total){

    for (let i = 1; i <= total; i++) {
        yield i;
    }
}

function calcularPaginas(total){
    return parseInt(Math.ceil(total / registrosPorPagina));
}

function mostrarImagenes(imagenes) {

    //Limpiar resultado anterior

    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    //Verificar si hay resultados

    if (imagenes.length === 0) {
        mostrarAlerta('No se encontraron resultados');
        return;
    }

    //Imprimir resultados

    
    imagenes.forEach(imagen => {

        const { previewURL, likes, views, largeImageURL } = imagen; //desestructura el atributo previewURL
        

        resultado.innerHTML += `

                <div class="card-container">
                    <div class="card card-image">
                        <img src="${previewURL}" alt="Imagen">
                        <div class="card-body">
                            <p class="card-text">
                                <span class="font-weight-bold">Likes: </span>
                                ${likes}
                            </p>
                            <p class="card-text">
                                <span class="font-weight-bold">Veces vista: </span>
                                ${views}
                            </p>
                            <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer" class="btn btn-block btn-verimagen">Ver imagen</a>
                        </div>
                    </div>
                </div>
        
        `;



    });

    //Limpiar paginador anterior
    while (paginacionDiv.firstChild) {
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }

    imprimirPaginador();

}

//Generar paginador 
function imprimirPaginador(){
    
    iterador = crearPaginador(totalPaginas);

    while(true){
        const {value, done} = iterador.next();

        if(done){
            return;
        }

        const btnPagina = document.createElement('a');
        btnPagina.href = '#';
        btnPagina.dataset.pagina = value;
        btnPagina.textContent = value;
        btnPagina.classList.add('btn', 'btn-pagina', 'btn-pagina');

        btnPagina.onclick = () => {
            paginaActual = value;
            buscarImagenes();
        }

        paginacionDiv.appendChild(btnPagina);
    }


}