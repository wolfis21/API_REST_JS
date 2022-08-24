const {ObjectId} = require('mongodb');

const {Database} = require('../database');

const COLLECTION = 'users';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();

};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({_id:ObjectId(id) });
};

//update 
const update = async (id, product) => {
    //acceso a la base de datos
    const collection = await Database(COLLECTION);
    //modificamos el objeto seleccionado
    let result = await collection.updateOne(
      { _id: ObjectId(id) },
      { $set: { ...product } },
      { upsert: true }
    );
    //mostramos resultado
    return result;
  };
   
  //delete
   
const deleteP = async (id)=>{
    //acceso a base de datos
    const collection = await Database(COLLECTION);
    //eliminamos el objeto con el id seleccionad
    let result = await collection.deleteOne({ _id: ObjectId(id) });
    //mostramos resultado
    return result;
  };


const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result= await collection.insertOne(product);
    return result.insertedId;
};

module.exports.UsersService ={
    getAll,
    getById,
    create,
    update,
    deleteP,
};