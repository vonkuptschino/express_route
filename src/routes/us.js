const User = require('./../bd')

// curl -s -i -H 'Content-Type: application/json' 'localhost:4321/users' -d '{"login":"student"}' вывод пароля
// curl -X PUT -i -H 'Content-Type: application/json' 'localhost:4321/users' -d '{"login":"semiklassnitza", "password":"research"}' добавление юзера
// curl -X DELETE -i -H 'Content-Type: application/json' 'localhost:4321/users' -d '{"login":"grecha"}' удаление юзера

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
  })
 
 .put(async r => {
    let login = r.body.login;
    let password = r.body.password;           
    let myuser = new User({login, password});
    await myuser.save();
    r.res.send('added \n');
  })

  .delete(async r => {
    let login = r.body.login;
    await User.deleteOne({login}); 
    r.res.send('deleted \n');
  });

 return rtr;
}
