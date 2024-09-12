//Traigo las preguntas faciles desde mi archivo JSON 
async function cargarPreguntasFaciles(){
    try {
        const response = await fetch("/data/preguntasFaciles.json");
        if(!response.ok){
            throw new Error("No se pueden cargar las preguntas, intenta nuevamente en unos minutos");
        };
        const data = await response.json(); 
        return Array.isArray(data) ? data : [data];
    }catch (error){
        console.error("Error:", error);
        return [];
    }
};


//Traigo las preguntas intermedias desde mi archivo JSON 
async function cargarPreguntasIntermedias() {
    try {
        const response = await fetch("/data/preguntasIntermedias.json");
        if (!response.ok) {
            throw new Error("No se pueden cargar las preguntas, intenta nuevamente en unos minutos");
        }
        const data = await response.json();
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};


//Traigo las preguntas dificiles desde mi archivo JSON 
async function cargarPreguntasDificiles() {
    try {
        const response = await fetch("/data/preguntasDificiles.json");
        if (!response.ok) {
            throw new Error("No se pueden cargar las preguntas, intenta nuevamente en unos minutos");
        }
        const data = await response.json();
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};



// Vincular el botón a la función darComienzo cuando se hace clic
document.getElementById("btnComenzar").addEventListener("click", darComienzo);
let respuestasCorrectas = 0;

async function darComienzo(){ 
    localStorage.clear(); //Elimino las preguntas anteriores guardadas en el local storage

    let nivelSeleccionado = seleccionarDificultad();
    let preguntasFiltradas = await filtrarPreguntasPorDificultad(nivelSeleccionado);
    mostrarPreguntas(preguntasFiltradas);
};


// Vincular el botón a la función mostrarResultado cuando se hace clic
document.getElementById("mostrarResultadoBtn").addEventListener("click", async function() { 
    let nivelSeleccionado = seleccionarDificultad();
    let preguntasFiltradas = await filtrarPreguntasPorDificultad(nivelSeleccionado);
    let cantidadTotalPreguntas = preguntasFiltradas.length;

    respuestasCorrectas = validarRespuestas(preguntasFiltradas);
    mostrarResultado(respuestasCorrectas, cantidadTotalPreguntas);
});




// Selecciono la dificultad solicitada por el usuario
function seleccionarDificultad(){
    return document.getElementById("nivel").value; 
};



// Funcion asincrónica (porque trae promesas del JSON) que filtra las preguntas por dificultad
async function filtrarPreguntasPorDificultad(nvlDif) { 
    let preguntasFaciles = await cargarPreguntasFaciles();
    let preguntasIntermedias = await cargarPreguntasIntermedias();
    let preguntasDificiles = await cargarPreguntasDificiles();

    let preguntasFiltradas;

    switch(nvlDif) {
        case "facil":
            preguntasFiltradas = preguntasFaciles;
            break;
        case "intermedio":
            preguntasFiltradas = preguntasIntermedias;
            break;
        case "dificil":
            preguntasFiltradas = preguntasDificiles;
            break;
        default:
            preguntasFiltradas = preguntasFaciles;
    }

    return Array.isArray(preguntasFiltradas) ? preguntasFiltradas : [];
};




// Crea un div contenedor en el DOM para visualizar las preguntas de manera clara para el usuario 
function crearContenedorPreguntas(preguntas){
    let contenedorPreguntas = document.createElement("div"); 

    preguntas.forEach((e, i) => { 
        let textoPregunta = document.createElement("p"); 
        textoPregunta.textContent = `${i + 1}. ${e.pregunta}`; 
        contenedorPreguntas.appendChild(textoPregunta); 

        let contenedorOpciones = crearContenedorOpciones(e.opciones, i); 
        contenedorPreguntas.appendChild(contenedorOpciones); 
    });

    return contenedorPreguntas; 
};



// Crea un div contenedor en el DOM para visualizar las opciones de manera clara para el usuario 

function crearContenedorOpciones(opciones, index){
    let contenedorOpciones = document.createElement("div"); 

    let respuestaGuardada = localStorage.getItem(`respuesta_pregunta_${index}`);

    opciones.forEach(opcion => {
        let opcionesElemento = document.createElement("label"); 
        let inputOpcion = document.createElement("input"); 
        inputOpcion.type = "radio";  
        inputOpcion.name = `pregunta${index}`; 
        inputOpcion.value = opcion; 

        if (opcion === respuestaGuardada){
            inputOpcion.checked = true;
        };
        
        opcionesElemento.appendChild(inputOpcion);
        opcionesElemento.appendChild(document.createTextNode(opcion));
        contenedorOpciones.appendChild(opcionesElemento);
        contenedorOpciones.appendChild(document.createElement("br"))
    });

    return contenedorOpciones;
};


// Funcion para mostrar preguntas en los contenedores creados para el DOM
function mostrarPreguntas(preguntas){
    let contenedorPreguntas = crearContenedorPreguntas(preguntas);
    let contenedorPrincipal = document.getElementById("preguntas");
    contenedorPrincipal.innerHTML = ""; 
    contenedorPrincipal.appendChild(contenedorPreguntas);
};



// Función para validar las respuestas del usuario 
function validarRespuestas(preguntas) {
    let correctas = 0;

    preguntas.forEach((pregunta, index) => {
        let seleccionada = document.querySelector(`input[name="pregunta${index}"]:checked`);
        
        if(seleccionada) { 
            localStorage.setItem(`respuesta_pregunta_${index}`, seleccionada.value);
            
            if(seleccionada.value[0] === pregunta.respuestaCorrecta){
                correctas++
            }; 
        }            
    });

    return correctas;
}


// Función para mostrar los resultados de las respuestas y decir si esta aprobado o no 
function mostrarResultado(respuestasCorrectas, cantidadTotalPreguntas) {
    let contenedorResultados = document.createElement("div");
    let textoResultados = document.createElement("p");

    let porcentaje = (respuestasCorrectas / cantidadTotalPreguntas) * 100;
    let estado = "";
    if(porcentaje >= 60){
        estado = "aprobado"
    }else{
        estado = "desaprobado"
    };

    textoResultados.textContent = `Has respondido correctamente ${respuestasCorrectas} de ${cantidadTotalPreguntas} preguntas (${porcentaje.toFixed(2)}%). Estás ${estado}.`;

    contenedorResultados.appendChild(textoResultados);

    let contenedorPrincipal = document.getElementById("resultado");
    contenedorPrincipal.innerHTML = "";
    contenedorPrincipal.appendChild(contenedorResultados);
}

// Vincular el botón a la función mostrarResultado cuando se hace clic
document.getElementById("mostrarResultadoBtn").addEventListener("click", async function() {
    let nivelSeleccionado = seleccionarDificultad();
    let preguntasFiltradas = await filtrarPreguntasPorDificultad(nivelSeleccionado);

    let cantidadTotalPreguntas = preguntasFiltradas.length; 

    respuestasCorrectas = validarRespuestas(preguntasFiltradas);
    mostrarResultado(respuestasCorrectas, cantidadTotalPreguntas);
});


/*COSAS PENDIENTES PARA HACER EN EL PROYECTO:

-CREAR UNA API PROPIA DE LAS PREGUNTAS EN JSON, SUBIRLO A MI GITHUB Y TOMAR INFO DESDE ESE REPOSITORIO QUE VOY A SUBIR (API PROPIA)
-Usar las funciones async y await, junto con .then para actualizar el codigo 
-Utilizar constructores y estudiarlos más
-Utilizar manejo de excepciones y errores con try, catch y finally 
-QUE SERIA REJECT? 
-Porque utilizo err y error en catch y porque no va con un try antes? 
- Hacer un LOGIN para las preguntas y que cada usuario tenga su contraseña y pueda ver los puntajes más altos de los demás usuarios (Tabla de puntajes)
- Colocar un TEMPORIZADOR DEPENDIENDO LA DIFICULTAD Y LA CANTIDAD DE PREGUNTAS SELECCIONADAS POR EL USUARIO 
- Permitirle al usuario seleccionar la dificultad y tambien la cantidad de preguntas totales 
- Solicitarle al usuario un correo electrónico para poder hacer email marketing, saludarlos y darles las gracias a cada uno por participar de mi proyecto.
    y tambien enviarles mi CV y página web por si la desean visitar

- Hacer un README explicando lo que hace el codigo y como lo hace 
- Agregarle GIFT a el proyecto para hacerlo mas divertido, dinamico e interactivo al usuario 
*/ 


/*PARA PROYECTO FINAL: 
1) 2 arhcivos Javascript para manejar la interfaz gráfica del simulador 
2) Un archivo en JSON que simule mi base de datos
3) Incluir carpeta de assets para imagenes de mi simulador 
4) Hacer un README para que se comprenda el proyecto 
5) Tengo que usar una libreria de cualquier cosa
6) Codigo claro, sin muchos comentarios que puedan complejizar la lectura y comprension de mi código (solo los comentarios necesarios)
7) Validar CONTROL DE ERRORES y si hay algún error, mostrarlo por la interfaz y no por la consola 
8) - COMPLEJO + DINÁMICO 
9) 

*/
