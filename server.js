var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});

var fortunes = require('./lib/fortune.js');

app.engine('handlebars', handlebars .engine);
app.set('view engine', 'handlebars');
app.set('view cache',false);

app.set('port',process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

if(app.things === null)
    console.log("bleat");

app.use(function(req,res,next){
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

app.get("/",function(req,res){
    res.render('home');

    var s='';
    for(var name in req.headers) s += name + ":" + req.headers[name] + '\n';
    console.log(s);
});

app.get("/about",function(req,res){
    res.render('about',{fortune:fortunes.getFortune(),
            pageTestScript:'/qa/tests-about.js'});
    });

app.get('/tours/hood-river',function(req,res){
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate',function(req,res){
    res.render('tours/request-group-rate');
});

app.use(function(req,res,next){
    res.type('text/plain');
    res.status(404);
    res.render('404');
}
);

app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
    }
);

app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-c to terminate.');
});

console.log("Server start.....");
console.log(__dirname);