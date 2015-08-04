
//importa el modulo express
var app= require('express')();
//importa modulo http e inicializa el srvidor
var http= require('http').Server(app);
var io= require('socket.io')(http);// importa socket.io
var username={};//Arreglo con los usuarios conectados, contiene los id


//recibe las peticiones de la url '/' req es la peticion
app.get('/', function(req, res){
	//res es la respuesta q en este caso es un html
	res.sendFile(__dirname+'/index.html');
});

app.get('/form', function(req, res){
	//res es la respuesta que en este caso es un html
	res.sendFile(__dirname+'/form.html');
});

//Mientras haya conexion llama la funcion 
io.on('connection',function(socket){
	console.log('usuario conectado id: '+ socket.id);

	//Cuando un cliente envia un mensaje el servidor lo recibe 
	//y lo retransmite a los demas clientes
	socket.on('message', function(data) {
		io.emit('response',username[socket.id]+" : "+data);
	});

	//Guardamos al usuario en un vector username mediante el id
	socket.on('usuario', function(user) {
		console.log(user);
		username[socket.id]=user;
	});
	
	
});

//se pone al servidor a escuchar en el puerto 7001
http.listen(7001, function(){

	console.log('Servidor inicializado en el puerto 7001' );
});