const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            res.status(500).json({error: 'Error'})
            console.log(error);
        })
})

router.get('/:id', (req, res) => {
    db('accounts')
        .where({id: req.params.id})
        .first()
        .then(account => {
            res.status(200).json(account);
        })
})


router.post('/', (req, res) => {
    db('accounts')
        .insert(req.body, 'id')
        .then(accounts =>{
            res.status(201).json(accounts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: 'Error'})
        })
});

router.put('/:id', (req, res) => {
    db('accounts')
        .where({id: req.params.id})
        .update(req.body)
        .then(count => {
            res.status(200).json(count)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: 'Error'})
        })
});

router.delete('/:id', (req, res) => {
    db('accounts')
        .where({id: req.params.id})
        .delete()
        .then(remove => {
            res.status(200).json(remove)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: 'Error'})
        })
});

module.exports = router;