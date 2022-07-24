
import AdminBro from 'admin-bro';
import AdminBroExpress from 'admin-bro-expressjs';
import AdminBroMongoose from 'admin-bro-mongoose';
import mongoose from 'mongoose';
import bcrypt  from 'bcrypt';


AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  branding:{
    companyName:"Aya Restaurant"
  }
})

let ADMIN = {};
bcrypt.hash(process.env.ADMIN_PASSWORD ,10).then((hash)=>{
    ADMIN = {
        email: process.env.ADMIN_EMAIL,
        password: hash
    }
})
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
    cookieName: process.env.ADMIN_COOKIE_NAME ,
    cookiePassword: process.env.ADMIN_COOKIE_PASS,
    authenticate: async(email,password)=>{
        if((email === ADMIN.email) && (password === process.env.ADMIN_PASSWORD)){
          return ADMIN
        }
      return null    
    }
})

export default router