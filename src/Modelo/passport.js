//estos dos modulos siempre van juntos
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database')
const helpers = require('./helpers');

//FALTA AUN REDIRIJIR AL USUARIO A DONDE DEBE IR PERO ES EZ xd
passport.use('local.logIn', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    let emailAdmin = "";
    const buscar = await pool.query('select * from administrador where email = ?',[email]);
    if(buscar.length > 0){
        emailAdmin = buscar[0].email;
    }
    if(email === emailAdmin){
        const filas = await pool.query('select * from administrador where email = ?', [email]);

        if(filas.length > 0){ //si encuentra un ADMINISTRADOR dentro de la base de datos cuyo email concida entra a este if
            const user = filas[0]; //como "filas" es un areglo de objetos cojo solo un de esos objetos y lo igualo a un usuario nuevo
            const validPass = await helpers.compararContraseña(password, user.contrasena); //con ayuda del metodo comparar de la clase helpers comparo las contraseñas que me acaban de ingresar con la que ya esta guardada en la base de datos
            if(validPass){ // si es asi pues que inicie sesion
                done(null, user, req.flash('success', 'Bienvenido '+ user.nombre));
            }else{ // si no que me muestre un error de que la contraseña no es la correcta
                //OJO AQUI DEBEN ESTAR SEGUROS QUE LA CONTRASEÑA ESTÁ ENCRIPTADA EN LA BASE DE DATOS
                done(null, false, req.flash('unsuccess','Contraseña Incorrecta'));
            }
        }else{ // si no devuelve un error que dice que el correo del admin no esta registrado
            return done(null, false, req.flash('unsuccess','El Correo no existe'));
        }

    }else{
        const filas = await pool.query('select * from cliente where email = ?', [email]);

        if(filas.length > 0){ //si encuentra un ADMINISTRADOR dentro de la base de datos cuyo email concida entra a este if
            const user = filas[0]; //como "filas" es un areglo de objetos cojo solo un de esos objetos y lo igualo a un usuario nuevo
            const validPass = await helpers.compararContraseña(password, user.contrasena); //con ayuda del metodo comparar de la clase helpers comparo las contraseñas que me acaban de ingresar con la que ya esta guardada en la base de datos
            if(validPass){ // si es asi pues que inicie sesion
              req.session.proCom = []; //si 
                done(null, user, req.flash('success', 'Bienvenido '+ user.nombre));
            }else{ // si no que me muestre un error de que la contraseña no es la correcta
                //OJO AQUI DEBEN ESTAR SEGUROS QUE LA CONTRASEÑA ESTÁ ENCRIPTADA EN LA BASE DE DATOS
                done(null, false, req.flash('unsuccess','Contraseña Incorrecta'));
            }
        }else{ // si no devuelve un error que dice que el correo del admin no esta registrado
            return done(null, false, req.flash('unsuccess','El Correo no existe'));
        }
    }

}));

passport.use('local.signUp', new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'contrasena',
    passReqToCallback: true
}, async (req, email, contrasena, done ) => {
    const {idCliente, nombre, direccion, FK_idCiudad, FK_idRuta} = req.body;
    const newClient = {
        idCliente,
        nombre,
        direccion,
        FK_idCiudad,
        FK_idRuta,
        email,
        contrasena
    }
    newClient.contrasena = await helpers.cifrar(contrasena);
    await pool.query('insert into cliente set ? ',[newClient]);
    console.log(newClient);
    return done(null, newClient);
}));

passport.serializeUser( async (user, done)=>{
    let emailAdmin="";
    const buscar = await pool.query('select * from administrador where email = ?',[user.email]);
    if(buscar.length > 0){
        emailAdmin = buscar[0].email;
    }
    if(user.email === emailAdmin){
        done(null, user.idAdministrador);
    }
    done(null, user.idCliente);
});

passport.deserializeUser( async (idAdministrador, done) => {
    const filas = await pool.query('select * from administrador where idAdministrador = ?',[idAdministrador]);
    done(null, filas[0]);
});
passport.deserializeUser( async (idCliente, done) => {
    const filas = await pool.query('select * from cliente where idCliente = ?',[idCliente]);
    done(null, filas[0]);
});
