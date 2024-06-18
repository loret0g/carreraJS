"use strict";

const select = document.querySelector("#seleccion");
const buttonStart = document.querySelector("#iniciar");
const buttonRestart = document.querySelector("#reiniciar");
let carsArray = [];
let positions = [];

// Div y botón para tabla de clasificaciones
let table = document.createElement("div"); // <div> para la tabla de clasificaciones
table.className = "table-positions";

let close = document.createElement("span");
close.className = "close-x";
close.innerHTML = "&times;";
table.appendChild(close);

// Botón 'Reiniciar' al hacer click
buttonRestart.addEventListener("click", function () {
  buttonRestart.style.display = "none";
  buttonStart.style.display = "block";
  reinicio();   // Función para reiniciar la partida.
});

select.addEventListener("change", function() {
    let cochesElegidos = document.getElementById("seleccion").value;
    mostrarCoches(cochesElegidos);
});

function mostrarCoches(coches) {
    // Eliminar todas las imágenes existentes
    document.querySelectorAll('.road').forEach(element => element.remove());

    // Crear nuevas imágenes y agregarlas a divs
    for (let i = 1; i <= coches; i++) {
        const image = new Image();
        image.src = `images/${i}.png`;

        carsArray.push(image);

        let div = document.createElement("div");
        div.className = "road";

        // Añadir imagen al div
        div.appendChild(image);
        // Añadir el div al cuerpo del documento
        document.body.appendChild(div);
    }
}

// Botón 'Iniciar' al hacer click
buttonStart.addEventListener("click", function () {
  buttonStart.style.display = "none";
  buttonRestart.style.display = "block";
  animar(carsArray);    // Llamada a la función 'START' con los coches seleccionados
});

// FUNCIÓN ANIMAR
function animar(carsArray) {
  let meta = window.innerWidth - 300;     // Línea de meta con el ancho de la página (menos 300)

  for (let i = 0; i < carsArray.length; i++) {
    let speed = Math.floor(Math.random(10 - 1) * 10) + 1; // Velocidad aleatoria para cada img

    $(document).ready(function () {
      $("img").eq(i).animate(
        {
          marginLeft: "77%"
        },
        speed * 1000,
        function () {
          positions.push(i);      // Se añaden al array 'positions' por orden de llegada.

          // Creo elementos <div> para mostrar la posición al lado de cada participante
          let divPosiciones = document.createElement("div");
          divPosiciones.className = "individual";
          divPosiciones.textContent = `${positions.length}ª posicion`;

          // Creo un elemento <p> para añadir las posiciones en la tabla
          let positionTable = document.createElement("p");
          positionTable.textContent = `${positions.length}ª posicion - Vehiculo nº ${i + 1}`;
          table.appendChild(positionTable);

          // Función para agregar cada posicións en el div de cada imagen
          agregarDivPosicionesAlDivDeImagenes(i, divPosiciones);

          // Cuando finalice la carrera, mostrar la tabla de clasificación
          if (carsArray.length === positions.length) {
            document.body.appendChild(table);
          }
        });
    });
  }
}

// Función para agregar el div de posiciones al div de imagen correspondiente
function agregarDivPosicionesAlDivDeImagenes(index, divPosiciones) {
  // Obtener cada div de imágenes usando el índice
  let divsImages = document.querySelectorAll(".road")[index];

  // Agregar divPosiciones como hijo de divDeImagenes
  divsImages.appendChild(divPosiciones);
}

// Cierre de tabla de clasificaciones
close.addEventListener("click", function () {
    table.style.display = "none";
  });

// Función para reiniciar la partida.
function reinicio() {
  table.style.display = "none";     // Ocultar el <div> de clasificaciones 
  $(document).ready(function () {
    $("img").stop();
    $(".individual").hide();      // Ocultar las posiciones individuales con jQuery
    $("img").animate({
      marginLeft: "0px"
    }, 3000);
  });

  setTimeout(() => {
    location.reload();
  }, "3400");
}    
