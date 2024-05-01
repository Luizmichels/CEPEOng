const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('CEPE', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectou');
    } catch (error) {
        console.error('Erro ao conectar:', error);
    }
})();

module.exports = sequelize;
