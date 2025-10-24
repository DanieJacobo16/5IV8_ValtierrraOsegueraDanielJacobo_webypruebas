const express = require('express');
const mirrow = require ('./endpoins/mirrow');

//Vamos a hacer una instancia del servior a expess
const app = express();
const port = 3000;

app.use(express.json()); //Para parsear el body a json
//Definimos cada una de las rutas
app.get('/', mirrow);
app.post('/', mirrow);
app.put('/', mirrow);
app.delete('/', mirrow);
app.patch('/', mirrow);
app.head('/', mirrow);




app.listen(port, () => {
  console.log(`Servidor escuchando ${port} `);
});