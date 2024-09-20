/*------------------ TODOS LOS EVENTOS: ----------------*/ 
// Vincular el botón a la función darComienzo cuando se hace clic
document.getElementById("btnComenzar").addEventListener("click", darComienzo);

//Esto es para cargar los datos anteriores del usuario si es que existian 
document.addEventListener("DOMContentLoaded", cargarResultadoPrevio);

//Esto cierra la sesion de usuario al tocar el boton
document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);

//VARIABLE PARA FUNCION MOSTRAR ERRORES DEL USUARIO (GLOBALMENTE DECLARADA PORQUE SINO SE COMPLICA)
let preguntasParaFuncionErrores;

// Cuando se toca el botón de mostrar resultados
document.getElementById("mostrarResultadoBtn").addEventListener("click", async function() {
    // Detener el temporizador
    clearInterval(intervaloTemporizador);

    let nivelSeleccionado = seleccionarDificultad();
    let preguntasFiltradas = await filtrarPreguntasPorDificultad(nivelSeleccionado);
    let cantidadTotalPreguntas = preguntasFiltradas[nivelSeleccionado].length;

    preguntasParaFuncionErrores = preguntasFiltradas[nivelSeleccionado]
    let respuestasCorrectas = validarRespuestas(preguntasFiltradas[nivelSeleccionado]);
    mostrarResultado(respuestasCorrectas, cantidadTotalPreguntas);
});

/*------------------ FIN DE LOS EVENTOS ----------------*/ 


/*NOMBRE DE TODAS LAS FUNCIONES PARA BUSCAR EN LA BARRA DE BUSQUEDA: (Solo para correccion) 
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
solicitarNombreUsuario
mostrarMensajeBienvenida
cerrarSesion
validarCasillaMarcada
validarNombre
*/


