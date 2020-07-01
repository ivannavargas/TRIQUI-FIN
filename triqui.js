let nb = 3
let miMatriz = new Array(nb) // crea una matriz de longitud 3
for (var i = 0; i < nb; i++) {
  miMatriz[i] = new Array(nb) // define cada elemento como una matriz de longitud 3
  for (var j = 0; j < nb; j++) {
    miMatriz[i][j] = ''
  }
}

const boton = document.getElementById('boton')

function click_button() {
  let miMensaje = document.getElementById('mensaje')
  let squarePosition = 0

  miMatriz = new Array(nb) // crea una matriz de longitud 3
  for (var i = 0; i < nb; i++) {
    miMatriz[i] = new Array(nb) // define cada elemento como una matriz de longitud 3
    for (var j = 0; j < nb; j++) {
      miMatriz[i][j] = ''
    }
  }
  tablero.innerHTML = ''
  miMatriz.forEach((e) => {
    e.forEach((array) => {
      tablero.innerHTML =
        tablero.innerHTML +
        `<input type='text' class='casilla' id=${squarePosition} onClick='realizarJugada()'>${array}</input>`
      squarePosition++
    })
  })
  tablero.innerHTML =
    tablero.innerHTML +
    "<input class='boton' type='button' value='X' id='boton1' onClick='alternarBotones()'>"
  tablero.innerHTML =
    tablero.innerHTML +
    "<input class='boton' type='button' value='O' id='boton2' onClick='alternarBotones()'>"
  miMensaje.innerText = ''
}

function armarTablero() {
  let squarePosition = 0
  const tablero = document.getElementById('tablero')

  miMatriz.forEach((e) => {
    e.forEach((array) => {
      tablero.innerHTML =
        tablero.innerHTML +
        `<input type='text' class='casilla'  id=${squarePosition} onClick='realizarJugada()'>${array}</input>`
      squarePosition++
    })
  })

  tablero.innerHTML =
    tablero.innerHTML +
    "<input class='boton' type='button' value='X' id='boton1' onClick='alternarBotones()'>"
  tablero.innerHTML =
    tablero.innerHTML +
    "<input class='boton' type='button' value='O' id='boton2' onClick='alternarBotones()'>"
}

function alternarBotones() {
  let boton1 = document.getElementById('boton1')
  let boton2 = document.getElementById('boton2')

  if (boton1.disabled === true) {
    boton1.disabled = false
    boton2.disabled = true
  } else {
    boton1.disabled = true
    boton2.disabled = false
  }
}

function realizarJugada() {
  let miCuadro = event.target

  if (!(miCuadro.value === 'X' || miCuadro.value === 'O')) {
    let boton1 = document.getElementById('boton1')
    let valor
    if (boton1.disabled === true) {
      valor = 'O'
    } else {
      valor = 'X'
    }

    miCuadro.value = valor

    switch (parseInt(miCuadro.id)) {
      case 0:
        miMatriz[0][0] = valor
        break
      case 1:
        miMatriz[1][0] = valor
        break
      case 2:
        miMatriz[2][0] = valor
        break
      case 3:
        miMatriz[0][1] = valor
        break
      case 4:
        miMatriz[1][1] = valor
        break
      case 5:
        miMatriz[2][1] = valor
        break
      case 6:
        miMatriz[0][2] = valor
        break
      case 7:
        miMatriz[1][2] = valor
        break
      case 8:
        miMatriz[2][2] = valor
        break
      default:
        break
    }

    alternarBotones()

    //Aquí llenar la matriz
    let miMensaje = document.getElementById('mensaje')

    //Aquí llamamos a la función verificarTriqui()
    let verificacion = verificarTriqui()
    if (verificacion) {
      miMensaje.innerText = 'Juego terminado'
      const casilla = document.getElementsByClassName('casilla')
      for (let i = 0; i < casilla.length; i++) {
        casilla[i].disabled = true
      }
    }
  } else {
    miMensaje.innerText = 'Este cuadro ya está ocupado!!!!'
  }
}

function verificarTriqui() {
  let triqui = false
  // //Verificar si hay triqui en las columnas
  for (let i = 0; i < 3; i++) {
    if (
      miMatriz[i][0] !== '' &&
      miMatriz[i][1] !== '' &&
      miMatriz[i][2] !== ''
    ) {
      if (miMatriz[i][0] === miMatriz[i][1]) {
        if (miMatriz[i][1] === miMatriz[i][2]) {
          triqui = true
        }
      }
    }
  }

  //Verificar si hay triqui en las filas
  for (let i = 0; i < 3; i++) {
    if (
      miMatriz[0][i] !== '' &&
      miMatriz[1][i] !== '' &&
      miMatriz[2][i] !== ''
    ) {
      if (miMatriz[0][i] === miMatriz[1][i]) {
        if (miMatriz[1][i] === miMatriz[2][i]) {
          triqui = true
        }
      }
    }
  }

  // Para verificar si hay triqui en las diagonales
  if (miMatriz[0][0] !== '' && miMatriz[1][1] !== '' && miMatriz[2][2] !== '') {
    if (miMatriz[0][0] === miMatriz[1][1]) {
      if (miMatriz[1][1] === miMatriz[2][2]) {
        triqui = true
      }
    }
  }

  if (miMatriz[0][2] !== '' && miMatriz[1][1] !== '' && miMatriz[2][0] !== '') {
    if (miMatriz[0][2] === miMatriz[1][1]) {
      if (miMatriz[1][1] === miMatriz[2][0]) {
        triqui = true
      }
    }
  }

  return triqui
}
