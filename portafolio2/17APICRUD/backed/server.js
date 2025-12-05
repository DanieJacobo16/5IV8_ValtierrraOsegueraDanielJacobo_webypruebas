import express from 'express';
import path from 'path'; 
import mysql from 'mysql2';
//Aqui metemos las rutas que se van a consumir 

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../fronted','public')) );
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../fronted','public'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});