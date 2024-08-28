//---------------------Declaracion de variables ---------------------

let respuestasCorrectas = 0; 
let respuestasIncorrectas = 0;
let resultadoFinal = 0;


//---------------------FIN de declaracion de variables ---------------------
//---------------------Declaracion de funciones ---------------------

function darComienzo(){ //Da comienzo al programa
    const nivelSeleccionado = document.getElementById("nivel"); //Rescato el valor que me da el select del formulario del documento html
    let preguntasSeleccionadas = []; //Creo un array vacio para poder luego colocar ahi las preguntas de la dificultad que eligio el usuario

    switch(nivelSeleccionado){ //Este bucle sirve para ver que tipo de preguntas eligio el usuario
        case "facil":
            preguntasSeleccionadas = preguntasFaciles; // Se rellena el array de preguntasSeleccionadas con la correspondiente a la dificultad
            break;
        case "intermedio":
            preguntasSeleccionadas = preguntasIntermedias;
            break;
        case "dificiles":
            preguntasSeleccionadas = preguntasDificiles;
            break;
    }
    mostrarPreguntas(preguntasSeleccionadas); //Aqui muestro las preguntas que eligio el usuario a traves de una función 
}

function mostrarPreguntas(seleccionDePreguntas){
    const contenedorPreguntas = document.getElementById("preguntas")
}

// hacer un bucle para recorrer las preguntas y mostralas en pantalla
// Crear una variable que me permita crear elementos dentro del documento html para colocar una plantulla literal
// Luego el contenedor de la pregunta lo tengo que agregar al html como tal por cada interaccion en el bucle con las preguntas 
//

//luego hacer una funcion de validacion para las preguntas
//Preguntas seleccionadas son un objeto y por lo tanto tengo que recorrer nuevamente para dar con la respuesta correcta que proximamente quiero que este en un archivo json
//Tengo que tomar el valor del documento hmtl que me proporciono en la seleccion el usuario para poder validar la respuesta correcta

//Creo otra funcion que muestre la respuesta
//Una vez que tenga el valor de la respuesta correcta, envio un mensaje al usuario a traves de una creacion de elemento desde js en el html 