import mysqlc from 'mysql2/promise';
import dotenv from 'dotenv';

//Si vamos a tener una base de datos vamos a tener que meter lo siguiente 
//import{ createConnection} from url

dotenv.config();

const config = {
    host: 'localhost',
    user: 'root',
    password: -'N0m3l0',
    database: 'curso'
};

config.getConnection (err) => {
