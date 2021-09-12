const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "escuela"
});

app.get('/estudiantes', (req, res) => {
    console.log('get estudiantes')
    mysqlConnection.query('Select * from escuela.estudiante', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer
app.get('/estudiantes/:id', (req, res) => {
    console.log('get estudiantes')
    mysqlConnection.query('Select * from escuela.estudiante where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Crear
app.post('/estudiantes', (req, res) => {
    let est = req.body;
    console.log('insert estudiantes')
    mysqlConnection.query('insert into escuela.estudiante (Nombre, Apellido, Edad, Grado) values (?,?,?,?)',
        [est.Nombre, est.Apellido, est.Edad, est.Grado], (err, result) => {
            if (!err) {
                res.send('Creado');
            } else {
                console.log(err);
                res.send('error');
            }
        })
});

//Actualizar
app.put("/estudiantes/:id", (req, res) => {
    console.log("update estudiante");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update estudiante set Nombre = ?, Apellido = ?, Edad = ?, Grado=? where id = ?',
        [est.Nombre, est.Apellido, est.Edad, est.Grado, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar
app.delete("/estudiantes/:id", (req, res) => {
    console.log("update estudiante ");
    mysqlConnection.query('delete from estudiante where id = ?',
        [req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Eliminado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});


app.listen(3000);