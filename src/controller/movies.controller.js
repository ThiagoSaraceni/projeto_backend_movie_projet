const db = require('../../db');

//Selecionar todos os filmes da nossa API
async function selectFilmes(){
    const pg = await db.connect();
    const res = await pg.query("select * from filmes")
    return res.rows;
}

//Selecionar filme por nome
async function selectFilmesNome(nome){
    const pg = await db.connect();
    const sql = "select * from filmes where title like $1 || '%'" //o || é usado para concatenar
    const value = [nome];
    const res = await pg.query(sql, value)
    return res.rows;
}

//Selecionar por diretor
async function selectFilmesDiretor(diretor){
    const pg = await db.connect();
    const sql = "select * from filmes where diretor like $1 || '%'" 
    const value = [diretor];
    const res = await pg.query(sql, value)
    return res.rows;
}

//Selecionar por genero
async function selectFilmesGenero(genero){
    const pg = await db.connect()
    const sql = "select * from filmes where genero like $1 || '%'" 
    const value = [genero];
    const res = await pg.query(sql, value)
    return res.rows;
}

async function cadastrarFilmes(filme){
    const pg = await db.connect()
    const sql = "insert into filmes (title, ano_filme, duracao, descricao, diretor, genero, url_foto) values ($1, $2, $3, $4, $5, $6, $7)"
    const value = [filme.title, filme.ano_filme, filme.duracao, filme.descricao, filme.diretor, filme.genero, filme.url_foto]
    await pg.query(sql, value)
}

async function editarFilme(filme, id){
    const pg = await db.connect(filme, id)
    const sql = "UPDATE filmes set title=$1, ano_filme=$2, descricao=$3, duracao=$4, diretor=$5, genero=$6, url_foto=$7 where id=$8"
    const value = [filme.title, filme.ano_filme, filme.descricao, filme.duracao, filme.diretor, filme.genero, filme.url_foto, id] 
    await pg.query(sql, value)
}

async function deletarFilme(id){
    const pg = await db.connect(id)
    const sql = "delete from filmes where id = $1"
    const value = [id]
    await pg.query(sql, value)
}

async function selectMedia(){
    const pg = await db.connect()
    const sql = "select title, avg(avaliacao)  from avaliacaofilme group by title"
    const res = await pg.query(sql)
    return res.rows
}



module.exports = {
    selectFilmesNome,
    selectFilmes,
    selectFilmesDiretor,
    selectFilmesGenero,
    cadastrarFilmes,
    editarFilme,
    deletarFilme,
    selectMedia
}