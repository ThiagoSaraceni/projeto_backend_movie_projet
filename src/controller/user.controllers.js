const db = require("../../db");
const { editarFilme } = require("./movies.controller");

//Selecionar todos os filmes da nossa API
async function selectUsers(){
    const pg = await db.connect();
    const res = await pg.query("select * from usuarios")
    return res.rows;
}

async function cadastrarUser(usuario){
    const pg = await db.connect()
    const sql = "insert into usuarios (username, senha_hash, email) values ($1, $2, $3)"
    const value = [usuario.username, usuario.senha_hash, usuario.email]
    await pg.query(sql, value)
}

async function deletarUser(id){
    const pg = await db.connect()
    const sql = "DELETE FROM usuarios where id = $1"
    const value = [id]
    await pg.query(sql, value)
}

async function editarSenha(usuario, id){
    const pg = await db.connect()
    const sql = "UPDATE usuarios set senha_hash=$1 where id=$2"
    const value = [usuario.senha_hash, id]
    await pg.query(sql, value)
}

async function editarTudo(usuario, id){
    const pg = await db.connect()
    const sql = "UPDATE usuarios set username=$1, senha_hash=$2, email=$3 where id=$4"
    const value = [usuario.username, usuario.senha_hash, usuario.email, id]
    await pg.query(sql, value)
}


async function validarCadastroAdmin(email, senha_hash){
    const pg = await db.connect()
    const sql = "SELECT id FROM usuarioadmin WHERE email=$1 AND senha_hash=$2"
    const value = [email, senha_hash]
    const res = await pg.query(sql, value)
    return res.rows.length > 0 ? true : false
}

async function validarCadastroUser(email, senha_hash){
    const pg = await db.connect()
    const sql = "SELECT id FROM usuarios WHERE email=$1 AND senha_hash=$2"
    const value = [email, senha_hash]
    const res = await pg.query(sql, value)
    return res.rows.length > 0 ? true : false
}





module.exports = {
    selectUsers,
    cadastrarUser,
    deletarUser,
    editarSenha,
    editarTudo,
    validarCadastroAdmin,
    validarCadastroUser
}