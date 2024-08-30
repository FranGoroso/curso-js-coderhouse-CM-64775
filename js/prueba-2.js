//Hacer un programa el cual divida muy bien las funciones para hacerlo mas facil de comprender

// DECLARAR VARIABLES 
//1ERA FUNCION:  Dar comienzo al programa 
//2DA FUNCION: Seleccionar dificultad
//3RA FUNCION: Mostrar las preguntas correspondientes a la dificultad seleccionada
//4TA FUNCION: Crear contenedores en JS a traves del DOM para todo lo que necesite
//5TA FUNCION: Validar respuesta    
//6TA FUNCION: Mostrar resultados 

//PROXIMAMENTE: Crear un JSON con todas las preguntas o asociarlo a una API ya existente
//               Despues mejorar toda la parte visual del programa y añadirle graficos de barras o algo asi

document.getElementById("btnComenzar").addEventListener("clik", darComienzo); //Cuando el boton sea ejecutado por el usuario, el programa dara comienzo

function darComienzo(){
    let nivelSeleccionado = document.getElementById("nivel").value //Tomo el valor seleccionado por el usuario en el DOM (Nivel de dificultad)

    function seleccionNivel(nvl){ //Esta funcion selecciona la dificultad que el usuario eligio con sus respectivas preguntas
        switch(nvl){
            case "facil": 
            nvl = "facil"
            break;
            case "intermedio": 
            nvl = "intermedio"
            break;
            case "dificil": 
            nvl = "dificil"
            break;
        };

        return nvl // Retorna el valor pasado por parametros de la funcion
    };

    let dificultad = seleccionNivel(nivelSeleccionado); // En esta variable se guarda el nivel de dificultad a traves de la funcion
    mostrarPreguntas(dificultad);
};