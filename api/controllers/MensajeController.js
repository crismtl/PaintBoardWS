/**
 * MensajeController
 *
 * @description :: Server-side logic for managing Mensajes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	suscribirseOPublicar: function(req, res) {

    console.log('Entro a la función del Controlador Mensaje');

    var parametros = req.params.all();
    
    if (req.isSocket && req.method === 'POST') {
      console.log('Es un websocket y usa un método POST', parametros.texto);

      Mensaje.create({
        texto: parametros.texto,
        fechaDeEnvio: new Date(),
        idUsuario: parametros.idUsuario
      }).exec(function(err, nuevoMensaje) {
        if (err) console.log(err);

        console.log('se creo el mensaje del chat: ', nuevoMensaje);

        Mensaje.publishCreate({
          texto: nuevoMensaje.texto,
          fechaDeEnvio: nuevoMensaje.fechaDeEnvio,
          idUsuario: nuevoMensaje.idUsuario
        });
      });
    } else if (req.isSocket) {
      Mensaje.watch(req.socket);
      console.log('Se ha suscrito con el id de socket: ' + req.socket.id);
      return res.ok('Suscrito con el id: ' + req.socket.id);
    } else {
      console.log('Bad Request');
    }
  }
};
