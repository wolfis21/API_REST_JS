const createError = require('http-errors');
const debug = require('debug')('app:module-sales-controller');
const { SalesService} = require('./service');
const {Response} = require('../common/response');

module.exports.SalesController = {
    getSales: async (req, res) => {
        try {
            let sales = await SalesService.getAll();
            Response.success(res, 200, "Lista de ventas", sales);
        } catch (error) {
            debug(error);
           Response.error(res);
        }
    },
    getSale: async (req, res) => {
        try {
            const { params: { id } } = req;
            let sale = await SalesService.getById(id);
            if(!user){
                Response.error(res, new createError.NotFound());
            }else{
                Response.success(res, 200, `sales ${id}`, sale);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    //crete implementar

    createSale: async (req, res) => {
        try {
          const { body } = req
     
          if (body || Object.keys(body).length > 0) {
            let product = await ProductsService.getById(body.product)
            let user = await UsersService.getById(body.user)
     
            if (!product || !user || product.stock < body.quantity) {
              Response.error(
                res,
                new createErrors.BadRequest('User, product not exists or no stock available')
              )
            } else {
              const insertedId = await SalesService.create(body)
              Response.success(res, 201, 'The sale has been created', insertedId)
            }
          } else {
            Response.error(res, new createErrors.BadRequest('Error, no body data exists'))
          }
        } catch (error) {
          debug(error)
          Response.error(res)
        }
      },

    // update de Ventas
  updateSale: async (req, res) => {
    try {
      //destructuramos los parametros por id y el body
      const {
        params: { id },
      } = req;
      const { body } = req;
      //almacenamos los recivido en la variable sales
      let sales = await salesService.update(id, body);
      //validamos
      if (!sales) {
        Response.error(res, new createError.NotFound());
      } else {
        //mostramos el sales recibido
        Response.success(res, 200, `Venta ${id} modificado`, Object(body));
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
 
  // delete de Ventas
  deleteSale: async (req, res) => {
    try {
      //destructuramos el parametro del id
      const {
        params: { id },
      } = req;
      // almacenamos en la variable saleso el id eliminado
      let sales = await salesService.deleteS(id);
      //validamos si fue eliminado
      if (sales.deletedCount === 1) {
        Response.success(res, 202, `Venta ${id} eliminado`, sales);
      } else {
        Response.error(res, new createError.NotFound());
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};