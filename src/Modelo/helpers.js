const helpers = {}
const bcrypt = require('bcryptjs');

helpers.cifrar = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash;
};

helpers.compararContraseña = async (password, savedPassword) =>{
    return await bcrypt.compare(password,savedPassword);
};

module.exports = helpers;