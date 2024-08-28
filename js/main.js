//---------------------Declaracion de variables ---------------------

let respuestasCorrectas = 0; 
let respuestasIncorrectas = 0;
let resultadoFinal = 0;


//---------------------FIN de declaracion de variables ---------------------
//---------------------Declaracion de funciones ---------------------

function darComienzo(){
    const nivelSeleccionado = document.getElementById("nivel");
    let preguntasSeleccionadas = [];

    switch(nivelSeleccionado){
        case "facil":
            preguntasSeleccionadas = preguntasFaciles;
            break;
        case "intermedio":
            preguntasSeleccionadas = preguntasIntermedias;
            break;
        case "dificiles":
            preguntasSeleccionadas = preguntasDificiles;
            break;
    }
    mostrarPreguntas(preguntasSeleccionadas)

}