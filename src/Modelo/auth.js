module.exports = {
    async isLoggedIn (req, res, next){
      try{
        const pool = require('../database');
        let emailAdmin = "";
        const buscar = await pool.query('select * from administrador where idAdministrador = ?',[req.user.idAdministrador]);

        if(buscar.length > 0){
            emailAdmin = buscar[0].email;
        }

        if(req.isAuthenticated() && req.user.email === emailAdmin){
            return next();
        }else if (req.isAuthenticated() ){
            res.redirect('/usuario');
        }else{
            res.redirect('/');
        }
      }catch(e){
        req.flash('unsuccess','Por favor ingrese un correo y una contraseña válida');
        res.redirect('/');
      }

    },
    async isLoggedAsClient (req, res, next){
      try{
        const pool = require('../database');
        let emailCliente = "";
        const buscarCli = await pool.query('select * from cliente where idCliente = ?',[req.user.idCliente]);

        if(buscarCli.length > 0){
          emailCliente= buscarCli[0].email;
        }

        if(req.isAuthenticated() && req.user.email === emailCliente){
          return next();
        }
        return res.redirect("/profile");
      }catch(e){
        console.error(e);
      }
    }
}
