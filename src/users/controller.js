const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');
const { UsersService} = require('./service');
const {Response} = require('../common/response');

module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            let users = await UsersService.getAll();
            Response.success(res, 200, "Lista de users", users);
        } catch (error) {
            debug(error);
           Response.error(res);
        }
    },
    getUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let user = await UsersService.getById(id);
            if(!user){
                Response.error(res, new createError.NotFound());
            }else{
                Response.success(res, 200, `users ${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0 ) {
                Response.error(res, new createError.BadRequest());
            } else {
                const insertedId = await UsersService.create(body);
                Response.success(res, 201, `users agregado`, insertedId);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    // update de usersos
  updateUser: async (req, res) => {
    try {
      //destructuramos los parametros por id y el body
      const {
        params: { id },
      } = req;
      const { body } = req;
      //almacenamos los recivido en la variable users
      let users = await usersService.update(id, body);
      //validamos
      if (!users) {
        Response.error(res, new createError.NotFound());
      } else {
        //mostramos el users recibido
        Response.success(res, 200, `users ${id} modificado`, Object(body));
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
 
  // delete usersos
  deleteUser: async (req, res) => {
    try {
      //destructuramos el parametro del id
      const {
        params: { id },
      } = req;
      // almacenamos en la variable userso el id eliminado
      let users = await usersService.deleteP(id);
      //validamos si fue eliminado
      if (users.deletedCount === 1) {
        Response.success(res, 202, `users ${id} eliminado`, users);
      } else {
        Response.error(res, new createError.NotFound());
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};