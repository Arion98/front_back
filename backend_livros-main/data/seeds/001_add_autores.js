exports.seed = function (knex){
  return knex("autores").del()
  .then(function() {
      return knex("autores").insert([
            // "nome"
            // "sobrenome"
            // "idade"
            // "data_nascimento"
            // "sexo"
            // "telefone"  
{
    nome:"Peter", 
    sobrenome: "Jandl Junior", 
    idade:36, 
    data_nascimento:"23-12-1987", 
    sexo: "Masculino",
    telefone:"45227549",    
},
{
    nome:"Guilherme ",
    sobrenome: "Silveira", 
    idade:23,
    data_nascimento:"23-11-1999", 
    sexo: "Masculino",
    telefone:"24384310",
},
{
    nome:"David ", 
    sobrenome: "Flanagan", 
    idade:45,
    data_nascimento:"20-04-1978", 
    sexo: "Masculino",
    telefone:"3004-2222",
},


      ]);
  });
}
