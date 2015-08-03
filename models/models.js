//Created in Chapter 7.2

var path = require('path');

//Postgres DATABASE_ULR = postgres://user:passwd@host:port/databas
//SQLITE   DATABASE_URL = sqlite://:@/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user 		= (url[2]||null);
var pwd 		=	(url[3]||null);
var protocol=	(url[1]||null);
var dialect =	(url[1]||null);
var port 		=	(url[5]||null);
var host		=	(url[4]||null);
var storage	= process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar Base de Datos SQLITE

var sequelize = new Sequelize(DB_name, user, pwd,
		{	dialect: 	protocol,
			protocol: protocol,
			port:  		port,
			host: 		host, 
		 	storage:  storage, 	// solo SQLite (.env)
		 	omitNull: true			// solo Postgres 
		 }
	);

//Importar la definición de la tabla QUIZ en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //Exportar definición de la tabla a Quiz.

//sequelize.sync() crea e inicializa la tabla de preguntas en la base de datos.
sequelize.sync().then(function(){
//success() ejecuta el manejador una vez creada la tabla.
		Quiz.count().then(function(count){
			if (count === 0){ //la tabla se inicializa solo si está vacía.
				Quiz.create({ pregunta: "Capital de Italia",
											respuesta: "Roma", categoria: "Humanidades"});
				Quiz.create({ pregunta: "Capital de Portugal",
											respuesta: "Lisboa", categoria: "Humanidades"});
				Quiz.create({ pregunta: "Capital de Francia",
											respuesta: "Paris", categoria: "Humanidades"});
				Quiz.create({ pregunta: "Año de la Toma de la Bastilla",
											respuesta: "1789", categoria: "Humanidades"})
				.then(function(){console.log('Base de datos inicializada')});
			};
		});
});
