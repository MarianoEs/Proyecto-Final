
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

const botonTerminar = document.getElementById('terminarCompra');




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

botonTerminar.addEventListener('click',() => {
    if ( carrito.length === 0 ){
        swal({                              
            title: "¡Algo anda mal!",
            text: "¡el carrito esta vacio!", 
            icon: "error",
        })
    } else {
        swal({                              
            title: "¡Genial!",
            text: "¡La compra se realizó con éxito!", 
            icon: "success",
        })
    }
});


