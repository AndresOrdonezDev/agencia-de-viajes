import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.DATABASE, process.env.USER)
const db = new Sequelize(process.env.DATABASE, process.env.USER,process.env.PASSWORD,{

    host:process.env.HOST,
    port:process.env.PORTDB,
    dialect:'mysql',


    define:{
        timestamps:false
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },

    opertatorAliases:false

});

export default db;
