// Contient la logique métier Publication

const { Publication } = require('../models/index');
const fs = require('fs');

exports.createPublication = (req, res, next) => {
    const publicationObject = JSON.parse(req.body.publication);
    delete publicationObject._id;
    const publication = Publication.create ({
        ...publicationObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        userLiked: [],
        userDisliked: []
    });
    publication.save()
        .then(() => res.status(201).json({ message: 'Publication enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPublication = (req, res, next) => {
    if (req.file) {
        // si l'image est modifiée, il faut supprimer l'ancienne image dans le dossier /images
        Publication.findOne({ _id: req.params.id })
            .then(publication => {
                const filename = publication.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    // une fois que l'ancienne image est supprimée dans le dossier /images, on peut mettre à jour le reste
                    const publicationObject = {
                        ...JSON.parse(req.body.publication),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Publication.updateOne({ _id: req.params.id }, { ...publicationObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Publication modifiée!' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        // si l'image n'est pas modifiée
        const publicationObject = { ...req.body };
        Publication.updateOne({ _id: req.params.id }, { ...publicationObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Publication modifiée!' }))
            .catch(error => res.status(400).json({ error }));
    }
};

exports.deletePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then(publication => {
            const filename = publication.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, () => {
                Publication.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Publication supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOnePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
      .then(publication => res.status(200).json(publication))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllPublication = (req, res, next) => {
    Publication.find()
        .then(publications => res.status(200).json(publications))
        .catch(error => res.status(400).json({ error }));
};

exports.likePublication = (req, res, next) => {
    const userId = req.body.userId;
    const publicationId = req.params.id;
    Publication.findOne({ _id: publicationId })
        .then(publication => {
            const newValues = {
                usersLiked: publication.usersLiked,
                usersDisliked: publication.usersDisliked,
                likes: 0,
                dislikes: 0
            }
            switch (req.body.like) {
                case 1:  //publication liked
                    newValues.usersLiked.push(req.body.userId);
                    break;
                case -1:  //publication disliked
                    newValues.usersDisliked.push(req.body.userId);
                    break;
                case 0:  //like or dislike annulation
                    if (newValues.usersLiked.includes(req.body.userId)) {
                        const index = newValues.usersLiked.indexOf(req.body.userId);
                        newValues.usersLiked.splice(index, 1);
                    } else {
                        const index = newValues.usersDisliked.indexOf(req.body.userId);
                        newValues.usersDisliked.splice(index, 1);
                    }
                    break;
            };
            newValues.likes = newValues.usersLiked.length;
            newValues.dislikes = newValues.usersDisliked.length;
            // Update
            Publication.updateOne({ _id: publicationId }, newValues )
                .then(() => res.status(200).json({ message: 'publication notée !' }))
                .catch(error => res.status(400).json({ error }))  
        })
        .catch(error => res.status(500).json({ error }));
}