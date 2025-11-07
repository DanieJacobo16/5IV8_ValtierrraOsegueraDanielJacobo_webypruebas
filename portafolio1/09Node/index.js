var http = require('http');
var servidor=http.createServer(function(req, res){ 

    //req -> Request es una solicitud que hace el cliente,viene por parte de la arquitectura, todos los clientes (navegadores, apps, etc) hacen solicitudes al servidor
    //res -> Response es la respuesta que el servidor le da al cliente, es decir, lo que el servidor le envia al cliente
    res.writeHead(200, {'Content-Type': 'text/html; charset-utf-8'}); //200 es el codigo de exito, y el segundo parametro es un objeto con las cabeceras http , {'Content-Type': 'text/plain'} indica que el contenido que se envia es texto plano
    res.write('<h1>Hola Mundo desde Node.js</h1>'); 
     res.write('<h1>A mimir</h1>');//con write se escribe la respuesta que se le envia al cliente
    console.log('Si entro al servidor'); //mensaje que se muestra en la consola del servidor
    res.end(); //end indica que se ha terminado de enviar la respuesta al cliente
});
// Es necesario tener un puerto de comunicacion para que el servidor pueda escuchar las solicitudes del cliente, por ejemplo:
servidor.listen(3000); //el servidor escucha en el puerto 3000
console.log('Servidor ejecutandose en http://localhost:3000'); //mensaje que se muestra en la consola del servidor indicando la url para acceder al servidor