//Funcion para solicitar nombre del usuario 
function solicitarNombreUsuario() {
    // Verificar si el nombre ya está guardado en localStorage
    let nombreGuardado = localStorage.getItem('nombreUsuario');
  
    if (nombreGuardado) {
      // Si el nombre ya está guardado, mostrar el mensaje de bienvenida
      mostrarMensajeBienvenida(nombreGuardado);
      document.getElementById("btnCerrarSesion").style.display = "block";
    } else {
      // Si no hay nombre guardado, pedirlo al usuario
      Swal.fire({
        title: 'Ingresa tu nombre',
        input: 'text',
        inputPlaceholder: 'Escribi tu nombre',
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        inputValidator: (value) => {
          if (!validarNombre(value)) {
            return '¡Por favor, ingresa un nombre valido!';
          }
        }
      }).then((result) => {
        let nombre = result.value.toLowerCase();
  
        //MENSAJE PERSONALIZADO (podria hacer un switch tambien y capaz es mas optimo) 
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
        document.getElementById("btnCerrarSesion").style.display = "block";
      });
    }
  }
  
  // Función para mostrar un mensaje de bienvenida personalizado
  function mostrarMensajeBienvenida(nombreUsuario) {
    let nombre = nombreUsuario.toLowerCase();
  
    if (nombre === "javi" || nombre === "maxi") {
      let mensajePersonalizado = nombre === "javi" 
        ? "Hola de nuevo Javi!"
        : "Hola de nuevo Maxi!";
  
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



// Declarar globalmente el intervalo del temporizador (IMPORTANTE PORQUE SI NO ESTA EN GLOBAL, ME OCASIONA PROBLEMAS)
let intervaloTemporizador;

//Funcion para inciar temporizador
function iniciarTemporizador(duracion, preguntas) {
    let tiempoRestante = duracion;
    let temporizadorElemento = document.getElementById("temporizador");

    // Limpiar cualquier temporizador previo para evitar múltiples intervalos
    if (intervaloTemporizador) {
        clearInterval(intervaloTemporizador);
    }

    // Iniciar el temporizador
    intervaloTemporizador = setInterval(() => {
        let minutos = Math.floor(tiempoRestante / 60);
        let segundos = tiempoRestante % 60;
    
        // Actualizar el texto del temporizador (Para que se vea en minutos y segundos)
        temporizadorElemento.textContent = `${minutos}m ${segundos}s`;
        
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


// Función que se llama cuando se inicia el cuestionario (*asincronica porque utilizo el fetch y tengo que esperar respuesta de mi JSON en este caso*)
async function darComienzo() {
    // Limpiar respuestas guardadas del usuario anterior
    for (let key in localStorage) {
        if (key.startsWith('respuesta_pregunta_')) { //startsWith lo aprendi en chat GPT porque no encontraba solucion a este problema
            localStorage.removeItem(key);
        }
    }

    // Solo marca la sesión como activa sin limpiar el localStorage
    localStorage.setItem('sesionActiva', 'true'); // Marca la sesión como activa

    let nivelSeleccionado = seleccionarDificultad();
    let preguntasPorNivel = await filtrarPreguntasPorDificultad(nivelSeleccionado);//(*Aca espero la respuesta de mi fetch*)

    if (!preguntasPorNivel[nivelSeleccionado] || preguntasPorNivel[nivelSeleccionado].length === 0) {
        // Si no hay preguntas cargadas para el nivel seleccionado, o si tuvo algún fallo al cargar
        mostrarError("No hay preguntas disponibles para el nivel seleccionado.");
        return;
    }

    let preguntasFiltradas = preguntasPorNivel[nivelSeleccionado];

    mostrarPreguntas(preguntasFiltradas); 

    //Muestro el boton una vez que se inicia el cuestionario (Botones ocultos en el html porque quedaba mal y al tocar boton se muestran)
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
                response = await fetch("data/preguntasFaciles.json");
                break;
            case "intermedio":
                response = await fetch("data/preguntasIntermedias.json");
                break;
            case "dificil":
                response = await fetch("data/preguntasDificiles.json");
                break;
            default:
                throw new Error("Nivel no válido");
        }

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [data]; //Convierto los objetos de preguntas en un array para poder laburarlos (Utilizo operadores ternarios para mayor facilidad)
    } catch (error) {
        return [];
    }
}


// Función para filtrar preguntas por dificultad
async function filtrarPreguntasPorDificultad(nivelSeleccionado) {
    const preguntasFiltradas = {};
    let preguntas = await cargarPreguntasPorNivel(nivelSeleccionado);
      preguntasFiltradas[nivelSeleccionado] = preguntas; 
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

        //CONTROL PARA LA DEPURACION (Lo dejo igualmente porque proximamente quiero hacer que las preguntas se mezclen y eso traia problemas, entonces necesito este codigo de depuracion)
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
    if(validarCasillaMarcada()){
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
            mostrarErroresRespuestaUsuario(preguntasParaFuncionErrores);
            // Limpiar el contenido del cuestionario y ocultar el botón de resultado
            document.getElementById("preguntas").innerHTML = ""; //limpia contenedor preguntas
            document.getElementById("mostrarResultadoBtn").style.display = "none"; // Oculta boton mostrar resultado
            document.getElementById("temporizador").textContent = ""; // Reinicia el temporizador en pantalla
        });
    
        // Guarda un objeto con los resultados del cuestionario en el localStorage, convirtiendolo en una cadena de texto
        localStorage.setItem("resultado", JSON.stringify({
            respuestasCorrectas: respuestasCorrectas,
            cantidadTotalPreguntas: cantidadTotalPreguntas,
            nivel: seleccionarDificultad()
        }));
    
        localStorage.removeItem('sesionActiva'); // Limpiar la bandera de sesión
    }else{
        mostrarError("¡No marcaste ninguna casilla! Tenes que marcar al menos una")
        document.getElementById("preguntas").innerHTML = ""; //limpia contenedor preguntas
        document.getElementById("mostrarResultadoBtn").style.display = "none"; // Oculta boton mostrar resultado
        document.getElementById("temporizador").textContent = ""; // Reinicia el temporizador en pantalla
    };
};

//Funcion para validar que el usuario marque al menos una casilla del formulario 
function validarCasillaMarcada() {
    // Seleccionar todas las casillas del formulario
    const opciones = document.querySelectorAll('input[type="radio"]');
    
    // Verificar si alguna casilla está marcada
    let algunaMarcada = false;
    opciones.forEach(opcion => {
      if (opcion.checked) {
        algunaMarcada = true;
      }
    });
  
    return algunaMarcada ? true : false;
  }

  // Funcion para vlaidar si el nombre es correcto y no tiene caracteres especiales 
  function validarNombre(nombre) {
    
    if (nombre.trim() === "") {
      return false; 
    }

    const letrasPermitidas = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"]; //Tambien podria hacerlo con una expresion regular para optimizar codigo 
    
    // Recorrer cada letra del nombre y verificar si está en el array de letras permitidas
    for (let letra of nombre) {
        if (!letrasPermitidas.includes(letra)) {
            return false; 
        }
    }
    
    return true;
}


//Funcion para mostrar errores de sus respuestas a usuario 
function mostrarErroresRespuestaUsuario(preguntas) {
  let errores = [];

  preguntas.forEach((pregunta, index) => {
      let opciones = document.getElementsByName(`pregunta${index}`);
      let respuestaSeleccionada = "";

      // Obtener la respuesta seleccionada por el usuario
      for (let i = 0; i < opciones.length; i++) {
          if (opciones[i].checked) {
              respuestaSeleccionada = opciones[i].value;
              break;
          }
      }


      const respuestaSeleccionadaNormalizada = respuestaSeleccionada.trim().toLowerCase();
      const respuestaCorrectaNormalizada = pregunta.respuestaCorrecta.trim().toLowerCase();

      // Si la respuesta seleccionada no es correcta guardO el error
      if (respuestaSeleccionadaNormalizada !== respuestaCorrectaNormalizada) {
          errores.push({
              pregunta: pregunta.pregunta,
              respuestaSeleccionada: respuestaSeleccionada || "No respondida",
              respuestaCorrecta: pregunta.respuestaCorrecta
          });
      }
  });


  if (errores.length > 0) {
      let listaErrores = errores.map(error => `
          <strong>Pregunta:</strong> ${error.pregunta}<br>
          <strong>Tu respuesta:</strong> ${error.respuestaSeleccionada}<br>
          <strong>Respuesta correcta:</strong> ${error.respuestaCorrecta}<br><br>
      `).join('');

      Swal.fire({
          title: "Errores en el cuestionario",
          html: listaErrores,
          icon: "error",
          confirmButtonText: "Aceptar"
      });
  }
}
