/*------------------ TODOS LOS EVENTOS: ----------------*/ 
// Vincular el botón a la función darComienzo cuando se hace clic
document.getElementById("btnComenzar").addEventListener("click", darComienzo);

//Esto es para cargar los datos anteriores del usuario si es que existian 
document.addEventListener("DOMContentLoaded", cargarResultadoPrevio);

//Esto cierra la sesion de usuario al tocar el boton
document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);

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

// // Llamar a la función cuando la página se haya cargado
// document.addEventListener("DOMContentLoaded", solicitarNombreUsuario);

/*------------------ FIN DE LOS EVENTOS ----------------*/ 


/*NOMBRE DE TODAS LAS FUNCIONES PARA BUSCAR EN LA BARRA DE BUSQUEDA: (Solo para correccion) 
obtenerPreguntasAleatorias (DESHABILITADA MOMENTANEAMENTE)
iniciarTemporizador
finalizarCuestionario
mostrarError
cargarResultadoPrevio
darComienzo
seleccionarDificultad
cargarPreguntasPorNivel
filtrarPreguntasPorDificultad
crearContenedorPreguntas
crearContenedorOpciones
mostrarPreguntas
validarRespuestas
mostrarResultado
mezclarPreguntas
solicitarNombreUsuario
mostrarMensajeBienvenida
cerrarSesion
*/


