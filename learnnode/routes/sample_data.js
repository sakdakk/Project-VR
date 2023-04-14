var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM sample_data ORDER BY id DESC";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('sample_data', {title:'List Of Patients', action:'list', sampleData:data});
		}
   // response.send('List all sample data');

	});

});
router.get("/add", function(request,response ,next){
    response.render("sample_data",{title:'Insert Data ', action:'add'});

});

router.post("/add_sample_data", function(request, response, next){

	var first_name = request.body.first_name;

	var last_name = request.body.last_name;

	var age = request.body.age;

	var gender = request.body.gender;
	var Disease = request.body.Disease;
	var Prescription = request.body.Prescription;
	 var Ward= request.body.Ward;
	 var Blood_type = request.body.Blood_type;
	var query = `
	INSERT INTO sample_data 
	(first_name, last_name, age, gender, Disease, Prescription, Ward, Blood_type) 
	VALUES ("${first_name}", "${last_name}", "${age}", "${gender}" ,"${Disease}","${Prescription}","${Ward}","${Blood_type}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/sample_data");
		}

	});

});

router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM sample_data WHERE id = "${id}"`;

	database.query(query, function(error, data){

		response.render('sample_data', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});

});

router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var first_name = request.body.first_name;

	var last_name = request.body.last_name;

	var age = request.body.age;

	var gender = request.body.gender;

	var query = `
	UPDATE sample_data 
	SET first_name = "${first_name}", 
	last_name = "${last_name}", 
	age = "${age}", 
	gender = "${gender}" 
	WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/sample_data');
		}

	});

});
router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM sample_data WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/sample_data");
		}

	});

});

router.get('/details/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM sample_data WHERE id = "${id}"`;

	database.query(query, function(error, data){

		response.render('sample_data', {title: 'Details of Patient', action:'details', sampleData:data[0]});

	});

});
router.post('/details/:id', function(request, response, next){

	var id = request.params.id;

	var first_name = request.body.first_name;

	var last_name = request.body.last_name;

	var age = request.body.age;

	var gender = request.body.gender;

    var Disease = request.body.Disease;
var Prescription = request.body.Prescription;
 var Ward= request.body.Ward;
 var Blood_type = request.body.Blood_type;
	var query = `
	UPDATE sample_data 
	SET first_name = "${first_name}", 
	last_name = "${last_name}", 
	age = "${age}", 
	gender = "${gender}" ,
	Disease= "${Disease}",
	Prescription= "${Prescription}",
	Ward ="${Ward}",
	Blood_type="${Blood_type}"
	WHERE id = "${id}"
	`;
	var inputValue = request.body.submit_button;
	if(inputValue=='Edit OR Add')
	{
	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/sample_data');
		}

	});
}
if(inputValue=='View VR')
{
	response.redirect("http://localhost:4000");
// 	var express = requirehttp://localhost:3000/sample_data/details/6('express');
// 	var app = express();
// 	app.get('/', (req, res) => 
		
// 	//app.get('/').get(function(req,res)
// {
//     res.send("/sample_data");
// });
// app.post('/',function(req,res){
//     res.send('Wel.html');
// });
	// router.get('/',function(req,res){
	// 	res.redirect(path.join(__dirname+'/wel.html'));
	// 	//app.use('/', router);
	// 	//__dirname : It will resolve to your project folder.
	//   });
}

});
module.exports = router;


