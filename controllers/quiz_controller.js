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
		res.render('quizes/index', {quizes: quizes, errors: []});
	}).catch(function(error) {next(error);});
};

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta", categoria: "Categoria"}
		);
	res.render('quizes/new', {quiz: quiz, errors: []});
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
				.save({fields: ["pregunta", "respuesta", "categoria"]})
				.then(function(){res.redirect("/quizes");})
			}
		}
	);
};

// GET /quizes/question
exports.show = function(req, res){
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: req.quiz, errors: []});
	//})
};

// GET /quizes/answer
exports.edit = function(req, res){
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

// GET /quizes/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()){
			resultado = "Correcto";}
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

// PUT /quizes/:id
exports.update = function (req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.categoria = req.body.quiz.categoria;

	req.quiz
	.validate()
	.then(
		function(err){
			if(err) {
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			} else {
				req.quiz
				.save({fields: ["pregunta","respuesta","categoria"]})
				.then( function(){res.redirect('/quizes');});
			}
		}
		)};

// DELETE /quizes/:id
exports.destroy = function(req,res){
	req.quiz.destroy().then( function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};