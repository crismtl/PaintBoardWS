/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login: function(req, res) {
        var parametros = req.allParams();
        console.log(parametros);

        Usuario.findOne({
            email: parametros.email
        }).exec(function(err, usuario) {

            if (err) console.log(err);

            if (parametros.password != usuario.password) {
                return res.badRequest({
                    error: 'Password Incorrecto'
                });
            } else {
                delete usuario.password;
                return res.ok(usuario);
            }
        });
    }
};
