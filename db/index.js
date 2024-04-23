
const {Pool} = require("pg");

async function connect(){
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    })

    const conexao = await pool.connect();
    console.log("Criou o pool de conexão")

    const res = await conexao.query("select now()");
    console.log(res.rows[0]);

    conexao.release();

    return pool.connect();
}

module.exports = {
    connect
};