//Funcion para solicitar nombre del usuario 
function solicitarNombreUsuario() {
    // Verificar si el nombre ya está guardado en localStorage
    let nombreGuardado = localStorage.getItem('nombreUsuario');
  
    if (nombreGuardado) {
      // Si el nombre ya está guardado, mostrar el mensaje de bienvenida
      mostrarMensajeBienvenida(nombreGuardado);
    } else {
      // Si no hay nombre guardado, pedirlo al usuario
      Swal.fire({
        title: 'Ingresa tu nombre',
        input: 'text',
        inputPlaceholder: 'Escribe tu nombre',
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        inputValidator: (value) => {
          if (!value) {
            return '¡Por favor, ingresa un nombre!';
          }
        }
      }).then((result) => {
        let nombre = result.value.toLowerCase();
  
        //MENSAJE PERSONALIZADO 
        if (nombre === "javi" || nombre === "maxi") {
          Swal.fire({
            title: `¿Sos el ${nombre === 'javi' ? 'profe' : 'tutor'} de mi curso?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, soy yo',
            cancelButtonText: 'No',
          }).then((confirmResult) => {
            if (confirmResult.isConfirmed) {
              let mensajePersonalizado = nombre === "javi" 
                ? "Hola, crack de la vida. Gracias por enseñarme a hacer todo esto. ¡Sos un genio!"
                : "Hola Maxi! Gracias por aportar siempre y ser alto tutor! ¡Ídolo!";
                
              Swal.fire({
                title: '¡Bienvenido!',
                text: mensajePersonalizado,
                icon: 'success',
                confirmButtonText: 'Aceptar',
              });
            } else {
              Swal.fire({
                title: 'Bienvenido de todos modos',
                text: `Hola ${nombre.charAt(0).toUpperCase() + nombre.slice(1)}!`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
              });
            }
          });
        } else {
          Swal.fire({
            title: '¡Bienvenido!',
            text: `Hola ${nombre.charAt(0).toUpperCase() + nombre.slice(1)}!`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        }
  
        // Guardar el nombre en localStorage
        localStorage.setItem('nombreUsuario', result.value);
      });
    }
  }
  
  // Función para mostrar un mensaje de bienvenida personalizado
  function mostrarMensajeBienvenida(nombreUsuario) {
    let nombre = nombreUsuario.toLowerCase();
  
    if (nombre === "javi" || nombre === "maxi") {
      let mensajePersonalizado = nombre === "javi" 
        ? "Hola, crack de la vida. Gracias por enseñarme a hacer todo esto. ¡Sos un genio!"
        : "Hola Maxi! Gracias por aportar siempre y ser alto tutor! ¡Ídolo!";
  
      Swal.fire({
        title: '¡Bienvenido de nuevo!',
        text: mensajePersonalizado,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } else {
      Swal.fire({
        title: '¡Bienvenido de nuevo!',
        text: `Hola ${nombreUsuario.charAt(0).toUpperCase() + nombreUsuario.slice(1)}!`,
        icon: 'info',
        confirmButtonText: 'Aceptar',
      });
    }
  }

// Función para cerrar sesion de usuario activo
function cerrarSesion() {
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('sesionActiva');
    // Eliminar todas las respuestas guardadas del usuario actual
    for (let key in localStorage) {
        if (key.startsWith('respuesta_pregunta_')) {
            localStorage.removeItem(key);
        }
    }
    location.reload(); // Recargar la página para actualizar el estado
}





// Función para obtener preguntas aleatorias de un array dado (DESHABILITADA POR EL MOMENTO)
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
                // Después de que el usuario haga clic en "Aceptar", muestro el resultado
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





// Funcion para cargar el resultado anterior para mostrarle al usuario donde habia dejado todo y fijarme si hay sesion activa
function cargarResultadoPrevio() {
    const sesionActiva = localStorage.getItem('sesionActiva');
    const nombreUsuario = localStorage.getItem('nombreUsuario');

    if (sesionActiva && nombreUsuario) {
        mostrarMensajeBienvenida(nombreUsuario);
        // Iniciar el cuestionario si hay una sesión activa
        darComienzo(); 
    } else {
        // Si no hay sesión activa, solicitar nombre de usuario
        solicitarNombreUsuario();
    }
}


// Función que se llama cuando se inicia el cuestionario
async function darComienzo() {
    // Limpiar respuestas guardadas del usuario anterior
    for (let key in localStorage) {
        if (key.startsWith('respuesta_pregunta_')) {
            localStorage.removeItem(key);
        }
    }

    // Solo marca la sesión como activa sin limpiar el localStorage
    localStorage.setItem('sesionActiva', 'true'); // Marca la sesión como activa

    let nivelSeleccionado = seleccionarDificultad();
    let preguntasPorNivel = await filtrarPreguntasPorDificultad(nivelSeleccionado);

    if (!preguntasPorNivel[nivelSeleccionado] || preguntasPorNivel[nivelSeleccionado].length === 0) {
        // Si no hay preguntas cargadas para el nivel seleccionado, o si tuvo algún fallo al cargar
        mostrarError("No hay preguntas disponibles para el nivel seleccionado.");
        return;
    }

    let preguntasFiltradas = preguntasPorNivel[nivelSeleccionado];
    // preguntasFiltradas = mezclarPreguntas(preguntasFiltradas);  // Esta linea trae problemas a la hora de validar, porque me toma la pregunta bien pero la respuesta correcta la mezcla 

    mostrarPreguntas(preguntasFiltradas); 

    //Muestro el boton una vez que se inicia el cuestionario
    document.getElementById("btnCerrarSesion").style.display = "block";
    document.getElementById("mostrarResultadoBtn").style.display = "block"; 

    iniciarTemporizador(120, preguntasFiltradas); // Aca puedo configurar cuánto tiempo va a durar el temporizador 
}




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


// Función para filtrar preguntas por dificultad
async function filtrarPreguntasPorDificultad(nivelSeleccionado) {
    const niveles = ['facil', 'intermedio', 'dificil'];
    const preguntasFiltradas = {};
    
    for (const nivel of niveles) {
        let preguntas = await cargarPreguntasPorNivel(nivel);
        if (preguntas.length === 0) {
            mostrarError(`No se pudieron cargar las preguntas para el nivel ${nivel}.`);
            continue;
        }
        preguntasFiltradas[nivel] = preguntas; // Se cargan las preguntas tal cual están y no las mezclo pero me gustaria hacerlo en un futuro asi que no la elimino
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


// Funcion para validar resupuestas del usuario con la respuesta correcta de la pregunta actual
function validarRespuestas(preguntas) {
    let respuestasCorrectas = 0;

    preguntas.forEach((pregunta, index) => {
        let opciones = document.getElementsByName(`pregunta${index}`);
        let respuestaSeleccionada = "";
    
        // Verificar cuál opción fue seleccionada
        for (let i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) {
                respuestaSeleccionada = opciones[i].value;
                break;
            }
        }

        //CONTROL PARA LA DEPURACION 
        // console.log(`Pregunta ${index + 1}:`);
        // console.log(`Respuesta seleccionada: ${respuestaSeleccionada}`);
        // console.log(`Respuesta correcta: ${pregunta.respuestaCorrecta}`);
    
        const respuestaSeleccionadaNormalizada = respuestaSeleccionada.trim().toLowerCase();
        const respuestaCorrectaNormalizada = pregunta.respuestaCorrecta.trim().toLowerCase();
    
        if (respuestaSeleccionadaNormalizada === respuestaCorrectaNormalizada) {
            respuestasCorrectas++;
            //CONTROL PARA LA DEPURACION
            // console.log(`Validación exitosa para la pregunta ${index + 1}`);
        } else {
            //CONTROL PARA LA DEPURACION
            // console.log(`Validación fallida para la pregunta ${index + 1}`);
        }
    
        // Guardar la respuesta seleccionada en localStorage
        localStorage.setItem(`respuesta_pregunta_${index}`, respuestaSeleccionada);
    });
    

    return respuestasCorrectas;
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


//Funcion para mezclar todas las preguntas y que no salgan siempre igual a la hora de hacer el cuestionario (DESHABILITADAD POR EL MOMENTO)
function mezclarPreguntas(preguntas) {
    for (let i = preguntas.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Número aleatorio entre 0 e i
        [preguntas[i], preguntas[j]] = [preguntas[j], preguntas[i]]; // Intercambio de posiciones
    }
    return preguntas;
}


