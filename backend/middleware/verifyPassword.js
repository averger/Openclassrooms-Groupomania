const passwordSchema = require('../models/Password');


module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, '{"message":"8 caractères minimun. Au moins 1 Majuscule, 1 minuscule, 2 chiffres et sans espaces"}', {
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    } else {
        next();
    }
};