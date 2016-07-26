var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(express.static('./public'));
app.use(bodyParser());

mongoose.Promise = Promise;
//mongoose.connect('mongodb://localhost/project1');
mongoose.connect('mongodb://okcoders:okcoders@okcoders.co/katy');


app.listen(8080, function() {
		console.log('Listening on 8080');
});

var BlogPost = mongoose.model('Post', {
	title: String,
	body: String, 
	timestamp: String
});

// var blogpost = new BlogPost({
// 	title: 'Hello World', 
// 	body: 'Bacon ipsum dolor amet elit nisi in aute officia esse. Sirloin corned beef tempor ullamco strip steak doner. Tongue excepteur tempor, do doner occaecat turkey et ut pork belly minim shankle shoulder cow ham hock. Excepteur landjaeger ball tip sunt veniam officia rump laboris esse reprehenderit meatloaf swine pork loin beef ribs.'
// });
// 
// blogpost.save();
// console.log('blog post added: ', blogpost);


app.get('/posts', function(req,res) {
	BlogPost.find().exec().then(function(posts) {
		res.json(posts);
	});
});

app.post('/posts', function(req,res) {
	var bpost = new BlogPost(req.body);
	bpost.save().then(function() {
		res.json(true);
	});
});

