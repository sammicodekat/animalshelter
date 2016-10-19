const db = require('../config/db')
const squel = require('squel')

const TABLE_NAME ='Animals';

db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(80),
  age INT,
  characters VARCHAR(80),
  clientId INT,
  image LONGTEXT,
  details LONGTEXT,
  gender VARCHAR(50),
  breed VARCHAR(50),
  size VARCHAR(80),
  PRIMARY KEY (id)
)`, err => {
  if(err) throw err
})

exports.findAll = () => new Promise((resolve,reject) => {
  let sql = squel.select()
                 .field('Animals.name')
                 .field('Animals.id','id')
                 .field('Animals.age')
                 .field('Animals.characters')
                 .field('Animals.image')
                 .field('Animals.details')
                 .field('Animals.gender')
                 .field('Animals.breed')
                 .field('Animals.size')
                 .field('Clients.name','clientName')
                 .from(TABLE_NAME)
                 .join('Clients',null,'Animals.clientId = Clients.id')
                //  .where('Animals.clientId = 1')
                 .toString()

  db.query( sql, (err, animals) => {
    err ? reject(err) : resolve(animals);
  })
})

exports.findLonely = () => new Promise((resolve,reject) => {
  db.query(`SELECT * FROM ${TABLE_NAME}`, (err, clients) => {
    if (err) return reject (err);
    resolve(clients)
  })
})

exports.create = function( animal ) {
  return new Promise((resolve,reject) => {
    let sql = squel.insert().into(TABLE_NAME).setFields(animal).toString()
    db.query(sql, (err,result) => {
      err ? reject(err) : resolve(result);
    })
  })
}

exports.update = function (animalId, updateObj){
  return new Promise((resolve,reject) => {
    let sql = squel.update().table(TABLE_NAME).setFields(updateObj).where(`id = ${animalId}`).toString()
      console.log('sql: ', sql);
    db.query(sql, (err,result) =>{
      err ? reject(err) : resolve(result);
    })
  })
}