const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const results = await db('accounts');
        res.status(200).json(results);
    }
    catch (error) {
        next(error);
    }
    return;
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const results = await db('accounts').where({ id }).first();
        if (results) {
            res.status(200).json(results);
        }
        else {
            res.status(404).json({ message: 'ID not found' });
        }
    }
    catch (error) {
        next(error);
    }
    return;
});

router.post('/', async (req, res, next) => {
    const body = req.body;
    try {
        const added = await db('accounts').insert(body).into('accounts');
            res.status(201).json({ message: 'Successfully Added', added });
        }
    catch (error) {
        next(error);
    }
    return;
});

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const updated = await db('accounts').where({ id }).update(body);
        if (updated) {
            res.status(200).json({ message: 'Successfully updated account', updated });
        }
        else {
            res.status(404).json({ message:'ID not found' });
        }
    }
    catch (error) {
        next(error);
    }
    return;
});

router.delete('/:id', async(req, res, next) => {
    const { id } = req. params;
    try {
        const deleted = await db('accounts').where({ id }).del();
        if (deleted) {
            res.status(200).json({ message: 'Successfully Deleted', deleted });
        }
        else {
            res.status(404).json({ message: 'ID not found' });
        }
    }
    catch (error) {
        next(error);
    }
    return;
});

// Stretch
/*
router.get('/', async (req, res, next) => {
    try {
        const results = await db('accounts').limit(5).orderBy('budget', 'desc');
        res.status(200).json(results);
    }
    catch (error) {
        next(error);
    }
    return;
});
*/
const errorHandler = ((error, req, res, next) => {
    res.status(500).json({ message: 'Server Error', error });
    next();
});

router.use(errorHandler);

module.exports = router;
