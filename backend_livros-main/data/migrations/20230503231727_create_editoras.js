/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
return knex.schema.createTable('editoras',(table) =>{
    table.increments();
    table.string("nome",50).notNullable();
    table.string("cidade",30).notNullable();
    table.string("estado",3).notNullable();
    table.integer("telefone",10).notNullable();
    table.integer("rua",9).notNullable();
    table.integer("cep",8).notNullable();
    })
};
exports.down = function(knex) {
    return knex.schema.dropTable("editoras")
};
