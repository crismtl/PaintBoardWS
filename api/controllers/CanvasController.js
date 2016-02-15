/**
 * AmigoController
 *
 * @description :: Server-side logic for managing Amigoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  suscribirseOPublicarCanvas: function(req, res) {

    console.log('Entro a la función del Controlador Canvas');
    //guardamos los parámetros en una variable
    var parametros = req.params.all();
    //Vamos a hacer una comparación, si es que la petición es con webssockets y es un método post creamos y publicamos el Chat
    if (req.isSocket && req.method === 'POST') {
      sails.sockets.join(req.socket, 'canvas');
      console.log('Es un websocket y usa un método POST');
      if(parametros.comando=='startLine'){
        console.log('Dibujando...');
        // req.emit('down', parametros.data);
        sails.sockets.broadcast('canvas','down', parametros.data);
      }
      if(parametros.comando=='closeLine'){
        console.log('Trazo Terminado');
        // req.emit('up', parametros.data);
        sails.sockets.broadcast('canvas','up', parametros.data);
      }
      if(parametros.comando=='draw'){
          // req.emit('move', parametros.data);
          sails.sockets.broadcast('canvas','move', parametros.data);
      }
      if(parametros.comando=='clean'){
        console.log('Pizarra Limpia');
        sails.sockets.broadcast('canvas','clean', parametros.data);
        // req.emit('clean', parametros.data);
      }
    } else if (req.isSocket) {

      //Suscribimos al usuario a Chat
      Canvas.watch(req.socket);

      console.log('Se ha suscrito con el id de socket: ' + req.socket.id);
      // console.log(req.socket);
      //MAnejo del Canvas
      return res.ok('Suscrito con el id: ' + req.socket.id);

    } else {

      //Si no se suscribe ni se crea un chat, entonces desplegar en consola que es un bad request.
      console.log('Bad Request');
    }
  }
};
