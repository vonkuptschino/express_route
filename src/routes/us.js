const User = require('./../bd')

// curl -s -i -H 'Content-Type: application/json' 'localhost:4321/users' -d '{"login":"student"}'

module.exports = (x) => {
 const rtr = x.Router();

 rtr
  .route('/')

  .get(async r => {
   const  items = await User.find();
   r.res.render('list', { title: 'Список логинов из БД', items });
  })

  .post(async r => {
  	const item = await User.findOne({"login": r.body.login});
  	r.res.send(item.login + ': ' + item.password + '\n');
  });

  // модуль с добавлением и удалением
  

 return rtr;
}