/* let titulo = document.querySelector('h1'); //ESTO ES PARA MOSTRAR POR PANTALLA EL TEXTO
titulo.innerHTML = 'Juego del numero secreto'; */

/* let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un numero del 1 al 10'; */

let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);//elemento HTML: h1, p, etc.
    elementoHTML.innerHTML = texto;//Texto que aparecera en la pagina web como tal
    return;
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    console.log(intentos);
    
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p', `Acertaste el numero en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        
        document.getElementById('reiniciar').removeAttribute('disabled');//Esto se utiliza para activar el boton Nuevo Juego luego de que el usuario acierta
    } else {
        //El usuario no acerto
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El numero secreto es menor.');
        } else {
            asignarTextoElemento('p', 'El numero secreto es mayor.');
        }

        intentos++;
        limpiarCaja();
    }
    return; //SE COLOCA COMO BUENA PRACTICA, AUNQUE NO RETORNE ALGUN VALOR
}

function limpiarCaja(){
    /* let valorCaja = document.querySelector('#valorUsuario');
    valorCaja.value = ''; */

    document.querySelector('#valorUsuario').value = ''; //Esta es una forma mas reducida de obtener el mismo resultado de las lineas de arriba
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los numeros
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles.');
    } else {
        //Si el numero generado esta incluido en la lista 
         if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del numero secreto actualizado');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //Limpiar la caja
    limpiarCaja();
    //Indicar mensaje de intervalo de numeros
    //Generar el numero aleatorio
    //Reinicilizar el numero de intentos
    condicionesIniciales();
    //Deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();