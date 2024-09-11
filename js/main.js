//PROXIMAMENTE: Crear un JSON con todas las preguntas o asociarlo a una API ya existente
//               Despues mejorar toda la parte visual del programa y añadirle graficos de barras o algo asi

//Traigo las preguntas faciles desde mi archivo JSON 
async function cargarPreguntasFaciles(){
    try {
        const response = await fetch("/data/preguntasFaciles.json");
        if(!response.ok){
            throw new Error("No se pueden cargar las preguntas, intenta nuevamente en unos minutos");
        };
        const data = await response.json(); 
        return data;
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
        return data;
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
        return data;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};


document.getElementById("btnComenzar").addEventListener("click", darComienzo);
let respuestasCorrectas = 0;

async function darComienzo(){ 
    localStorage.clear(); //Aca borro todas las respuestas guardadas anteriormente

    let nivelSeleccionado = seleccionarDificultad();
    let preguntasFiltradas = await filtrarPreguntasPorDificultad(nivelSeleccionado);
    mostrarPreguntas(preguntasFiltradas);
};

document.getElementById("mostrarResultadoBtn").addEventListener("click", function() {
    let nivelSeleccionado = seleccionarDificultad();
    let preguntasFiltradas = filtrarPreguntasPorDificultad(nivelSeleccionado);
    respuestasCorrectas = validarRespuestas(preguntasFiltradas);
    mostrarResultado(respuestasCorrectas, preguntasFiltradas.length);
});




function seleccionarDificultad(){
    return document.getElementById("nivel").value; //Tomo el valor seleccionado por el usuario en el DOM (Nivel de dificultad)
};




async function filtrarPreguntasPorDificultad(nvlDif) { 

    //Carga las preguntas en las variables para que puedan ser utilizadas
    let preguntasFaciles = await cargarPreguntasFaciles();
    let preguntasIntermedias = await cargarPreguntasIntermedias();
    let preguntasDificiles = await cargarPreguntasDificiles();

    // Filtra las preguntas según la dificultad seleccionada por el usuario

    switch(nvlDif) {
        case "facil":
            return preguntasFaciles;
        case "intermedio":
            return preguntasIntermedias;
        case "dificil":
            return preguntasDificiles;
        default:
            return preguntasFaciles; // Valor por defecto si no se selecciona un nivel válido
    }
};




function crearContenedorPreguntas(preguntas){
    let contenedorPreguntas = document.createElement("div"); // Crea un div contenedor para mostrar las preguntas en el DOM

    preguntas.forEach((e, i) => { 
        let textoPregunta = document.createElement("p"); // Crea un elemento en el DOM el cual se guarda en la variable
        textoPregunta.textContent = `${i + 1}. ${e.pregunta}`; // Modifico el el contenido de texto que esta en la variable del DOM (i es el indice {el cual muestra el numero de la pregunta y e.pregunta es la pregunta como tal que al estar en el bucle, las recorre todas})
        contenedorPreguntas.appendChild(textoPregunta); // Aqui agrego en cada iteracion, el texto de la oregunta al contenedor que va a tener las preguntas y opciones mas adelante

        let contenedorOpciones = crearContenedorOpciones(e.opciones, i); // Creo un contenedor para las opciones (en cada iteracion e.opciones, va a recorrer todas, y la i seria como el identificador el cual se asocia a cada pregunta, esto tiene que ver con la funcion de crearContenedorOpciones)
        contenedorPreguntas.appendChild(contenedorOpciones); // Cumplo el objetivo y agrego las opciones al contenedor principal que tambien tiene las preguntas, ahora "contenedorPreguntas" tiene todo
    });

    return contenedorPreguntas; // Retorna el contenedor de preguntas oon las opciones tambien
};




function crearContenedorOpciones(opciones, index){
    let contenedorOpciones = document.createElement("div"); 

    let respuestaGuardada = localStorage.getItem(`respuesta_pregunta_${index}`); //Recuperando la respuesta que estaba guardada en el local storage

    opciones.forEach(opcion => {
        let opcionesElemento = document.createElement("label"); //Creo un label en el DOM para poder asocioarlo a cada pregunta
        let inputOpcion = document.createElement("input"); // Esto es para seleccionar opciones
        inputOpcion.type = "radio"; // Para que la opcion sea redonda 
        inputOpcion.name = `pregunta${index}`; // Asociando las preguntas a las opciones para que tengan UNA SOLA OPCION
        inputOpcion.value = opcion; // Se agrega el valor que quiero tener en la opcion seleccionada por el usuario, para validar que realmente sea correcto

        if (opcion === respuestaGuardada){
            inputOpcion.checked = true; //Si la opcion conicide con la respuestaGuardada, se volvera a cargar la opcion con la opcion "marcada", (eso se logra con el .checked)
        };
        
        opcionesElemento.appendChild(inputOpcion);
        opcionesElemento.appendChild(document.createTextNode(opcion));
        contenedorOpciones.appendChild(opcionesElemento);
        contenedorOpciones.appendChild(document.createElement("br"))
    });

    return contenedorOpciones;
};


function mostrarPreguntas(preguntas){
    let contenedorPreguntas = crearContenedorPreguntas(preguntas);
    let contenedorPrincipal = document.getElementById("preguntas");
    contenedorPrincipal.innerHTML = ""; // Esto limpia las preguntas anteriores
    contenedorPrincipal.appendChild(contenedorPreguntas);
};




function validarRespuestas(preguntas) {
    let correctas = 0;

    preguntas.forEach((pregunta, index) => {
        let seleccionada = document.querySelector(`input[name="pregunta${index}"]:checked`);
        
        if(seleccionada) { // Esto verifica si el usuario selecciono una opcion para la pregunta actual (True si selecciono, y si no selecciono seria False)
            localStorage.setItem(`respuesta_pregunta_${index}`/*EJ: respuesta_pregunta_2*/, seleccionada.value);
            
            if(seleccionada.value[0] === pregunta.respuestaCorrecta){
                correctas++
            }; //seleccionada.value[0], es para que me devuelva el primer carácter del string, y si cada opcion empieza con una letra (Ej: a) Es un bucle que itera por cada... ), entonces tomará la letra "a", asociada a la opcion de la pregunta
        }           /*Cabe destacar que tambien podria corregir la sintaxis de las preguntas del array que las contien y directamente respuestaCorrecta, puede ser la respuesta completa en vez de la letra, entonces no haria falta el uso indice*/ 
    });

    return correctas;
}


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
document.getElementById("mostrarResultadoBtn").addEventListener("click", function() {
    let nivelSeleccionado = seleccionarDificultad();
    let preguntasFiltradas = filtrarPreguntasPorDificultad(nivelSeleccionado);
    let cantidadTotalPreguntas = preguntasFiltradas.length; // Definir cantidadTotalPreguntas

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
