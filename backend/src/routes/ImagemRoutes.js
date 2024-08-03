const routes = require('express').Router()
const path = require('path');
const fs = require('fs');

routes.get('/atleta/:imagem', (req, res) => {
    const { imagem } = req.params;
    const imgPath = `D:/projetos/CEPE/uploads/atleta/${imagem}.jpg`

    // Verifique se o arquivo existe antes de enviar
    fs.access(imgPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Arquivo não encontrado:', err);
            return res.status(404).send('Imagem não encontrada');
        }

        // Enviar o arquivo usando o caminho absoluto
        res.type("jpg")
        res.sendFile(imgPath);
    });
});

routes.get('/resp/:imagem', (req, res) => {
    const { imagem } = req.params;
    const imgPath = `D:/projetos/CEPE/uploads/resp/${imagem}.jpg`

    // Verifique se o arquivo existe antes de enviar
    fs.access(imgPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Arquivo não encontrado:', err);
            return res.status(404).send('Imagem não encontrada');
        }

        // Enviar o arquivo usando o caminho absoluto
        res.type("jpg")
        res.sendFile(imgPath);
    });
});

routes.get('/rg/:imagem', (req, res) => {
    const { imagem } = req.params;
    const imgPath = `D:/projetos/CEPE/uploads/rg/${imagem}.jpg`

    // Verifique se o arquivo existe antes de enviar
    fs.access(imgPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Arquivo não encontrado:', err);
            return res.status(404).send('Imagem não encontrada');
        }

        // Enviar o arquivo usando o caminho absoluto
        res.type("jpg")
        res.sendFile(imgPath);
    });
});

routes.get('/associado/:imagem', (req, res) => {
    const {imagem} = req.params;
    const img = fs.realpathSync('./public/images/associado/' + imagem)
    res.sendFile(img)
})


module.exports = routes