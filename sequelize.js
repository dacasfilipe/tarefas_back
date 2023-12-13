// importand o sequelize
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config(); // PEGA TODAS CONFIGURAÇÕES DO .ENV

// criando a constante seuquelize e passando informações
const db = 
    new Sequelize({
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        define: {
          timestamps: false
        }
  });

  module.exports = db;

