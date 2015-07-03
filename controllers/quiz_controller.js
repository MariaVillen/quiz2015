//Created in Chapter 6.5
var models = require('../models/models.js'); //added chapter 7.2

// AUTOLOAD
exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(function(quiz){
		if(quiz) {
			req.quiz = quiz;
			next();
		} else {
			next(new Error('No existe Quiz Id = ' + quizId ));
		}
	}).catch(function(error) {next(error);});
};

// GET / index

exports.index = function( req, res){
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index', {quizes: quizes});
	}).catch(function(error) {next(error);});
};

// GET /quizes/question
exports.show = function(req, res){
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: req.quiz});
	//})
};

// GET /quizes/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === req.quiz.respuesta){
			resultado = "Correcto";}
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

