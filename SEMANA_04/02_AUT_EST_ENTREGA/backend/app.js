const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = './data/curriculo.db';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

/* Colocar toda a parte estática no frontend */
app.use(express.static("./frontend/"));

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

// Retorna todos registros (é o R do CRUD - Read)
app.get('/usuarios', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM sobre_mim ORDER BY nome COLLATE NOCASE';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/inserir', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO sobre_mim (nome, descricao_sobre_mim, cargo_desejado, numero, email) VALUES ('" + req.body.nome + "', '" + req.body.descricao_sobre_mim + "', '"+ req.body.cargo_desejado +"', '" + req.body.numero + "', '" + req.body.email + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<head><meta charset="utf-8"/></head><body><p>DESCRIÇÃO INSERIDA COM SUCESSO!</p><a href="/">VOLTAR</a></body>');
	db.close(); // Fecha o banco
	res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizarCurriculo', (req, res) => {
	//condição de que está funcionando
	res.statusCode = 200;
	//cabeçalho da requisição
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	//seleciona todas as colunas da tabela sobre_mim 
	sql = "SELECT * FROM sobre_mim WHERE id="+ req.query.id; 

	console.log(sql); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizarCurriculo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE sobre_mim SET nome='" + req.body.nome + "', descricao_sobre_mim = '" + req.body.descricao_sobre_mim + "' , cargo_desejado='" + req.body.cargo_desejado + "', numero='" + req.body.numero + "', email='" + req.body.email + "' WHERE id='" + req.body.id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<head><meta charset="utf-8"/></head><body><p>CURRÍCULO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a></body>');
	db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/deletarCurriculo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM sobre_mim WHERE id='" + req.query.id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<head><meta charset="utf-8"/></head><body> <p>CURRÍCULO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a></body>');
		res.end();
	});
	db.close(); // Fecha o banco
});

// Retorna todos registros (é o R do CRUD - Read)
app.get('/experiencia', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT experiencia.id_experiencia,
		experiencia.nome_experiencia,
		experiencia.data_inicio,
		experiencia.data_fim,
		experiencia.descricao_experiencia,
		sobre_mim.id FROM experiencia JOIN sobre_mim ON sobre_mim.id = experiencia.id_sobre_mim WHERE experiencia.id_sobre_mim = ` + req.query.id + `ORDER BY nome_experiencia COLLATE NOCASE`;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Retorna todos registros (é o R do CRUD - Read)
app.get('/habilidades', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT habilidades.id_habilidades,
		habilidades.nome_programa,
		habilidades.descricao_experiencia_,
		sobre_mim.id FROM habilidades JOIN sobre_mim ON sobre_mim.id = habilidades.id_sobre_mim WHERE habilidades.id_sobre_mim = ` + req.query.id + ` ORDER BY nome_programa COLLATE NOCASE`;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Retorna todos registros (é o R do CRUD - Read)
app.get('/formacao', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT formacao.id_formacao,
		formacao.curso,
		formacao.ano_inicio,
		formacao.ano_fim,
		sobre_mim.id FROM formacao JOIN sobre_mim ON sobre_mim.id = formacao.id_sobre_mim WHERE formacao.id_sobre_mim = ` + req.query.id + ` ORDER BY curso COLLATE NOCASE`;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});