/*TODO ESTE CODIGO ESTA PROPORCIONADO POR CHAT GPT*/

const symbols = ['<', '>', '{', '}', '(', ')', 'console.log', 'var', 'let', 'const', 'function', 'return', 'JS'];

function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop';
    raindrop.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    // Ajustar la posición inicial y el tamaño
    raindrop.style.left = `${Math.random() * 100}vw`;
    raindrop.style.fontSize = `${Math.random() * 2 + 1}rem`; // Tamaño aleatorio entre 1rem y 3rem
    raindrop.style.animationDuration = `${Math.random() * 5 + 5}s`; // Duración aleatoria entre 5s y 10s
    
    document.getElementById('raindrops').appendChild(raindrop);
    
    // Eliminar el raindrop después de que termina la animación
    raindrop.addEventListener('animationend', () => {
        raindrop.remove();
    });
}

// Crear una nueva gota de lluvia cada 100ms
setInterval(createRaindrop, 100);