const express = require('express');
const {UsersController} = require('./controller');

const router = express.Router();

module.exports.UsersAPI = (app) =>{
    router
        .get('/', UsersController.getUsers) //http://localhost:3000/api/User/
        .get('/:id', UsersController.getUser ) //http://localhost:3000/api/User/23
        .post('/', UsersController.createUser )
        .post('/upd/:id',UsersController.updateUser)
        .post('/del/:id',UsersController.deleteUser);

    app.use('/api/users',router);
}