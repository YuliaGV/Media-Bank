import * as UI from './interfaz.js';


class API{

    constructor(artista, cancion){
        this.artista = artista;
        this.cancion = cancion;
    }

    consultarAPI(){
        
        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

        fetch(url)
            .then( res => res.json() )
            .then( resultado =>{

                if(resultado.lyrics) {
                    // La canción existe
                    const { lyrics } = resultado;
                    UI.divResultado.textContent = lyrics;
               } else {
                    // La canción no existe
                    UI.divMensajes.innerHTML = 'La canción No existe, prueba con otra búsqueda';
                    UI.divMensajes.classList.add('error');
                    setTimeout(() => {
                         UI.divMensajes.innerHTML = '';
                         UI.divMensajes.classList.remove('error');
                         UI.formularioBuscar.reset();
                    }, 3000);
               }
          })
          .catch(error => console.log(error))
    }
    

}


export default API;