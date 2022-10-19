
let nombre = "";
let precio = "";
let cuotas = "";
let lugarjuego = 0;


const juegos = [];
let carrito = [];

class Juego {

    constructor(id, nombre, precio, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
};


const contentJuego = document.getElementById('content-juego');

const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciar = document.getElementById('vaciar-carrito');

const precioTotal = document.getElementById('precioTotal')

const cantidad = document.getElementById('cantidad')




document.addEventListener('DOMContentLoaded',() => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
         actualizarCarrito()
     }
 });

botonVaciar.addEventListener('click', () => {
    carrito.length = 0;
    localStorage.clear()
    actualizarCarrito()
});

//ejecuciones de funciones
cargarJuego(); 

//implementacion de FETCH

function cargarJuego() {
    fetch('./juegos.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(juego => {
                juegos.push({ ...juego, cantidad: 0 });
                let {id, nombre, precio, imagen} = juego;
                const div = document.createElement('div');
                div.classList.add('card')
                div.innerHTML = `
                <img src=${imagen} alt="">
                <h3>${nombre}</h3>
                <p class="precioJuego">Precio:$ ${precio}</p>
                <button id="agregar${id}" button type="button" class="btn btn-primary">Agregar al Carrito<i class=fas fa-shopping-cart"></i></button>
                `
                contentJuego.appendChild(div)

                const boton = document.getElementById(`agregar${id}`)

                boton.addEventListener('click',() =>{
                    agregarAlCarrito(id)
                    swal({                              //Libreria
                        title: "¡Genial!",
                        text: "¡Haz agregado un juego a tu carrito!", 
                        icon: "success",
                    });
                })
            })
            
        })
        .catch(error => {
            carrito.innerHTML = "<p>Error: Algo falló </p>"
        });
};

 
console.log(juegos)

//dibujar card

juegos.forEach((juego) => {

    let {nombre, precio, id, foto} = juego; //Desestructuración

    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <img src=${foto} alt="">
    <h3>${nombre}</h3>
    <p class="precioJuego">Precio:$ ${precio}</p>
    <button id="agregar${id}" button type="button" class="btn btn-primary">Agregar al Carrito<i class=fas fa-shopping-cart"></i></button>
    `
    contentJuego.appendChild(div)

    const boton = document.getElementById(`agregar${id}`)

    boton.addEventListener('click',() =>{
        agregarAlCarrito(id)
        swal({                              //Libreria
            title: "¡Genial!",
            text: "¡Haz agregado un juego a tu carrito!", 
            icon: "success",
          });
    })
});

//Carrito

const agregarAlCarrito = (juegoId) => {
    const juegoEnCarrito = carrito.find((juego) => {
      return juego.id === juegoId;
    });
    const datosJuego = {...juegos.find((juego) => {
        return juego.id === juegoId;
      })
    };
  
    if (juegoEnCarrito) {
      juegoEnCarrito.cantidad++;
      juegoEnCarrito.precio = datosJuego.precio * juegoEnCarrito.cantidad;
    } else {
      carrito.push(datosJuego);
    }
  
    actualizarCarrito();
  };

const eliminarDelCarrito = (juegoId) => {
    const item = carrito.find((juego) => juego.id === juegoId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
};

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""

    carrito.forEach((juego) => {
       
        let {nombre, precio, id} = juego; //Desestructuración

        const div = document.createElement('div')
        div.className = ('juegoEnCarrito')
        div.innerHTML = `
        <p> ${nombre}</p>
        <p>Precio: $ ${precio}</p>
        <p>Cantidad: <span id="cantidad">${juego.cantidad}</span></p>
        <button onClick = "eliminarDelCarrito (${id})" "button type="button" class="btn btn-primary">Eliminar<i class=fas fa-shopping-cart"></i></button>       
        `
        contenedorCarrito.appendChild(div)

    })

    localStorage.setItem('carrito', JSON.stringify(carrito))

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
};








//
/*
function crearCard(Juego) {
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card";
    cuerpoCarta.innerHTML = `
        <h5>${Juego.nombre} </h5>
        <p>$ ${Juego.precio} USD</p>
    `;
    cuerpoCarta.append(botonAgregar);
};

function dibujarCatalogoJuegos() {
    contenedorJuegos.innerHTML = "";

    juegos.forEach(
        (juegos) => {
            let contenedorCarta = crearCard(juegos);
            contenedorJuegos.append(contenedorCarta);
        }
    );
};

const buscarjuego = juegos.find((juegos) => juegos.nombre === nombre);

function dividir (cuotas){

    precio = buscarjuego.precio;

    switch(cuotas){
        case 3: 
        return precio / cuotas;
        break;
        case 6: 
        return precio / cuotas * 0.20;
        break;
        case 12: 
        return precio / cuotas * 0.20;
        break;
        default: 
        return 0;
        break;
    }
}; 


cuotas = parseInt(prompt("ingrese cantidad de cuotas 3, 6 o 12 (6 y 12 interes del 20 %"));
let resultado = dividir(cuotas);

let factura1 = document.getElementById('modal');
factura1.innerHTML = "<h2> El total de su compra es: </h2>" + "$" + resultado;
document.body.appendChild(factura1);

const respuesta = () => {
    alert("¡Gracias por su compra!");
  }
  let boton = document.getElementById("comprar");
  boton.addEventListener("click", respuesta);

  */