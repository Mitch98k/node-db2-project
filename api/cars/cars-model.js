const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars').orderBy('id');
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars').where({id}).first();
}

const create = async (car) => {
  // DO YOUR MAGIC
  const [id] = await db('cars').insert(car);
  return db('cars').where({id}).first();
}

const getByVin = (vin) => {
  return db('cars').where(vin=vin);
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin
}
