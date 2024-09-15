/*------------------ TODOS LOS EVENTOS: ----------------*/ 
// Vincular el botón a la función darComienzo cuando se hace clic
document.getElementById("btnComenzar").addEventListener("click", darComienzo);

//Esto es para cargar los datos anteriores del usuario si es que existian 
document.addEventListener("DOMContentLoaded", cargarResultadoPrevio);

// Cuando se toca el botón de mostrar resultados
document.getElementById("mostrarResultadoBtn").addEventListener("click", async function() {
    // Detener el temporizador
    clearInterval(intervaloTemporizador);

    let nivelSeleccionado = seleccionarDificultad();
    let preguntasFiltradas = await filtrarPreguntasPorDificultad(nivelSeleccionado);
    let cantidadTotalPreguntas = preguntasFiltradas[nivelSeleccionado].length;

    let respuestasCorrectas = validarRespuestas(preguntasFiltradas[nivelSeleccionado]);
    mostrarResultado(respuestasCorrectas, cantidadTotalPreguntas);
});

/*------------------ FIN DE LOS EVENTOS ----------------*/ 


// Función para obtener preguntas aleatorias de un array dado
function obtenerPreguntasAleatorias(preguntas, numeroDePreguntas) {
    const preguntasAleatorias = [];
    const preguntasCopia = [...preguntas];
    
    while (preguntasAleatorias.length < numeroDePreguntas && preguntasCopia.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * preguntasCopia.length);
        preguntasAleatorias.push(preguntasCopia.splice(indiceAleatorio, 1)[0]);
    }
    
    return preguntasAleatorias;
}



// Declarar globalmente el intervalo del temporizador
let intervaloTemporizador;

function iniciarTemporizador(duracion, preguntas) {
    let tiempoRestante = duracion;
    let temporizadorElemento = document.getElementById("temporizador");

    // Limpiar cualquier temporizador previo para evitar múltiples intervalos
    if (intervaloTemporizador) {
        clearInterval(intervaloTemporizador);
    }

    // Iniciar el temporizador
    intervaloTemporizador = setInterval(() => {
        if (tiempoRestante <= 0) {
            clearInterval(intervaloTemporizador); // Detener el temporizador cuando llegue a 0

            // Mostrar el cartel de tiempo agotado
            Swal.fire({
                title: "Tiempo agotado",
                text: "El tiempo ha finalizado. Se mostrarán los resultados obtenidos.",
                icon: "info",
                confirmButtonText: "Aceptar"
            }).then(() => {
                // Después de que el usuario haga clic en "Aceptar", mostramos el resultado
                finalizarCuestionario(preguntas);
            });

        } else {
            temporizadorElemento.textContent = `Tiempo restante: ${tiempoRestante} segundos`;
            tiempoRestante--;
        }
    }, 1000);
}


//Funcion para detener el cuestionario si tocamos boton o se acaba el tiempo
function finalizarCuestionario(preguntas) {
    // Detener el temporizador
    clearInterval(intervaloTemporizador);

    let respuestasCorrectas = validarRespuestas(preguntas);
    let cantidadTotalPreguntas = preguntas.length;
    mostrarResultado(respuestasCorrectas, cantidadTotalPreguntas); 
}

//Funcion para controlar errores de manera linda al usuario
function mostrarError(error){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error}`,
      });
};




// Funcion para cargar el resultado anterior para mostrarle al usuario donde habia dejado todo
function cargarResultadoPrevio() {
    const sesionActiva = localStorage.getItem('sesionActiva');
    if (!sesionActiva) {
        const resultadoPrevio = localStorage.getItem("resultado");
        if (resultadoPrevio) {
            const { respuestasCorrectas, cantidadTotalPreguntas, nivel } = JSON.parse(resultadoPrevio);
            // mostrarResultado(respuestasCorrectas, cantidadTotalPreguntas); //Innecesario mostrar el resultado cuando se carga nuevamente la página, es molesto
            document.getElementById("nivel").value = nivel;
        }
    }
}


// Función que se llama cuando se inicia el cuestionario
async function darComienzo() {
    localStorage.clear(); // Limpio el localStorage antes de comenzar
    localStorage.setItem('sesionActiva', 'true'); // Marca la sesión como activa
    let nivelSeleccionado = seleccionarDificultad();
    let preguntasPorNivel = await filtrarPreguntasPorDificultad(nivelSeleccionado);

    if (!preguntasPorNivel[nivelSeleccionado] || preguntasPorNivel[nivelSeleccionado].length === 0) {
        // Si no hay preguntas cargadas para el nivel seleccionado, o si tuvo algun fallo al cargar
        mostrarError("No hay preguntas disponibles para el nivel seleccionado.");
        return;
    }

    let preguntasFiltradas = preguntasPorNivel[nivelSeleccionado];
    preguntasFiltradas = mezclarPreguntas(preguntasFiltradas); 

    mostrarPreguntas(preguntasFiltradas); 
    document.getElementById("mostrarResultadoBtn").style.display = "block"; // Muestro el botón de resultado

    iniciarTemporizador(120, preguntasFiltradas); // Aca puedo configurar cuanto tiempo va a durar el temporizador 
};





// Selecciono la dificultad solicitada por el usuario
function seleccionarDificultad(){
    return document.getElementById("nivel").value; 
};


// Funcion para cargar preguntas 
async function cargarPreguntasPorNivel(nivel) {
    try {
        let response;

        switch (nivel) {
            case "facil":
                response = await fetch("/data/preguntasFaciles.json");
                break;
            case "intermedio":
                response = await fetch("/data/preguntasIntermedias.json");
                break;
            case "dificil":
                response = await fetch("/data/preguntasDificiles.json");
                break;
            default:
                throw new Error("Nivel no válido");
        }

        if (!response.ok) {
            throw new Error(`Error al cargar preguntas para el nivel ${nivel}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [data]; //Convierto los objetos de preguntas en un array para poder laburarlos
    } catch (error) {
        mostrarError(`No se pudieron cargar las preguntas para el nivel ${nivel}.`);
        return [];
    }
}


