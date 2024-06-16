
const Postre = function (nombre,precio,stock){ // funcion constructora

    this.nombre= nombre
    this.precio= precio
    this.stock= stock

}

let postre1 = new Postre ("budin",1000,100)
let postre2 = new Postre ("macarron",700,400)
let postre3 = new Postre ("hojaldre",250,200)
let postre4 = new Postre ("carrotCake",1500,800)


let menu = [postre1,postre2,postre3,postre4]

let nombre = "Mailin Sweet"
let presentacion = document.getElementById("presentacion")

presentacion.innerHTML = `<h1>${nombre}</h1>`

fetch('productos.json')
  .then((response) => response.json())
  .then((data)=>{

    const ps = data.ps

    const container = document.getElementById('ps-container')

    ps.forEach((x)=>{

        const ppElement = document.createElement('p')
        ppElement.innerHTML = `productos mas vendidos ${x.nombre}`
        container.appendChild(ppElement)

    })


  }).catch((error)=>{
    console.log("error en fetch")
  })


let informacion = "Escriba el producto que busca y su cantidad"
let disponibilidad = document.getElementById("disponibilidad")

disponibilidad.innerHTML = `<h2>${informacion}</h2>`



function filtrarPostre() {
    const body = document.querySelector("body")
    const input1 = document.getElementById("postre").value
    const input2 = document.getElementById("cantidad").value

    const postreSeleccionado = input1.trim().toUpperCase()
    const unidades = parseInt(input2);

    const resultado = menu.filter((x) => x.nombre.toUpperCase().includes(postreSeleccionado.toUpperCase()))

    if (resultado.length > 0) {
        const container = document.createElement("div")

        setTimeout(() => {
            resultado.forEach((resultado) => {
                const card = document.createElement("div")

                const nombre = document.createElement("h3")
                nombre.innerHTML = `Postre: ${resultado.nombre} `
                card.appendChild(nombre)

                let monto = document.createElement("p")
                monto.innerHTML = `Monto: ${resultado.precio * unidades}`
                card.appendChild(monto)

                const iva = document.createElement("p")
                iva.innerHTML = `IVA: ${(resultado.precio * unidades) * 0.21}`
                card.appendChild(iva)

                let total = document.createElement("p")
                total.innerHTML = `Total: ${((resultado.precio * unidades) * 0.21) + (resultado.precio * unidades)}`
                card.appendChild(total)

                const btnBorrar = document.createElement("button")
                btnBorrar.textContent = "Borrar"
                btnBorrar.addEventListener("click", () => {
                    Swal.fire({
                        title: "Estas seguro de borrar ?",
                        text: "No podras volver al producto!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si, Borralo!"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: "Borrado!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                          card.remove() // Eliminar la tarjeta al hacer clic en el botón
                        }else{
                            container.appendChild(card)
                        }
                      });
                    
                    
                })
                card.appendChild(btnBorrar)



                container.appendChild(card)
            })

            body.appendChild(container)
        }, 1500)
        
    }else{
        alert("El producto no está en la lista")
    }
}




//botonera

let btnAceptar = document.getElementById("pedido")

btnAceptar.addEventListener("click",filtrarPostre)

let btnCandelar = document.getElementById("arrepentimiento")

btnCandelar.addEventListener("click", (x)=> {
    
    const respuesta = confirm("le interesa el producto") ? true : false

    respuesta ? alert ("presione Aceptar") : alert(" nos vemos en otra oportunidad")
    
})




localStorage.setItem("disponible", JSON.stringify(menu))
alert("disponible guardado")

//localStorage.clear()

