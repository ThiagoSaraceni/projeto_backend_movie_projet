const express = require("express");

const app = express();
const movies = require('../controller/movies.controller');

//Get todos os filmes
app.get("/filmes", async(req, res)=>{
    const filmes = await movies.selectFilmes()
    res.json(filmes)
})

//Get filme por nome
app.post("/filmes", async(req, res) =>{
    const nome = req?.body?.search;
    const moviesByName = await movies.selectFilmesNome(nome);
    res.json(moviesByName)
})
//Get filmes por diretor
app.get("/filmesdiretor/:diretor", async(req, res) =>{
    const moviesByDirector = await movies.selectFilmesDiretor(req.params.diretor);
    res.json(moviesByDirector)
})
//Get para pegar o filme por genêro
app.get("/filmesgenero/:genero", async(req, res) =>{
    const moviesByGender = await movies.selectFilmesGenero(req.params.genero);
    res.json(moviesByGender)
})

//Post para cadastrar o filme
app.post("/cadastrarfilme", async(req, res) =>{
    await movies.cadastrarFilmes(req.body)
    res.sendStatus(201);
})

//Editar um filme
app.put("/editarfilme/:id", async(req, res) =>{
    await movies.editarFilme(req.body, req.params.id)
    res.sendStatus(200)
})

//Deletar algum filme
app.delete("/deletarfilme/:id", async(req, res) =>{
    await movies.deletarFilme(req.params.id)
    res.send(204)
})

//Selecionar média do filme
app.get("/notes", async(req, res) => {
    const avgMovie = await movies.selectMedia();
    res.json(avgMovie)
})

module.exports = app