// Función para filtrar y obtener preguntas de todos los niveles con 15 preguntas por nivel
async function filtrarPreguntasPorDificultad(nivelSeleccionado) {
    const niveles = ['facil', 'intermedio', 'dificil'];
    const preguntasFiltradas = {};
    
    for (const nivel of niveles) {
        let preguntas = await cargarPreguntasPorNivel(nivel);
        if (preguntas.length === 0) {
            mostrarError(`No se pudieron cargar las preguntas para el nivel ${nivel}.`);
            continue;
        }
        preguntasFiltradas[nivel] = obtenerPreguntasAleatorias(preguntas, 15); //Aca marco la cantidad de preguntas que quiero 
    }
    
    return preguntasFiltradas;
}




// Función para crear un div contenedor en el DOM para visualizar las preguntas de manera clara para el usuario 
function crearContenedorPreguntas(preguntas) {
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


// Función para mostrar preguntas en los contenedores creados para el DOM
function mostrarPreguntas(preguntas) {
    let contenedorPreguntas = crearContenedorPreguntas(preguntas);
    let contenedorPrincipal = document.getElementById("preguntas");
    contenedorPrincipal.innerHTML = ""; 
    contenedorPrincipal.appendChild(contenedorPreguntas);
};


/*REHACIENDO LA FUNCION PORQUE NO VA BIEN.*/ 
function validarRespuestas(preguntas) {
}





// Función para mostrar los resultados de las respuestas y avisar si el usuario aprobó o no
function mostrarResultado(respuestasCorrectas, cantidadTotalPreguntas) {
    let porcentaje = (respuestasCorrectas / cantidadTotalPreguntas) * 100;
    let estado = porcentaje >= 60 ? "aprobado" : "desaprobado";
    let mensaje = `Has respondido correctamente ${respuestasCorrectas} de ${cantidadTotalPreguntas} preguntas (${porcentaje.toFixed(2)}%).`;

    Swal.fire({
        title: `¡${estado === "aprobado" ? "Felicitaciones" : "Lo siento"}!`,
        text: `${mensaje} Estás ${estado}.`,
        icon: estado === "aprobado" ? "success" : "error",
        confirmButtonText: 'Aceptar',
        customClass: {
            popup: estado === "aprobado" ? 'swal-aprobado' : 'swal-desaprobado',
            confirmButton: 'swal-button',
            title: 'swal-title',
        }
    }).then(() => {
        // Limpiar el contenido del cuestionario y ocultar el botón de resultado
        document.getElementById("preguntas").innerHTML = "";
        document.getElementById("mostrarResultadoBtn").style.display = "none";
        document.getElementById("temporizador").textContent = ""; // Reinicia el temporizador en pantalla
    });

    localStorage.setItem("resultado", JSON.stringify({
        respuestasCorrectas: respuestasCorrectas,
        cantidadTotalPreguntas: cantidadTotalPreguntas,
        nivel: seleccionarDificultad()
    }));

    localStorage.removeItem('sesionActiva'); // Limpiar la bandera de sesión
}


//Funcion para mezclar todas las preguntas y que no salgan siempre igual a la hora de hacer el cuestionario
function mezclarPreguntas(preguntas) {
    for (let i = preguntas.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Número aleatorio entre 0 e i
        [preguntas[i], preguntas[j]] = [preguntas[j], preguntas[i]]; // Intercambio de posiciones
    }
    return preguntas;
}


