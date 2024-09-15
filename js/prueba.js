/*------------------ TODOS LOS EVENTOS: ----------------*/ 
document.getElementById("btnComenzar").addEventListener("click", darComienzo);
document.getElementById("mostrarResultadoBtn").addEventListener("click", mostrarResultadoHandler);
document.getElementById("btnCambiarUsuario").addEventListener("click", cambiarUsuario);
document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);

document.addEventListener("DOMContentLoaded", cargarResultadoPrevio);
/*------------------ FIN DE LOS EVENTOS ----------------*/ 

function mostrarResultadoHandler() {
    clearInterval(intervaloTemporizador);

    let nivelSeleccionado = seleccionarDificultad();
    filtrarPreguntasPorDificultad(nivelSeleccionado).then(preguntasFiltradas => {
        let cantidadTotalPreguntas = preguntasFiltradas[nivelSeleccionado].length;
        let respuestasCorrectas = validarRespuestas(preguntasFiltradas[nivelSeleccionado]);
        mostrarResultado(respuestasCorrectas, cantidadTotalPreguntas);
    });
}

function solicitarNombreUsuario() {
    let nombreGuardado = localStorage.getItem('nombreUsuario');

    if (nombreGuardado) {
        mostrarMensajeBienvenida(nombreGuardado);
    } else {
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

            if (nombre === "javi" || nombre === "maxi") {
                Swal.fire({
                    title: `¿Eres el ${nombre === 'javi' ? 'profe' : 'tutor'} de mi curso?`,
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

            localStorage.setItem('nombreUsuario', result.value);
        });
    }
}

function mostrarMensajeBienvenida(nombreUsuario) {
    Swal.fire({
        title: `¡Bienvenido, ${nombreUsuario}!`,
        text: 'Nos alegra verte de nuevo. ¿Listo para continuar con el cuestionario?',
        icon: 'info',
        confirmButtonText: 'Comenzar'
    });
}

function cambiarUsuario() {
    localStorage.removeItem('nombreUsuario');
    solicitarNombreUsuario();
}

function cerrarSesion() {
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('sesionActiva');
    location.reload(); // Recargar la página para actualizar el estado
}

function cargarResultadoPrevio() {
    const sesionActiva = localStorage.getItem('sesionActiva');
    if (!sesionActiva) {
        const resultadoPrevio = localStorage.getItem("resultado");
        if (resultadoPrevio) {
            const { respuestasCorrectas, cantidadTotalPreguntas, nivel } = JSON.parse(resultadoPrevio);
            document.getElementById("nivel").value = nivel;
        }
    }
}

function darComienzo() {
    localStorage.setItem('sesionActiva', 'true');
    solicitarNombreUsuario();
    let nivelSeleccionado = seleccionarDificultad();
    filtrarPreguntasPorDificultad(nivelSeleccionado).then(preguntasPorNivel => {
        if (!preguntasPorNivel[nivelSeleccionado] || preguntasPorNivel[nivelSeleccionado].length === 0) {
            mostrarError("No hay preguntas disponibles para el nivel seleccionado.");
            return;
        }

        let preguntasFiltradas = preguntasPorNivel[nivelSeleccionado];
        mostrarPreguntas(preguntasFiltradas); 
        document.getElementById("mostrarResultadoBtn").style.display = "block"; 

        // Mostrar botones de cerrar sesión y cambiar usuario
        document.getElementById("btnCerrarSesion").style.display = "block";
        document.getElementById("btnCambiarUsuario").style.display = "block";

        iniciarTemporizador(120, preguntasFiltradas); 
    });
}


function seleccionarDificultad() {
    return document.getElementById("nivel").value; 
}

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
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        mostrarError(`No se pudieron cargar las preguntas para el nivel ${nivel}.`);
        return [];
    }
}

async function filtrarPreguntasPorDificultad(nivelSeleccionado) {
    const niveles = ['facil', 'intermedio', 'dificil'];
    const preguntasFiltradas = {};
    
    for (const nivel of niveles) {
        let preguntas = await cargarPreguntasPorNivel(nivel);
        if (preguntas.length === 0) {
            mostrarError(`No se pudieron cargar las preguntas para el nivel ${nivel}.`);
            continue;
        }
        preguntasFiltradas[nivel] = preguntas;
    }
    
    return preguntasFiltradas;
}

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
}

function crearContenedorOpciones(opciones, index) {
    let contenedorOpciones = document.createElement("div"); 

    let respuestaGuardada = localStorage.getItem(`respuesta_pregunta_${index}`);

    opciones.forEach(opcion => {
        let opcionesElemento = document.createElement("label"); 
        let inputOpcion = document.createElement("input"); 
        inputOpcion.type = "radio";  
        inputOpcion.name = `pregunta${index}`; 
        inputOpcion.value = opcion; 

        if (opcion === respuestaGuardada) {
            inputOpcion.checked = true;
        }
        
        opcionesElemento.appendChild(inputOpcion);
        opcionesElemento.appendChild(document.createTextNode(opcion));
        contenedorOpciones.appendChild(opcionesElemento);
        contenedorOpciones.appendChild(document.createElement("br"));
    });

    return contenedorOpciones;
}

function mostrarPreguntas(preguntas) {
    let contenedorPreguntas = crearContenedorPreguntas(preguntas);
    let contenedorPrincipal = document.getElementById("preguntas");
    contenedorPrincipal.innerHTML = ""; 
    contenedorPrincipal.appendChild(contenedorPreguntas);
}

function validarRespuestas(preguntas) {
    let respuestasCorrectas = 0;

    preguntas.forEach((pregunta, index) => {
        let opciones = document.getElementsByName(`pregunta${index}`);
        let respuestaSeleccionada = "";
    
        for (let i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) {
                respuestaSeleccionada = opciones[i].value;
                break;
            }
        }

        if (respuestaSeleccionada === pregunta.respuestaCorrecta) {
            respuestasCorrectas++;
        }
    });

    return respuestasCorrectas;
}

function mostrarResultado(respuestasCorrectas, cantidadTotalPreguntas) {
    let porcentaje = (respuestasCorrectas / cantidadTotalPreguntas) * 100;

    // Obtener el nombre del usuario desde localStorage
    let nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';

    Swal.fire({
        title: `Resultado Final para ${nombreUsuario}`,
        text: `Has respondido correctamente ${respuestasCorrectas} de ${cantidadTotalPreguntas} preguntas (${porcentaje.toFixed(2)}%)`,
        icon: 'info',
        confirmButtonText: 'Aceptar'
    });

    // Guardar el resultado en localStorage
    let resultado = {
        respuestasCorrectas,
        cantidadTotalPreguntas,
        nivel: seleccionarDificultad(),
        nombreUsuario // Almacenar también el nombre del usuario
    };
    localStorage.setItem("resultado", JSON.stringify(resultado));
}


function mostrarError(mensaje) {
    Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

function iniciarTemporizador(duracion, preguntas) {
    let tiempoRestante = duracion;
    const temporizador = document.getElementById("temporizador");

    intervaloTemporizador = setInterval(() => {
        let minutos = Math.floor(tiempoRestante / 60);
        let segundos = tiempoRestante % 60;

        temporizador.textContent = `${minutos}m ${segundos}s`;

        if (tiempoRestante <= 0) {
            clearInterval(intervaloTemporizador);
            mostrarResultado(validarRespuestas(preguntas), preguntas.length);
            Swal.fire({
                title: 'Tiempo agotado',
                text: 'Tu tiempo ha expirado. Se mostrará el resultado hasta ahora.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        } else {
            tiempoRestante--;
        }
    }, 1000);
}
