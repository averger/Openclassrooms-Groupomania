// Contient la logique métier user

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/index');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            console.log(hash)
            const user = User.create ({
                email: req.body.email,
                password: hash,
                lastName : req.body.lastname,
                firstName: req.body.firstname,
                description: req.body.description
            });
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteAccount = (req, res, next) => {
    User.findOne({ id: req.params.id })  
        .then((user) => {
            User.destroy({ id: req.params.id })
                .then(() => res.status(200).json({ message: 'Compte supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch (error => res.status(500).json({ error }));
};
        
exports.getOneAccount = (req, res, next) => {
    User.findOne({ id: req.params.id })
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

exports.modifyAccount = (req, res, next) => { 
    User.findOne({ id: req.params.id })
        .then((user) => {
            lastName = req.body.lastname;
            firstName = req.body.firstname;
            description = req.body.description;
            User.update()         
        .then(() => res.status(201).json({ message: 'Compte modifié !' }))
        .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllAccounts = (req, res, next) => {
    User.findAll()
        .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};