const db = require('../config/db')
const squel = require('squel')

const TABLE_NAME ='Clients';

db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(80),
  age INT,
  info VARCHAR(80),
  details LONGTEXT,
  gender VARCHAR(50),
  image LONGTEXT,
  petId INT,
  PRIMARY KEY (id)
)`, err => {
  if(err) throw err
})

exports.findAll = () => new Promise((resolve,reject) => {
  let sql = squel.select()
                 .field('Clients.name')
                 .field('Clients.id','id')
                 .field('Clients.age')
                 .field('Clients.info')
                 .field('Clients.image')
                 .field('Clients.details')
                 .field('Clients.gender')
                 .field('Clients.petId')
                 .field('Animals.name','animalName')
                 .from(TABLE_NAME)
                 .join('Animals',null,'Clients.petId = Animals.id')
                //  .where('Animals.clientId = 1')
                 .toString()

  db.query( sql, (err, animals) => {
    err ? reject(err) : resolve(animals);
  })
})

exports.findLonely = () => new Promise((resolve,reject) => {
  db.query(`SELECT * FROM ${TABLE_NAME} WHERE petId IS NULL OR info='experienced'`, (err, clients) => {
    if (err) return reject (err);
    resolve(clients)
  })
})

exports.create = function( client) {
  return new Promise((resolve,reject) => {
    let sql = squel.insert().into(TABLE_NAME).setFields(client).toString()
    db.query(sql, (err,result) => {
      if(err) return reject(err)
      resolve(result)
    })
  })
}
exports.update = function (clientId, updateObj){
  return new Promise((resolve,reject) => {
    let sql = squel.update().table(TABLE_NAME).setFields(updateObj).where(`id = ${clientId}`).toString()
    db.query(sql, (err,result) =>{
      err ? reject(err) : resolve(result);
    })
  })
}

exports.del = function (clientId){
  return new Promise((resolve,reject) => {
    let sql = squel.delete().from(TABLE_NAME).where(`id = ?`, parseInt(clientId)).toString()
    db.query(sql, (err,result) =>{
      err ? reject(err) : resolve(result);
    })
  })
}

exports.unadopt = function (clientId){
  return new Promise((resolve,reject) => {
    let sql = squel.update().table(TABLE_NAME).set('petId',null).where(`id = ${clientId}`).toString()
      console.log('sql: ', sql);
    db.query(sql, (err,result) =>{
      console.log("result",result)
      err ? reject(err) : resolve(result);
    })
  })
}

exports.adopt = function (clientId,animalId){
  return new Promise((resolve,reject) => {
    let sql = squel.update().table(TABLE_NAME).set('petId',animalId).where(`id = ${clientId}`).toString()
      console.log('sql: ', sql);
    db.query(sql, (err,result) =>{
      console.log("result",result)
      err ? reject(err) : resolve(result);
    })
  })
}
