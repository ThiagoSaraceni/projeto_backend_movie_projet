require("dotenv").config();
const express = require("express");

const app = express();

const user = require('../controller/user.controllers');

app.get("/alluser", async(req, res)=>{
    const usuarios = await user.selectUsers()
    res.json(usuarios)
});

app.post("/cadastrarUser", async(req, res) =>{
    await user.cadastrarUser(req.body)
    res.sendStatus(201);
})

app.delete("/deletaruser/:id", async(req, res) =>{
    await user.deletarUser(req.params.id)
    res.sendStatus(204)
})

app.put("/editar/:id", async(req, res) =>{
    await user.editarSenha(req.body,req.params.id)
    res.sendStatus(204)
})

app.put("/adminedit/:id", async(req, res) =>{
    await user.editarTudo(req.body, req.params.id)
    res.sendStatus(204)
})

app.get("/validacao/:email/:senha_hash" , async (req, res) => {
    const isValid = await user.validarCadastroAdmin(req.params.email, req.params.senha_hash)
    res.json({isValid})
})

app.get("/valid/:email/:senha_hash" , async (req, res) => {
    const isValid = await user.validarCadastroUser(req.params.email, req.params.senha_hash)
    res.json({isValid})
})



module.exports = app