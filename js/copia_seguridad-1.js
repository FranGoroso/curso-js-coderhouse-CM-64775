//---------------------Declaracion de variables ---------------------

let respuestasCorrectas = 0; 
let respuestasIncorrectas = 0;
let resultadoFinal = 0;


//---------------------FIN de declaracion de variables ---------------------

//---------------------Declaracion de funciones ---------------------
function mostrarPreguntas(preguntas){    //Muestra las preguntas una vez que la funcion 'darComienzo' ya este ejecutada 
    for(let i = 0; i < preguntas.length; i++){ 
        console.log(preguntas[i].pregunta); //Creo un bucle for para visualizar todas las preguntas 
        for(let j = 0; j < preguntas[i].opciones.length; j++){ //Creo otro bucle para visualizar todas las opciones de las preguntas
            console.log(preguntas[i].opciones[j]); 
        }
        let respuesta = prompt("Escribe la letra de la respuesta correcta:"); //Le solicito al usuario datos para que coloque la letra de la respuesta correcta
        if (respuesta === preguntas[i].respuestaCorrecta) { //Valido si la respuesta es correcta o no y le hago saber si esta bien
            alert("¡Correcto!");
            respuestasCorrectas++; // Actualizo la variable si la respuesta es correcta
        } else {
            alert("Incorrecto. La respuesta correcta era: " + preguntas[i].respuestaCorrecta);
            respuestasIncorrectas++; // Actualizo la variable si la respuesta es incorrecta 
        }
    }
}

function darComienzo(){ //Da comienzo al programa como tal y se le pregunta la usuario que nivel de dificultad desea
    let respuesta = prompt('¿Comenzamos? Tienes 3 niveles de dificultad y tienes que elegir cual quieres hacer: \n' + 
        '\n' + 'NIVEL FACIL: Presiona el nro 1' + '\n' + 'NIVEL INTERMEDIO: Presiona el nro 2' + '\n' + 'NIVEL DIFICIL: Presiona el nro 3' + '\n' 
        + '\n \n (Para poder visualizar de manera correcta todas las preguntas, tienes que abrir la consola del navegador con el boton F12 de tu teclado)')

    if(respuesta == 1){
        mostrarPreguntas(preguntasFaciles);
    } 
    else if(respuesta == 2){
        mostrarPreguntas(preguntasIntermedias);
    }
    else if(respuesta == 3){
        mostrarPreguntas(preguntasDificiles);
    }
    else{
        alert('¡Tienes que colocar los números del 1 al 3, no otra cosa!');
        return darComienzo();  // Repite la elección si no se ingresa una opción válida
    }

    mostrarResultados();  // Muestra los resultados al final del cuestionario, los resulltados serian la cantidad de preguntas correctas y de preguntass incorectas
}

function mostrarResultados(){
    alert('La cantidad de preguntas correctas es: ' + respuestasCorrectas + '\n' +
          'La cantidad de preguntas incorrectas es: ' + respuestasIncorrectas);
    validarAprobacion(); // Validamos si el usuario tiene un promedio de aprobado o si tiene que repetir el cuestionario 
}

function validarAprobacion(){
    let totalPreguntas = respuestasCorrectas + respuestasIncorrectas; // Sumando el total de preguntas correctas e incorrectas, sacamos el 100% de cuantas preguntas son
    let porcentaje = (respuestasCorrectas / totalPreguntas) * 100; //Sacamos el porcentaje para saber si esta aprobado o no

    if (porcentaje >= 70) {
        alert('¡Felicidades, has aprobado con un ' + porcentaje + '% de respuestas correctas!');
    } else {
        alert('Lo siento, has reprobado con un ' + porcentaje + '% de respuestas correctas. ¡Sigue practicando!');
    }
    resetearJuego();  // Resetea el juego después de mostrar los resultados
}

function resetearJuego(){ // Con esta funcion se le solicita al usuario si quiere reiniciar el juego si asi lo desea 
    respuestasCorrectas = 0;
    respuestasIncorrectas = 0;
    if(confirm("¿Quieres jugar de nuevo?")) {
        darComienzo();
    } else {
        alert("Gracias por jugar. ¡Hasta la próxima!");
    }
}

//---------------------INICIO del juego ---------------------

darComienzo();
