//---------------------Declaracion de variables ---------------------

let preguntasFaciles = [
    {
        pregunta: "¿Qué es un array en programación?",
        opciones: [
            "a) Un tipo de bucle", 
            "b) Una función que realiza cálculos", 
            "c) Una estructura de datos que almacena elementos en una secuencia", 
            "d) Un tipo de variable que almacena cadenas de texto"
        ],
        respuestaCorrecta: "c"
    },
    {
        pregunta: "¿Cuál es el resultado de 5 * 2 en JavaScript?",
        opciones: [
            "a) 10", 
            "b) 52", 
            "c) Error", 
            "d) 7"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué operador se utiliza para asignar un valor a una variable en JavaScript?",
        opciones: [
            "a) ==", 
            "b) =", 
            "c) ===", 
            "d) =>"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué significa CSS?",
        opciones: [
            "a) Cascading Style Sheets", 
            "b) Computer Styling System", 
            "c) Code Style Sheets", 
            "d) Cascading Simple Sheets"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué método se utiliza para agregar un elemento al final de un array en JavaScript?",
        opciones: [
            "a) push()", 
            "b) pop()", 
            "c) unshift()", 
            "d) shift()"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué función se utiliza para mostrar un mensaje en la consola del navegador?",
        opciones: [
            "a) print()", 
            "b) console.log()", 
            "c) alert()", 
            "d) log()"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué palabra clave se utiliza para declarar una constante en JavaScript?",
        opciones: [
            "a) var", 
            "b) let", 
            "c) const", 
            "d) constant"
        ],
        respuestaCorrecta: "c"
    },
    {
        pregunta: "¿Qué tipo de datos se utiliza para almacenar un valor verdadero o falso?",
        opciones: [
            "a) Number", 
            "b) String", 
            "c) Boolean", 
            "d) Array"
        ],
        respuestaCorrecta: "c"
    },
    {
        pregunta: "¿Qué método se utiliza para convertir una cadena de texto a un número entero en JavaScript?",
        opciones: [
            "a) parseInt()", 
            "b) toString()", 
            "c) toInteger()", 
            "d) Number()"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Cuál de los siguientes operadores se utiliza para concatenar dos cadenas de texto?",
        opciones: [
            "a) +", 
            "b) &", 
            "c) .", 
            "d) %"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué estructura de control se utiliza para tomar decisiones en JavaScript?",
        opciones: [
            "a) for loop", 
            "b) if-else", 
            "c) switch-case", 
            "d) while loop"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué palabra clave se utiliza para detener la ejecución de un bucle en JavaScript?",
        opciones: [
            "a) break", 
            "b) stop", 
            "c) halt", 
            "d) exit"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué función se utiliza para obtener la longitud de una cadena de texto en JavaScript?",
        opciones: [
            "a) length()", 
            "b) size()", 
            "c) count()", 
            "d) length"
        ],
        respuestaCorrecta: "d"
    },
    {
        pregunta: "¿Qué método se utiliza para eliminar el último elemento de un array en JavaScript?",
        opciones: [
            "a) pop()", 
            "b) push()", 
            "c) remove()", 
            "d) shift()"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué significa NaN en JavaScript?",
        opciones: [
            "a) Not a Number", 
            "b) Not a Null", 
            "c) No Action Needed", 
            "d) Null and Number"
        ],
        respuestaCorrecta: "a"
    },
];

let preguntasIntermedias = [
    {
        pregunta: "¿Cuál es el propósito de un bucle while en JavaScript?",
        opciones: [
            "a) Ejecutar un bloque de código una vez", 
            "b) Ejecutar un bloque de código mientras una condición es verdadera", 
            "c) Definir una función", 
            "d) Ordenar un array"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué hace el método Array.prototype.map() en JavaScript?",
        opciones: [
            "a) Modifica el array original", 
            "b) Crea un nuevo array con los resultados de aplicar una función a cada elemento del array original", 
            "c) Filtra los elementos de un array según una condición", 
            "d) Encuentra un elemento en un array"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué significa la palabra clave this en JavaScript?",
        opciones: [
            "a) Hace referencia al objeto global", 
            "b) Hace referencia al objeto que está llamando al método", 
            "c) Hace referencia a una variable local", 
            "d) No tiene ningún significado especial"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué método se utiliza para agregar uno o más elementos al inicio de un array en JavaScript?",
        opciones: [
            "a) push()", 
            "b) pop()", 
            "c) unshift()", 
            "d) shift()"
        ],
        respuestaCorrecta: "c"
    },
    {
        pregunta: "¿Qué función se utiliza para convertir un objeto en una cadena JSON en JavaScript?",
        opciones: [
            "a) JSON.stringify()", 
            "b) JSON.parse()", 
            "c) toString()", 
            "d) stringify()"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué método se utiliza para ordenar los elementos de un array en JavaScript?",
        opciones: [
            "a) sort()", 
            "b) order()", 
            "c) arrange()", 
            "d) map()"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Cuál es la diferencia entre == y === en JavaScript?",
        opciones: [
            "a) == compara solo valores, === compara valores y tipos", 
            "b) == compara valores y tipos, === compara solo valores", 
            "c) Ambos son iguales, no hay diferencia", 
            "d) == compara solo cadenas, === compara solo números"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es una función anónima en JavaScript?",
        opciones: [
            "a) Una función sin nombre", 
            "b) Una función que no se puede llamar", 
            "c) Una función que se ejecuta automáticamente", 
            "d) Una función que devuelve un valor nulo"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué hace el operador typeof en JavaScript?",
        opciones: [
            "a) Verifica si una variable está definida", 
            "b) Devuelve el tipo de dato de una variable", 
            "c) Convierte una variable a un tipo específico", 
            "d) Crea una nueva variable"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué es el objeto Math en JavaScript?",
        opciones: [
            "a) Un objeto para realizar operaciones matemáticas", 
            "b) Un objeto para manipular cadenas de texto", 
            "c) Un objeto para manipular arrays", 
            "d) Un objeto para trabajar con fechas"
        ],
        respuestaCorrecta: "a"
    },
];

let preguntasDificiles = [
    {
        pregunta: "¿Qué es el event loop en JavaScript?",
        opciones: [
            "a) Un bucle que permite que JavaScript maneje tareas asíncronas", 
            "b) Un método para recorrer arrays", 
            "c) Una función para detener la ejecución del código", 
            "d) Una estructura de datos para manejar eventos"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es una closure en JavaScript?",
        opciones: [
            "a) Una función que recuerda el entorno en el que fue creada", 
            "b) Un objeto que encapsula datos y métodos", 
            "c) Un tipo de error en el código", 
            "d) Una estructura de control para iterar sobre arrays"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué hace el método bind() en JavaScript?",
        opciones: [
            "a) Asocia una función a un objeto específico", 
            "b) Detiene la ejecución de una función", 
            "c) Copia una función en otra variable", 
            "d) Llama a una función con un objeto específico"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es la herencia prototipal en JavaScript?",
        opciones: [
            "a) Un modelo de herencia en el que los objetos pueden heredar propiedades y métodos directamente de otros objetos", 
            "b) Un modelo de herencia basado en clases", 
            "c) Un patrón de diseño para organizar código", 
            "d) Una función que permite crear nuevos objetos"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué método se utiliza para crear una promesa en JavaScript?",
        opciones: [
            "a) new Promise()", 
            "b) createPromise()", 
            "c) makePromise()", 
            "d) promise()"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es una función de orden superior en JavaScript?",
        opciones: [
            "a) Una función que puede tomar otras funciones como argumentos o devolver una función como resultado", 
            "b) Una función que siempre devuelve un valor", 
            "c) Una función que solo se puede ejecutar una vez", 
            "d) Una función que es llamada automáticamente al cargar la página"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué hace el método reduce() en JavaScript?",
        opciones: [
            "a) Aplica una función a cada elemento de un array para reducirlo a un único valor", 
            "b) Ordena los elementos de un array en orden descendente", 
            "c) Filtra los elementos de un array según una condición", 
            "d) Encuentra el primer elemento que cumple una condición"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es el ámbito léxico en JavaScript?",
        opciones: [
            "a) El alcance de una variable está determinado por su ubicación dentro del código fuente", 
            "b) El alcance de una variable se determina durante la ejecución del programa", 
            "c) Una variable solo puede ser accedida dentro de la función en la que se define", 
            "d) Una variable global puede ser accedida desde cualquier parte del código"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es el operador spread (...) en JavaScript?",
        opciones: [
            "a) Un operador que expande un array o un objeto en sus elementos individuales", 
            "b) Un operador que combina dos arrays", 
            "c) Un operador que crea una copia superficial de un objeto", 
            "d) Un operador que intercambia los elementos de un array"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué hace el método finally() en una promesa de JavaScript?",
        opciones: [
            "a) Se ejecuta siempre al final de una promesa, independientemente de si se resolvió o rechazó", 
            "b) Resuelve una promesa", 
            "c) Rechaza una promesa", 
            "d) Cancela una promesa"
        ],
        respuestaCorrecta: "a"
    },
];

// --------------------- Declaracion de Variables para respuestas y resultados ---------------------
let respuestasCorrectas = 0;
let respuestasIncorrectas = 0;
let resultadoFinal = 0;

// --------------------- Función para iniciar el cuestionario ---------------------
function darComienzo() {
    respuestasCorrectas = 0; // Reiniciar el contador de respuestas correctas
    respuestasIncorrectas = 0; // Reiniciar el contador de respuestas incorrectas
    resultadoFinal = 0; // Reiniciar el resultado final
    const nivelSeleccionado = document.getElementById("nivel").value; 
    let preguntasSeleccionadas = [];

    switch(nivelSeleccionado) {
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
    
    mostrarPreguntas(preguntasSeleccionadas);
}

// --------------------- Función para mostrar las preguntas en el HTML ---------------------
function mostrarPreguntas(preguntasSeleccionadas) {
    const formulario = document.getElementById("formulario-cuestionario");
    formulario.innerHTML = ""; // Limpiar el formulario anterior

    preguntasSeleccionadas.forEach((preguntaObj, indice) => {
        const preguntaDiv = document.createElement("div");
        preguntaDiv.classList.add("pregunta");

        const preguntaTitulo = document.createElement("h3");
        preguntaTitulo.textContent = `${indice + 1}. ${preguntaObj.pregunta}`;
        preguntaDiv.appendChild(preguntaTitulo);

        preguntaObj.opciones.forEach(opcion => {
            const opcionDiv = document.createElement("div");
            opcionDiv.classList.add("opcion");

            const inputOpcion = document.createElement("input");
            inputOpcion.type = "radio";
            inputOpcion.name = `pregunta${indice}`;
            inputOpcion.value = opcion.trim().charAt(0); // Usamos solo la letra de la opción
            opcionDiv.appendChild(inputOpcion);

            const labelOpcion = document.createElement("label");
            labelOpcion.textContent = opcion;
            opcionDiv.appendChild(labelOpcion);

            preguntaDiv.appendChild(opcionDiv);
        });

        formulario.appendChild(preguntaDiv);
    });

    const botonFinalizar = document.createElement("button");
    botonFinalizar.textContent = "Finalizar";
    botonFinalizar.id = "finalizar";
    formulario.appendChild(botonFinalizar);

    // Asignar el evento de clic al botón "Finalizar"
    botonFinalizar.addEventListener('click', () => {
        validarRespuestas(preguntasSeleccionadas);
    });
}

// --------------------- Función para validar las respuestas ---------------------
function validarRespuestas(preguntasSeleccionadas) {
    preguntasSeleccionadas.forEach((preguntaObj, indice) => {
        const opciones = document.getElementsByName(`pregunta${indice}`); // Obtén todas las opciones de la pregunta actual
        let respuestaUsuario = ""; 

        // Recorre las opciones para encontrar cuál fue seleccionada por el usuario
        opciones.forEach(opcion => {
            if (opcion.checked) { // Verifica si la opción está seleccionada
                respuestaUsuario = opcion.value.trim().charAt(0); // Aquí extraemos solo la letra de la opción
            }
        });

        // Verifica si la respuesta del usuario coincide con la respuesta correcta
        if (respuestaUsuario === preguntaObj.respuestaCorrecta) {
            respuestasCorrectas++; // Incrementa el contador de respuestas correctas
        } else {
            respuestasIncorrectas++; // Incrementa el contador de respuestas incorrectas
        }
    });

    mostrarResultado();
}

// --------------------- Función para mostrar el resultado en pantalla ---------------------
function mostrarResultado() {
    const formulario = document.getElementById("formulario-cuestionario");
    formulario.innerHTML = ""; // Limpiar el formulario

    resultadoFinal = (respuestasCorrectas * 100) / (respuestasCorrectas + respuestasIncorrectas); // Calcula el porcentaje de aciertos
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <p>Respuestas Correctas: ${respuestasCorrectas}</p>
        <p>Respuestas Incorrectas: ${respuestasIncorrectas}</p>
        <p>Resultado Final: ${resultadoFinal}%</p>
    `;

    // Crear el botón para reiniciar el cuestionario
    const botonReiniciar = document.createElement("button");
    botonReiniciar.textContent = "Reiniciar Cuestionario";
    botonReiniciar.id = "reiniciar";
    formulario.appendChild(botonReiniciar);

    // Asignar el evento de clic al botón "Reiniciar Cuestionario"
    botonReiniciar.addEventListener('click', () => {
        location.reload(); // Recarga la página para reiniciar el cuestionario
    });
}

// --------------------- Event listener para el botón "Comenzar" ---------------------
document.getElementById("comenzar").addEventListener('click', darComienzo);
