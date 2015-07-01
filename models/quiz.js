//Created in Chapter 7.2
//Definición de Modelo de QUIZ.

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
		{ 	pregunta: DataTypes.STRING,
			respuesta: DataTypes.STRING,
		}
	);
}