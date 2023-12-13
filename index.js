var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
// var logger = require('morgan');
var usuarioRouter = require('./routes/usuario');
var tarefaRouter = require('./routes/tarefas');
var loginRouter = require('./routes/login');
var app = express();
//const PORT =  3001;

//porta usada para fazer o deploy
const PORT = process.env.PORT || 3001;

// importand o sequelize
const { Sequelize } = require('sequelize');
const sequelize = require('./sequelize');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());


// Models importações
const Tarefa = require('./models/tarefa');
const Usuario = require('./models/usuario');
sequelize.sync();

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuarios', usuarioRouter);
app.use('/tarefas', tarefaRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
