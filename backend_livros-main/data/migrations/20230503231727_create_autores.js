/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('autores',(table) =>{
  table.increments();
  table.string("nome",80).notNullable();
  table.string("sobrenome",30).notNullable();
  table.integer("idade",30).notNullable();
  table.date("data_nascimento",10).notNullable();
  table.string("sexo",9).notNullable();
  table.integer("telefone",16).notNullable();
})
}
exports.down = function(knex) {
  return knex.schema.dropTable("autores")
};
