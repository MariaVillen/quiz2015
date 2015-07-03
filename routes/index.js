//Enrutador (importa el controlador)

var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');//Added in Chapter 6.5


/* GET home page. */

router.get('/', function(req, res) {
 	res.render('index', { title: 'Quiz' });
});

// AUTOLOAD 
router.param('quizId', quizController.load);


router.get('/quizes', quizController.index);//Added Chapter 7.4
//router.get('/quizes/question', quizController.question);//Added in Chapter 6.5 
//router.get('/quizes/answer', quizController.answer);//Added in Chapter 6.5
router.get('/quizes/:quizId(\\d+)', quizController.show);//Added in Chapter 7.4 
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);//Added in Chapter 7.4

router.get('/author', function(req, res){
	res.render('author');});


module.exports = router;
