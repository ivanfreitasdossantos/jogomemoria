const http = require('http')
const port = 8080
const ip = 'localhost'
const mo  = "mongodb://localhost:27017/jogoMemoria"

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
    mongo = require('mongodb'),
    monk = require('monk'),
    db = monk(mo);
    docRanking = db.get('docRanking'),
    cors = require('cors');

app.use(cors());

app.use(bodyParser.json({
  limit: '6mb'
}));

app.use(bodyParser.text());

app.use(bodyParser.urlencoded({
  limit: '6mb',
  extended: true
}));

app.post('/ranking', function(req, res) {
    docRanking.insert(req.body.data, {}, function (e, r) {
		res.send("Dados Inseridos");
	});
});

app.get('/ranking', async function(req, res) {

  let listaRanking = await docRanking.find();
  res.send(listaRanking);
});

app.listen(port, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`)
  console.log('Para derrubar o servidor: ctrl + c');
})