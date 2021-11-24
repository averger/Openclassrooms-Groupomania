const { Comment } = require('../models/index');

exports.createComment = (req, res, next) => {
    const comment = {
        userId: req.decodedToken.userId,
        messageId: req.body.messageId,
        content: req.body.content
    };
    Comment.create(comment)
        .then(() => res.status(201).json({ message: "Commentaire envoyé !" }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({ messageId: req.params.id })
        .then((comments) => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
    Comment.findOne({ id: req.params.id })
        .then((comment) => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ id: req.params.id })
        .then((comment) => {
            Comment.destroy({ id: req.params.id })
                .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};