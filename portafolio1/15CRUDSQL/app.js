
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

require('dotenv').config({ path: './.env' });

const app = express();
const port = process.env.PORT || 3000;

const bd = mysql.createPool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

bd.getConnection((error, connection) => {
    if (error) {
        console.log('Error de conexión a la base de datos: ' + error);
    } else {
        console.log('Conexión exitosa a la base de datos');
        connection.release();
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'css')));

const validarActividad = (datos) => {
    const errores = [];
    
    if (!datos.fecha || !/^\d{4}-\d{2}-\d{2}$/.test(datos.fecha)) {
        errores.push('Fecha inválida. Use formato YYYY-MM-DD');
    }
    
    if (!datos.hora || !/^\d{2}:\d{2}$/.test(datos.hora)) {
        errores.push('Hora inválida. Use formato HH:MM');
    }
    
    if (!datos.actividad || datos.actividad.trim().length < 3) {
        errores.push('La actividad debe tener al menos 3 caracteres');
    }
    
    if (!datos.descripcion || datos.descripcion.trim().length === 0) {
        errores.push('La descripción es requerida');
    }
    
    if (!['Alta', 'Media', 'Baja'].includes(datos.prioridad)) {
        errores.push('Prioridad inválida');
    }
    
    if (!['Pendiente', 'En Progreso', 'Completada'].includes(datos.estado)) {
        errores.push('Estado inválido');
    }
    
    const horas = parseFloat(datos.horas_invertidas);
    if (isNaN(horas) || horas < 0 || horas > 24) {
        errores.push('Horas invertidas deben ser un número entre 0 y 24');
    }
    
    return errores;
};


app.get('/', (req, res) => {
    const query = 'SELECT * FROM actividades ORDER BY fecha DESC, hora DESC';
    
    bd.query(query, (error, resultados) => {
        if (error) {
            console.log('Error al obtener las actividades: ' + error);
            return res.status(500).render('error', { 
                mensaje: 'Error al cargar las actividades',
                error: error.message 
            });
        }
        res.render('index', { 
            actividades: resultados,
            mensaje: req.query.mensaje || null 
        });
    });
});

app.post('/actividades', (req, res) => {
    const { fecha, hora, actividad, descripcion, prioridad, estado, horas_invertidas } = req.body;
    
    const errores = validarActividad(req.body);
    
    if (errores.length > 0) {
        return res.status(400).render('error', { 
            mensaje: 'Errores de validación',
            errores: errores 
        });
    }
    
    const query = `INSERT INTO actividades (fecha, hora, actividad, descripcion, prioridad, estado, horas_invertidas) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    bd.query(query, [fecha, hora + ':00', actividad, descripcion, prioridad, estado, horas_invertidas], 
        (error, resultados) => {
            if (error) {
                console.log('Error al crear la actividad: ' + error);
                return res.status(500).render('error', { 
                    mensaje: 'Error al crear la actividad',
                    error: error.message 
                });
            }
            res.redirect('/?mensaje=Actividad creada exitosamente');
        });
});

app.get('/actividades/delete/:id', (req, res) => {
    const actividadId = req.params.id;
    
    if (isNaN(actividadId)) {
        return res.status(400).render('error', { 
            mensaje: 'ID de actividad inválido' 
        });
    }
    
    const query = 'DELETE FROM actividades WHERE id = ?';
    
    bd.query(query, [actividadId], (error, resultados) => {
        if (error) {
            console.log('Error al eliminar la actividad: ' + error);
            return res.status(500).render('error', { 
                mensaje: 'Error al eliminar la actividad',
                error: error.message 
            });
        }
        
        if (resultados.affectedRows === 0) {
            return res.status(404).render('error', { 
                mensaje: 'Actividad no encontrada' 
            });
        }
        
        res.redirect('/?mensaje=Actividad eliminada exitosamente');
    });
});

app.get('/actividades/edit/:id', (req, res) => {
    const actividadId = req.params.id;
    
    if (isNaN(actividadId)) {
        return res.status(400).render('error', { 
            mensaje: 'ID de actividad inválido' 
        });
    }
    
    const query = 'SELECT * FROM actividades WHERE id = ?';
    
    bd.query(query, [actividadId], (error, resultados) => {
        if (error) {
            console.log('Error al obtener la actividad: ' + error);
            return res.status(500).render('error', { 
                mensaje: 'Error al cargar la actividad',
                error: error.message 
            });
        }
        
        if (resultados.length === 0) {
            return res.status(404).render('error', { 
                mensaje: 'Actividad no encontrada' 
            });
        }
        
        const actividad = resultados[0];
        if (actividad.hora) {
            actividad.hora = actividad.hora.substring(0, 5); 
        }
        
        res.render('edit', { actividad: actividad });
    });
});

app.post('/actividades/update/:id', (req, res) => {
    const actividadId = req.params.id;
    const { fecha, hora, actividad, descripcion, prioridad, estado, horas_invertidas } = req.body;
    
    if (isNaN(actividadId)) {
        return res.status(400).render('error', { 
            mensaje: 'ID de actividad inválido' 
        });
    }
    
    const errores = validarActividad(req.body);
    
    if (errores.length > 0) {
        return res.status(400).render('error', { 
            mensaje: 'Errores de validación',
            errores: errores 
        });
    }
    
    const query = `UPDATE actividades 
                   SET fecha = ?, hora = ?, actividad = ?, descripcion = ?, prioridad = ?, estado = ?, horas_invertidas = ? 
                   WHERE id = ?`;
    
    bd.query(query, [fecha, hora + ':00', actividad, descripcion, prioridad, estado, horas_invertidas, actividadId], 
        (error, resultados) => {
            if (error) {
                console.log('Error al actualizar la actividad: ' + error);
                return res.status(500).render('error', { 
                    mensaje: 'Error al actualizar la actividad',
                    error: error.message 
                });
            }
            
            if (resultados.affectedRows === 0) {
                return res.status(404).render('error', { 
                    mensaje: 'Actividad no encontrada' 
                });
            }
            
            res.redirect('/?mensaje=Actividad actualizada exitosamente');
        });
});

app.use((req, res) => {
    res.status(404).render('error', { 
        mensaje: 'Página no encontrada' 
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});