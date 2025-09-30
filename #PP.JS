//GALERIA 

//se ejecuta cuando el documento HTML ha cargado completamente.
$(document).ready(function () {
    
    //Define una función llamada durationSlider que contiene un bloque de código.
  function durationSlider() {
    
    //ejecuta el código dentro de esta función cada 3 segundos
    setInterval(function () {
      
      // Selecciona la clase "activa" y lo almacena en la variable imagenActual
      var imagenActual = $(".activa");
      
      //Selecciona la clase "activa" y lo almacena en la variable siguienteImagen
      var siguienteImagen = imagenActual.next();
      if (siguienteImagen.length) {
        
        //si encuentra el elemento, elimina la clase "activa" del elemento actual y cambia su propiedad para moverlo por debajo de otros elementos en la página.
        imagenActual.removeClass("activa").css("z-index", -10);
        
        //agrega la clase "activa" al siguiente elemento y cambia su propiedad para moverlo por encima de otros elementos en la página.
        siguienteImagen.addClass("activa").css("z-index", 10);
      }
    }, 3000);
  }

  // Esta función inicia un efecto de deslizamiento de imágenes cada 3 segundos
  durationSlider();
  
  //Este código se ejecuta cuando se hace clic en un elemento en la página con la clase "siguiente"
  $(".siguiente").on("click", function () {
   
   //toma el elemento con la clase .activa y lo almacena en la variable de imaagenactual
    var imagenActual = $(".activa");
    
    // selecciona la siguiente imagen después de la imagen actual y lo almacena en la variable siguienteImagen
    var siguienteImagen = imagenActual.next();
    
    // Comprueba si se encontró un elemento siguiente. Si es así, ejecuta el bloque de código dentro de este condicional.
    if (siguienteImagen.length) {
      imagenActual.removeClass("activa").css("z-index", -10);
      siguienteImagen.addClass("activa").css("z-index", 10);
    }
  });

  // Cuando el usuario hace clic en un elemento con esta clase, se ejecuta dentro de la función.
  $(".anterior").on("click", function () {
    
    //la clase .activa, se alamacena en la variable imagen actual
    var imagenActual = $(".activa");
    
    //selecciona el elemento anterior y lo almacena en imagenactual.prev
    var anteriorImagen = imagenActual.prev();
    
    //Comprueba si se encontró un elemento anterior. Si es así, ejecuta código dentro de este condicional.
    if (anteriorImagen.length) {
      imagenActual.removeClass("activa").css("z-index", -10);
      anteriorImagen.addClass("activa").css("z-index", 10);
    }
  });
});


//FORMULARIO
// Creación de función
function validarFormulario(){
	
    //remueve el div con la clase alert
	$('.alert').remove();
    

    // Declaración de variables
    var nombre = $('#nombre').val();
    var email = $('#email').val();
    var mensaje = $('#mensaje').val();

    // Validar campo nombre con estructura condicional que verifica si el campo "nombre" está vacío o nulo. Si es así, significa que el campo no ha sido completado.
    if (nombre === "" || nombre === null){
        
        // si es así, llama a la funcion cambiar color para aplicarselo a "nombre"
        cambiarColor("nombre");
        
        // Muestra el mensaje de alerta con el mensaje de campo obligatorio
        mostrarAlerta("Campo obligatorio");
        
        //indica que el formulario no tiene que enviarse ya que el proceso de validacion falló
        return false;
    }else{
    	var expresion= /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;
    	
        //verifica si el campo contiene caracteres que no son letras ni espacios
        if(!expresion.test(nombre)){
            
            // mostrara el mesaje que debe ingresar un nombre válido y cambia de color el campo
            cambiarColor("nombre");
            mostrarAlerta("No se permiten carateres especiales o numeros");
            return false;
        }
    }

    
    //validar email
if(email=="" || email==null){

        cambiarColor("email");
        
        // mostramos le mensaje de alerta
        mostrarAlerta("Campo obligatorio");
        return false;
    }else{
        var expresion= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if(!expresion.test(email)){
            
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("email");
            mostrarAlerta("Por favor ingrese un email válido");
            return false;
        }
    }

// Verifica si el mensaje está vacío o es nulo
if(mensaje=="" || mensaje==null){

        cambiarColor("mensaje");
        
        // mostramos le mensaje de alerta
        mostrarAlerta("Campo obligatorio");
        return false;
    }else{
        
        // Define una expresión regular para validar el formato del mensaje
        var expresion= /^[,\\.\\a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;
        
        // Verifica si el mensaje no cumple con la expresión regular
        if(!expresion.test(mensaje)){
            
            // mostrara el mesaje que debe ingresar un nombre válido
            cambiarColor("mensaje");
            mostrarAlerta("No se permiten caracteres especiales");
            
            // Devuelve false para indicar que la validación no ha pasado
            return false;
        }
    }
    //se envia el formulario una vez haber completado todo
    $('form').submit();
    return true;
    
} 
//Selecciona los inputs. El evento focus se activa cuando un usuario hace clic o se enfoca en un campo de entrada 
$('input').focus(function(){
    
    //esta línea elimina cualquier elemento con la clase "alert
    $('.alert').remove();
    
    //restablecen el color de borde de los campos "nombre" y "email". 
    colorDefault('nombre');
    colorDefault('email');
});

//Lo mismo pero con los textarea
$('textarea').focus(function(){
    $('.alert').remove();
    colorDefault('mensaje');
});

//funcion color defecto a los bordes de los inputs
function colorDefault(dato){
    
    //busca un elemento HTML cuyo ID coincida con el valor de 'dato' y . css porque una vez haber encontrado el elemento, se aplica el color al borde
    $('#' + dato).css({
        border: "1px solid #999"
    });
}

    // Función para cambiar el color del borde
function cambiarColor(dato) {
        $('#' + dato).css({
            border: "2px solid #dd5144"
        });
  }
    
    // Función para mostrar la alerta
 function mostrarAlerta(texto){
    
    //se usa .before para insertar HTML justo antes de ese elemento. y el html que se inserta es el div con el mensaje
    $('#nombre').before('<div class="alert">Error: '+ texto +'</div>');
}


        // JUEGO
// inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 25;
let timerInicial = 25;
let tiempoRegresivoId = null;

// seleccionar elementos del DOM
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

// generar números
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);

