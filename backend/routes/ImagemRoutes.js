const routes = require('express').Router()
const fs = require('fs')

routes.get('/:imagem', (req, res)=>{
    const {imagem} = req.params;
    const path = fs.realpathSync('./public/images/associado/' + imagem)
    res.sendFile(path)
})

module.exports = routes