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

	if(req.query.search){
		var search = '%' + req.query.search.replace(/\s/gi, "%") + '%';
	} else {var search = '%';}
	
	models.Quiz.findAll({where: ["lower(pregunta) like lower(?)", search], order: 'pregunta ASC'}).then(function(quizes) {
		res.render('quizes/index', {quizes: quizes});
	}).catch(function(error) {next(error);});
};

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
	res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create

exports.create = function(req, res) {
	var quiz = models.Quiz.build (req.body.quiz);

	// guarda en la BD los campos pregunta y respuesta del Quiz
	quiz
	.validate()
	.then(
		function(err) {
			if (err) {
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
				quiz
				.save({fields: ["pregunta", "respuesta"]})
				.then(function(){res.redirect("/quizes");})
			}
		}
	);
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
		if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()){
			resultado = "Correcto";}
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

