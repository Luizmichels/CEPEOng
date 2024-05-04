const multer = require("multer")
const path = require("path")

// Distino para aguardar as imagens
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "";

        console.log(req)
        // Verificar se as colunas contêm valores específicos
        if (file.fieldname == 'FOTO_ATLETA') {
            folder = "associado";
        } else if (file.fieldname == 'FOTO_RG') {
            folder = "rg";
        } else if (file.fieldname == 'FOTO_RG_RESPONS') {
            folder = "rg_respons";
        }

        cb(null, `public/images/${folder}/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error("Por favor, envie apenas png ou jpg!"));
        }
        cb(undefined, true);
    },
});

module.exports = { imageUpload }
