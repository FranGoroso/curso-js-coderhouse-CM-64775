//---------------------Declaracion de variables ---------------------

let preguntasFaciles = [
    // Nivel Fácil
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

let preguntasIntermedias = 
[
    // Nivel Intermedio
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
            "a) order()", 
            "b) sort()", 
            "c) arrange()", 
            "d) organize()"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Cuál es la diferencia entre == y === en JavaScript?",
        opciones: [
            "a) == compara valores y === compara tipos de datos", 
            "b) == compara tipos de datos y === compara valores", 
            "c) == es una comparación estricta y === es una comparación débil", 
            "d) == y === son equivalentes"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué método se utiliza para filtrar los elementos de un array en JavaScript?",
        opciones: [
            "a) map()", 
            "b) filter()", 
            "c) reduce()", 
            "d) sort()"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué es una función anónima en JavaScript?",
        opciones: [
            "a) Una función sin nombre", 
            "b) Una función que devuelve un valor", 
            "c) Una función que se ejecuta automáticamente al declararse", 
            "d) Una función que se llama dentro de otra función"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué significa undefined en JavaScript?",
        opciones: [
            "a) Una variable que no ha sido definida", 
            "b) Una variable a la que no se le ha asignado un valor", 
            "c) Un error en el código", 
            "d) Un valor predeterminado"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué es una closure en JavaScript?",
        opciones: [
            "a) Un objeto que se utiliza para almacenar datos", 
            "b) Una función dentro de otra función que tiene acceso a las variables de la función externa", 
            "c) Una variable que almacena una función", 
            "d) Una estructura de control que cierra un bucle"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué es una promesa en JavaScript?",
        opciones: [
            "a) Un tipo de variable", 
            "b) Un objeto que representa la eventual finalización o falla de una operación asíncrona", 
            "c) Una función que devuelve un valor", 
            "d) Una estructura de control que garantiza la ejecución de un código"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Cuál es la salida de `2 + '2'` en JavaScript?",
        opciones: [
            "a) 4", 
            "b) 22", 
            "c) NaN", 
            "d) undefined"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué método se utiliza para unir dos o más arrays en JavaScript?",
        opciones: [
            "a) join()", 
            "b) concat()", 
            "c) merge()", 
            "d) union()"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Cuál es el propósito del método reduce() en JavaScript?",
        opciones: [
            "a) Reducir el tamaño de un array", 
            "b) Ejecutar una función en cada elemento de un array para producir un solo valor", 
            "c) Filtrar elementos de un array", 
            "d) Crear una copia superficial de un array"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué es la coerción de tipos en JavaScript?",
        opciones: [
            "a) El proceso de convertir un tipo de dato a otro", 
            "b) La eliminación de un valor no válido", 
            "c) La combinación de dos valores", 
            "d) La comparación de dos tipos diferentes"
        ],
        respuestaCorrecta: "a"
    },
];

let preguntasDificiles = 
[
    // Nivel Avanzado
    {
        pregunta: "¿Qué es un `closure` en JavaScript?",
        opciones: [
            "a) Un objeto que almacena el estado de una función", 
            "b) Una función que recuerda el entorno en el que fue creada", 
            "c) Una estructura de control que se ejecuta después de que otra función ha terminado de ejecutarse", 
            "d) Un método que permite ejecutar una función en el contexto de un objeto diferente"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué significa el término `event bubbling` en JavaScript?",
        opciones: [
            "a) Un evento que se ejecuta varias veces", 
            "b) La propagación de eventos desde el elemento más específico hasta el menos específico", 
            "c) La capacidad de un evento para crear burbujas en el DOM", 
            "d) Un tipo de evento que ocurre solo en elementos específicos"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Cuál es la diferencia entre `call()`, `apply()` y `bind()` en JavaScript?",
        opciones: [
            "a) `call()` y `apply()` ejecutan la función inmediatamente, mientras que `bind()` crea una nueva función con un `this` vinculado", 
            "b) `call()` y `apply()` vinculan un contexto, mientras que `bind()` ejecuta la función", 
            "c) `call()` y `bind()` aceptan una lista de argumentos, mientras que `apply()` acepta un array de argumentos", 
            "d) `bind()` y `apply()` son equivalentes, mientras que `call()` es diferente"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es la delegación de eventos en JavaScript?",
        opciones: [
            "a) La técnica de gestionar eventos mediante la asignación de un único manejador de eventos a un ancestro común de los elementos que se quieren gestionar", 
            "b) La propagación de eventos hacia abajo en el DOM", 
            "c) La creación de múltiples eventos para un solo elemento", 
            "d) La eliminación de eventos de elementos del DOM"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es un `Promise.all()` en JavaScript?",
        opciones: [
            "a) Una función que se resuelve cuando todas las promesas dentro de un array se resuelven", 
            "b) Una función que se resuelve cuando una promesa dentro de un array se resuelve", 
            "c) Una función que rechaza todas las promesas de un array si una falla", 
            "d) Una función que crea una nueva promesa basada en una función de callback"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es un `generator` en JavaScript?",
        opciones: [
            "a) Una función que puede detener su ejecución y reanudarla posteriormente", 
            "b) Una función que se ejecuta solo una vez", 
            "c) Una función que devuelve múltiples valores a la vez", 
            "d) Una función que genera eventos en el DOM"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es el `event loop` en JavaScript?",
        opciones: [
            "a) Un bucle que gestiona la cola de tareas para ejecutar funciones asíncronas", 
            "b) Un bucle que ejecuta funciones de manera sincrónica", 
            "c) Un bucle que se utiliza para iterar sobre arrays", 
            "d) Un bucle que crea eventos en el DOM"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es el `strict mode` en JavaScript?",
        opciones: [
            "a) Un modo que hace que JavaScript sea más estricto, lanzando más excepciones y errores", 
            "b) Un modo que permite el uso de variables globales", 
            "c) Un modo que facilita la compatibilidad con versiones anteriores de JavaScript", 
            "d) Un modo que desactiva la verificación de tipos"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es un `proxy` en JavaScript?",
        opciones: [
            "a) Un objeto que permite personalizar las operaciones básicas en otro objeto", 
            "b) Un objeto que facilita el manejo de eventos en el DOM", 
            "c) Un objeto que se utiliza para realizar solicitudes HTTP", 
            "d) Un objeto que se utiliza para almacenar datos de caché"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es el `contexto` en JavaScript?",
        opciones: [
            "a) El valor de `this` en el momento de la ejecución de una función", 
            "b) El entorno en el que una función fue definida", 
            "c) El objeto global en un script", 
            "d) La forma en la que se organizan los módulos de un proyecto"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es el `debounce` en JavaScript?",
        opciones: [
            "a) Una técnica para agrupar múltiples llamadas a una función en una sola llamada", 
            "b) Una técnica para retrasar la ejecución de una función hasta que un evento deje de ocurrir", 
            "c) Una técnica para reducir el tiempo de ejecución de una función", 
            "d) Una técnica para acelerar la respuesta de eventos en el DOM"
        ],
        respuestaCorrecta: "b"
    },
    {
        pregunta: "¿Qué es una `factory function` en JavaScript?",
        opciones: [
            "a) Una función que devuelve un nuevo objeto cada vez que se invoca", 
            "b) Una función que se ejecuta automáticamente al cargar una página", 
            "c) Una función que se utiliza para crear nuevos elementos en el DOM", 
            "d) Una función que reemplaza el uso de constructores"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es la `memoization` en JavaScript?",
        opciones: [
            "a) Una técnica de optimización que almacena el resultado de funciones costosas en caché para reutilizar los resultados en llamadas futuras", 
            "b) Un método para iterar sobre un array de manera más eficiente", 
            "c) Un proceso de asignar memoria a las variables en el heap", 
            "d) Una técnica para asegurar la ejecución de una función una sola vez"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es el `currying` en JavaScript?",
        opciones: [
            "a) El proceso de transformar una función que toma múltiples argumentos en una secuencia de funciones que toman un solo argumento", 
            "b) El proceso de ejecutar funciones de manera asíncrona", 
            "c) El proceso de almacenar funciones en una variable", 
            "d) El proceso de iterar sobre un array de objetos"
        ],
        respuestaCorrecta: "a"
    },
    {
        pregunta: "¿Qué es un `symbol` en JavaScript?",
        opciones: [
            "a) Un tipo de dato único e inmutable que se utiliza como identificador de propiedades en un objeto", 
            "b) Un operador especial que realiza cálculos en números grandes", 
            "c) Una variable que almacena una función", 
            "d) Un valor booleano que representa verdadero o falso"
        ],
        respuestaCorrecta: "a"
    }
];

let respuestasCorrectas = 0; 
let respuestasIncorrectas = 0;
let resultadoFinal = 0;


//---------------------FIN de declaracion de variables ---------------------
//---------------------Declaracion de funciones ---------------------

document.getElementById('comenzar').addEventListener('click', darComienzo);


function darComienzo(){ //Da comienzo al programa
    const nivelSeleccionado = document.getElementById("nivel").value; //Rescato el valor que me da el select del formulario del documento html
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





function mostrarPreguntas(preguntasSeleccionadas) { //Esta funcion muestra las preguntas dependiendo de la dificultad que selecciono el usuario 

    // Crear un contenedor para la plantilla de preguntas
    const plantilla_preguntas = document.createElement("div"); // Creo una constante que cree un div contenedor en el docuento HTML
    plantilla_preguntas.innerHTML = `<h3>PREGUNTAS:</h3>`; // Aca selecciono la constante declarada arrbia y modifico el div, colocandole un h3 


    // Iterar sobre cada pregunta y mostrarla con sus opciones
    preguntasSeleccionadas.forEach((preguntaObj, indice) => {      //Este bucle foreach recorre las preguntas de la dificultad seleccionada 
        // Crear un elemento en el documento HTML para la pregunta
        const preguntaElemento = document.createElement("div"); // Se crea otro elemento div contenedor paralas preguntas en si
        preguntaElemento.innerHTML = `<p>${indice + 1}. ${preguntaObj.pregunta}</p>`; // Aqui se crea el parráfo que contiene el texto de la pregunta en si para ser comprensible y se guarda en la varible

        // Crear un contenedor para las opciones de respuesta
        const opcionesElemento = document.createElement("div"); 

        // Iterar sobre cada opción de respuesta
        preguntaObj.opciones.forEach((opcion, indiceOpcion) => { // Este bucle recorre al igual que el bucle de preguntas pero con las opciones disponibles
            // Crear un campo de seleccion de opcion para cada respuesta posible en el multiplechoise
            const opcionElemento = document.createElement("div"); // Aqui se crea otro elemento div contenedor para guardar las opciones y mostrarlas
            opcionElemento.innerHTML = ` 
                <input type="radio" name="pregunta${indice}" value="${opcion}" id="opcion${indice}-${indiceOpcion}"> 
                <label for="opcion${indice}-${indiceOpcion}">${opcion}</label>
            `; // En esta porcion de codigo practicamente lo que se hace es hacer una PLANTILLA LITERAL para poder visualizar de forma clara las preguntas y las respuestas, asociando tambien los valores y los ID para que concuerde con las opciones correctas 
            opcionesElemento.appendChild(opcionElemento); // Se agrega al contenedor, las opciones hecha en la PLANTILLA LITERAL (OpcionesElemento es el contenor y se le agrega la plantilla "opcionesElemento")


        // Agregar las opciones al elemento de la pregunta
        preguntaElemento.appendChild(opcionesElemento); // Aqui se asocian las preguntas a sus correspondientes multiplechoise 
        plantilla_preguntas.appendChild(preguntaElemento); // Aqui se agregan las preguntas al contenedor que va a mostrarse en el DOM
    });


    // Agregar el contenedor de preguntas al cuerpo del documento
    document.body.appendChild(plantilla_preguntas);
}



//luego hacer una funcion de validacion para las preguntas
//Preguntas seleccionadas son un objeto y por lo tanto tengo que recorrer nuevamente para dar con la respuesta correcta que proximamente quiero que este en un archivo json
//Tengo que tomar el valor del documento hmtl que me proporciono en la seleccion el usuario para poder validar la respuesta correcta




//Creo otra funcion que muestre la respuesta
//Una vez que tenga el valor de la respuesta correcta, envio un mensaje al usuario a traves de una creacion de elemento desde js en el html 