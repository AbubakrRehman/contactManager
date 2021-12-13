const session=require('express-session');
const store=new session.MemoryStore();

module.exports={store};