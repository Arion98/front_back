exports.seed = function (knex){
  return knex("editoras").del()
  .then(function() {
      return knex("editoras").insert([
        // nome
        // cidade
        // estado
        // telefone
        // rua
        // cep 
{
    nome:" Aditya Y. Bhargava", 
    cidade: "Aditya Bhargava", 
    idade: 34, 
    estado:"Pequim", 
    telefone:"3004-2222",    
    rua: " Rua Beijing",
    cep:"69900‑000"
},
{
    nome:" Herbert Schildt",
    cidade: "Bangkok", 
    idade:42,
    estado:"Talim", 
    telefone:"0303-1234",
    rua: " West Street ",
    cep:"57000‑000"
},
{
    nome:" Maurício Samy Silva", 
    cidade: "Hong Kong", 
    idade:51,
    estado:"Adis Abeba", 
    telefone:"3720-1234",
    rua: " Rua ShangXiajiu",
    cep:"68900‑000"
},



      ]);
  });
}
