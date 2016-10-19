require('dotenv').config();

const db = require('./config/db')
const squel = require('squel')


db.query('drop table Clients');
db.query('drop table Animals', err => {
  if (err) throw err;

  require('./models/Client')
  require('./models/Animal')

  let animalSql =squel.insert().into('Animals').setFieldsRows([
    {name: 'Bob',age:'3',characters:'energetic',gender:'male',size:'small',breed:'Lab',image:'https://s-media-cache-ak0.pinimg.com/originals/b0/54/f9/b054f9bf75fe74a38995cb0ccc240af5.jpg',details:'he is a happy dog'},
    {name: 'Katy',age:'1',characters:'shy',gender:'female',size:'medium',breed:'Cat',image:'https://s-media-cache-ak0.pinimg.com/236x/8e/d7/41/8ed7410285f101ba5892ff723c91fa75.jpg',details:'she likes to hide'},
    {name: 'Zack',age:'2',characters:'drool',gender:'male',size:'large',breed:'Black Lab',image:'http://cdn3-www.dogtime.com/assets/uploads/2009/06/bolognese-dog.jpg',details:'he likes watermelon'}
  ]).toString()

  db.query(animalSql, err => {
    if (err) throw err;
  })

  let clientSql =squel.insert().into('Clients').setFieldsRows([
    {name: 'Ron',age:'34',info:'novice',details:'likes sports',gender:'male',image:'https://s-media-cache-ak0.pinimg.com/236x/3c/27/ab/3c27ab3db891f1ba0aabaa99848bab3f.jpg'},
    {name: 'Lily',age:'18',info:'novice',details:'likes cats',gender:'female',image:'http://www.deluxxe.co.uk/assets/Ruth_new_colour_closeup.jpg'},
    {name: 'Kelly',age:'50',info:'expert',details:'likes cats',gender:'female',image:'http://www.deluxxe.co.uk/assets/Ruth_new_colour_closeup.jpg'}
  ]).toString()

  db.query(clientSql, err => {
    if (err) throw err;
  })

  db.end(() => console.log('Done'))
})
