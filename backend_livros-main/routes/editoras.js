//importando o framework express
const express = require("express");
//importando o framework express.Router
const router = express.Router();

//dados de conexão com o bd
const dbKnex = require("../data/db_config"); 

//método get ele retorna todos os editoras do banco de dados
router.get("/",async(req,res) => {
    try{
        //para obter os editoras pode-se utilizar .select().orderBy() ou apenas .orderBy()
        const editoras = await dbKnex("editoras").orderBy("id","desc");
        res.status(200).json(editoras); //retorna statusCode ok e os dados
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e msg
    }
});

//método post é usado para inclusão
//localhost:3000/editoras/cadastrar
router.post("/",async (req,res)=>{
    //faz a desestruturação dos dados recebidos no corpo da requisição
    //const titulo = req.params.titulo;
    //const autor = req.params.autor;
    //const ano = req.params.ano;
    //const preco = req.params.preco;
    //const foto = req.params.foto;
   
    const {titulo, autor, ano, preco, foto} = req.body;
    
    //se algum dos campos não foi passado, irá enviar uma mensagem de erro ao retornar
    if(!titulo || !autor || !ano || !preco || !foto){
        res.status(400).json({msg:"Enviar titulo, autor, ano, preco, e foto do livro."});
        return;
    }

    //caso ocorra algum erro na inclusão, o programa irá capturar(catch) o erro
    try{
        //insert, faz a inserção na tabela editoras(e retorna o id do registro inserido)
        const novo = await dbKnex("editoras").insert({titulo,autor,ano,preco,foto});
        res.status(201).json({id:novo[0]}); //statuscode indica Create
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e msg
    }
});


//método put é usado para alteração. id indica o registro a ser alterado
router.put("/:id",async(req,res) => {
    const id = req.params.id; //
    const {preco} = req.body; // { "preco": "19.99" }
    try{
        //altera o campo preco, no registro cujo id coincidir com o parametro passado
        await dbKnex("editoras").update({preco}).where({id});
        res.status(200).json(); //statusCode indica ok
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e msg
    }
});


//método delete é usado para exclusão
router.delete("/:id",async(req,res) => {
    const {id} = req.params; //id do registro a ser excluído
    try{
        await dbKnex("editoras").del().where({id});
        res.status(200).json(); //statusCode indica Ok
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e msg
    }
});

//Filtro por titulo ou por autor
router.get("/filtro/:palavra", async(req,res)=> {
    const palavra = req.params.palavra; // palavra ou titulo a pesquisar
    try{
            const editoras = await dbKnex("editoras")
            .where("titulo","like", `%${palavra}%`)
            .orWhere("autor","like",`%${palavra}%`);
            res.status(200).json(editoras); //retorna statusCode ok e os dados
        }catch(error){
            res.status(400).json({msg:error.message}); //retorna status de erro e msg
        }
});

//Resumo do cadastro de editoras
router.get("/dados/resumo",async (req,res) =>{
    try{
        const editoras = await dbKnex("editoras")
        .count({num: "*"})
        .sum({soma: "preco"})
        .max({maior: "preco"})
        .avg({media: "preco"});
        const {num,soma,maior,media} = editoras[0];
        res.status(200).json({num,soma,maior,media:Number(media.toFixed(2))});
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e msg
    }
})

//Exibir o gráfico com a soma dos preços agrupados por ano
router.get("/dados/grafico",async (req,res) =>{
    try{
        //obtém ano e soma do preço dos editoras, Agrupados por ano
        const totalPorAno = await dbKnex("editoras").select("ano")
        .sum({total:"preco"}).groupBy("ano");
        res.status(200).json(totalPorAno);
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e msg
    }
})


module.exports = router;