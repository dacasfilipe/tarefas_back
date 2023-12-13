const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');

//GET Retorna tarefas com paginação e ordenação
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`SELECT * FROM usuarios ORDER BY updatedAt DESC LIMIT ? OFFSET ?`,
        { replacements: [parseInt(limit), (page - 1) * parseInt(limit)] }
    )
    .then(([results, metadata]) => {
        res.json(results);
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//GET Consulta uma tarefa pelo ID
router.get('/:id', async (req, res) => {
    sequelize.query(`SELECT * FROM usuarios WHERE id = ${req.params.id}`)
    .then(([results, metadata]) => {
        if(results.length === 0){
            res.status(404).json({
                sucess: false,
                message:"usuario não encontrada",
            });
        }else{
            res.json({
                sucess: true,
                Tarefa: results[0],
            });
        }
    }).catch((error) => {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    });
});

//POST Cria uma tarefa
router.post('/', async (req, res) => {
    try {
        // Encriptar a senha
        const senhaEncriptada = await bcrypt.hash(req.body.senha, 10); // 10 é o número de rounds para gerar o salt
    sequelize.query(`INSERT INTO usuarios (username, email, senha, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`, 
    
        { replacements: [req.body.username, req.body.email, senhaEncriptada,new Date(), new Date() ] }
    )
    
        res.status(201).json({
            success: true,
            message: "usuario criado com sucesso",
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

//PUT Atualiza uma tarefa pelo ID
router.put('/:id', async (req, res) => {
    sequelize.query(`UPDATE usuarios SET senha = ${req.body.senha} WHERE id = ${req.params.id}`)
    .then(([results, metadata]) => {
        if(metadata.affectedRows === 0){
            res.status(404).json({
                sucess: false,
                message:"usuario não encontrada",
            });
        }else{
            res.json({
                sucess: true,
                message: "senha atualizada com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    });
});

//DELETE Deleta uma tarefa pelo ID
router.delete('/:id', async (req, res) => {
    sequelize.query(`DELETE FROM usuarios WHERE id = ${req.params.id}`)
    .then(([results, metadata]) => {
        if(metadata.affectedRows === 0){
            res.status(404).json({
                sucess: false,
                message:"usuario não encontrada",
            });
        }else{
            res.json({
                sucess: true,
                message: "usuario deletada com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    });
});

module.exports = router;
