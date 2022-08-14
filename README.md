## Demo 
Podés visitar la web acá: [www.JustBuy.com](https://rafaelgini.github.io/JustBuy_Official/)

## Descripción 
Hola ! 

Si hacen alguna prueba o por alguna  extraña razon se daña el local storage, ejecuten localStorage.clear() en la consola y refresquen la pagina. 
Soy conciente de que algunos datos del localstorage son sensibles y lo aclaro mas adelante.

1. Diseño de implementación:
5 html, 1 css, 1 JS por html y algun que otro JS de comportamiento global. En el index: caracteristicas principales de la marca, publicidad, productos destacados, comentarios, links y patrocinadores. productos.html: contiene todos los productos que se vende con la caracteristicas de poder ordenarlos. Un html que contiene el carrito y demas. 

2. Base de datos:
Todos los productos de la compañia se encuentran en una base de datos, en este caso un archivo json dentro de de la app. El archivo json lo escribí de manera automatica con un modulo de node js, estaría buenisimo que lo miren ya que tuve que migrar las clases y las declaraciones de objetos a otro repositorio para lograr escribir la base de datos: https://github.com/RafaelGini/JustBuy_DataBaseGenerator
En este repositiorio aplico clases y herencia, nada mas. 

3. Implementación:
Los Js hacen fetch a este archivo .json para extraer los datos de forma asincronica y publicarlos de manera dinamica en los contenedores principales de productos. 
Cuando se hace click en un producto pasan dos cosas:
Primero que nada el contenedor de cada producto es una etiqueta "a", por ende redirecciona al usuario al archivo detallesdeproducto.html.
Ademas, carga al local storage el producto, de modo que cuando el usuario sea redireccionado, el html tomará el producto en texto plano del local storage y publicará sus detalles, cuando el usuario haga click en agregar al carrito pasan tres cosas, se extrae el carrito del local storage, se agrega el producto o modifica su cantidad, y se vuelve a subir el carrito al local storage. Se envía un dato al localstorage para indicar que se acaba de añadir un producto nuevo, y se redirecciona el usuario a la pagina con su carrito. Al cargarse este archivo html lo primero que detecta es la señal de que se agrego un producto para lanzar un toast con sweetalert que indica que el producto fue añadido. Se ejecutan una serie de funciones que cargan los productos y sus precios. Los productos se almacenan en el carrito del localstorage en formato json literal, porque a mi parecer seria mas eficiente que guardar los ids y buscarlos en la base de datos, por lo menos para este proyecto, soy conciente de que se trata de datos sensibles.

4. Experiencia de usuario:
Como usuario, si no se toca el local storage, se puede hacer y navegar la pagina a gusto. Uno de mis principales objetivos es que sea irrompible. Se pueden apretar los productos agregar la cantidad que de la gana al carrito, sacar, modificar y demás. Es bastante intuitivo. Aclaro que si le dan al boton comprar no se gasta dinero de verdad. por la dudas. 

5. Diseño:
El diseño lo saque principalmente como inspiracion de un youtuber indio que hace unas webs similares a esta. El tipo utiliza tecnicas obsoletas de JS, html y css por lo que tuve que modificar muchas cosas y otras simplemente a mi gusto. Ademas del diseño web, es como si hubiera diseñado una marca tambien. 

Les recomiendo visitar ese otro repositorio donde genero la base de datos ya que obviamente no voy a escribir esa enorme cantidad de productos a mano. Espero que le guste mucho la web. Me encantaría saber que cosas se pueden mejorar. La pasé muy bien y aprendí muchisimo durante la cursada de JavaScript en CoderHouse. Un saludo!