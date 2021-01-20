
/*
 * Requerimos el modulo 'mysql' y lo guardamos en una constante
 */
const mysql = require('mysql');

/*
 *  lo que hace promisfy es ayudarnos a que con el modulo pool pueda
 *  soportar las promesas y los async, await transformando el codigo
 *  de callback a codigo de promesas.
 */

const {promisify} = require('util');
/*
 *  requerimos el archivo keys, basicamente obtiene tiene los
 *  parámetros necesarios para conectarnos a la base de datos
 *  host, user, password, database
 */
const {database} = require('./keys');

/*
 * pool es lo mas cercano a un entorno de produccion. son hilos que se van
 * ejecutando y cada uno va haciendo una tarea a la vez, en secuencia.
 */

const pool = mysql.createPool(database);

/*
 *  obtengo la conexion, lo hacemos en este lugar para evitar
 *  el mismo codigo una y otra vez en los queries del aplicativo
 *
 *  Realizamos un callback para poder manejar un posible error en la conexion
 */

pool.getConnection((err, conn) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('conexion caida');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Hay muchas conexiones en la base de datos');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Conexion rechazadas con la base de datos');
        }
    }

    if(conn) conn.release();

    console.log('Conectado a la base de datos');
    return;
});

/*
 * cada vez que vaya a hacer una consulta poder usar promesas, convertir
 * promesas en lo que antes eran callbacks.
 */
pool.query = promisify(pool.query);
/*
 * Importo la variable pool debido a que contiene la conexion a la base de datos
 */
module.exports = pool;
