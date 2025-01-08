
import User from '../database/models/userModel';
const bcrypt = require('bcryptjs');

const adminSeeder = async():Promise<void> =>{
    const [data] = await User.findAll({
        where:{
            email: "admin@gmail.com"
        }
    })
    if(!data){
        User.create({
            email: "admin@gmail.com",
            password: bcrypt.hashSync("admin", 10),
            username:"admin",
            role: "admin"
        })
        console.log("admin credentials seeded successfully");
    }else{
        console.log("admin credentials already seeded");
    }
}

export default adminSeeder;