//funciones
function contarTiempo(){
    
    // Establece un intervalo para ejecutar una función cada segundo
    tiempoRegresivoId = setInterval(() =>{
         
         // Decrementa el temporizador en cada iteración
        timer--;
        
        // Actualiza la visualización del tiempo en el HTML
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
         
        // Verifica si el temporizador ha alcanzado cero
        if(timer == 0){
           
           // Detiene el intervalo de tiempo
            clearInterval(tiempoRegresivoId);
            
            //Bloquea las tarjetas y no permite que se den vuelta
            bloquearTarjetas(); 
        }
    },1000);
}

//funcion para bloquear tarjetas
function bloquearTarjetas(){
    
    // Itera sobre las tarjetas (asumiendo que hay 16 tarjetas en total)
    for(let i = 0; i<=15; i++){
        
        // Obtiene la referencia a la tarjeta mediante su identificador
        let tarjetaBloqueada = document.getElementById(i);
       
       // Establece el contenido de la tarjeta como una imagen usando la ruta proporcionada por el array "numeros"
        tarjetaBloqueada.innerHTML = `<img src="imagenes/${numeros[i]}.png" alt="">`;
        
        // Desactiva la tarjeta para que no se pueda hacer clic en ella
        tarjetaBloqueada.disabled = true;
    }
}

// función principal de destapar
function destapar(id) {
  
  //Comprueba si el temporizador está desactivado
  if(temporizador == false){
    
    // Si es así, llama a la función para contar el tiempo
    contarTiempo();
    
    // Marca el temporizador como activado
    temporizador= true;
  }
  //Incrementa el contador de tarjetas destapadas independientemente del temporizador
  tarjetasDestapadas++;

  if (tarjetasDestapadas === 1) {
    
    // mostrar primer número
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="imagenes/${primerResultado}.png" alt="">`;

    // deshabilitar primer botón
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas === 2) {
    
    // mostrar segundo número
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="imagenes/${segundoResultado}.png" alt="">`;

    // deshabilitar segundo botón
    tarjeta2.disabled = true;

    // incrementar movimientos. Los movimientos son cada 2 tarjetas, lo cual representa un movimiento.
    movimientos++;

    // aplicar string, se actualiza la información
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    
    // verificar si los resultados coinciden
    if (primerResultado === segundoResultado) {
      
      // reiniciar contador de tarjetas destapadas
      tarjetasDestapadas = 0;

      // aumentar aciertos
      aciertos++;
      
      // Actualiza la visualización de aciertos en el HTML
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
    
    // Comprueba si se han alcanzado todos los aciertos deseados (8)
    if(aciertos == 8){
        
        // Para el temporizador
        clearInterval(tiempoRegresivoId);
        
        // Actualiza la visualización de aciertos para indicar que se ha completado el juego
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos} :0`; 
         
         // Muestra un mensaje de éxito junto con el tiempo y movimientos usados
        mostrarTiempo.innerHTML = `¡Genial! solo demoraste ${timerInicial - timer} segundos`; 
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} :D`;
    }

    }else{
        //mostrar de momento valores y volver a tapar
        setTimeout(() =>{
        
        // Restablece el contenido de las tarjetas
            tarjeta1.innerHTML = ' ';
            tarjeta2.innerHTML = ' ';
        
        // Habilita las tarjetas para que puedan ser seleccionadas nuevamente
            tarjeta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetasDestapadas = 0;
        },800);
        }
    }
}

// Obtener el elemento HTML con el id 'reiniciar' y asignarlo a la variable restartButton
let restartButton = document.getElementById('reiniciar');

// Definimos la función restartGame
function restartGame(){
    
    // Obtenemos el primer elemento con la clase 'section2' y lo asignamos a la variable fatherElement
    let fatherElement = document.querySelector('.section2');
      
      // Obtenemos el elemento con el id 'success' y lo asignamos a la variable successUp
    let successUp = document.querySelector('#success');
            
            // Agrega el elemento restartButton como hijo de fatherElement
            fatherElement.appendChild(restartButton);
             
             // Inserta el elemento restartButton antes del elemento successUp dentro de fatherElement
            fatherElement.insertBefore(restartButton, successUp);
            document.getElementById("section-height").style.height = "500px";
            
            // Establecer la clase del elemento restartButton como 'change-button'
            restartButton.setAttribute('class', 'change-button');

}
