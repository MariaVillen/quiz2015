//Created in Chapter 7.2
//Definición de Modelo de QUIZ.

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
		{ 	pregunta: { 
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "-> Falta Pregunta"}}
		},
			respuesta: { 
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "-> Falta Respuesta"}}
		},
			categoria: { 
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "-> Falta Respuesta"}}
		}}
	
	);
}