/**
 * ImagenController
 *
 * @description :: Server-side logic for managing Imagens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	suscribirseOPublicar: function(req, res) {

    console.log('Entro a la función del Controlador Imagen');
    //guardamos los parámetros en una variable
    var parametros = req.params.all();
    //Vamos a hacer una comparación, si es que la petición es con webssockets y es un método post creamos y publicamos el Chat
    if (req.isSocket && req.method === 'POST') {
      console.log('Es un websocket y usa un método POST');
    } else if (req.isSocket) {

      //Suscribimos al usuario a Chat
      Imagen.watch(req.socket);
      console.log('Se ha suscrito con el id de socket: ' + req.socket.id);
      return res.ok('Suscrito con el id: ' + req.socket.id);

    } else {

      //Si no se suscribe ni se crea un chat, entonces desplegar en consola que es un bad request.
      console.log('Bad Request');
    }
  }
};
