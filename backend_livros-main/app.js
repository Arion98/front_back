const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());

//aplicação pelo método get vai buscar a rota 
// localhost:3001/
// Configura o body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Arquivo com rotas para o cadastro de livros
const livros = require('./routes/livros');

//identificação da rota e da const (require) associada
//localhost:3000/livros
app.use('/livros',livros);

//Arquivo com rotas para o cadastro de editoras
const editoras = require('./routes/editoras');

//identificação da rota e da const (require) associada
//localhost:3000/livros
app.use('/editoras',editoras);

//Arquivo com rotas para o cadastro de editoras
const autores = require('./routes/autores');

//identificação da rota e da const (require) associada
//localhost:3000/livros
app.use('/autores',autores);

//a rota /autores retorna a lista dos autores cadastrados em formato json
app.use(express.json())

app.get('/', (req, res) => {
  res.send('teste Filipe!')
})
//exemplo relacionado a filmes localhost:3000/filmes
app.use(express.json()); //começa a receber json
app.post('/filmes',(req,res) => {
//const titulo = req.body.titulo;
//const genero = req.body.genero;
const {titulo, genero} = req.body;
res.send(`Filme: ${titulo} - Genero: ${genero}, recebido`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})